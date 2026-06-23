---
title: MLfinal
date: 2026-06-21 01:11:00
layout: page
description: 在小型算法数据集上复现和扩展 grokking，比较模型架构、训练比例与优化设置。
comments: false
aside: false
mathjax: true
---

> MLfinal 围绕 grokking 现象展开：模型先把训练集拟合到很高准确率，验证集却长期不动；继续训练很多步后，验证准确率突然上升。项目把模运算、S5 群运算和 K 元求和写成短序列预测任务，观察模型是否真的学到了代数结构。

{% link MLfinal 代码仓库, GitHub / wjjpku, https://github.com/wjjpku/ML-final %}

## 项目概览

每个样本都被写成类似下面的短序列：

$$
x\ \mathrm{op}\ y \Rightarrow x\ \mathrm{op}\ y
$$

训练时只监督最后一个答案 token。这样做的好处是任务非常干净：模型不是在学自然语言，而是在从离散符号样本中恢复隐藏的运算结构。

{% mermaid %}
flowchart LR
  A["构造代数任务"] --> B["训练短序列模型"]
  B --> C["跟踪训练与验证曲线"]
  C --> D["比较架构、正则与训练比例"]
{% endmermaid %}

{% image https://raw.githubusercontent.com/wjjpku/ML-final/main/assets/grokking_accuracy_curves.png, alt=不同训练比例下训练与验证准确率曲线, width=100% %}

## 这个项目实际做了什么

{% tabs mlfinal, 1 %}
<!-- tab 任务 -->

| 类型 | 例子 |
| --- | --- |
| 模运算 | `mod_add`, `mod_sub`, `mod_div` |
| 分段运算 | `div_or_sub_by_y_parity` |
| 多项式型模运算 | `x2_y2`, `x2_xy_y2`, `x3_xy2_plus_y` |
| 群运算 | `S5` 上的乘法、共轭、`x·y·x` |
| K 元任务 | `sum_mod` / `mod_add` with `--k > 2` |

<!-- endtab -->
<!-- tab 模型 -->

默认主模型是 2 层 decoder-only Transformer：

- hidden size `128`
- 4 个 attention heads
- causal attention mask
- 最后一位用等号 token 占位并预测答案

同时实现了 MLP、LSTM、GRU，用来比较 grokking 是否依赖某个特定架构。

<!-- endtab -->
<!-- tab 训练变量 -->

项目系统调整了这些变量：

- 训练数据比例：例如 `0.25 / 0.30 / 0.50 / 0.70`
- 优化器：AdamW、Adam、SGD、RMSprop
- 正则与噪声：dropout、梯度噪声、权重噪声、weight decay
- 训练时长：从快速 smoke run 到长步数 grokking run

<!-- endtab -->
{% endtabs %}

## 为什么它值得展示

这个项目的价值不只是“跑了一个 Transformer”。它把一个机器学习现象变成了可控实验：

- 如果模型只是记忆训练表格，未见过的 `(x, y)` 组合会失败。
- 如果模型学到了模加法或群运算的结构，验证集才会突然上升。
- 数据比例、正则强度和优化器会改变泛化发生的时间尺度。
- 从二元运算扩展到 K 元求和，可以把任务难度继续推高。

{% folding green, 我自己的理解 %}

Grokking 最有意思的地方在于“训练准确率已经不能告诉你模型是否理解结构”。它逼着我们把训练过程拉长，观察参数范数、正则化和表示结构如何一起影响泛化。这个项目虽然是课程项目，但问题意识很清楚：算法数据集足够小，却能暴露出神经网络从记忆到结构学习的转变。

{% endfolding %}

## 运行入口

快速运行：

```bash
python train.py --op mod_add --steps 3000 --target-val-acc 0.90
```

典型 grokking 设置：

```bash
python train.py \
  --op mod_add \
  --train-ratio 0.25 \
  --steps 100000 \
  --target-val-acc 0.9995 \
  --optimizer adam \
  --dropout 0.1 \
  --grad-noise-std 1.0
```

切换架构：

```bash
python train.py --architecture transformer
python train.py --architecture mlp
python train.py --architecture lstm
python train.py --architecture gru
```

## 仓库入口

- 命令行入口：`train.py`
- 数据构造：`mlfinal/data.py`
- 模型结构：`mlfinal/architectures.py`
- 训练循环：`mlfinal/trainer.py`
- 项目报告：`sample-1(2).pdf`
- 代表性曲线图：`assets/grokking_accuracy_curves.png`

{% link 查看 README 与代码, GitHub / ML-final, https://github.com/wjjpku/ML-final %}
