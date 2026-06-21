---
title: 学术工作
date: 2026-06-21 01:05:00
layout: page
description: 收纳 wjjpku 在深度学习、机器学习、数学文本识别和交互叙事上的公开项目。
comments: false
---

<style>
  .work-page {
    max-width: 1120px;
    margin: 0 auto 3rem;
    padding: 0 1rem;
  }

  .work-hero {
    padding: 1.4rem 0 1rem;
    margin-bottom: 0.8rem;
  }

  .work-hero h1 {
    margin: 0 0 0.75rem;
    color: var(--anzhiyu-fontcolor);
    font-size: 2rem;
    line-height: 1.25;
    letter-spacing: 0;
  }

  .work-hero p {
    max-width: 760px;
    margin: 0;
    color: var(--anzhiyu-secondtext);
    line-height: 1.75;
  }

  .work-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1rem;
    margin-top: 1.2rem;
  }

  .work-card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-height: 310px;
    padding: 1.1rem;
    border: var(--style-border);
    border-radius: 8px;
    background: var(--anzhiyu-card-bg);
    box-shadow: var(--anzhiyu-shadow-border);
    overflow: hidden;
    transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .work-card::before {
    content: "";
    position: absolute;
    inset: 0 auto 0 0;
    width: 4px;
    background: var(--anzhiyu-main);
    opacity: 0.78;
  }

  .work-card:hover,
  .work-card:focus-within {
    transform: translateY(-4px);
    border-color: var(--anzhiyu-main);
    box-shadow: var(--anzhiyu-shadow-main);
  }

  .work-card h2 {
    margin: 0 0 0.5rem;
    color: var(--anzhiyu-fontcolor);
    font-size: 1.18rem;
    line-height: 1.35;
  }

  .work-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin: 0.2rem 0 0.85rem;
  }

  .work-tag {
    display: inline-flex;
    align-items: center;
    min-height: 24px;
    padding: 0.12rem 0.55rem;
    border-radius: 999px;
    background: var(--anzhiyu-secondbg);
    color: var(--anzhiyu-secondtext);
    font-size: 0.78rem;
  }

  .work-card p {
    margin: 0.35rem 0;
    color: var(--anzhiyu-secondtext);
    line-height: 1.65;
  }

  .work-details {
    margin-top: 0.85rem;
    border-top: var(--style-border);
    color: var(--anzhiyu-secondtext);
  }

  .work-details summary {
    min-height: 40px;
    display: flex;
    align-items: center;
    cursor: pointer;
    color: var(--anzhiyu-fontcolor);
    font-weight: 700;
    list-style: none;
  }

  .work-details summary::-webkit-details-marker {
    display: none;
  }

  .work-details summary::after {
    content: "+";
    margin-left: auto;
    color: var(--anzhiyu-main);
    font-size: 1.2rem;
    line-height: 1;
  }

  .work-details[open] summary::after {
    content: "-";
  }

  .work-details ul {
    margin: 0 0 0.2rem;
    padding-left: 1.1rem;
    line-height: 1.65;
  }

  .work-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
    margin-top: auto;
    padding-top: 1rem;
  }

  .work-actions a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 34px;
    padding: 0 0.8rem;
    border-radius: 6px;
    background: var(--anzhiyu-main);
    color: var(--anzhiyu-white);
    font-weight: 700;
    text-decoration: none;
    transition: transform 0.2s ease, opacity 0.2s ease;
  }

  .work-actions a:hover,
  .work-actions a:focus-visible {
    transform: translateY(-2px);
    opacity: 0.9;
  }

  @media (max-width: 640px) {
    .work-hero h1 {
      font-size: 1.55rem;
    }

    .work-card {
      min-height: auto;
    }
  }
</style>

<div class="work-page">
<section class="work-hero">
<h1>学术工作</h1>
<p>
这里集中展示我更希望放在个人主页上的几个公开项目：有课程研究里的模型实验，也有数学文本识别和叙事交互作品。
</p>
</section>

<div class="work-grid">
<article class="work-card">
<h2>DLfinal</h2>
<div class="work-tags">
<span class="work-tag">深度学习</span>
<span class="work-tag">学习率计划</span>
<span class="work-tag">损失曲线</span>
</div>
<p>围绕不同学习率计划下的损失曲线迁移展开实验，关注从余弦计划到其他下降策略时，哪些响应模式具有可迁移性。</p>
<details class="work-details">
<summary>展开亮点</summary>
<ul>
<li>把训练曲线中的结构性残差作为分析对象，而不是只比较最终准确率。</li>
<li>包含脚本、图表和展示材料，适合继续整理成课程项目或研究笔记。</li>
</ul>
</details>
<div class="work-actions">
<a href="https://github.com/wjjpku/DL-final" target="_blank" rel="noopener">查看代码</a>
</div>
</article>

<article class="work-card">
<h2>MLfinal</h2>
<div class="work-tags">
<span class="work-tag">机器学习</span>
<span class="work-tag">数学结构</span>
<span class="work-tag">泛化现象</span>
</div>
<p>在二元运算表数据上训练小型模型，观察模型如何从训练样本中学习模运算、群运算等隐藏结构。</p>
<details class="work-details">
<summary>展开亮点</summary>
<ul>
<li>实验重点放在长时间训练后的泛化变化，尤其是先过拟合、再突然泛化的现象。</li>
<li>适合作为理解“模型记忆”和“结构学习”差异的可复现实验。</li>
</ul>
</details>
<div class="work-actions">
<a href="https://github.com/wjjpku/ML-final" target="_blank" rel="noopener">查看代码</a>
</div>
</article>

<article class="work-card">
<h2>Modelmid</h2>
<div class="work-tags">
<span class="work-tag">数学文本</span>
<span class="work-tag">来源识别</span>
<span class="work-tag">分类实验</span>
</div>
<p>一个面向数学推导文本的来源识别项目，尝试区分人类写作与不同大模型生成文本之间的风格差异。</p>
<details class="work-details">
<summary>展开亮点</summary>
<ul>
<li>结合词频、公式排版、逻辑连接和文本结构等特征做分类。</li>
<li>包含跨题库、跨学科、跨语言以及规避检测场景下的实验设计。</li>
</ul>
</details>
<div class="work-actions">
<a href="https://github.com/wjjpku/Modelmid" target="_blank" rel="noopener">查看代码</a>
</div>
</article>

<article class="work-card">
<h2>鸭腿叔叔</h2>
<div class="work-tags">
<span class="work-tag">网页游戏</span>
<span class="work-tag">聊天界面</span>
<span class="work-tag">交互叙事</span>
</div>
<p>一个微信聊天框形式的虚构经营小游戏。玩家在群聊、供应商、家人、舆论和监管之间做选择，推进故事走向。</p>
<details class="work-details">
<summary>展开亮点</summary>
<ul>
<li>把经营决策、校园语境和聊天界面揉在一起，形成轻量但有代入感的叙事体验。</li>
<li>纯静态网页即可运行，适合继续扩展成多结局互动作品。</li>
</ul>
</details>
<div class="work-actions">
<a href="https://github.com/wjjpku/UncleDucky" target="_blank" rel="noopener">查看代码</a>
</div>
</article>
</div>

</div>
