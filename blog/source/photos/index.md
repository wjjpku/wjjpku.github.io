---
title: 生活照片
date: 2025-06-29 00:00:00
layout: page
---

<!-- Fancybox 样式 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.css" />
<script src="https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.umd.js"></script>

<style>
  body {
    background: #0f172a;
    color: #e2e8f0;
    font-family: "Helvetica Neue", sans-serif;
    margin: 0;
    padding: 0;
  }

  .photo-masonry {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 1rem;
  }

  .photo-column {
    flex: 1 1 0;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .photo-box {
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.35);
    background: #1e293b;
    transition: transform 0.3s ease;
    display: flex;
    flex-direction: column;
  }

  .photo-box:hover {
    transform: scale(1.015);
  }

  .photo-box a {
    display: block;
  }

  .photo-box img {
    width: 100%;
    height: auto;
    display: block;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    cursor: zoom-in;
  }

  .photo-caption {
    padding: 0.6rem 1rem 0.2rem 1rem;
    font-size: 0.95rem;
    color: #94a3b8;
  }

  .photo-date {
    padding: 0 1rem 0.8rem 1rem;
    font-size: 0.85rem;
    color: #64748b;
    font-style: italic;
  }

  @media (max-width: 768px) {
    .photo-masonry {
      flex-direction: column;
      padding: 0 1rem;
    }

    .photo-column {
      max-width: 100%;
      gap: 1rem;
    }
  }
</style>

<div class="photo-masonry">
  <div class="photo-column" id="left-column"></div>
  <div class="photo-column" id="right-column"></div>
</div>

<script>
  const leftCol = document.getElementById('left-column');
  const rightCol = document.getElementById('right-column');

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, char => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[char]));
  }

  function renderPhotos(photos) {
    leftCol.innerHTML = '';
    rightCol.innerHTML = '';
    photos
      .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
      .forEach((photo, index) => {
        const box = document.createElement('div');
        box.className = 'photo-box';
        const title = photo.title ? `<div class="photo-caption">${escapeHtml(photo.title)}</div>` : '';
        const date = photo.date ? `<div class="photo-date">${escapeHtml(photo.date)}</div>` : '';
        box.innerHTML = `
          <a data-fancybox="gallery" href="${escapeHtml(photo.src)}">
            <img src="${escapeHtml(photo.src)}" alt="${escapeHtml(photo.alt || photo.title || '生活照片')}">
          </a>
          ${title}
          ${date}
        `;
        (index % 2 === 0 ? leftCol : rightCol).appendChild(box);
      });
  }

  fetch('/photos/photos.json', { cache: 'no-store' })
    .then(response => response.json())
    .then(renderPhotos)
    .catch(error => {
      leftCol.innerHTML = '<div class="photo-caption">照片数据暂时无法加载。</div>';
      console.error(error);
    });
</script>
