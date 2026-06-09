---
title: "AI Coding Agents"
description: "자연어 지시로 코드베이스를 이해하고 자율 구현하는 코딩 에이전트 — Claude Code · Codex · Antigravity"
date: 2026-05-29
last_verified: 2026-05-29
progress: 100
tags: ["arsenal", "coding-agent", "claude-code", "codex", "antigravity"]
order: 3
---

# AI Coding Agents

> LLM이 답변을 주는 단계를 넘어, **터미널·IDE·데스크탑·클라우드에서 코드베이스를 직접 읽고 자율 구현**하는 에이전트들.

## 이 카테고리에서 다루는 것

[Design & Build](../design-build/README.md)이 "자연어 → UI/앱"이라면, Coding Agents는 **"자연어 → 기존 코드베이스 위에서의 실제 구현·리팩토링·디버깅"**이다. 2026년 들어 세 제품(Claude Code / Codex / Antigravity)이 모두 *CLI + IDE 확장 + 독립 데스크탑 앱 + 클라우드(비동기) 에이전트*를 동시에 제공하는 구조로 수렴했다.

- **터미널/IDE 우선**: Claude Code (Anthropic)
- **멀티 표면 + 클라우드**: Codex (OpenAI)
- **에이전트 우선 데스크탑**: Antigravity (Google)

## 목차

- [**비교 (comparison.md)**](comparison.md) — 세 제품 특장점 · 표면 비교 · 동기/비동기 패러다임 · 슬래시 명령/커스텀 스킬 · 가격 (메인 문서)

> 개별 도구 프로필(claude-code.md / codex.md / antigravity.md)은 콘텐츠가 깊어지는 시점에 분리 생성한다. 지금은 비교 문서 하나로 통합 관리.

## 트렌드 한 줄 (2026년 5월 기준)

> **"IDE냐 데스크탑이냐"는 더 이상 제품을 가르는 축이 아니다.** 진짜 축은 **동기적 페어프로그래밍 vs 비동기적 위임/오케스트레이션**이며, 셋 다 양쪽 모드를 한 제품에 담았다. 커스텀 스킬은 `AGENTS.md` + `SKILL.md` 오픈 표준으로 통일돼 도구 간 이식이 쉬워졌다.

## 관련 문서

- [플래그십 모델 벤치마크](../benchmarks.md) — 이 에이전트들을 구동하는 모델(Opus 4.8 / GPT-5.5 / Gemini 3.x) 성능 비교
- [LLM 비교표](../comparison.md) — 모델 단위 상황별 추천 매트릭스
- **sigma 하네스 템플릿** — 이 저장소가 사용하는 워크플로우 하네스(`.claude/` + `.sigma-vnc-v1/`). 구조 분석: [sigma-vnc-v1 템플릿 분석](../../01-claude-code-refine/sigma-vnc-v1-analysis.md)
