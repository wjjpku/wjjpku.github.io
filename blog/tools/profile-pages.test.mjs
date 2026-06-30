import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const root = new URL("..", import.meta.url).pathname;

function read(relativePath) {
  return readFileSync(join(root, relativePath), "utf8");
}

function mediaBlock(css, query) {
  const start = css.indexOf(`@media ${query} {`);
  if (start === -1) return "";

  const bodyStart = css.indexOf("{", start);
  let depth = 0;
  for (let index = bodyStart; index < css.length; index += 1) {
    if (css[index] === "{") depth += 1;
    if (css[index] === "}") depth -= 1;
    if (depth === 0) return css.slice(start, index + 1);
  }

  return "";
}

test("academic profile pages are present and wired into navigation", () => {
  const cv = read("source/cv/index.md");
  const about = read("source/about/index.md");
  const aboutData = read("source/_data/about.yml");
  const albumData = read("source/_data/album.yml");
  const creativityData = read("source/_data/creativity.yml");
  const equipmentData = read("source/_data/equipment.yml");
  const profileCss = read("source/css/profile.css");
  const projectsCss = read("source/css/projects.css");
  const academicEntry = read("source/js/academic-entry.js");
  const bilingualSwitch = read("source/js/bilingual.js");
  const aboutPageInteractions = read("source/js/about-page.js");
  const projects = read("source/projects/index.md");
  const travel = read("source/travel/index.md");
  const themeConfig = read("_config.anzhiyu.yml");
  const homeTopBlock = themeConfig.slice(
    themeConfig.indexOf("home_top:"),
    themeConfig.indexOf("  default_descr:", themeConfig.indexOf("home_top:"))
  );
  const aboutTemplate = read("themes/anzhiyu/layout/includes/page/about.pug");
  const albumTemplate = read("themes/anzhiyu/layout/includes/page/album_detail.pug");
  const equipmentTemplate = read("themes/anzhiyu/layout/includes/page/equipment.pug");
  const dlFinal = read("source/projects/dl-final/index.md");
  const mlFinal = read("source/projects/ml-final/index.md");
  const modelmid = read("source/projects/modelmid/index.md");
  const interpretability = read("source/projects/llm-interpretability/index.md");
  const quant = read("source/projects/quant-transformer/index.md");
  const persona = read("source/projects/digital-persona-agent/index.md");
  const tuvalon = read("source/projects/tuvalon/index.md");
  const uncleDucky = read("source/projects/uncle-ducky/index.md");
  const projectDetails = [
    dlFinal,
    mlFinal,
    modelmid,
    interpretability,
    quant,
    persona,
    tuvalon,
    uncleDucky,
  ].join("\n");

  assert.match(themeConfig, /^  Home: \/ \|\| anzhiyu-icon-house-chimney/m);
  assert.match(themeConfig, /^  About: \/about\/ \|\| anzhiyu-icon-paper-plane/m);
  assert.match(themeConfig, /^  Friends: \/link\/ \|\| anzhiyu-icon-link/m);
  assert.doesNotMatch(themeConfig, /^  Research: \/projects\/ \|\| anzhiyu-icon-book-open/m);
  assert.doesNotMatch(themeConfig, /^  CV: \/cv\/ \|\| anzhiyu-icon-file/m);
  assert.doesNotMatch(themeConfig, /^\s*Travel: \/travel\/ \|\| anzhiyu-icon-images/m);
  assert.match(themeConfig, /<script src="\/js\/bilingual\.js"><\/script>/);
  assert.match(themeConfig, /<script src="\/js\/about-page\.js"><\/script>/);
  assert.match(themeConfig, /title: About/);
  assert.match(themeConfig, /subTitle: Justin Wu/);
  assert.match(themeConfig, /text: About/);
  assert.match(themeConfig, /link: \/about\//);
  assert.match(homeTopBlock, /name: Projects[\s\S]*path: \/projects\//);
  assert.match(homeTopBlock, /name: Life[\s\S]*path: \/travel\//);
  assert.match(homeTopBlock, /name: CV[\s\S]*path: \/cv\//);
  assert.match(homeTopBlock, /name: CV[\s\S]*class: red/);
  assert.doesNotMatch(homeTopBlock, /name: CV[\s\S]*class: paper/);
  assert.match(homeTopBlock, /name: Projects[\s\S]*name: Life[\s\S]*name: CV/);
  assert.doesNotMatch(homeTopBlock, /name: Travel|name: Friends|name: Notes|path: \/notes\/|name: Work|path: \/work\/|path: \/photos\//);

  assert.match(cv, /Academic CV/);
  assert.match(cv, /Project Studio/);
  assert.match(cv, /cv-action cv-action-primary/);
  assert.match(cv, /anzhiyu-icon-book-open/);
  assert.match(cv, /anzhiyu-icon-paper-plane/);
  assert.match(cv, /anzhiyu-icon-github/);
  assert.match(cv, /Research Interests/);
  assert.match(cv, /Selected Coursework and Projects/);
  assert.match(cv, /GPA 3\.79 \/ 4\.00/);
  assert.match(cv, /Chinese Mathematical Olympiad, Gold Medal, 2023/);
  assert.doesNotMatch(cv, /30\.88%|98\.1%|R2 reached 0\.038/);
  assert.match(cv, /Causal Transformer for High-Frequency Return Prediction/);
  assert.match(cv, /Digital Persona Agent System/);
  assert.match(cv, /Tuvalon: Avalon Agent Battle Platform/);
  assert.match(cv, /Learning Dynamics and Scaling/);
  assert.match(cv, /Model Interpretability and Mathematical Reasoning/);
  assert.match(cv, /\/projects\/dl-final\//);
  assert.match(cv, /\/projects\/llm-interpretability\//);
  assert.match(cv, /\/projects\/quant-transformer\//);
  assert.match(cv, /\/projects\/digital-persona-agent\//);
  assert.match(cv, /\/projects\/tuvalon\//);
  assert.match(cv, /\/photos\/profile\/academic-presentation\.webp/);

  assert.match(about, /type: about/);
  assert.match(about, /How I Am Learning To Do Research/);
  assert.doesNotMatch(about, /data-bilingual-lang=/);
  assert.doesNotMatch(about, /[\u4e00-\u9fff]/);
  assert.match(about, /I am a PKU mathematics student trying to turn the behavior of large models into evidence I can actually inspect/);
  assert.match(about, /large-model interpretability/);
  assert.match(about, /project-shaped rather than paper-shaped/);
  assert.match(about, /I play Texas Hold'em for the discipline of incomplete information/);
  assert.match(about, /\/cv\//);
  assert.doesNotMatch(about, /GPA|3\.79|绩点/);

  assert.match(aboutData, /name: Justin Wu/);
  assert.match(aboutData, /large-model interpretability/);
  assert.match(aboutData, /mathematical reasoning/);
  assert.match(aboutData, /I study mathematics at PKU/);
  assert.match(aboutData, /I work on large-model interpretability/);
  assert.match(aboutData, /avatarImg: \/img\/headelephant\.jpg/);
  assert.match(aboutData, /Interpretability\. Evidence\. Reasoning\./);
  assert.doesNotMatch(aboutData, /GPA|3\.79|绩点/);
  assert.match(aboutData, /selfInfoTips1: PKU year/);
  assert.match(aboutData, /selfInfoContentYear: 2/);
  assert.match(aboutData, /selfInfoContent2: LLM interpretability/);
  assert.match(aboutData, /CMO Gold Medal and Lingjun Linghang Scholarship/);
  assert.match(aboutData, /Building research taste through coursework, attribution/);
  assert.match(aboutData, /Texas Hold'em/);
  assert.match(aboutData, /img: \/photos\/profile\/cmo-gold-medal\.webp/);
  assert.match(aboutData, /photo_url: \/photos\/profile\/seaside-life\.webp/);
  assert.match(aboutData, /personality_img: \/photos\/profile\/travel-jeju-open-arms\.webp/);
  assert.match(aboutData, /personality_type: ENTJ/);
  assert.match(aboutData, /music_bg: \/photos\/profile\/travel-singapore-skyline\.webp/);
  assert.match(aboutData, /like_bg: \/photos\/profile\/travel-japan-maple\.webp/);
  assert.match(aboutData, /cover: \/photos\/profile\/travel-japan-bamboo\.webp/);
  assert.match(aboutData, /\/photos\/profile\/poker-life\.webp/);
  assert.match(aboutData, /Texas Hold'em/);
  assert.match(aboutData, /Ranges, pot odds, table image/);
  assert.match(aboutData, /like_link: \/travel\//);
  assert.doesNotMatch(aboutData, /Working Maxim|Current Buff/);
  assert.match(aboutData, /Project Shelf/);
  assert.match(aboutData, /Course reports, challenges, and independent builds/);
  assert.match(aboutData, /cover: \/img\/projects\/quant-transformer-cover\.png/);
  assert.match(aboutData, /cover: \/img\/projects\/digital-persona-cover\.png/);
  assert.match(aboutData, /cover: \/img\/projects\/tuvalon-cover\.png/);
  assert.match(aboutData, /cover: \/img\/projects\/uncle-ducky-cover\.png/);
  assert.match(aboutData, /text: View projects/);

  assert.match(travel, /title: Travel Notes/);
  assert.match(travel, /type: album_detail/);
  assert.match(albumData, /class_name: Travel Notes/);
  assert.match(albumData, /path_name: \/travel\//);
  assert.match(albumData, /Tokyo, Japan/);
  assert.match(albumData, /Kyoto, Japan/);
  assert.match(albumData, /Singapore/);
  assert.match(albumData, /Jeju, South Korea/);
  assert.match(albumData, /Sentosa, Singapore/);
  assert.match(albumData, /Xi'an, China/);
  assert.match(albumData, /\/photos\/travel\/jeju-columnar-coast\.webp/);
  assert.match(albumData, /\/photos\/travel\/jeju-basalt-selfie\.webp/);
  assert.match(albumData, /\/photos\/travel\/singapore-night-flamingos\.webp/);
  assert.match(albumData, /\/photos\/travel\/singapore-southernmost-point\.webp/);
  assert.match(albumData, /\/photos\/travel\/kyoto-maple-floor\.webp/);
  assert.match(albumData, /flamingos blurred into something closer to memory/);
  assert.match(albumData, /\/photos\/profile\/travel-japan-bamboo\.webp/);
  assert.match(albumData, /\/photos\/profile\/travel-singapore-skyline\.webp/);
  assert.match(albumData, /\/photos\/profile\/travel-jeju-sunset\.webp/);
  assert.match(albumData, /\/photos\/IMG_3995\.webp/);
  assert.match(albumData, /\/photos\/xian\.jpg/);
  assert.doesNotMatch(albumData, /pku-lantern/);

  assert.match(creativityData, /PyTorch/);
  assert.match(creativityData, /Hugging Face/);
  assert.match(creativityData, /Jupyter/);
  assert.match(creativityData, /scikit-learn/);
  assert.match(creativityData, /OpenAI/);
  assert.match(creativityData, /arXiv/);
  assert.match(creativityData, /LaTeX/);
  assert.doesNotMatch(creativityData, /\/img\/favicon\.ico/);

  assert.match(projects, /title: Project Portfolio/);
  assert.match(projects, /course reports, challenge projects, teaching-assistant project design/);
  assert.match(equipmentData, /Project Portfolio/);
  assert.match(equipmentData, /class_name_zh: 项目作品集/);
  assert.match(equipmentData, /description_zh: 课程报告、挑战赛与独立构建/);
  assert.match(equipmentTemplate, /data-bilingual-lang="en"/);
  assert.match(equipmentTemplate, /data-bilingual-lang="zh"/);
  assert.match(equipmentData, /Course Reports, Challenges, and Independent Builds/);
  assert.match(equipmentData, /助教大作业设计/);
  assert.match(equipmentData, /聊天式经营叙事/);
  assert.match(equipmentData, /not publication-style research claims yet/);
  assert.match(equipmentData, /Final Project \/ Mathematical Introduction to Machine Learning/);
  assert.match(equipmentData, /Final Project \/ Selected Topics in Deep Learning Theory/);
  assert.match(equipmentData, /Midterm Project \/ Mathematical Modeling/);
  assert.match(equipmentData, /Challenge Work \/ Lingjun Quant Challenge/);
  assert.match(equipmentData, /TA Project Design \/ Data Structures and Algorithms B/);
  assert.match(equipmentData, /Independent Mini-Game/);
  assert.match(equipmentData, /Project Reports/);
  assert.match(equipmentData, /Uncle Ducky/);
  assert.match(equipmentData, /Quant Transformer/);
  assert.match(equipmentData, /Digital Persona Agent/);
  assert.match(equipmentData, /Tuvalon/);
  assert.match(equipmentData, /\/img\/projects\/dl-final-cover\.png/);
  assert.match(equipmentData, /\/img\/projects\/ml-final-cover\.png/);
  assert.match(equipmentData, /\/img\/projects\/modelmid-cover\.png/);
  assert.match(equipmentData, /\/img\/projects\/quant-transformer-cover\.png/);
  assert.match(equipmentData, /\/img\/projects\/digital-persona-cover\.png/);
  assert.match(equipmentData, /\/img\/projects\/tuvalon-cover\.png/);
  assert.match(equipmentData, /\/img\/projects\/uncle-ducky-cover\.png/);
  assert.match(equipmentData, /report: \/pdfs\/projects\/dl-final-report\.pdf/);
  assert.match(equipmentData, /report: \/pdfs\/projects\/ml-final-report\.pdf/);
  assert.match(equipmentData, /report: \/pdfs\/projects\/modelmid-report\.pdf/);
  assert.doesNotMatch(equipmentData, /Research Questions in Progress|研究工作|公开项目|鸭腿叔叔|30\.88|98\.1|0\.981|GPA/);
  assert.doesNotMatch(equipmentData, /LLM Interpretability|Direction Note|方向笔记|可解释性阅读与思考|\/projects\/llm-interpretability\//);
  assert.match(equipmentTemplate, /iten\.report/);
  assert.match(equipmentTemplate, /equipment-report-link/);
  assert.match(equipmentTemplate, /anzhiyu-icon-file-lines/);
  assert.match(equipmentTemplate, /data-bilingual-lang="en"\) Report/);
  assert.match(equipmentTemplate, /data-bilingual-lang="zh"\) 报告/);
  assert.doesNotMatch(equipmentTemplate, /bber-reply|rightMenuCommentText|anzhiyu-icon-message/);

  assert.match(dlFinal, /Course project framing/);
  assert.match(dlFinal, /Mathematical Introduction to Machine Learning/);
  assert.match(dlFinal, /Projected LR-Drop Residuals/);
  assert.match(dlFinal, /identification step/);
  assert.match(dlFinal, /I did not train new transformers/);
  assert.match(dlFinal, /What I learned/);
  assert.doesNotMatch(dlFinal, /30\.88%|98\.1%|0\.981|GPA/);
  assert.match(mlFinal, /Selected Topics in Deep Learning Theory/);
  assert.match(mlFinal, /This was my final project/);
  assert.match(mlFinal, /modular-addition task with prime modulus 97/);
  assert.match(mlFinal, /Reproducibility boundary/);
  assert.match(modelmid, /What I studied/);
  assert.match(modelmid, /midterm project for Mathematical Modeling/);
  assert.match(modelmid, /How I separate the versions/);
  assert.match(modelmid, /adversarial rewriting/);
  assert.doesNotMatch(modelmid, /0\.981|98\.1%|GPA/);
  assert.match(interpretability, /not a finished research project yet/);
  assert.match(interpretability, /The question I keep asking/);
  assert.match(interpretability, /observation, inference, and speculation/);
  assert.match(quant, /This was my Lingjun Quant Challenge project/);
  assert.match(quant, /Lingjun Quant Challenge/);
  assert.doesNotMatch(quant, /R2 = 0\.038/);
  assert.match(persona, /This is my digital persona prototype/);
  assert.match(persona, /interview_agent/);
  assert.match(persona, /Unigrow-agent/);
  assert.match(persona, /ChainOfTree\.generate_follow_up/);
  assert.match(persona, /cognitive engrams/);
  assert.match(persona, /premise-verification/);
  assert.match(persona, /traceable interview evidence/);
  assert.match(tuvalon, /I worked on Tuvalon as a teaching-assistant project/);
  assert.match(tuvalon, /pkulab409\/pkudsa\.avalon/);
  assert.match(tuvalon, /Data Structures and Algorithms B/);
  assert.match(tuvalon, /partial observability/);
  assert.match(tuvalon, /AvalonReferee/);
  assert.match(tuvalon, /automatic matching system/);
  assert.match(tuvalon, /ELO system/);
  assert.match(uncleDucky, /title: Uncle Ducky/);
  assert.match(uncleDucky, /my independent static-web mini-game/);
  assert.match(uncleDucky, /What I built/);
  assert.match(uncleDucky, /state-driven chat narrative/);
  assert.doesNotMatch(projectDetails, /data-bilingual-lang|bilingual-block/);
  assert.doesNotMatch(projectDetails, /<section|profile-actions|profile-hero|project-hero|\{%|```|tabs|folding|timeline|mermaid/);
  assert.doesNotMatch(projectDetails, /I checked|After reading|After checking|before rewriting|Sources Checked|Evidence Boundary|Repository:|This page is based|This page is grounded|audited code report|public repositories under/);

  assert.match(profileCss, /\/photos\/profile\/campus-whiteboard\.webp/);
  assert.match(profileCss, /\/photos\/profile\/academic-lecture\.webp/);
  assert.match(profileCss, /\/photos\/profile\/poker-life\.webp/);
  assert.match(profileCss, /#about-page \.hello-about h1/);
  assert.match(profileCss, /#about-page \.author-content-item\.personalities \.image/);
  assert.match(profileCss, /#about-page \.author-content-item\.personalities \.image img[\s\S]*object-fit: contain/);
  assert.doesNotMatch(profileCss, /#about-page \.author-content-item\.myphoto/);
  assert.match(profileCss, /#about-page \.tags-group-icon img/);
  assert.match(profileCss, /#about-page \.author-content-item\.game-yuanshen/);
  assert.match(profileCss, /#about-page \.author-content-item\.game-yuanshen::after/);
  assert.match(profileCss, /filter: none !important/);
  assert.match(profileCss, /-webkit-mask-image: none !important/);
  assert.match(profileCss, /mask-image: none !important/);
  assert.match(profileCss, /box-shadow: none !important/);
  assert.match(profileCss, /#about-page \.author-content-item\.careers/);
  assert.match(profileCss, /background-position: center 58%/);
  assert.match(profileCss, /--careers-bg/);
  assert.match(profileCss, /opacity: 0\.74/);
  assert.match(profileCss, /color: #fff8e9/);
  assert.match(profileCss, /#home_top \.categoryGroup/);
  assert.match(profileCss, /\.cv-hero \.profile-actions/);
  assert.match(profileCss, /\.cv-hero \.profile-actions \.cv-action\.cv-action-primary/);
  assert.doesNotMatch(profileCss, /#home_top a\.categoryButton\.paper/);
  assert.match(projectsCss, /equipment-item-content-item-cover[\s\S]*overflow: hidden/);
  assert.match(projectsCss, /equipment-item-content-item-cover[\s\S]*display: block/);
  assert.match(projectsCss, /equipment-item-content-item-image[\s\S]*width: 100% !important/);
  assert.match(projectsCss, /equipment-item-content-item-image[\s\S]*height: 100% !important/);
  assert.match(projectsCss, /equipment-item-content-item-image[\s\S]*object-fit: cover !important/);
  assert.match(projectsCss, /equipment-report-link[\s\S]*display: inline-flex/);
  assert.doesNotMatch(projectsCss, /max-width: 82%|width: 320px|object-fit: contain/);

  assert.match(academicEntry, /const primaryPath = "\/about\/"/);
  assert.match(academicEntry, /bannerText\.textContent = "About"/);
  assert.match(bilingualSwitch, /data-bilingual-set/);
  assert.match(bilingualSwitch, /bilingualActive/);
  assert.match(bilingualSwitch, /justin-bilingual-lang/);
  assert.doesNotMatch(bilingualSwitch, /dataset\.bilingualLang\s*=/);
  assert.match(aboutPageInteractions, /initAboutPageInteractions/);
  assert.match(aboutPageInteractions, /pjax:complete/);
  assert.match(aboutPageInteractions, /aboutMotionReady/);
  assert.match(aboutPageInteractions, /aboutTipsReady/);
  assert.match(aboutPageInteractions, /touchmove/);
  assert.match(profileCss, /html\[data-bilingual-active="zh"\] span\[data-bilingual-lang="zh"\]/);

  assert.match(aboutTemplate, /if item\.maxim \|\| item\.buff/);
  assert.match(aboutTemplate, /like_link/);
  assert.match(aboutTemplate, /dataset\.aboutMotionReady = "inline"/);
  assert.match(aboutTemplate, /dataset\.aboutTipsReady = "inline"/);
  assert.match(aboutTemplate, /\.career-item\s*\n\s*\.circle[\s\S]*\n\s*\.name=career\.desc/);
  assert.match(albumTemplate, /top_tips/);

  for (const removedPagePath of [
    "source/notes/index.md",
    "source/work/index.md",
    "source/photos/index.md",
    "source/photos/photos.json",
  ]) {
    assert.equal(existsSync(join(root, removedPagePath)), false, `${removedPagePath} should be removed`);
  }

  for (const imagePath of [
    "source/photos/profile/academic-presentation.webp",
    "source/photos/profile/academic-lecture.webp",
    "source/photos/profile/campus-whiteboard.webp",
    "source/photos/profile/campus-quiet-corner.webp",
    "source/photos/profile/pku-lantern.webp",
    "source/photos/profile/poker-life.webp",
    "source/photos/profile/badminton-life.webp",
    "source/photos/profile/seaside-life.webp",
    "source/photos/profile/cmo-gold-medal.webp",
    "source/photos/profile/travel-japan-bamboo.webp",
    "source/photos/profile/travel-japan-shibuya.webp",
    "source/photos/profile/travel-japan-maple.webp",
    "source/photos/profile/travel-singapore-skyline.webp",
    "source/photos/profile/travel-jeju-open-arms.webp",
    "source/photos/profile/travel-jeju-sunset.webp",
    "source/photos/profile/traditional-tower.webp",
    "source/photos/travel/jeju-basalt-path.webp",
    "source/photos/travel/jeju-basalt-selfie.webp",
    "source/photos/travel/jeju-boat-wake.webp",
    "source/photos/travel/jeju-columnar-coast.webp",
    "source/photos/travel/jeju-hotel-pool-view.webp",
    "source/photos/travel/jeju-lighthouse-coast.webp",
    "source/photos/travel/jeju-neon-street.webp",
    "source/photos/travel/kyoto-maple-floor.webp",
    "source/photos/travel/kyoto-soba-table.webp",
    "source/photos/travel/kyoto-street-cyclist.webp",
    "source/photos/travel/singapore-aquarium-jellyfish.webp",
    "source/photos/travel/singapore-night-flamingos.webp",
    "source/photos/travel/singapore-rooftop-skyline.webp",
    "source/photos/travel/singapore-southernmost-point.webp",
    "source/photos/IMG_3995.webp",
    "source/photos/IMG_4378.webp",
    "source/photos/IMG_4640.webp",
    "source/photos/IMG_4662.webp",
    "source/photos/IMG_4713.webp",
    "source/photos/scmy.jpg",
    "source/photos/thut.jpg",
    "source/photos/walledworld.jpg",
    "source/photos/xian.jpg",
    "source/img/projects/dl-final-cover.png",
    "source/img/projects/ml-final-cover.png",
    "source/img/projects/modelmid-cover.png",
    "source/img/projects/quant-transformer-cover.png",
    "source/img/projects/digital-persona-cover.png",
    "source/img/projects/tuvalon-cover.png",
    "source/img/projects/uncle-ducky-cover.png",
  ]) {
    assert.ok(existsSync(join(root, imagePath)), `${imagePath} should exist`);
  }

  for (const iconPath of [
    "source/img/tech-icons/python.svg",
    "source/img/tech-icons/pytorch.svg",
    "source/img/tech-icons/huggingface.svg",
    "source/img/tech-icons/jupyter.svg",
    "source/img/tech-icons/numpy.svg",
    "source/img/tech-icons/pandas.svg",
    "source/img/tech-icons/scikitlearn.svg",
    "source/img/tech-icons/plotly.svg",
    "source/img/tech-icons/latex.svg",
    "source/img/tech-icons/github.svg",
    "source/img/tech-icons/markdown.svg",
    "source/img/tech-icons/docker.svg",
    "source/img/tech-icons/linux.svg",
    "source/img/tech-icons/openai.svg",
    "source/img/tech-icons/arxiv.svg",
    "source/img/tech-icons/visualstudiocode.svg",
  ]) {
    assert.ok(existsSync(join(root, iconPath)), `${iconPath} should exist`);
  }

  for (const reportPath of [
    "source/pdfs/projects/dl-final-report.pdf",
    "source/pdfs/projects/ml-final-report.pdf",
    "source/pdfs/projects/modelmid-report.pdf",
  ]) {
    assert.ok(existsSync(join(root, reportPath)), `${reportPath} should exist`);
  }

  assert.match(quant, /500 stocks/);
  assert.match(quant, /239 intraday minutes/);
  assert.doesNotMatch(quant, /R2 = 0\.038/);
  assert.match(persona, /cognitive engrams/);
  assert.match(persona, /premise-verification/);
  assert.match(tuvalon, /Tuvalon is a Flask web application/);
  assert.match(tuvalon, /teaching assistant/);
  assert.match(tuvalon, /automatic matching system/);

  const publicContent = [cv, about, aboutData, albumData, equipmentData, quant, persona, tuvalon].join("\n");
  assert.doesNotMatch(publicContent, /3323516279|qq\.com/);
  assert.doesNotMatch([cv, about, aboutData].join("\n"), /30\.88%|98\.1%/);
});

test("custom profile and project pages keep mobile-specific layout guards", () => {
  const profileCss = read("source/css/profile.css");
  const projectsCss = read("source/css/projects.css");

  const mobileProfileCss = mediaBlock(profileCss, "(max-width: 700px)");
  const compactProfileCss = mediaBlock(profileCss, "(max-width: 480px)");
  const mobileProjectsCss = mediaBlock(projectsCss, "(max-width: 640px)");

  assert.match(mobileProfileCss, /#page[\s\S]*overflow-x: hidden/);
  assert.match(mobileProfileCss, /\.profile-hero[\s\S]*padding/);
  assert.match(mobileProfileCss, /#about-page \.author-box[\s\S]*grid-template-columns: 1fr/);
  assert.match(mobileProfileCss, /#about-page \.author-tag-left,\s*#about-page \.author-tag-right[\s\S]*display: none/);
  assert.match(mobileProfileCss, /#about-page \.author-content[\s\S]*grid-template-columns: 1fr/);
  assert.match(mobileProfileCss, /#about-page \.hello-about[\s\S]*min-height/);
  assert.match(mobileProfileCss, /#about-page \.aboutsiteTips h2[\s\S]*overflow-wrap: anywhere/);
  assert.match(mobileProfileCss, /#about-page \.author-content-item\.personalities \.image[\s\S]*position: static/);
  assert.match(mobileProfileCss, /#about-page \.comic-box[\s\S]*grid-template-columns: repeat\(2, minmax\(0, 1fr\)\)/);
  assert.match(mobileProfileCss, /#about-page \.comic-item[\s\S]*min-width: 0/);
  assert.match(mobileProfileCss, /\.bilingual-switch[\s\S]*width: 100%/);
  assert.match(compactProfileCss, /\.profile-hero h1[\s\S]*font-size/);
  assert.match(compactProfileCss, /\.cv-main,\s*\.cv-panel,\s*\.about-narrative[\s\S]*padding/);

  assert.match(mobileProjectsCss, /body\[data-type="equipment"\] #equipment[\s\S]*overflow-x: hidden/);
  assert.match(mobileProjectsCss, /\.goodthings-item[\s\S]*padding/);
  assert.match(mobileProjectsCss, /\.goodthings-title[\s\S]*overflow-wrap: anywhere/);
  assert.match(mobileProjectsCss, /\.equipment-item-content[\s\S]*gap/);
  assert.match(mobileProjectsCss, /\.equipment-item-content-item[\s\S]*min-height: auto/);
  assert.match(mobileProjectsCss, /\.equipment-item-content-item-info[\s\S]*min-width: 0/);
  assert.match(mobileProjectsCss, /\.equipment-item-content-item-name[\s\S]*overflow-wrap: anywhere/);
  assert.match(mobileProjectsCss, /\.equipment-item-content-item-toolbar[\s\S]*flex-wrap: wrap/);
  assert.match(mobileProjectsCss, /\.equipment-report-link[\s\S]*margin-left: 0/);
});
