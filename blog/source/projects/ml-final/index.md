---
title: MLfinal
date: 2026-06-21 01:11:00
layout: page
description: 在二元运算表上训练小型模型，观察数学结构学习与泛化现象。
comments: false
---

{% image https://opengraph.githubassets.com/wjjpku-ml-final/wjjpku/ML-final, alt=MLfinal 仓库预览, width=100% %}

## 项目概览

MLfinal 用二元运算表构造监督学习任务，让模型从形如 `a ∘ b = c` 的符号样本中学习隐藏运算规则。实验对象包括模加法、模减法、模除法、多项式型模运算，以及对称群上的乘法与共轭相关运算。

这个项目最有意思的地方在于：模型并不只是背答案。随着训练步数增加，它可能先表现为过拟合，随后验证准确率突然上升，呈现类似 grokking 的泛化现象。

{% btn https://github.com/wjjpku/ML-final, 打开代码仓库, anzhiyufont anzhiyu-icon-github, block center %}

## 数据与任务

- 样本形式：`a ∘ b = c`
- 典型运算：模加法、模减法、模除法、多项式型模运算、`S_5` 上的群运算。
- 训练集比例：可以调整为 50%、30%、25% 等不同设置。
- 评估指标：输出 token 的准确率，以及训练/验证曲线随时间的变化。

{% folding cyan, 为什么这个任务值得看 %}

二元运算表任务表面上是离散符号预测，实质上在问模型能不能学到背后的代数结构。  
如果模型只记忆训练样本，它在未见过的组合上会失败；如果模型学到了结构，它就能在验证集上泛化。

{% endfolding %}

## 模型设置

| 项目 | 设置 |
| --- | --- |
| 模型 | 解码器式 Transformer |
| 层数 | 2 层 |
| 隐藏宽度 | 128 |
| 注意力头数 | 4 |
| 优化器 | AdamW / Adam |
| 关注现象 | 过拟合后的延迟泛化 |

## 可以继续追的问题

1. 哪些运算更容易让模型学出结构？
2. 训练集比例下降时，grokking 的出现时间如何变化？
3. 权重衰减、噪声、dropout 对泛化时间有没有稳定影响？
4. 输出嵌入的可视化是否能对应到数学对象的结构？

{% btn https://github.com/wjjpku/ML-final, 查看完整 README 与代码, anzhiyufont anzhiyu-icon-arrow-right, block center %}
