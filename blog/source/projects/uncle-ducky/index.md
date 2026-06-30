---
title: Uncle Ducky
date: 2026-06-21 01:13:00
updated: 2026-06-30 16:10:00
layout: page
description: An independent chat-based mini-game about campus business, message overload, supplier pressure, public sentiment, and risk management.
comments: false
aside: false
---

> Uncle Ducky is my independent static-web mini-game. I built it less as a conventional management game and more as a state-driven chat narrative: the player runs a campus roasted-leg business through messages, delayed replies, supplier pressure, group-chat rumor, and platform risk.

The code is in [GitHub / wjjpku/UncleDucky](https://github.com/wjjpku/UncleDucky).

![鸭腿叔叔玩家头像](https://raw.githubusercontent.com/wjjpku/UncleDucky/main/assets/duck-leg-uncle-avatar.png)

## What I built

The game is a static web project. It can run by opening `index.html` directly or by serving the directory with any static server. There is no backend. The game logic lives mainly in `game.js`, while `styles.css` builds the WeChat-like interface.

I designed a seven-day business cycle. Each day contains chat tasks. The player moves through conversations, reads messages, and chooses replies. Each reply changes business state and can also set narrative flags that affect later text and endings.

## State Design

The initial state includes:

- money and operating pressure: cash, margin, cost, daily expense
- social and ethical pressure: reputation, heat, family, conscience
- compliance pressure: documents and risk
- memory flags: whether the player clearly labeled the product, accepted shady stock, issued refunds, apologized, or used public-relations tactics

That structure is the core of the game. I did not want a dashboard where the player optimizes one score. I wanted interlocking pressures: a profitable choice can damage documents, conscience, reputation, or risk, and those consequences return later through new messages.

## Time and Message Pressure

The game runs from 09:00 to 21:00 in each simulated day. Unread chats and overdue pressure are part of the design. Time is not just decoration; it pushes the player to respond while the social situation keeps moving.

The chat list becomes the level structure. A supplier message, a student group chat, a family reminder, or a platform notice can all become a task. The player experiences business risk as message overload.

## Narrative Memory

The game remembers key choices. For example, it tracks whether the product label was clear, whether questionable stock was accepted, whether refunds were issued, and whether an apology or public-relations response happened. These flags can affect later group names, messages, and ending analysis.

## Why a Chat Interface

校园生意和舆论传播天然是信息流问题。聊天框可以同时承载：

- 群聊热度和误解扩散
- 供应商报价和货源风险
- 家人提醒带来的道德压力
- 平台、监管和截图带来的后果追踪

The player does not need to learn a complex control panel. They proceed by reading messages in a familiar interface, but each reply still rewrites the operating ledger. That is what made the project fun to me: ordinary communication becomes an economic and ethical state machine.

## What I Learned

The interesting part is the fit between form and theme. A chat UI naturally creates the pressure of too many messages, urgent replies, and consequences that accumulate while the player hesitates. That makes the small game feel more grounded than a pure numbers panel.
