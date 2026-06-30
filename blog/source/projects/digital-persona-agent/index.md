---
title: Digital Persona Agent System
date: 2026-06-29 20:05:00
updated: 2026-06-30 15:20:00
layout: page
description: A two-repository prototype for building retrieval-grounded digital personas from interviews, cognitive engrams, and guarded RAG generation.
comments: false
aside: false
---

> This is my digital persona prototype. I split the system into two parts: `interview_agent` collects long-form interview material, and `Unigrow-agent` turns personal documents into retrieval-grounded persona responses.

## What I wanted to build

The project asks a practical question: can a digital persona be built from traceable interview evidence rather than from a flat prompt such as "act like this person"? The current system separates the pipeline into two parts.

The first part collects material. The second part retrieves and uses that material during conversation. This separation is important because it makes the persona less dependent on vague style imitation and more dependent on memories, beliefs, decision rules, and expression habits that were actually recorded.

## Interview collection

`interview_agent` is a FastAPI and React interview application. It is designed for long-form, staged interviewing rather than a fixed questionnaire. The README frames the target as about 100 rounds of conversation, while the current server defaults to a configurable maximum turn count.

The core follow-up generator is `ChainOfTree.generate_follow_up`. It uses the current interview context, the latest answer, a persona profile, a suggested next direction, turn count, and an education preference to generate the next question. The strategy changes by phase: early broad coverage, middle-stage deep digging, late-stage gap filling, and final-stage summary.

The system also checks whether a user answer is meaningful or whether the user is asking to change topic. That is a small but useful interaction detail: an interview agent should not treat "I do not want to answer that" as failed data.

## Persona builder

`persona_builder.py` updates or builds a structured persona profile from interview history. The target JSON includes a summary, basic information, traits, key experiences, values, expression style, cognitive patterns, memories, a system prompt, and RAG-ready document slices.

The memory manager uses a sliding-window plus summary pattern. Recent turns remain directly visible, while older turns are compressed into a concise third-person summary. That is a straightforward way to keep a long interview usable under context-window limits.

## RAG persona layer

`Unigrow-agent` takes the next step: it turns raw personal documents, such as interviews, reflections, or spreadsheets, into structured "cognitive engrams." The data processor asks an LLM to extract four linked pieces from each chunk:

- metadata such as life stage and importance
- episodic memory such as event, action, emotion, and outcome
- semantic cognition such as belief, decision logic, insight, and blind spot
- expression style such as tone, keywords, and metaphors

The retriever builds embeddings over those engrams, caches them, and uses FAISS for local vector search. It also contains a Tencent Cloud VectorDB path with fallback behavior, although the local FAISS path is the clearest portable implementation.

`core_agent.py` ties the modules together. It loads processed atoms, analyzes whether the user is asking for casual chat or knowledge-grounded response, optimizes the query, retrieves relevant engrams, filters by selected source documents, and calls the answer generator.

## Grounding and anti-hallucination

The most valuable implementation detail is not that the system can "sound like" a person. It is the attempt to prevent unsupported persona claims.

`answer_generator.py` contains an explicit premise-verification step. If a user question assumes a specific achievement or experience that is not supported by retrieved evidence, the generator receives a strong correction instruction and must clarify the mistake rather than continue the false premise. The same module also keeps session-level memory of used engrams, so later answers are nudged away from repeating the same story unless similarity is very high.

## What is still unfinished

This is still a prototype. `interview_agent` has carried a reproduced signature-mismatch bug in an earlier path, and `Unigrow-agent` has a README/module mismatch: the README lists a memory-manager module, while the current session memory lives inside `answer_generator.py`.

The system also depends heavily on LLM JSON compliance and on the quality of extracted engrams. It is therefore better described as an agent-system prototype than as a finished digital-human product.

## Why I care about it

This project fits my broader interest in interpretability because it asks for evidence discipline in a personal setting. A digital persona should not merely be fluent. It should know when it has evidence, when it only has style, and when it must say "I do not have that memory."
