---
title: 生活照片
date: 2025-06-29 00:00:00
layout: page
---

<style>
.photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}
.photo-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  text-align: center;
  padding: 1rem;
}
.photo-card img {
  max-width: 100%;
  border-radius: 1rem;
  margin-bottom: 0.5rem;
}
</style>

<div class="photo-grid">
  <div class="photo-card">
    <img src="/img/photo1.jpg" alt="阳光午后">
    <p>阳光洒进窗台的一刻，温暖而安静。</p>
  </div>
  <div class="photo-card">
    <img src="/img/photo2.jpg" alt="登山旅途">
    <p>登顶时的风很大，但心里很平静。</p>
  </div>
  <div class="photo-card">
    <img src="/img/photo3.jpg" alt="海边傍晚">
    <p>在海边吹风，看晚霞一点点沉下去。</p>
  </div>
</div>
