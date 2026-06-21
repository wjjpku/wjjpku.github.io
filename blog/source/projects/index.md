---
title: 项目档案
date: 2026-06-21 01:05:00
layout: page
description: 收纳 wjjpku 在数学资源、机器学习实验、学术组织和交互式工具上的公开项目。
comments: false
---

<style>
  .project-page {
    max-width: 1120px;
    margin: 0 auto 3rem;
    padding: 0 1rem;
  }

  .project-hero {
    margin: 1.5rem auto 1.25rem;
    padding: 1.6rem 0 0.4rem;
  }

  .project-kicker {
    color: var(--anzhiyu-main);
    font-weight: 700;
    letter-spacing: 0;
    margin-bottom: 0.5rem;
  }

  .project-title {
    font-size: 2rem;
    line-height: 1.2;
    margin: 0 0 0.8rem;
    color: var(--anzhiyu-fontcolor);
  }

  .project-intro {
    max-width: 760px;
    line-height: 1.75;
    color: var(--anzhiyu-secondtext);
    margin: 0;
  }

  .project-section-title {
    margin: 2rem 0 1rem;
    font-size: 1.35rem;
    color: var(--anzhiyu-fontcolor);
  }

  .project-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
    gap: 1rem;
  }

  .project-card {
    border: var(--style-border);
    border-radius: 8px;
    background: var(--anzhiyu-card-bg);
    padding: 1.1rem;
    box-shadow: var(--anzhiyu-shadow-border);
    display: flex;
    flex-direction: column;
    min-height: 250px;
  }

  .project-card.featured {
    border-color: var(--anzhiyu-main);
  }

  .project-card h3 {
    margin: 0 0 0.55rem;
    font-size: 1.15rem;
    color: var(--anzhiyu-fontcolor);
  }

  .project-card p {
    margin: 0.35rem 0;
    line-height: 1.62;
    color: var(--anzhiyu-secondtext);
  }

  .project-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin: 0.35rem 0 0.8rem;
  }

  .project-chip {
    display: inline-flex;
    align-items: center;
    min-height: 24px;
    padding: 0.15rem 0.55rem;
    border-radius: 999px;
    background: var(--anzhiyu-secondbg);
    color: var(--anzhiyu-secondtext);
    font-size: 0.78rem;
  }

  .project-actions {
    margin-top: auto;
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
    padding-top: 1rem;
  }

  .project-actions a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 34px;
    padding: 0 0.75rem;
    border-radius: 6px;
    background: var(--anzhiyu-main);
    color: var(--anzhiyu-white);
    font-weight: 700;
    text-decoration: none;
  }

  .project-actions a.secondary {
    background: var(--anzhiyu-secondbg);
    color: var(--anzhiyu-fontcolor);
  }

  .interest-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
    gap: 0.85rem;
    margin-bottom: 1rem;
  }

  .interest-item {
    border-left: 3px solid var(--anzhiyu-main);
    background: var(--anzhiyu-card-bg);
    border-radius: 6px;
    padding: 0.9rem 1rem;
    line-height: 1.6;
    color: var(--anzhiyu-secondtext);
  }

  .interest-item strong {
    color: var(--anzhiyu-fontcolor);
  }

  @media (max-width: 640px) {
    .project-title {
      font-size: 1.55rem;
    }

    .project-card {
      min-height: auto;
    }
  }
</style>

<div class="project-page">
<section class="project-hero">
<div class="project-kicker">Selected Work</div>
<h1 class="project-title">学术资源、机器学习实验与小型产品</h1>
<p class="project-intro">
      这里收纳我在数学、机器学习、学术组织和交互式工具上的公开项目。它们有的服务真实的同学需求，有的来自课程研究和实验复现，也有一些是把想法快速做成可玩的网页或游戏。
</p>
</section>

<h2 class="project-section-title">重点项目</h2>
<div class="project-grid">
<article class="project-card featured">
<h3>北京大学数学科学学院学生会学术组官网</h3>
<div class="project-meta">
<span class="project-chip">TypeScript</span>
<span class="project-chip">React</span>
<span class="project-chip">Academic Infrastructure</span>
</div>
<p>面向北大数院同学的学术组官网，承载活动发布、资源汇总、模拟期中、九章征解、团队展示等功能。</p>
<p>项目采用配置驱动的内容管理方式，把活动、题目、资源和成员信息从页面代码中拆出来，便于后续维护。</p>
<div class="project-actions">
<a href="https://github.com/wjjpku/Academic-Department-Website" target="_blank" rel="noopener">GitHub</a>
<a class="secondary" href="https://pkusms.com" target="_blank" rel="noopener">访问网站</a>
</div>
</article>

<article class="project-card featured">
<h3>PKUsmsExam</h3>
<div class="project-meta">
<span class="project-chip">数学资源</span>
<span class="project-chip">Open Source</span>
<span class="project-chip">6 Stars</span>
</div>
<p>北大数院专业课往年题整理仓库，目标是把分散在同学之间的复习材料沉淀为可协作维护的公共资源。</p>
<p>相比单纯收集文件，它更像一个小型知识基础设施：适合通过 pull request 持续补充、修订和扩展。</p>
<div class="project-actions">
<a href="https://github.com/wjjpku/PKUsmsExam" target="_blank" rel="noopener">GitHub</a>
</div>
</article>

<article class="project-card featured">
<h3>DL-final</h3>
<div class="project-meta">
<span class="project-chip">Python</span>
<span class="project-chip">Deep Learning</span>
<span class="project-chip">LR Schedule</span>
</div>
<p>研究从 cosine loss curve 到 WSD-family learning-rate schedule 的损失曲线迁移问题。</p>
<p>项目把 MPL residual 的结构性误差视为识别问题，尝试先剥离 MPL-LD nuisance component，再迁移可泛化的 LR-drop response。</p>
<div class="project-actions">
<a href="https://github.com/wjjpku/DL-final" target="_blank" rel="noopener">GitHub</a>
</div>
</article>

<article class="project-card">
<h3>Modelmid</h3>
<div class="project-meta">
<span class="project-chip">Python</span>
<span class="project-chip">AI Provenance</span>
<span class="project-chip">Math Text</span>
</div>
<p>数学推导文本溯源分类器，围绕 Human、DeepSeek、Kimi、GLM、Qwen 等来源做多分类识别。</p>
<p>项目结合 TF-IDF、LaTeX/结构/逻辑风格特征与端到端模型，并包含跨题库、跨学科、跨语言和防检测实验。</p>
<div class="project-actions">
<a href="https://github.com/wjjpku/Modelmid" target="_blank" rel="noopener">GitHub</a>
</div>
</article>

<article class="project-card">
<h3>ML-final</h3>
<div class="project-meta">
<span class="project-chip">Python</span>
<span class="project-chip">Transformer</span>
<span class="project-chip">Grokking</span>
</div>
<p>在二元运算表数据上训练 decoder-only Transformer，观察模型对模运算、群运算等数学结构的学习与泛化。</p>
<p>实验关注不同训练比例、优化器、正则化和长时间训练下的泛化曲线，尤其是过拟合之后的 grokking 现象。</p>
<div class="project-actions">
<a href="https://github.com/wjjpku/ML-final" target="_blank" rel="noopener">GitHub</a>
</div>
</article>

<article class="project-card">
<h3>SmartTime</h3>
<div class="project-meta">
<span class="project-chip">TypeScript</span>
<span class="project-chip">AI Tool</span>
<span class="project-chip">Supabase</span>
</div>
<p>基于自然语言输入的智能任务管理系统，支持 AI 解析任务、日历展示、实时同步、用户认证和个性化设置。</p>
<p>这是一次把 AI 能力落到日常效率工具里的尝试，重点在自然语言到结构化日程的交互体验。</p>
<div class="project-actions">
<a href="https://github.com/wjjpku/SmartTime" target="_blank" rel="noopener">GitHub</a>
</div>
</article>

<article class="project-card">
<h3>信仰之烛：犹太之路</h3>
<div class="project-meta">
<span class="project-chip">Godot</span>
<span class="project-chip">GDScript</span>
<span class="project-chip">Course Project</span>
</div>
<p>为“全球视野下的犹太文明”课程制作的 2D 横版闯关游戏，用角色、蜡烛、烛台、地图与剧情串联犹太文明元素。</p>
<p>项目从 PyGame 原型转向 Godot，在一周内完成自学、素材搜集、剧情编排和可运行版本。</p>
<div class="project-actions">
<a href="https://github.com/wjjpku/Candle-of-Faith-Game-developed-by-godot" target="_blank" rel="noopener">GitHub</a>
<a class="secondary" href="https://www.bilibili.com/video/BV15WLyzzE3h/" target="_blank" rel="noopener">演示视频</a>
</div>
</article>

<article class="project-card">
<h3>鸭腿叔叔</h3>
<div class="project-meta">
<span class="project-chip">JavaScript</span>
<span class="project-chip">Interactive Fiction</span>
<span class="project-chip">Game</span>
</div>
<p>一个微信聊天框形式的虚构经营小游戏。玩家以“鸭腿叔叔”的第一视角，在群聊、供应商、家人、舆论和监管之间做选择。</p>
<p>它更像一次叙事界面实验：把校园语境、经营决策和聊天 UI 混在一起，做成可直接打开的静态页面。</p>
<div class="project-actions">
<a href="https://github.com/wjjpku/UncleDucky" target="_blank" rel="noopener">GitHub</a>
</div>
</article>
</div>

<h2 class="project-section-title">Interest Map</h2>
<div class="interest-list">
<div class="interest-item"><strong>Mathematics.</strong> 课程笔记、抽象代数、数学分析、结构化题库与数院公共资源。</div>
<div class="interest-item"><strong>Machine Learning.</strong> 小模型训练曲线、grokking、学习率计划迁移与数学文本来源识别。</div>
<div class="interest-item"><strong>Academic Community.</strong> 把学生会学术活动、资料和征解题做成可维护、可协作的网站系统。</div>
<div class="interest-item"><strong>Interactive Tools.</strong> AI 日程工具、聊天框叙事游戏、Godot 课程游戏等轻量交互作品。</div>
</div>
</div>
