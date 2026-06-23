---
title: DLfinal
date: 2026-06-21 01:10:00
layout: page
description: 从 cosine loss curve 中识别可迁移学习率响应，并迁移到 WSD-family 学习率计划。
comments: false
aside: false
mathjax: true
---

> DLfinal 的核心问题是：如果只知道 source cosine 训练损失曲线和 target WSD-family 学习率计划，能不能在不读取 target WSD loss 的情况下，预测 WSD 曲线相对 MPL baseline 的系统性偏移？

{% link DLfinal 代码仓库, GitHub / wjjpku, https://github.com/wjjpku/DL-final %}

## 项目概览

MPL 已经能很好地拟合公开训练损失曲线，但在 WSD 学习率计划的 transition 和 tail 区域仍会留下有结构的残差。这个项目没有把 residual 当作可以直接搬运的黑箱误差，而是把它拆成两部分：

```text
可迁移的 LR-drop response
+ 不可迁移的 MPL-LD parameter drift
```

因此，项目真正做的是一个识别问题：先从 cosine residual 中投影掉 MPL-LD 的 nuisance tangent，再只迁移与学习率下降响应相关的那一维标量强度。

{% image https://raw.githubusercontent.com/wjjpku/DL-final/main/slides/figs/fig_mpl_residual_anomaly_100M.png, alt=MPL residual 在 WSD 过渡区和尾部附近呈现结构性异常, width=100% %}

## 方法线索

部署时使用的预测器非常低容量：

$$
\hat L_s(t)=L_{\mathrm{MPL},s}(t)+\hat\kappa_s\phi_{\lambda_s,s}(t)
$$

其中 `kappa_hat_s` 只从 source cosine residual 中估计；`phi` 只由 target learning-rate schedule 构造；target WSD loss 只用于最后评估和 oracle 诊断。

{% mermaid %}
flowchart LR
  A["source cosine residual"] --> B["投影去除 MPL-LD 漂移"]
  B --> C["估计 kappa"]
  C --> D["迁移到 target WSD schedule"]
  D --> E["离线评估 MAE 与 oracle 相关性"]
{% endmermaid %}

{% tabs dlfinal, 1 %}
<!-- tab 识别步骤 -->

1. 用冻结的 MPL baseline 得到 source residual。
2. 对 residual 做 MPL-LD tangent projection，去掉低频参数漂移。
3. 从投影后的 residual 中估计 `kappa_hat`。
4. 用 target WSD schedule 构造响应特征 `phi(t)`。
5. 输出 `MPL + kappa_hat * phi(t)`，再用 target loss 做离线评估。

<!-- endtab -->
<!-- tab 主结果 -->

| 指标 | 结果 |
| --- | ---: |
| WSD-family 平均 MAE 相对 MPL | `-30.88%` |
| 最差目标曲线 | `-4.67%` |
| 同尺度 WSD-family 胜场 | `15/15` |
| source `kappa_hat` 与 target oracle Pearson | `+0.910` |
| 不做投影的负对照 | `+625.92%`, `0/15` wins |

<!-- endtab -->
<!-- tab 边界 -->

- 当前结论建立在已提交的公开曲线 CSV 上，不声称完成新的 transformer 训练。
- WSD-con final-LR 排序仍是细粒度限制。
- 目标 WSD loss 不参与预测；oracle 量只用于诊断。

<!-- endtab -->
{% endtabs %}

## 关键图示

{% image https://raw.githubusercontent.com/wjjpku/DL-final/main/slides/figs/fig_projection_decomposition_cosine_100M.png, alt=投影分解把可迁移响应与 MPL-LD 漂移分离, width=100% %}

{% image https://raw.githubusercontent.com/wjjpku/DL-final/main/slides/figs/fig_schedule_response_mae_heatmap.png, alt=WSD-family 目标上的 MAE 改善热力图, width=100% %}

{% image https://raw.githubusercontent.com/wjjpku/DL-final/main/slides/figs/fig_kappa_clean_scatter.png, alt=source-only kappa 与 target oracle kappa 的相关性, width=100% %}

{% folding cyan, 我觉得这个项目最有价值的地方 %}

它把“loss curve residual 能不能迁移”拆成了一个可检验的识别问题。负对照显示 raw residual transfer 会灾难性失败，说明有用的不是残差本身，而是被投影后留下的学习率响应分量。这让项目比单纯拟合曲线更有解释性。

{% endfolding %}

## 仓库入口

- 中文展示材料：`slides/main_zh.pdf`
- 英文展示材料：`slides/main.pdf`
- 主复现脚本：`repro/schedule_response_robustness_audit.py`
- 复现说明：`REPRODUCIBILITY.md`
- 数据边界：`DATA_MANIFEST.md`

{% link 查看 README 与代码, GitHub / DL-final, https://github.com/wjjpku/DL-final %}
