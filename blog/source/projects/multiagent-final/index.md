---
title: MultiagentFinal
date: 2026-07-01 01:50:00
updated: 2026-07-01 01:50:00
layout: page
description: Final project for Multi-Agent Foundations, studying strict cooperative Sokoban with intent-grounded recurrent communication.
comments: false
aside: false
mathjax: true
---

> This was my final project for Multi-Agent Foundations. The report studies a stricter two-agent Sokoban benchmark and asks how communication, intent grounding, and recurrent memory help decentralized agents coordinate under partial observation.

The code repository is not public yet, so I keep the course report as the public artifact for now: [Strict Cooperative Sokoban report](/pdfs/projects/multiagent-final-report.pdf).

## Course project framing

The report is titled *Strict Cooperative Sokoban: Intent-Grounded Recurrent Communication for Partially Observable MARL*. The starting point is a small but consequential environment issue: in a common 9-action cooperative Sokoban interface, a push action into empty space can also move the agent. That creates action aliasing. The same physical transition may be labeled as either a move or a push, and valid-action masks become ambiguous.

I define this project around removing that ambiguity. In StrictCoop-Sokoban, push actions move the agent only when they actually displace a box. Navigation must use move actions. That makes behavior-cloning labels identifiable and makes action masks semantically clean.

## Benchmark design

The benchmark uses fixed two-agent Sokoban levels with shared reward, local observations, strict push semantics, planner-verified train and evaluation pools, and a disjoint hard split. The main v2 setting uses a 10 by 10 grid, two agents, three boxes, and local \(K=5\) crops. This means each agent often cannot see the whole puzzle, all boxes, or the other agent.

That partial observability is the real coordination pressure. An agent has to choose a compatible role, remember which box it intends to move, infer the partner's likely role, and avoid irreversible pushes. The hard evaluation levels are not hand-picked demos; they come from random wall construction followed by planner verification and are filtered by solution length.

![MultiagentFinal cover](/img/projects/multiagent-final-cover.png)

## Method

The baseline family is MAPPO-style centralized training with decentralized execution. In this setting, parameter-shared MAPPO is a strong standard baseline, which is useful because it gives the project a meaningful comparison point rather than a weak strawman.

The proposed model is IGRC-MAPPO: Intent-Grounded Recurrent Communication MAPPO. It adds three ingredients:

- a low-dimensional broadcast intent message between agents
- an auxiliary future-box target that grounds the message in task-level intent
- a DRC-style ConvLSTM recurrent actor that preserves role commitment across environment steps

The auxiliary label comes from planner trajectories: for each agent and time step, the target is the first box the agent will push within a short horizon, or a no-target sentinel. This pressures the message to represent cooperative intent instead of becoming an unconstrained hidden feature.

## What the experiments show

On the fixed v2 hard split, MAPPO is the strongest standard baseline in the report, reaching \(0.763 \pm 0.012\) pass@8. The final IGRC-MAPPO encoder-128 model reaches \(0.949 \pm 0.015\) pass@8 and \(0.973 \pm 0.014\) pass@16 across three seeds.

The ablations are more important than the headline number. Communication alone improves stateless MAPPO. Auxiliary grounding changes the retry distribution and gives the message a task-level meaning. The largest jump appears when cross-step recurrent memory is added. A reset-each-step ConvLSTM ablation keeps extra per-frame computation but loses persistent state, and its lower pass@8 supports the interpretation that memory, not just capacity, is carrying much of the improvement.

Moderate encoder scaling helps, but raw capacity is not a monotonic solution. The encoder-128 model outperforms a larger encoder-512 variant in the current experiments. I read that as a warning against describing the result as "bigger model wins." In this benchmark, the useful inductive bias is closer to stable intent plus memory.

## What I learned

This project made multi-agent coordination feel less like a slogan and more like an interface problem. Before asking whether agents can communicate, the environment has to make actions mean exactly one thing. Before trusting a message channel, I want to know what the message is being pressured to represent. Before attributing a gain to architecture size, I want an ablation that separates computation from memory.

The result is still course-project evidence, not a finished MARL benchmark paper. But it gives me a clean lesson I want to keep: in partially observable cooperative tasks, robust behavior often depends on preserving intent across time, not only on reacting well to the current local crop.
