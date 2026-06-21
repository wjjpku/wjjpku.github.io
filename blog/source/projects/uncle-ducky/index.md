---
title: 鸭腿叔叔
date: 2026-06-21 01:13:00
layout: page
description: 微信聊天框形式的虚构经营小游戏，用聊天界面承载多线叙事。
comments: false
aside: false
---

> 鸭腿叔叔是一个微信聊天框形式的虚构经营小游戏。它把经营决策、群聊信息、供应商变化、家人态度和舆论风险都塞进聊天界面里，让“读消息”本身成为玩法。

{% link 鸭腿叔叔代码仓库, GitHub / wjjpku, https://github.com/wjjpku/UncleDucky, https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png %}

## 项目概览

鸭腿叔叔是一个微信聊天框形式的虚构经营小游戏。玩家以“鸭腿叔叔”的视角经营校园烤腿生意，在群聊、供应商、家人、舆论和监管消息之间做选择。

它更像一个叙事界面实验：不是先做一个传统游戏界面，再往里面塞剧情，而是直接把聊天界面作为游戏机制本身。

## 视觉入口

{% image https://raw.githubusercontent.com/wjjpku/UncleDucky/main/assets/duck-leg-uncle-avatar.png, alt=鸭腿叔叔玩家头像, width=220px %}

{% folding orange, 聊天框为什么适合这个项目 %}

聊天框天然适合多线信息流：  
一个经营决策可能同时影响顾客反馈、供应商报价、家人态度和舆论风险。玩家不需要学习复杂操作，只要像读消息一样推进剧情。

{% endfolding %}

{% tabs uncleducky, 1 %}
<!-- tab 文件结构 -->

| 文件 | 作用 |
| --- | --- |
| `index.html` | 页面结构 |
| `styles.css` | 聊天界面样式 |
| `game.js` | 剧情、状态和交互逻辑 |
| `assets/duck-leg-uncle-avatar.png` | 玩家头像 |

<!-- endtab -->
<!-- tab 可以继续扩展的方向 -->

- 加入多结局路线，让关键选择影响后续分支。
- 增加状态面板，例如资金、口碑、健康、监管风险。
- 把聊天对象拆成更明确的角色线，形成更完整的互动小说结构。

<!-- endtab -->
{% endtabs %}

{% btn https://github.com/wjjpku/UncleDucky, 查看完整 README 与代码, anzhiyufont anzhiyu-icon-arrow-right, block center %}
