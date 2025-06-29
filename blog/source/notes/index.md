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
    <div class="note-title">线性代数笔记</div>
    <div class="note-desc">包含矩阵、特征值、空间变换等内容</div>
    <div class="note-actions">
      <button onclick="openPdfPreview('/pdfs/暑校.pdf')">在线预览</button>
      <a href="/pdfs/暑校.pdf" download>下载 PDF</a>
    </div>
  </div>

  <div class="note-card">
    <div class="note-title">傅里叶分析笔记</div>
    <div class="note-desc">周期函数展开、频域理解、应用基础</div>
    <div class="note-actions">
      <button onclick="openPdfPreview('/pdfs/fourier.pdf')">在线预览</button>
      <a href="/pdfs/fourier.pdf" download>下载 PDF</a>
    </div>
  </div>

  <div class="note-card">
    <div class="note-title">Python 编程笔记</div>
    <div class="note-desc">语法入门、面向对象、常用模块</div>
    <div class="note-actions">
      <button onclick="openPdfPreview('/pdfs/python.pdf')">在线预览</button>
      <a href="/pdfs/python.pdf" download>下载 PDF</a>
    </div>
  </div>
</div>
