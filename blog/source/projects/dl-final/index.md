---
title: DLfinal
date: 2026-06-21 01:10:00
layout: page
description: 从 cosine 损失曲线到 WSD-family 学习率计划的曲线迁移实验。
comments: false
aside: false
---

> DLfinal 关注学习率计划改变训练损失曲线时，哪些残差信号可以从 cosine 计划迁移到 WSD-family 计划。它更像一个曲线诊断实验：先拆开 MPL baseline 的残差，再判断哪些结构是真正可迁移的学习率响应。

{% link DLfinal 代码仓库, GitHub / wjjpku, https://github.com/wjjpku/DL-final, https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png %}

## 项目概览

如果已经观察到 cosine 学习率计划下的训练损失曲线，是否可以在不读取目标 WSD 损失曲线的情况下，预测 WSD-family 学习率计划下的曲线形状？

项目的核心不是把一条曲线硬拟合到另一条曲线上，而是把 MPL baseline 的残差拆开看：哪些部分像学习率下降造成的可迁移响应，哪些部分只是 MPL-LD 参数漂移带来的干扰。

{% tabs dlfinal, 1 %}
<!-- tab 研究问题 -->

- 学习率计划会改变训练曲线的形状，尤其是在 transition 和 tail 区域。
- MPL 本身已经是强 baseline，但它在 WSD 过渡区附近会留下有结构的残差。
- 直接搬运 cosine residual 会把低频漂移也带过去，因此需要先识别、再迁移。

<!-- endtab -->
<!-- tab 方法线索 -->

项目把 residual transfer 写成一个识别问题：

```text
预测曲线 = MPL 基线 + 可迁移响应强度 × 目标学习率计划的响应特征
```

其中可迁移响应强度只从 source cosine residual 中估计；目标 WSD 损失曲线只用于最后评估和 oracle 诊断。

<!-- endtab -->
<!-- tab 结果观察 -->

| 观察 | 含义 |
| --- | --- |
| 投影后的 source-only correction 在同尺度 WSD-family 目标上整体改善 | 可迁移信号确实存在 |
| 不做投影的负对照明显变差 | 不能把 raw residual 直接搬过去 |
| source 估计强度与 target oracle 强度高度相关 | 识别出的响应强度有解释性 |

<!-- endtab -->
{% endtabs %}

## 关键图示

{% image https://raw.githubusercontent.com/wjjpku/DL-final/main/slides/figs/fig_mpl_residual_anomaly_100M.png, alt=MPL residual 在 WSD 过渡区和尾部附近呈现结构性异常, width=100% %}

{% image https://raw.githubusercontent.com/wjjpku/DL-final/main/slides/figs/fig_projection_decomposition_cosine_100M.png, alt=投影分解把可迁移响应与 MPL-LD 漂移分离, width=100% %}

{% image https://raw.githubusercontent.com/wjjpku/DL-final/main/slides/figs/fig_schedule_response_mae_heatmap.png, alt=WSD-family 目标上的 MAE 改善热力图, width=100% %}

## 仓库入口

- 主要展示材料：`slides/main_zh.pdf`
- 英文展示材料：`slides/main.pdf`
- 复现实验脚本：`repro/`
- 核心图表：`slides/figs/`

{% btn https://github.com/wjjpku/DL-final, 查看完整 README 与代码, anzhiyufont anzhiyu-icon-arrow-right, block center %}
