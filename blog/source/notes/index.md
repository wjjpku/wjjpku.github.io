---
title: 笔记
date: 2025-06-30 00:38:49
layout: page
---

<style>
  /* 页面背景渐变，深色调 */
  body {
    background: linear-gradient(135deg, #1e293b, #0f172a);
    min-height: 100vh;
    margin: 0;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    color: #e0e7ff;
  }

  .notes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    gap: 1.8rem;
    margin: 2rem auto 4rem;
    max-width: 1100px;
    padding: 0 1rem;
  }

  .note-card {
    background: rgba(30, 41, 59, 0.85);
    border-radius: 1.2rem;
    padding: 1.8rem 2rem;
    box-shadow:
      0 8px 15px rgba(0, 0, 0, 0.5),
      inset 0 0 8px rgba(255, 255, 255, 0.05);
    backdrop-filter: saturate(180%) blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.12);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .note-card:hover {
    transform: translateY(-6px);
    box-shadow:
      0 15px 30px rgba(0, 0, 0, 0.6),
      inset 0 0 15px rgba(255, 255, 255, 0.1);
  }

  .note-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.8rem;
    text-shadow: 0 1px 6px rgba(59, 130, 246, 0.8);
    color: #bfdbfe;
  }

  .note-desc {
    font-size: 1rem;
    line-height: 1.4;
    margin-bottom: 1.5rem;
    color: #cbd5e1;
  }

  .note-actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .note-actions button,
  .note-actions a {
    background-color: #2563eb;
    color: #f0f9ff;
    padding: 0.6rem 1.3rem;
    border-radius: 0.75rem;
    font-size: 1rem;
    font-weight: 600;
    border: none;
    cursor: pointer;
    text-align: center;
    min-width: 140px;
    flex: 1 1 auto;
    box-sizing: border-box;
    transition: background-color 0.25s ease, transform 0.15s ease;
    user-select: none;
  }

  .note-actions button:hover,
  .note-actions a:hover {
    background-color: #1e40af;
    transform: scale(1.05);
  }

  .note-actions a[download] {
    background-color: #1e3a8a;
  }

  /* 兼容移动端 */
  @media (max-width: 480px) {
    .notes-grid {
      grid-template-columns: 1fr;
      margin: 1.5rem 1rem 3rem;
    }
    .note-actions button,
    .note-actions a {
      min-width: auto;
      flex: 1 1 100%;
    }
  }
</style>

<script>
  function openPdfPreview(pdfPath) {
    window.open(
      pdfPath,
      "_blank",
      "width=900,height=650,scrollbars=yes,resizable=yes"
    );
  }
</script>

<div class="notes-grid">
  <div class="note-card">
    <div class="note-title">数学分析2</div>
    <div class="note-desc">大一下选修李伟固老师的数分2，包含认真听课和临时突击的混合笔记</div>
    <div class="note-actions">
      <button onclick="openPdfPreview('/pdfs/sxfx2.pdf')">查看文件</button>
    </div>
  </div>

  <div class="note-card">
    <div class="note-title">高等代数2</div>
    <div class="note-desc">大一下选修李文威老师的高代2，主要依靠看讲义自学，故笔记多为一家之言</div>
    <div class="note-actions">
      <button onclick="openPdfPreview('/pdfs/gdds2.pdf')">课程笔记</button>
      <button onclick="openPdfPreview('/pdfs/gdds2b.pdf')">课程讲义</button>
    </div>
  </div>

  <div class="note-card">
    <div class="note-title">抽象代数</div>
    <div class="note-desc">大一上选修徐茂智老师的抽代，之前自学过多次，笔记着重整理了自己认为较为困难的内容，带有个人的理解，主笔记还有部分作业</div>
    <div class="note-actions">
      <button onclick="openPdfPreview('/pdfs/cxds_main.pdf')">主笔记</button>
      <button onclick="openPdfPreview('/pdfs/cxds_sylow.pdf')">Sylow定理</button>
      <button onclick="openPdfPreview('/pdfs/cxds+_group.pdf')">群的结构</button>
      <button onclick="openPdfPreview('/pdfs/cxds_ideal.pdf')">极大理想与素理想</button>
    </div>
  </div>

  <div class="note-card">
    <div class="note-title">数学分析3</div>
    <div class="note-desc">竞赛时的自学笔记，为了加深记忆和理解进行的抄书</div>
    <div class="note-actions">
      <button onclick="openPdfPreview('/pdfs/sxfx3a.pdf')">多元函数微分</button>
      <button onclick="openPdfPreview('/pdfs/sxfx3b.pdf')">含参变元积分</button>
      <button onclick="openPdfPreview('/pdfs/sxfx3c.pdf')">曲线曲面积分</button>
    </div>
  </div>
</div>
