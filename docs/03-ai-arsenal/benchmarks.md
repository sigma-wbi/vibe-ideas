---
title: "플래그십 모델 벤치마크 — Opus 4.8 vs GPT-5.5 vs Gemini 3.x"
description: "3사 최신 플래그십 LLM의 출시 현황·코딩/추론 벤치마크·가격을 표 중심으로 비교 (2026년 5월 기준)"
date: 2026-05-29
last_verified: 2026-05-29
progress: 100
tags: ["arsenal", "llm", "benchmark", "claude-opus", "gpt", "gemini"]
order: 6
---

# 플래그십 모델 벤치마크 — Opus 4.8 vs GPT-5.5 vs Gemini 3.x

> ⚠️ 신뢰도 주의: **2026-05-29 시점 웹 리서치** 기반. 공식 소스 우선, 미확인은 "🟡 확인 불가" 표시.
> 상황별 추천 매트릭스는 [LLM 비교표](comparison.md), 이 모델들을 구동하는 코딩 에이전트 비교는 [AI 코딩 에이전트 비교](coding-agents/comparison.md) 참조.

## 핵심 요약 (4줄)

1. **2026-05-29 현행 플래그십**: Anthropic **Claude Opus 4.8**(5/28 출시), OpenAI **GPT-5.5**(4/23), Google **Gemini 3.5 Flash**(5/19, Pro는 "곧 롤아웃" 예고만).
2. **코딩 1위 다툼은 Opus 4.8 ↔ GPT-5.5의 양강.** 대표 지표 SWE-bench Verified는 **88.6% vs 88.7%로 사실상 동률**. 더 어려운 SWE-bench Pro에선 **Opus 4.8(69.2%)이 GPT-5.5(58.6%)에 우위**.
3. **Gemini는 순수 추론(GPQA 94.3%, ARC-AGI-2 77.1%)에선 최상위권이지만, 에이전트 코딩(SWE-bench)에선 80% 초반대로 한 발 뒤. 대신 가격이 가장 싸다($2/$12).**
4. ⚠️ **벤치마크 직접 비교 주의**: Terminal-Bench는 v2.0/v2.1이 섞여 있어 단순 숫자 비교 불가. GPT-5.6·Gemini 3.5 Pro 정식 벤치는 미공개(루머/예고 단계).

---

## §1. 현행 플래그십 라인업 (2026-05-29)

| 벤더 | 최신 플래그십 | 출시일 | 비고 |
|---|---|---|---|
| **Anthropic** | **Claude Opus 4.8** | 2026-05-28 | 현행 최신. 직전 Opus 4.7(약 41일 전) |
| **OpenAI** | **GPT-5.5** (+ GPT-5.5 Pro) | 2026-04-23 발표 / 4-24 API | 코드명 "Spud". 무료티어 GPT-5.5 Instant는 5/5 |
| **Google** | **Gemini 3.5 Flash** | 2026-05-19 (I/O 2026) | Gemini 3.5 **Pro**는 "다음 달 롤아웃" 예고만 → 정식 벤치 🟡 미공개 |

**각 사 전체 라인업 (참고):**
- **Anthropic**: Opus 4.8 / Sonnet 4.6(2026-02-17, 1M 컨텍스트) / Haiku 4.5(2025-10). *Haiku는 모든 마이너 리비전마다 내지 않음 — Haiku 4.6 미존재.*
- **OpenAI (Codex 모델군)**: gpt-5.5(기본, 400K 컨텍스트) / gpt-5.4 / gpt-5.4-mini(서브에이전트용) / gpt-5.3-codex(코딩 전용) / gpt-5.3-codex-spark / gpt-5.2(retire 중). *"GPT-5.5-Codex"라는 별도 모델명은 없음 — GPT-5.5가 Codex 기본 모델이 된 것.*
- **Google**: Gemini 3.5 Flash(기본) / Gemini 3.1 Pro(2026-02-19, 풀 벤치 공개된 최신 Pro) / Gemini 3 Flash. *Gemini 3.2는 출시되지 않고 3.5로 점프(3.2 리크가 3.5로 리브랜딩).*

---

## §2. 벤치마크 비교 표 (코딩·추론 중심)

> 출처: anthropic.com·llm-stats.com(Opus 4.8), tokenmix.ai·marc0.dev·interestingengineering(GPT-5.5), blog.google·almcorp(Gemini). 모두 2026-05 자료.

| 벤치마크 | **Opus 4.8** | **GPT-5.5** | **Gemini 3.1 Pro** | **Gemini 3.5 Flash** |
|---|---|---|---|---|
| **SWE-bench Verified** (대표 코딩) | 88.6% | **88.7%** | 80.6% | 78% |
| **SWE-bench Pro** (더 어려움) | **69.2%** | 58.6% | 54.2% | 🟡 |
| **SWE-bench Multilingual** | 84.4% | 🟡 | 🟡 | 🟡 |
| **Terminal-Bench** ⚠️버전주의 | 74.6% (v2.1) | 82.7% (v2.0) | 68.5% (v2.0) | 76.2% (v2.1) |
| **GPQA Diamond** (대학원 추론) | 93.6% | 🟡 | **94.3%** | 🟡 |
| **OSWorld-Verified** (컴퓨터 조작) | **83.4%** | 🟡 | 🟡 | 🟡 |
| **ARC-AGI-2** | 🟡 | 🟡 | 77.1% | 🟡 |
| **USAMO 2026** (수학) | 96.7% | 🟡 | 🟡 | 🟡 |
| **MMLU** | 🟡 | 92.4% | 🟡 | 🟡 |

⚠️ **Terminal-Bench 함정**: Opus 4.8·Gemini 3.5 Flash는 **v2.1**, GPT-5.5·Gemini 3.1 Pro는 **v2.0** 점수다. 버전이 다르면 직접 비교 불가. "GPT-5.5 82.7% > Opus 4.8 74.6%"를 단순 비교하면 **틀린 결론**이 나올 수 있다.

🟡 = 신뢰 가능한 2026-05 수치 확인 불가 (해당 모델 공식 페이지 접근 실패 또는 미공개).

---

## §3. 가격 비교 ($/1M tokens, 2026-05)

| 모델 | Input | Output | 컨텍스트 | 비고 |
|---|---|---|---|---|
| **Claude Opus 4.8** (standard) | $5 | $25 | — | fast(2.5×) 모드 $10/$50 |
| **GPT-5.5** (short ctx) | $5 | $30 | ~1.05M | >272K 토큰 시 input 2×/output 1.5×. Batch $2.50/$15 |
| **Gemini 3.1 Pro** | **$2** | **$12** | — | **셋 중 최저가** |
| Gemini 3.5 Flash | 🟡 | 🟡 | — | 공식 블로그에 단가 미기재 |
| (참고) Claude Sonnet 4.6 | $3 | $15 | 1M | 가성비 라인 |
| (참고) GPT-5.2-Codex | $1.75 | $14 | — | 코딩 전용 저가 |
| (참고) Claude Haiku 4.5 | $1 | $5 | — | 최경량 |

> 요약: **Gemini 3.1 Pro가 가장 저렴**($2/$12). Opus 4.8($5/$25)과 GPT-5.5($5/$30)는 input 동률, output은 Opus가 약간 저렴. 코딩 성능이 거의 동률인 점을 감안하면 **Opus 4.8이 GPT-5.5보다 output 단가에서 유리**.

---

## §4. 해석 — 누가 무엇을 잘하나

- **에이전트 코딩 (실무 핵심)**: **Opus 4.8 ≈ GPT-5.5 양강.** 헤드라인 지표(SWE-bench Verified)는 OpenAI가 0.1%p 앞서지만, *더 어려운 Pro 벤치에선 Anthropic이 ~10%p 우위*. "쉬운 건 OpenAI, 어려운 건 Anthropic"이라는 평.
- **컴퓨터 조작 (computer use)**: **Opus 4.8이 OSWorld 83.4%로 시장 최강**이라 보도. (Codex의 computer use 기능과 별개로, 모델 자체 능력)
- **순수 추론/지식**: **Gemini 3.1 Pro가 GPQA 94.3%, ARC-AGI-2 77.1%로 최상위권.** 수학·과학 추론 강점.
- **가성비**: **Gemini가 가격 최저.** 코딩에서 한 발 뒤지지만 대량/비용 민감 작업엔 매력적.
- **속도/효율**: Gemini 3.5 Flash가 "3.1 Pro를 거의 모든 벤치에서 능가하며 4배 빠르다"(Google 주장) — Flash 라인이 빠르게 강해지는 중.

---

## §5. 미확인 / 루머 구분 (중요)

| 항목 | 상태 |
|---|---|
| **GPT-5.6** | 🟡 **미출시.** Codex 백엔드 로그·코드명·예측시장 기반 소문만. 6월 예상은 추측 |
| **Gemini 3.5 Pro 벤치마크** | 🟡 **미공개.** 모델이 "곧 롤아웃" 중이라 정식 수치 없음 |
| **Gemini 3.2** | 출시 안 됨 — 3.1 → 3.5로 점프 (3.2 리크가 3.5로 리브랜딩) |
| **GPT-6 / Opus 5 / Gemini 4** | 🟡 발표 없음 |
| **GPT-5.5 일부 수치** | 공식 페이지 HTTP 403 → 2차 매체(복수 출처 일치)로 보강. SWE-bench Verified 88.7%·Terminal-Bench 2.0 82.7%는 여러 소스 교차 확인 |

---

## 한 줄 결론

> **실무 코딩 메인은 Opus 4.8로 충분**(GPT-5.5와 동률이고 어려운 작업엔 더 강함). **비용 민감한 대량 작업은 Gemini 3.1 Pro($2/$12)**, **순수 추론·수학·과학은 Gemini가 약간 우위.** 벤치마크 0.1%p 차이에 휘둘릴 필요는 없다 — **체감 차이는 모델보다 하네스에서 더 크게 난다** ([→ 코딩 에이전트 비교](coding-agents/comparison.md)).

---

*2026-05-29 웹 리서치 기반. 미확인 항목은 🟡 표시. 모델 시장은 빠르게 변하므로 `last_verified` 날짜 확인 필수.*
*출처: anthropic.com/news/claude-opus-4-8, llm-stats.com, openai.com/index/introducing-gpt-5-5, tokenmix.ai, marc0.dev, blog.google(gemini-3-5), almcorp.com, gemini3.us, devtk.ai 등 2026-05 자료.*
