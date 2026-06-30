---
title: Tuvalon
date: 2026-06-29 20:05:00
updated: 2026-06-30 15:20:00
layout: page
description: A TA-built Avalon agent battle platform for Data Structures and Algorithms B, grounded in the pkulab409/pkudsa.avalon repository.
comments: false
aside: false
---

> I worked on Tuvalon as a teaching-assistant project for Data Structures and Algorithms B. It is an Avalon-style AI battle platform where students submit Python agents and watch them compete under hidden roles, partial observability, public speech, private memory, and ranking pressure.

The main organization repository is `pkulab409/pkudsa.avalon`.

## Why I built around Avalon

Tuvalon was built as the infrastructure for a Data Structures and Algorithms B course project. It is not a standalone research benchmark. Its value is that the assignment turns programming into a live strategic system: students submit agents that must reason under hidden roles, partial observability, communication, team selection, voting, movement, and delayed payoff.

The platform extends the classic Avalon setting into a 7-player AI battle environment. The public game rules include blue and red camps, special roles such as Merlin, Percival, Morgana, Assassin, and Oberon, five mission rounds, a possible assassination phase, and abnormal termination rules when submitted code fails or violates constraints.

## What I helped maintain

Tuvalon is a Flask web application with Jinja templates, SQLAlchemy models, login management, AI-code management, battle pages, ranking pages, a visualizer, documentation rendering, and an admin panel. The database model is not just user storage: it tracks users, submitted AI code, game statistics, battles, ranking IDs, ELO score, and battle participation records.

The core game service is separated from the web routes. `BattleManager` is a singleton-style controller that starts worker threads, queues battle jobs, tracks active battle status, stores battle results, and monitors resource load. This makes the platform closer to an online judging system than to a simple classroom demo.

## Game Engine and Referee

The central engine is `AvalonReferee`. It initializes roles, player positions, mission results, public logs, private logs, map state, and the current leader. The referee also loads submitted player modules, calls player methods at the right phase, records game progress, and decides when a battle should terminate.

The interesting teaching constraint is information control. A student agent should know only what its role and position allow it to know. The platform therefore has to distribute role sight, map information, position data, public speech, mission members, votes, and private memory through server-controlled calls instead of letting user code drive the whole process.

## Submitted Agent Interface

Students submit Python code containing a `Player` class. The server calls methods such as `set_player_index`, `set_role_type`, `pass_role_sight`, `pass_map`, `pass_position_data`, `pass_message`, `pass_mission_members`, `decide_mission_member`, `walk`, `say`, `mission_vote1`, `mission_vote2`, and `assass`.

This interface is deliberately procedural. The agent does not run the match by itself; it responds to the platform. That design makes student work easier to evaluate because every submitted bot faces the same protocol, state boundary, timing expectation, and action format.

## LLM and Memory Support

The helper layer exposes an LLM call and public/private memory functions. This is a meaningful design choice for an Avalon assignment: students can build simple rule-based bots, but they can also experiment with language-model-backed speech, suspicion tracking, and private notes.

The sample `basic_player.py` is intentionally simple. It stores speech history, mission history, suspected players, trusted players, positions, and role information, then uses randomized decisions and shallow heuristics. In a course setting, that baseline gives students something concrete to beat.

## Matching, Ranking, and Replay

The automatic matching system runs multiple ranking instances, launches battle jobs through the battle manager, and updates database-backed statistics. The ELO system starts players at 1200, uses team-average expected win rates, and updates scores based on win/loss outcomes. Code errors and invalid outputs follow a separate penalty path.

The platform also includes observer and visualizer paths for replay. That matters pedagogically: students can inspect not just a final score but the sequence of choices, messages, votes, and failures that produced it.

## Teaching Context

As a teaching assistant, I treated Tuvalon as project infrastructure: a way for students to test algorithms, debugging discipline, agent design, and strategic reasoning in a shared environment. The platform also made office hours more concrete, because bugs could be discussed as failures in a protocol, not as vague "my bot is bad" complaints.

## What I learned

This project taught me that a course platform has to be both playful and strict. The game needs enough uncertainty to make students care, but the protocol must be rigid enough that every bot faces the same information boundary. That balance is the real design problem: fun on the surface, judging discipline underneath.
