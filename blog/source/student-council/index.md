---
title: 学生会工作介绍
date: 2025-06-29 22:00:00
---

<style>
.activity-card {
  max-width: 720px;
  margin: 2.5rem auto;
  border: 1px solid var(--card-border);
  border-radius: 16px;
  padding: 1.5rem 2rem;
  background-color: var(--card-bg);
  color: var(--text-color);
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.activity-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.08);
}

.activity-card h2 {
  margin-bottom: 1.2rem;
  font-weight: 700;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.activity-card h2::before {
  content: "🎓";
  font-size: 1.4rem;
}

.carousel {
  position: relative;
  width: 100%;
  height: 360px;
  overflow: hidden;
  border-radius: 10px;
  margin-bottom: 1rem;
}
.carousel img {
  width: 100%;
  height: 360px;
  object-fit: cover;
  display: none;
  border-radius: 10px;
}
.carousel img.active {
  display: block;
}

.carousel-buttons {
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  padding: 0 14px;
  pointer-events: none;
}
.carousel-buttons button {
  background: rgba(0,0,0,0.5);
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  line-height: 36px;
  user-select: none;
  pointer-events: auto;
  transition: background 0.3s;
}
.carousel-buttons button:hover {
  background: rgba(0,0,0,0.75);
}

.activity-card p {
  line-height: 1.6;
  margin: 0.5rem 0;
}

.activity-card a {
  color: var(--link-color);
  text-decoration: none;
  font-weight: 500;
}
.activity-card a:hover {
  text-decoration: underline;
}

/* 分隔线美化 */
.divider {
  width: 60%;
  height: 1px;
  border-bottom: 1px dashed var(--text-light);
  margin: 3rem auto;
  opacity: 0.3;
}
</style>

<!-- 卡片 1 -->
<div class="activity-card">
  <h2>活动一：迎新晚会</h2>
  <div class="carousel" id="carousel1">
    <img src="/img/activity1_1.jpg" class="active" alt="迎新晚会1">
    <img src="/img/activity1_2.jpg" alt="迎新晚会2">
    <img src="/img/activity1_3.jpg" alt="迎新晚会3">
    <div class="carousel-buttons">
      <button onclick="prevSlide('carousel1')">&#10094;</button>
      <button onclick="nextSlide('carousel1')">&#10095;</button>
    </div>
  </div>
  <p>为了迎接新同学，学生会精心策划了本次迎新晚会，包含精彩节目表演、抽奖互动、师生共融等环节，现场气氛热烈。</p>
  <p><a href="https://mp.weixin.qq.com/s/your-link-1" target="_blank">微信公众号：学生会官方</a></p>
</div>

<div class="divider"></div>

<!-- 卡片 2 -->
<div class="activity-card">
  <h2>活动二：志愿服务</h2>
  <div class="carousel" id="carousel2">
    <img src="/img/activity2_1.jpg" class="active" alt="志愿服务1">
    <img src="/img/activity2_2.jpg" alt="志愿服务2">
    <div class="carousel-buttons">
      <button onclick="prevSlide('carousel2')">&#10094;</button>
      <button onclick="nextSlide('carousel2')">&#10095;</button>
    </div>
  </div>
  <p>学生会组织了社区志愿服务活动，参与者在敬老院、街道、社区中心提供服务，传递温暖，体现大学生责任感。</p>
  <p><a href="https://mp.weixin.qq.com/s/your-link-2" target="_blank">微信公众号：志愿服务</a></p>
</div>

<div class="divider"></div>

<!-- 卡片 3 -->
<div class="activity-card">
  <h2>活动三：校园歌手大赛</h2>
  <div class="carousel" id="carousel3">
    <img src="/img/activity3_1.jpg" class="active" alt="校园歌手大赛1">
    <img src="/img/activity3_2.jpg" alt="校园歌手大赛2">
    <img src="/img/activity3_3.jpg" alt="校园歌手大赛3">
    <div class="carousel-buttons">
      <button onclick="prevSlide('carousel3')">&#10094;</button>
      <button onclick="nextSlide('carousel3')">&#10095;</button>
    </div>
  </div>
  <p>通过激烈的角逐，一批优秀校园歌手脱颖而出，舞台灯光与掌声交织，构筑了属于青年人的青春赞歌。</p>
  <p><a href="https://mp.weixin.qq.com/s/your-link-3" target="_blank">微信公众号：文艺活动</a></p>
</div>

<script>
const slideIndices = {};

function showSlide(carouselId, n) {
  const carousel = document.getElementById(carouselId);
  if (!carousel) return;
  const slides = carousel.querySelectorAll('img');
  if (!slideIndices[carouselId]) slideIndices[carouselId] = 0;
  let index = n;
  if (n >= slides.length) index = 0;
  if (n < 0) index = slides.length - 1;
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
  slideIndices[carouselId] = index;
}
function nextSlide(carouselId) {
  showSlide(carouselId, slideIndices[carouselId] + 1);
}
function prevSlide(carouselId) {
  showSlide(carouselId, slideIndices[carouselId] - 1);
}
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.carousel').forEach(carousel => {
    const id = carousel.id;
    slideIndices[id] = 0;
    showSlide(id, 0);
  });
});
</script>
