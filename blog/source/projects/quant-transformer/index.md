---
title: Causal Transformer for High-Frequency Return Prediction
date: 2026-06-29 20:05:00
updated: 2026-06-30 16:10:00
layout: page
description: Lingjun Quant Challenge project using a causal Transformer for A-share intraday microstructure return prediction.
comments: false
aside: false
mathjax: true
---

> This was my Lingjun Quant Challenge project. I used it to practice sequence modeling under a harsh information boundary: high-frequency return prediction is not only about architecture, but also about refusing to leak the future into validation.

## Challenge Context

The task was to model ten-minute-ahead returns from A-share high-frequency microstructure data:

- 500 stocks
- 239 intraday minutes per day
- 384 features
- Parquet-scale data storage

The central difficulty was not only modeling a large sequential table. I had to design a validation protocol that preserved enough intraday context while preventing information leakage.

## Method

I treated each stock-day as a minute-level sequence. Each minute became a token, and a strict causal mask prevented the model from reading future minutes while doing minute-wise regression. The architecture followed the information boundary of the task instead of ignoring it.

The main components were:

- causal self-attention over intraday minute sequences
- intraday time embeddings
- stock identity embeddings
- train-date-fitted normalization reused unchanged for validation and inference

## Validation and Leakage Control

I split validation chronologically by `dateid`. Standardization statistics were fit once on training dates and then fixed. That was the main discipline of the project: time-respecting splits, fixed normalization, and suspicion toward any improvement that might come from leakage or time artifacts.

## Diagnostics

I used multi-checkpoint diagnostics to understand model behavior instead of only watching a scalar loss:

- feature dependency views
- parameter distribution tracking
- prediction and residual distributions
- per-timeid behavior profiles
- positional embedding norm tracking

These diagnostics helped identify late-training degradation and rising dependence on time features.

## What I learned

I do not want to oversell this project with a weak metric. The lesson I keep is more basic and more useful: in high-frequency sequence modeling, validation protocol and leakage control matter as much as the architecture. Diagnostics are necessary because an apparent gain can be a real signal, a time artifact, or simply the model learning the wrong shortcut.
