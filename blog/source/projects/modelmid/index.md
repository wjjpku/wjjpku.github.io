---
title: Modelmid
date: 2026-06-21 01:12:00
layout: page
description: 数学解答来源识别项目，分析人类与多种大模型在数学写作中的风格指纹。
comments: false
aside: false
---

> Modelmid 研究“数学解答是谁写的”。它不是普通主题分类，而是从 LaTeX 习惯、公式密度、段落结构、逻辑连接和证明语气中识别人类与大模型的写作指纹。

{% link Modelmid 代码仓库, GitHub / wjjpku, https://github.com/wjjpku/Modelmid %}

## 项目概览

项目给同一道数学题收集人类解答和多个大模型解答，然后训练检测器判断文本来源。公开版覆盖 Human、DeepSeek、GLM、GPT-4.1-mini、Kimi、Qwen 等来源。

它最有意思的地方在于：数学文本不是普通自然语言。公式、换行、证明组织方式、LaTeX 环境、逻辑词和段落节奏，本身就是模型风格的一部分。

{% image https://raw.githubusercontent.com/wjjpku/Modelmid/main/docs/figures/gpt_augmented/pca_clusters_2d.png, alt=不同来源数学解答在特征空间中的 PCA 聚类, width=100% %}

{% mermaid %}
flowchart LR
  A["同题多来源解答"] --> B["结构与 LaTeX 特征"]
  B --> C["传统 ML 与端到端模型"]
  C --> D["跨分布与对抗评估"]
{% endmermaid %}

## 工作流

{% timeline 项目流程,blue %}
<!-- timeline 数据构建 -->
构建同题配对的多来源数学解答数据集，覆盖训练、泛化和对抗评估。
<!-- endtimeline -->
<!-- timeline 特征提取 -->
提取段落数量、公式密度、LaTeX 环境、逻辑连接词、TF-IDF 等结构与词汇特征。
<!-- endtimeline -->
<!-- timeline 模型训练 -->
比较 RandomForest、HistGradientBoosting、ResNet_DNN、Simple_MLP、Conv1D_Net 和端到端 DistilBERT。
<!-- endtimeline -->
<!-- timeline 泛化与对抗 -->
测试跨分布表现，并用大模型根据检测器反馈迭代优化 prompt，观察绕过率如何变化。
<!-- endtimeline -->
{% endtimeline %}

## 公开版结果

{% tabs modelmid, 1 %}
<!-- tab 分类器 -->

| Model | Type | Accuracy |
| --- | --- | ---: |
| RandomForest | ML | `0.977` |
| HistGradientBoosting | ML | `0.974` |
| ResNet_DNN | DL | `0.974` |
| Simple_MLP | DL | `0.970` |
| Conv1D_Net | DL | `0.965` |
| End-to-End DistilBERT | E2E Transformer | `0.981` |

传统 ML 检测器训练快、解释性强；端到端 Transformer 检测器准确率更高，但解释成本也更高。

<!-- endtab -->
<!-- tab 特征 -->

公开版报告保留了 28 个排版、结构和逻辑特征。比较突出的信号包括：

- 人类平均段落数更少，但单段长度和信息密度更高。
- 不同模型对行内公式和块级公式有明显偏好。
- 逻辑连接词、LaTeX 环境和换行模式能帮助区分来源。

<!-- endtab -->
<!-- tab 对抗 -->

GPT-4.1-mini 迭代对抗实验中，数据驱动 prompt 优化在第 5 轮达到 `100%` 绕过率：

| Round | Bypass Rate |
| --- | ---: |
| 1 | `0.00%` |
| 2 | `20.00%` |
| 3 | `46.67%` |
| 4 | `60.00%` |
| 5 | `100.00%` |

这说明可解释特征既能帮助我们理解检测器，也会在暴露后成为对抗绕过的入口。

<!-- endtab -->
{% endtabs %}

## 关键图示

{% image https://raw.githubusercontent.com/wjjpku/Modelmid/main/docs/figures/gpt_augmented/confusion_matrix_ml.png, alt=数学解答来源识别的混淆矩阵, width=100% %}

{% image https://raw.githubusercontent.com/wjjpku/Modelmid/main/docs/figures/gpt_augmented/feature_importances.png, alt=来源识别中的特征重要性, width=100% %}

{% image https://raw.githubusercontent.com/wjjpku/Modelmid/main/docs/figures/gpt_augmented/stealth_success_rate.png, alt=防检测提示下的绕过率变化, width=100% %}

{% folding green, 我觉得有价值的点 %}

这个项目把“AI 数学解答的风格”拆成了可以观察的信号。它不仅能训练分类器，也能反过来暴露检测器的脆弱处：当一个大模型知道检测器关心什么，它就可能沿着这些特征进行伪装。这让项目同时具有可解释性和安全性讨论价值。

{% endfolding %}

## 仓库入口

- 数据集：`dataset/`
- 特征与报告：`docs/experiment_report.md`
- 分类结果：`results/classification/`
- 对抗实验：`iterative_adversarial_experiment/`
- 主要脚本：`scripts/model_training/`, `scripts/visualization/`

{% link 查看 README 与代码, GitHub / Modelmid, https://github.com/wjjpku/Modelmid %}
