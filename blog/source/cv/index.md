---
title: Academic CV
date: 2026-06-29 19:20:00
updated: 2026-07-01 01:50:00
layout: page
description: Academic CV and project profile for Justin Wu.
comments: false
aside: false
---

<section class="profile-hero cv-hero">
  <div class="profile-kicker">Academic CV</div>
  <h1>Jiaju Wu <span class="cv-name-note">Justin Wu</span></h1>
  <p class="profile-lede">A Peking University mathematics student building a project record through coursework, challenge work, assistantship design, and independent systems. I am trying to make each project technically precise, reproducible, and readable as a story of intellectual growth.</p>
  <div class="profile-actions">
    <a class="cv-action cv-action-primary" href="/projects/"><i class="anzhiyufont anzhiyu-icon-book-open" aria-hidden="true"></i><span>Project Studio</span></a>
    <a class="cv-action" href="/about/"><i class="anzhiyufont anzhiyu-icon-paper-plane" aria-hidden="true"></i><span>About</span></a>
    <a class="cv-action" href="https://github.com/wjjpku" target="_blank" rel="noopener"><i class="anzhiyufont anzhiyu-icon-github" aria-hidden="true"></i><span>GitHub</span></a>
  </div>
</section>

<section class="cv-grid">
<div class="cv-main">
<h2>Profile</h2>
<p>I work near the boundary between mathematical structure and modern learning systems: how models generalize, how training dynamics can be read, and how reasoning traces can be attributed or interpreted. My current record is coursework- and project-shaped rather than publication-shaped, but it already has the ingredients I want to keep: clean questions, reproducible baselines, diagnostic experiments, and a habit of explaining why a result matters.</p>

<h2>Education</h2>
<div class="cv-entry">
<div>
<h3>Peking University</h3>
<p>School of Mathematical Sciences</p>
</div>
<span>Sep 2024 - Present</span>
</div>
<p class="cv-muted">GPA 3.79 / 4.00. Recent semester GPAs: 3.803, 3.810, 3.763. Core coursework includes Mathematical Analysis I-III, Geometry, Advanced Algebra I-II, Probability Theory, Mathematical Statistics, Data Structures and Algorithms, Introduction to Mathematical Machine Learning, Ordinary Differential Equations, Deep Learning Theory, Multi-Agent Foundations, and Applied Stochastic Processes.</p>

<div class="cv-entry">
<div>
<h3>Weifang Beichen High School</h3>
<p>Early admission to the PKU Mathematics Talent Program</p>
</div>
<span>Sep 2022 - Aug 2024</span>
</div>

<h2>Honors</h2>
<div class="fact-grid">
<span>Lingjun Linghang University Scholarship, 2025</span>
<span>National College Student Mathematics Competition, First Prize, 2025</span>
<span>China Undergraduate Mathematical Contest in Modeling, Second Prize, 2025</span>
<span>Chinese Mathematical Olympiad, Gold Medal, 2023</span>
<span>Southeast Mathematical Olympiad, Gold Medal, 2023</span>
<span>Chinese High School Mathematics League, First Prize, 2022 and 2023</span>
</div>

<h2>Research Interests</h2>
<div class="interest-list">
<span>Learning Dynamics and Scaling</span>
<span>Model Interpretability and Mathematical Reasoning</span>
<span>Algorithmic Generalization</span>
<span>Math Text Attribution</span>
<span>Quantitative Sequence Modeling</span>
<span>Agent Systems and RAG</span>
</div>

<h2>Selected Coursework and Projects</h2>
<article class="cv-project">
<div class="cv-project-head">
<h3>Learning Dynamics and Schedule Transfer</h3>
<a href="/projects/dl-final/">Project Notes</a>
</div>
<p>Final project for Mathematical Introduction to Machine Learning. Projected LR-Drop Residuals studies whether a source cosine loss curve can identify a schedule-response residual that transfers to WSD-family curves without fitting target WSD losses.</p>
<ul>
<li>Treated MPL as a frozen baseline and framed the remaining error as an identification problem rather than a generic residual-copying problem.</li>
<li>Projected out local MPL-LD tangent nuisance directions before estimating a single source-only response amplitude.</li>
<li>Used schedule-derived response and locality features to keep target losses outside the deployable prediction pipeline.</li>
</ul>
</article>

<article class="cv-project">
<div class="cv-project-head">
<h3>Causal Transformer for High-Frequency Return Prediction</h3>
<a href="/projects/quant-transformer/">Project Notes</a>
</div>
<p>Lingjun Quant Challenge project. Built a causal Transformer for A-share high-frequency microstructure data with 500 stocks, 239 intraday minutes, and 384 features, predicting ten-minute-ahead returns with strict time-split validation and leakage-aware preprocessing.</p>
<ul>
<li>Modeled single-stock single-day minute sequences as tokens with causal masks, intraday time embeddings, and stock identity embeddings.</li>
<li>Implemented fixed train-date normalization and compared causal test-time update / intraday blended variants.</li>
<li>Built checkpoint, prediction, residual, time-profile, and parameter diagnostics to understand where the sequence model was actually learning and where it was only fitting noise.</li>
</ul>
</article>

<article class="cv-project">
<div class="cv-project-head">
<h3>LLM Math Text Detection and Attribution</h3>
<a href="/projects/modelmid/">Project Notes</a>
</div>
<p>Midterm project for Mathematical Modeling. Built a source-attribution system for mathematical solutions from humans and major LLMs including DeepSeek, GLM, Kimi, and Qwen, combining feature-based baselines with neural text classification.</p>
<ul>
<li>Designed zero-shot cross-language transfer experiments and observed feature collapse in traditional statistical features.</li>
<li>Built an automated data collection, feature engineering, training, and confusion-matrix evaluation pipeline.</li>
<li>Used attribution as a small-scale probe for how mathematical language, model family, and dataset construction shape apparent reasoning signals.</li>
</ul>
</article>

<article class="cv-project">
<div class="cv-project-head">
<h3>MultiagentFinal: Intent-Grounded Cooperative Sokoban</h3>
<a href="/projects/multiagent-final/">Project Notes</a>
</div>
<p>Final project for Multi-Agent Foundations. Built StrictCoop-Sokoban and studied intent-grounded recurrent communication for partially observable cooperative multi-agent reinforcement learning.</p>
<ul>
<li>Removed action aliasing in cooperative Sokoban by enforcing strict push semantics, planner-verified level pools, local observations, and a disjoint hard evaluation split.</li>
<li>Designed IGRC-MAPPO with low-dimensional broadcast intent messages, future-box auxiliary grounding, and DRC-style ConvLSTM memory under centralized training and decentralized execution.</li>
<li>Improved hard-v2 performance from MAPPO's 0.763 ± 0.012 pass@8 to 0.949 ± 0.015 pass@8 across three seeds, with ablations separating communication, grounding, memory, capacity, and masks.</li>
</ul>
</article>

<article class="cv-project">
<div class="cv-project-head">
<h3>Algorithmic Generalization and Grokking</h3>
<a href="/projects/ml-final/">Project Notes</a>
</div>
<p>Final project for Selected Topics in Deep Learning Theory. Built a reproducible PyTorch harness for grokking on small algorithmic datasets, covering modular arithmetic, polynomial modular operations, S5 group tasks, and K-ary modular summation with Transformer, MLP, LSTM, and GRU comparisons.</p>
</article>

<article class="cv-project">
<div class="cv-project-head">
<h3>Tuvalon: Avalon Agent Battle Platform</h3>
<a href="/projects/tuvalon/">Project Notes</a>
</div>
<p>Teaching-assistant project design for Data Structures and Algorithms B. Developed and maintained a Flask-based Avalon agent battle platform where submitted Python agents compete under partial observability, communication constraints, referee-controlled game phases, automatic matching, ELO ranking, and replay-oriented logs.</p>
</article>

<h2>Teaching and Leadership</h2>
<article class="cv-project">
<div class="cv-project-head">
<h3>Teaching Assistant, Python and AI Foundations</h3>
<span>Summer 2025</span>
</div>
<p>Supported a course of more than 200 undergraduates building Avalon game bots, maintained the Tuvalon platform, and held help sessions for programming assignments and course projects.</p>
</article>
<article class="cv-project">
<div class="cv-project-head">
<h3>Head of Academic Department, Student Union, School of Mathematical Sciences</h3>
<span>Mar 2025 - Mar 2026</span>
</div>
<p>Led a 20-person team, organized academic talks and mock exams, and launched the department website <a href="https://pkusms.com" target="_blank" rel="noopener">pkusms.com</a>.</p>
</article>
</div>

<aside class="cv-side">
<div class="cv-panel cv-photo">
<img src="/photos/profile/academic-presentation.webp" alt="Jiaju Wu presenting in a classroom">
<p class="cv-photo-caption">Presenting a project in a classroom setting.</p>
</div>
<div class="cv-panel cv-metric">
<strong>3.79 / 4.00</strong>
<span>PKU GPA</span>
</div>
<div class="cv-panel cv-metric">
<strong>CMO Gold</strong>
<span>Mathematical Olympiad background</span>
</div>
<div class="cv-panel cv-metric">
<strong>Interpretability</strong>
<span>Current research center of gravity</span>
</div>
<div class="cv-panel">
<h2>Project Identity</h2>
<p>Mathematics-first machine learning practice, with an eye for experiments that can be explained without flattening their uncertainty.</p>
</div>
<div class="cv-panel">
<h2>Technical Stack</h2>
<p>Python, PyTorch, scikit-learn, pandas, NumPy, DistilBERT, RAG systems, Flask, SQLAlchemy, JavaScript, HTML/CSS, LaTeX, Git.</p>
</div>
<div class="cv-panel">
<h2>Public Links</h2>
<p><a href="/projects/">Project page</a></p>
<p><a href="/projects/llm-interpretability/">Interpretability direction</a></p>
<p><a href="https://github.com/wjjpku" target="_blank" rel="noopener">github.com/wjjpku</a></p>
<p><a href="https://pkusms.com" target="_blank" rel="noopener">pkusms.com</a></p>
</div>
</aside>
</section>
