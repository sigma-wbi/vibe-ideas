---
title: "Claude (Anthropic)"
description: "코드 생성, 장문 분석, 구조적 사고의 장인"
date: 2026-04-01
last_verified: 2026-04-01
progress: 100
tags: ["llm", "claude", "anthropic"]
order: 1
---

# Claude (Anthropic)

> 깊이 생각하고, 길게 읽고, 정확하게 코딩하는 장인

## 한줄 요약

코드 생성과 장문 분석에서 가장 신뢰할 수 있는 모델. 특히 에이전트 코딩과 구조적 사고가 필요한 작업에서 강하다.

## 강점 (이럴 때 쓰면 좋다)

- **코드 생성 & 디버깅** — SWE-bench Verified 82.1% (Sonnet 4.6 기준). 실무 코딩 벤치마크 최상위권
- **장문 분석** — 1M 토큰 컨텍스트로 전체 코드베이스, 긴 문서를 한 번에 처리
- **에이전트 코딩** — Claude Code, Dev Team(멀티 에이전트 협업), MCP 도구 연동 등 에이전트 생태계가 가장 성숙
- **구조적 출력** — 지시를 잘 따르고, 마크다운/JSON/XML 등 형식화된 응답이 일관적
- **안전성** — Constitutional AI 기반. 민감한 주제에서도 균형 잡힌 응답

## 약점 (이럴 때는 피하자)

- **실시간 정보 없음** — 웹 검색 내장이 제한적. 최신 뉴스/트렌드 확인에는 부적합
- **멀티모달 생성 약함** — 이미지/영상 생성 불가. 입력으로 이미지 분석은 가능
- **무료 티어 제한** — 무료 사용량이 넉넉하지 않음. 헤비 유저는 Pro 필수
- **플러그인/앱 생태계** — ChatGPT의 GPT Store 같은 서드파티 생태계가 상대적으로 작음

## 모델 라인업 (2026-04 기준)

| 모델 | 포지션 | 컨텍스트 | API 가격 (입력/출력, /1M 토큰) |
|------|--------|---------|------|
| **Opus 4.6** | 최상위 — 복잡한 추론, 에이전트 | 1M | $5 / $25 |
| **Sonnet 4.6** | 균형 — 코딩, 일상 업무 | 1M | $3 / $15 |
| **Haiku 4.5** | 경량 — 분류, 추출, 라우팅 | 200K | $1 / $5 |

**구독:** Pro $20/월 (Sonnet/Opus 사용), Max $100/월 (무제한에 가까운 사용량)

## 실전 팁

### 시스템 프롬프트 전략
- XML 태그로 구조화하면 지시 따르기가 극적으로 향상 (`<instructions>`, `<context>`, `<output_format>`)
- "Think step by step" 대신 구체적 단계를 직접 제시하는 게 효과적

### 이 모델에서만 잘 되는 것
- **Artifacts** — 대화 중 코드/문서를 별도 패널에서 실시간 편집. 자세히: [claude-artifacts.md](design-build/claude-artifacts.md)
- **Claude Design** (2026.04 신규) — 자연어로 디자인/프로토타입을 만드는 Figma 정면 경쟁 제품. 자세히: [claude-design.md](design-build/claude-design.md)
- **Claude Code** — CLI 기반 코딩 에이전트. 전체 프로젝트 컨텍스트를 이해하고 자율 구현
- **MCP (Model Context Protocol)** — 외부 도구/데이터를 표준화된 방식으로 연결

> Claude 진영의 디자인/빌더 도구 전체는 [Design & Build 카테고리](design-build/README.md) 참조.

### 다른 모델로 전환해야 할 신호
- 최신 뉴스/실시간 데이터가 필요할 때 → Grok 또는 ChatGPT
- 이미지/영상 생성이 필요할 때 → ChatGPT (DALL-E) 또는 Gemini
- Google 서비스(Docs, Sheets 등)와 직접 연동이 필요할 때 → Gemini

## 가격 & 접근성

| 플랜 | 가격 | 포함 |
|------|------|------|
| 무료 | $0 | Sonnet 제한적 사용 |
| Pro | $20/월 | Sonnet + Opus, 높은 사용량 |
| Max | $100/월 | 최대 사용량, 우선 접근 |
| API | 토큰 기반 | 위 라인업 표 참조 |

> 최신 가격은 [Anthropic 공식 가격 페이지](https://www.anthropic.com/pricing) 참조
