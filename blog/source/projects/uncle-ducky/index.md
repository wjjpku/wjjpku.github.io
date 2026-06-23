---
title: 鸭腿叔叔
date: 2026-06-21 01:13:00
layout: page
description: 微信聊天框形式的虚构经营小游戏，用信息流和红点压力承载经营叙事。
comments: false
aside: false
---

> 鸭腿叔叔是一个聊天式经营小游戏。玩家不是在传统面板里点按钮，而是在微信群、供应商私聊、家人提醒、平台通知和舆论截图之间回复消息；每一次回复都会改变收益、风险和流量。

{% link 鸭腿叔叔代码仓库, GitHub / wjjpku, https://github.com/wjjpku/UncleDucky %}

## 项目概览

这个项目把微信聊天框当作游戏机制本身。玩家以“鸭腿叔叔”的身份经营校园烤腿生意，面对不断冒出的红点：供应商催你选货，群聊催你解释，家人提醒你别越线，平台和监管又把前面的选择串起来。

{% image https://raw.githubusercontent.com/wjjpku/UncleDucky/main/assets/duck-leg-uncle-avatar.png, alt=鸭腿叔叔玩家头像, width=260px %}

{% mermaid %}
flowchart LR
  A["聊天消息"] --> B["玩家选择"]
  B --> C["经营状态更新"]
  C --> D["群聊、平台与家人反馈"]
  D --> A
{% endmermaid %}

## 交互机制

{% tabs uncleducky, 1 %}
<!-- tab 状态系统 -->

游戏状态不是单一分数，而是多组互相牵制的指标：

| 维度 | 指标 |
| --- | --- |
| 收益 | cash, margin, cost, dailyExpense |
| 风险 | documents, risk, conscience |
| 流量 | heat, reputation, family |

短期赚钱、票据合规、口碑和舆论会互相拉扯。

<!-- endtab -->
<!-- tab 时间压力 -->

营业时间从 09:00 推进到 21:00。未读红点不会静止等待，未处理任务会持续带来压力。玩家回复太慢时，群聊猜测、截图和舆论会继续发酵。

<!-- endtab -->
<!-- tab 叙事记忆 -->

游戏会记住关键选择，例如是否明示品类、是否接过灰色货源、是否退款、是否用公关话术处理舆论。这些 flag 会影响后续文本、群名变化和结局分析。

<!-- endtab -->
{% endtabs %}

## 为什么用聊天框

校园生意和舆论传播天然是信息流问题。聊天框可以同时承载：

- 群聊热度和误解扩散
- 供应商报价和货源风险
- 家人提醒带来的道德压力
- 平台、监管和截图带来的后果追踪

玩家不需要学习复杂操作，只需要像日常读消息一样推进剧情；但每一句回复都在改写经营账本。

{% folding orange, 我觉得这个形式有效的地方 %}

聊天界面让“信息太多、必须回复、越拖越麻烦”的压力很自然地出现。它比传统经营面板更适合表现校园群聊、谣言、供应商话术和舆论连锁反应。这个项目最有意思的不是数值系统有多复杂，而是交互形式和叙事主题很贴。

{% endfolding %}

## 文件结构

| 文件 | 作用 |
| --- | --- |
| `index.html` | 页面结构，包含开场弹窗、聊天面板、指标栏和设置面板。 |
| `styles.css` | 微信式聊天界面、经营指标、设置抽屉和结局页样式。 |
| `game.js` | 剧情数据、状态机、时间推进、选择效果和渲染逻辑。 |
| `assets/duck-leg-uncle-avatar.png` | 玩家头像和项目主视觉。 |
| `vercel.json` | 静态部署配置。 |

## 代码入口

- `initialState`：定义现金、口碑、良心、风险、票据、流量等初始状态。
- `chapters`：定义 7 天经营剧情、聊天消息和选项。
- `applyEffects`：根据选择更新经营指标。
- `applyOverduePressure` / `applyContinuousPressure`：处理未读红点和时间压力。
- `renderBanners` / `renderConversation` / `renderEnding`：渲染聊天列表、对话和结局。

{% link 查看 README 与代码, GitHub / UncleDucky, https://github.com/wjjpku/UncleDucky %}
