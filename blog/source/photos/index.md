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
  const photos = [
    { src: '/photos/scmy.jpg', alt: '雨后清晨', title: '四川绵阳思政实践，雨后清晨', date: '2025-06-24' },
    { src: '/photos/wh.jpg', alt: 'wh', title: '偶遇王虹教授，膜拜', date: '2025-06-17' },
    { src: '/photos/pt.jpg', alt: '拼图', title: '数院周边：可以挂起来的漂亮的拼图', date: '2025-05-20' },
    { src: '/photos/sywx.jpg', alt: '晚霞', title: '智华楼与晚霞', date: '2025-04-01' },
    { src: '/photos/pizza.jpg', alt: 'pizza', title: '学术组的 pizza 沙龙活动，出现了 pizza 龙', date: '2025-05-13' },
    { src: '/photos/wzdj.jpg', alt: 'wzdj', title: '第一次拿顶级发育路！', date: '2025-06-03' },
    { src: '/photos/trump.jpg', alt: 'trump', title: '啊我被“刺杀”了，子弹掠过我的耳旁', date: '2025-04-22' },
    { src: '/photos/thut.jpg', alt: '清华游', title: '为了拿免费的 komo 蛋糕……清华半日游', date: '2025-04-06' },
    { src: '/photos/walledworld.jpg', alt: 'ww', title: 'Walled World 摄于北大南门南侧的天桥', date: '2025-03-25' },
    { src: '/photos/xian.jpg', alt: '鼓楼', title: '西安鼓楼一角', date: '2025-02-02' }
  ];

  // 时间倒序排序（越新越前）
  photos.sort((a, b) => new Date(b.date) - new Date(a.date));

  const leftCol = document.getElementById('left-column');
  const rightCol = document.getElementById('right-column');

  photos.forEach((photo, index) => {
    const box = document.createElement('div');
    box.className = 'photo-box';
    box.innerHTML = `
      <a data-fancybox="gallery" href="${photo.src}">
        <img src="${photo.src}" alt="${photo.alt}">
      </a>
      <div class="photo-caption">${photo.title}</div>
      <div class="photo-date">${photo.date}</div>
    `;

    // 奇数放左栏，偶数放右栏
    if (index % 2 === 0) {
      leftCol.appendChild(box);
    } else {
      rightCol.appendChild(box);
    }
  });
</script>
