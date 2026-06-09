---
title: "Gemini (Google)"
description: "멀티모달 + Google 생태계의 허브"
date: 2026-04-01
last_verified: 2026-04-01
progress: 100
tags: ["llm", "gemini", "google"]
order: 3
---

# Gemini (Google)

> 보고, 듣고, 읽는 멀티모달 네이티브 — Google 생태계의 AI 허브

## 한줄 요약

텍스트·이미지·영상·음성을 네이티브로 이해하는 진정한 멀티모달 모델. Google 서비스(Gmail, Docs, Drive 등)와의 직접 연동이 최대 차별점이다.

## 강점 (이럴 때 쓰면 좋다)

- **멀티모달 네이티브** — 영상을 직접 입력받아 분석할 수 있는 몇 안 되는 모델. 이미지, 음성도 네이티브 처리
- **Google 생태계 연동** — Gmail, Google Docs, Sheets, Drive, Maps와 직접 통합. "내 메일에서 찾아줘"가 가능
- **무료 티어 관대** — Google AI Studio에서 Gemini 2.5 Pro를 무료로 사용 가능 (레이트 리밋 있음)
- **코딩 성능 향상** — 2.5 Pro 기준 코딩 벤치마크 30-40% 향상. 실무 코딩에도 충분한 수준
- **긴 컨텍스트** — 1M 토큰 컨텍스트. 긴 영상, 대규모 문서 분석에 유리

## 약점 (이럴 때는 피하자)

- **에이전트 코딩 미성숙** — Claude Code 같은 자율 코딩 에이전트가 아직 부족
- **지시 따르기** — 복잡한 형식 지정이나 긴 시스템 프롬프트 따르기가 Claude 대비 약함
- **응답 일관성** — 같은 프롬프트에도 응답 품질 변동폭이 큰 편
- **Google 외 연동** — Google 생태계 밖의 서비스와의 연동은 제한적

## 모델 라인업 (2026-04 기준)

| 모델 | 포지션 | 컨텍스트 | API 가격 (입력/출력, /1M 토큰) |
|------|--------|---------|------|
| **Gemini 2.5 Pro** | 플래그십 — 추론, 코딩, 멀티모달 | 1M | $1.25 / $15 |
| **Gemini 2.5 Flash** | 경량 고속 | 1M | 저렴 (Pro의 ~1/5) |
| **Gemini 2.5 Flash-Lite** | 초경량 | 1M | 최저가 |

**구독:** 무료 (AI Studio, 레이트 리밋), Gemini Advanced $20/월 (높은 리밋 + Workspace 통합)

## 실전 팁

### 시스템 프롬프트 전략
- Google AI Studio에서 "System Instructions"를 짧고 명확하게 설정
- 멀티모달 입력 시 "이 이미지에서 X를 찾아줘"처럼 구체적 지시가 효과적

### 이 모델에서만 잘 되는 것
- **영상 분석** — YouTube 영상 URL이나 직접 업로드한 영상의 내용을 이해하고 요약
- **Google Workspace 통합** — "지난주 메일 중 계약 관련 내용 정리해줘" 같은 업무 자동화
- **Veo (영상 생성)** — Advanced 구독 시 AI 영상 생성 기능 접근
- **NotebookLM** — 문서를 업로드하면 AI가 대화형으로 요약/분석해주는 독립 도구

### 다른 모델로 전환해야 할 신호
- 정밀한 코드 에이전트가 필요할 때 → Claude
- 커스텀 GPT나 플러그인 생태계가 필요할 때 → ChatGPT
- 실시간 소셜 미디어 트렌드가 필요할 때 → Grok

## 가격 & 접근성

| 플랜 | 가격 | 포함 |
|------|------|------|
| 무료 (AI Studio) | $0 | 2.5 Pro/Flash 레이트 리밋 |
| Gemini Advanced | $20/월 | 높은 리밋, Workspace 통합, Veo |
| API | 토큰 기반 | 위 라인업 표 참조 |

> 최신 가격은 [Google AI 가격 페이지](https://ai.google.dev/gemini-api/docs/pricing) 참조
