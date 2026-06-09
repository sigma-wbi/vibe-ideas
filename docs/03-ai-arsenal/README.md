---
title: "AI Arsenal"
description: "각 AI 도구의 강점을 아는 것이 곧 생산성이다"
date: 2026-03-31
last_verified: 2026-04-29
progress: 80
tags: ["arsenal", "ai"]
order: 1
---

# AI Arsenal

> 각 AI 도구의 강점을 아는 것이 곧 생산성이다

## 이 문서의 사용법

- **빠르게 비교하고 싶다면** → [비교표 (comparison.md)](comparison.md) 하나만 읽으세요 (현재는 LLM 비교)
- **특정 도구를 깊이 알고 싶다면** → 아래 개별 문서를 읽으세요
- 각 문서의 `last_verified` 날짜를 확인하세요. AI 도구 시장은 빠르게 변합니다.

## 이 섹션에서 다루는 것

LLM(ChatGPT, Claude, Gemini, Grok 등)뿐 아니라 **이미지 생성**(Midjourney, DALL·E, Stable Diffusion), **음성·음악**(Suno, ElevenLabs), **영상**(Runway, Sora), **노트/RAG**(NotebookLM) 같은 다양한 AI 도구의 강점과 활용 팁을 정리합니다. 상황별로 어떤 도구를 꺼내 쓰면 좋은지에 집중합니다.

> 하위 카테고리 폴더(예: `image-gen/`, `voice/`, `video/`, `notebook/`)는 콘텐츠가 추가되는 시점에 자연스럽게 만듭니다.

## 목차

### LLM (텍스트)

- [**Claude**](claude.md) — 코드 생성, 장문 분석, 구조적 사고의 장인
- [**ChatGPT**](chatgpt.md) — 범용 대화, 빠른 프로토타이핑의 만능 도구
- [**Gemini**](gemini.md) — 멀티모달 + Google 생태계의 허브
- [**Grok**](grok.md) — 실시간 정보 + X(Twitter) 연동, 가성비 최강
- [**비교표**](comparison.md) — 상황별 추천 매트릭스 (LLM)
- [**플래그십 벤치마크**](benchmarks.md) — Opus 4.8 vs GPT-5.5 vs Gemini 3.x 코딩/추론/가격 비교 (2026.05)

### Design & Build (AI 디자인/빌더)

- [**Design & Build 카테고리**](design-build/README.md) — Figma 시대 다음의 디자인-투-코드 도구 모음
- [Claude Design](design-build/claude-design.md) — Anthropic의 Figma 정면 경쟁 신제품 (2026.04)
- [Claude Artifacts](design-build/claude-artifacts.md) — Claude.ai 채팅 안의 인터랙티브 프리뷰
- [v0](design-build/v0.md) — UI 미감 1위, Next.js + shadcn 기반
- [Bolt.new](design-build/bolt.md) — 프레임워크 자유도 최강 + 라이브 실행
- [Lovable](design-build/lovable.md) — 풀스택 + 엔터프라이즈 컴플라이언스
- [shadcn/ui](design-build/shadcn.md) — AI 코드 생성의 사실상 표준 컴포넌트 라이브러리
- [비교표 (Design & Build)](design-build/comparison.md) — 상황별 추천 매트릭스

### Coding Agents (코딩 에이전트)

- [**Coding Agents 카테고리**](coding-agents/README.md) — 코드베이스를 직접 읽고 자율 구현하는 에이전트 (Claude Code/Codex/Antigravity)
- [Claude Code vs Codex vs Antigravity 비교](coding-agents/comparison.md) — 특장점·동기/비동기 패러다임·슬래시 명령/커스텀 스킬·가격 (2026.05)
