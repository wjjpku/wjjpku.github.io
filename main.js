// ------------------ 配置区：可根据实际情况修改 ------------------
// 笔记列表，file为PDF路径，title为显示名
const notes = [
    {
        title: "数学分析(II)",
        file: "pdfs/sxfx.pdf",
        desc: "大一下选修，前期定积分的笔记较为认真，后期多为应试和做题中总结的重点",
        feeling: "李伟固",
        time: "2025年春"
    },
    {
        title: "抽象代数",
        file: "pdfs/cxds.pdf",
        desc: "大一上选修，群论略去了部分作者熟悉的内容，保留了一些作业内容。在幂零群和域扩张上最后总结了很多xmz老师常考点",
        feeling: "徐茂智",
        time: "2024年秋"
    }
    // 可继续添加
];
// ------------------ 交互逻辑 ------------------

// 顶部导航栏切换
const navs = [
    { btn: document.getElementById('nav-author'), card: document.getElementById('author-card') },
    { btn: document.getElementById('nav-notes'), card: document.getElementById('notes-card') },
    { btn: document.getElementById('nav-projects'), card: document.getElementById('projects-card') },
    { btn: document.getElementById('nav-jobs'), card: document.getElementById('jobs-card') }

];
navs.forEach((nav, idx) => {
    nav.btn.onclick = function(e) {
        e.preventDefault();
        navs.forEach((n, i) => {
            n.card.classList.toggle('active', i === idx);
            n.btn.classList.toggle('active', i === idx);
        });
        // 欢迎语只在首页显示
        document.getElementById('welcome').style.display = idx === 0 ? 'block' : 'none';
    }
});

// 动态渲染笔记列表
const noteList = document.getElementById('note-list');
notes.forEach((note, idx) => {
    const div = document.createElement('div');
    div.className = 'note-block';
    div.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.desc}</p>
        <p style="color:#888;font-size:0.98em;">Professor：${note.feeling}</p>
        <div class="note-actions">
            <a href="#" data-idx="${idx}" class="preview-link">预览</a>
            <a href="${note.file}" download>下载</a>
        </div>
        <span class="note-time">${note.time || ''}</span>
    `;
    noteList.appendChild(div);
});

// PDF 预览弹窗逻辑
const modal = document.getElementById('pdf-modal');
const pdfEmbed = document.getElementById('pdf-embed');
document.querySelectorAll('.preview-link').forEach(link => {
    link.onclick = function(e) {
        e.preventDefault();
        const idx = this.getAttribute('data-idx');
        pdfEmbed.src = notes[idx].file;
        modal.classList.add('active');
    }
});
document.getElementById('close-modal').onclick = function() {
    modal.classList.remove('active');
    pdfEmbed.src = '';
};
// 点击遮罩关闭
modal.onclick = function(e) {
    if(e.target === modal) {
        modal.classList.remove('active');
        pdfEmbed.src = '';
    }
};

// 工作活动数据
const jobActivities = [
    {
        title: "学术PIZZA沙龙",
        desc: "邀请各个方向的知名教授与学生进行深入交流，旨在增进本科生对该学科前沿的理解，创造教授与优秀本科生接触的机会。",
        images: ["assets/jobs/pizza1.jpg", "assets/jobs/pizza2.jpg", "assets/jobs/pizza3.jpg"],
        link: "https://mp.weixin.qq.com/s/iOXUw8gkEC_21nQI1v9mNw"
    },
    {
        title: "分系讲座&手册",
        desc: "邀请学长学姐分享分系心得，编撰分系手册并举办讲座，旨在帮助同学们明晰分系的方向。",
        images: ["assets/jobs/fx1.png", "assets/jobs/fx2.png", "assets/jobs/fx3.png", "assets/jobs/fx4.png"],
        link: "https://mp.weixin.qq.com/s/9Hzq6mEnws0g_nM5ga_dyA"
    },
    {
        title: "数学一小时",
        desc: "邀请著名教授讲授一小时左右的前沿内容，旨在帮助有志于学术的同学们增长见识，拓宽视野。",
        images: ["assets/jobs/sx1.JPG", "assets/jobs/sx2.JPG", "assets/jobs/sx3.jpg"],
        link: "https://mp.weixin.qq.com/s/knU5n7UCmgGGTyo3CiXoaA"
    }
    // 可继续添加更多活动
];

const jobActivitiesDiv = document.getElementById('job-activities');
if (jobActivitiesDiv) {
    jobActivities.forEach((activity, idx) => {
        const block = document.createElement('div');
        block.className = 'job-activity-block';
        block.innerHTML = `
            <h3 class="job-activity-title">${activity.title}</h3>
            <p class="job-activity-desc">${activity.desc}</p>
            <div style="margin-bottom:8px;">
                <a href="${activity.link}" target="_blank" class="project-link">查看推送</a>
            </div>
            <div class="job-carousel" id="carousel-${idx}">
                <button class="carousel-btn" id="prev-${idx}">&#8592;</button>
                <div class="job-carousel-img-wrapper" id="img-wrapper-${idx}"></div>
                <button class="carousel-btn" id="next-${idx}">&#8594;</button>
            </div>
        `;
        jobActivitiesDiv.appendChild(block);

        // 轮播逻辑
        let current = 0;
        const imgWrapper = block.querySelector(`#img-wrapper-${idx}`);
        const prevBtn = block.querySelector(`#prev-${idx}`);
        const nextBtn = block.querySelector(`#next-${idx}`);
        function renderImages() {
            const total = activity.images.length;
            const prevIdx = (current - 1 + total) % total;
            const nextIdx = (current + 1) % total;
        
            imgWrapper.innerHTML = '';
        
            // 左侧
            const imgLeft = document.createElement('img');
            imgLeft.src = activity.images[prevIdx];
            imgLeft.className = 'job-carousel-img left';
            imgLeft.style.pointerEvents = 'none';
            imgWrapper.appendChild(imgLeft);
        
            // 中间
            const imgCenter = document.createElement('img');
            imgCenter.src = activity.images[current];
            imgCenter.className = 'job-carousel-img center';
            imgCenter.onclick = () => {
                window.open(activity.images[current], '_blank');
            };
            imgWrapper.appendChild(imgCenter);
        
            // 右侧
            const imgRight = document.createElement('img');
            imgRight.src = activity.images[nextIdx];
            imgRight.className = 'job-carousel-img right';
            imgRight.style.pointerEvents = 'none';
            imgWrapper.appendChild(imgRight);
        }
        /* 按钮事件控制 */
        prevBtn.onclick = () => {
            current = (current - 1 + activity.images.length) % activity.images.length;
            renderImages(-1);
        };
        nextBtn.onclick = () => {
            current = (current + 1) % activity.images.length;
            renderImages(1);
        };
        renderImages();
    });
}