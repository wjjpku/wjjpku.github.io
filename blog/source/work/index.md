---
title: 学生会工作介绍
date: 2025-06-29 22:00:00
layout: page
---

<style>
  .activity-card {
    max-width: 720px;
    margin: 1.5rem auto;
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
    margin-bottom: 1rem;
    font-weight: 700;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .activity-card h2::before {
    content: "";
    font-size: 1.4rem;
  }
  .image-wrapper {
    position: relative;
    width: 100%;
    max-width: 720px;
    height: 360px;
    margin-bottom: 1rem;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
  }
  .image-wrapper img {
    width: 100%;
    height: 360px;
    object-fit: cover;
    display: block;
    user-select: none;
    transition: transform 0.3s ease;
  }
  .image-wrapper:hover img {
    transform: scale(1.05);
  }
  .overlay-text {
    position: absolute;
    top: 0; left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.4);
    color: #fff;
    font-size: 1.6rem;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: 10px;
  }
  .image-wrapper:hover .overlay-text {
    opacity: 1;
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
  .divider {
    width: 60%;
    height: 1px;
    border-bottom: 1px dashed var(--text-light);
    margin: 2rem auto;
    opacity: 0.3;
  }
</style>

<!-- 卡片HTML结构 -->
<div class="activity-card">
  <p>现任北京大学数学科学学院学生会学术文化部负责人，主要负责组织策划各类学术活动。</p>
</div>

<div class="divider"></div>

<div class="activity-card" data-images='["./leaders1.jpg","./leaders2.jpg"]'>
  <h2>部门负责人与骨干合影</h2>
  <div class="image-wrapper" onclick="nextImage(this)">
    <img src="./leaders1.jpg" alt="学术PIZZA沙龙">
    <div class="overlay-text">点击查看下一张</div>
  </div>
  <p>欢迎25届同学的加入~</p>
</div>

<div class="divider"></div>

<div class="activity-card" data-images='["./pizza1.jpg","./pizza2.jpg","./pizza3.jpg"]'>
  <h2>学术PIZZA沙龙</h2>
  <div class="image-wrapper" onclick="nextImage(this)">
    <img src="./pizza1.jpg" alt="学术PIZZA沙龙">
    <div class="overlay-text">点击查看下一张</div>
  </div>
  <p>邀请各个方向的知名教授与学生进行深入交流，旨在增进本科生对该学科前沿的理解，创造教授与优秀本科生接触的机会。</p>
  <p><a href="https://mp.weixin.qq.com/s/iOXUw8gkEC_21nQI1v9mNw" target="_blank">微信公众号链接</a></p>
</div>

<div class="divider"></div>

<div class="activity-card" data-images='["./fx1.png","./fx2.png","./fx3.png","./fx4.png"]'>
  <h2>分系讲座 & 手册</h2>
  <div class="image-wrapper" onclick="nextImage(this)">
    <img src="./fx1.png" alt="分系讲座 & 手册">
    <div class="overlay-text">点击查看下一张</div>
  </div>
  <p>邀请学长学姐分享分系心得，编撰分系手册并举办讲座，旨在帮助同学们明晰分系的方向。</p>
  <p><a href="https://mp.weixin.qq.com/s/9Hzq6mEnws0g_nM5ga_dyA" target="_blank">微信公众号链接</a></p>
</div>

<div class="divider"></div>

<div class="activity-card" data-images='["./sx1.JPG","./sx2.JPG","./sx3.jpg"]'>
  <h2>数学一小时</h2>
  <div class="image-wrapper" onclick="nextImage(this)">
    <img src="./sx1.JPG" alt="数学一小时">
    <div class="overlay-text">点击查看下一张</div>
  </div>
  <p>邀请著名教授讲授一小时左右的前沿内容，旨在帮助有志于学术的同学们增长见识，拓宽视野。</p>
  <p><a href="https://mp.weixin.qq.com/s/knU5n7UCmgGGTyo3CiXoaA" target="_blank">微信公众号链接</a></p>
</div>

<div class="divider"></div>

<div class="activity-card">
  <p><strong>备注：</strong> 除以上活动外，学术组还举办了 <strong>双学位讲座、四推模拟面试、模拟期中考试、赴饭空间</strong> 等活动。也欢迎其他同学加入 <strong>学术文化部学术组！</strong></p>
</div>

<script>
  // 存储每个图片容器当前显示的索引
  const currentIndexMap = new WeakMap();

  function nextImage(wrapper) {
    const card = wrapper.closest('.activity-card');
    if (!card) return;

    // 获取图片数组
    const images = JSON.parse(card.getAttribute('data-images') || '[]');
    if (!images.length) return;

    // 当前索引，默认0
    let currentIndex = currentIndexMap.get(wrapper) ?? 0;

    // 下一张索引
    currentIndex = (currentIndex + 1) % images.length;

    // 更新图片src
    const img = wrapper.querySelector('img');
    if (img) {
      img.src = images[currentIndex];
      img.alt = card.querySelector('h2')?.textContent + ' ' + (currentIndex + 1);
    }

    // 保存当前索引
    currentIndexMap.set(wrapper, currentIndex);
  }
</script>
