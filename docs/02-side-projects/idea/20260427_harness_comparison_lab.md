---
title: "아이디어 분석: 하네스 비교 실험 자동화 도구 (Harness Comparison Lab)"
description: "동일 task / 다른 하네스 조합으로 LLM 코드 생성 결과를 자동 비교하는 OSS 도구. PASS 7.6/10 (아이디어 가치 + 기술 시연 가치)."
date: 2026-04-27
progress: 100
tags: ["idea", "harness", "llm", "oss"]
order: 99
---

# 아이디어 분석: 하네스 비교 실험 자동화 도구 (Harness Comparison Lab)

> 분석일: 2026-04-27
> 판정: **PASS**
> 총점: 7.6/10 (아이디어 가치 / 기술 시연 가치 중심 축)

---

## 아이디어 요약

동일 task / 동일 모델 / 다른 하네스(A=바닐라 / B=커스텀 하네스 / C=OMC·Claw Code 등) 조합으로
코드 생성 결과를 자동 비교하는 OSS 실험 도구. 핵심은 변인 통제, 6축 rubric 기반 자동 채점,
LLM-as-judge cross-family 검증, 결과 리포트 자동 생성.

**평가 관점:** 수익화/시장 수요는 평가에서 배제. 대신 **아이디어 자체의 기술적 가치와 학습·기술 시연 가치** 중심으로 평가한다.

**이 도구가 자연스럽게 보여주는 기술적 메시지 4가지:**
1. AI/바이브 코딩을 적극 활용한다
2. AI 결과를 무분별하게 쓰지 않고 **품질을 검증**한다
3. 여러 하네스를 다뤄봤고 **자기만의 커스텀 하네스**도 보유한다
4. 그 하네스를 **지속적으로 다듬는다**

이 4가지 메시지가 한 프로젝트로 동시에 전달되는지가 평가의 본질.

---

## 5축 분석 (아이디어 가치 / 기술 시연 가치 중심)

> 평가 관점상 **수익화/시장 수요 축은 제거**, 대신 **메시지 명확도 / 적용 범용성** 축으로 대체.

| 축 | 의미 |
|----|------|
| 1. 구현 가능성 | 주 5–8h, 1인이 합리적 기간 내 "보여줄 만한" 수준 도달 가능한가 |
| 2. 메시지 명확도 | 의도한 4가지 기술 메시지가 README/리포트에서 자연스럽게 전달되는가 |
| 3. 차별화 | 인접 OSS(promptfoo, DeepEval, lm-eval-harness 등)와 구별되는가 |
| 4. 유지/지속성 | "지속적으로 다듬는" 흐름을 자연스럽게 누적할 수 있는 구조인가 |
| 5. 적용 범용성 | 다양한 기술 맥락(AI/LLM, DevTools, 일반 SW 등)에 두루 통하는가 |

### 1. 구현 가능성 — 7/10

**근거 (긍정):**
- 커스텀 하네스를 직접 설계한 경험 기반 — Claude Code 하네스 내부 구조에 익숙. cold start 비용 거의 없음.
- 2026 시점 LLM-as-judge 도구가 성숙: promptfoo (YAML + assertion DSL + LLM-judge 내장), DeepEval (G-Eval, hallucination, custom metrics) 등을 빌딩블록으로 사용 가능. 처음부터 만들 필요 없음.
- 8주 로드맵 + 자동화 스크립트 골격이 이미 정리되어 있어 **분석 → 실행 사이 거리가 짧다**.
- MVP는 작게 가능: 하네스 3개 × task 5개 × n=3 반복 = 45 run. 1 run 평균 5분 가정 시 4시간 (병렬 시 1시간 미만).

**근거 (부정):**
- "보여줄 만한" 수준의 어려움은 **재현성/격리/판정 신뢰도**에 있다. Docker 격리, judge bias 처리, n≥3 분산 시각화 등 디테일이 본질.
- 보고서/시각화 품질이 완성도의 절반. 단순 표만으론 부족 — Astro/정적 HTML 대시보드가 추가 작업.
- 시간 가정: MVP "조용한 출시" 가능 시점 ≈ **6–8주**, 공개적으로 내세울 만한 수준 ≈ **12주**.

**점수 7:** 가능하지만 만만하지 않다. 8주에 "동작하는 MVP", 12주에 "보여줄 만한" 수준이 현실적.

### 2. 메시지 명확도 — 9/10

**핵심 강점.** 의도한 4가지 기술 메시지가 README 한 페이지에서 동시에 전달된다:

| 의도한 메시지 | 프로젝트가 자연스럽게 전달하는 방식 |
|-------------|-------------------------------------|
| ① AI/바이브 코딩 적극 활용 | 그 자체로 LLM 기반 도구. README에 "이 도구로 측정한 커스텀 하네스 자체도 Claude Code로 빌드" 명시 |
| ② 코드 품질 검증 의식 | 6축 rubric에 보안(Semgrep/Bandit), 스코프 준수, 원복 가능성이 포함됨 — "기능 정확성만으론 부족"이라는 메타 인식이 드러남 |
| ③ 자기만의 하네스 보유 | 커스텀 하네스가 **reference harness**로 등록되어 모든 비교 리포트에 등장. 별도 강조 불필요 — 도구 안에 녹아있음 |
| ④ 지속적 개선 | 새 하네스 출시(Claw Code v2, OMC 업데이트 등) 때마다 leaderboard 갱신 = commit/리포트 history 자체가 살아있는 개선 흐름 |

**위험:** "preference leakage" (judge가 evaluator와 같은 family면 self-bias 발생, ICLR 2026) 같은 평가 함정을 인지/대처하지 못하면 오히려 "AI 무비판 사용" 인상을 줄 수 있다. 이건 양날의 검 — 진지하게 다루면 9/10 강화, 무시하면 5/10으로 추락.

**점수 9:** 메시지 정렬도가 모든 축 중 최고. 단, judge bias 등 메타 이슈를 README에 정직하게 적어야 진짜 9가 된다.

### 3. 차별화 — 7/10

**경쟁/인접 도구 매핑:**

| 도구 | 한 일 | 본 프로젝트와 차이 |
|------|-------|--------------------|
| EleutherAI lm-eval-harness | LM 일반 평가 표준, Open LLM Leaderboard 백엔드 | **모델 비교**, 하네스 비교 아님 |
| BigCode evaluation harness | 코드 생성 pass@k, HumanEval/MBPP | 모델 비교, 하네스 차원 부재 |
| OpenHands/benchmarks | OpenHands 에이전트 자체 평가 | 단일 하네스 내부 평가 |
| akitaonrails/llm-coding-benchmark | 모델별 OpenCode 자동 측정 | 하네스 고정, 모델 비교 |
| **promptfoo** | YAML + LLM-judge + CI 통합 | **빌딩블록**, 본 프로젝트는 그 위 레이어 |
| **DeepEval** | G-Eval, hallucination, LLM-judge | 빌딩블록, 일반 LLM eval 용도 |
| **OpenHarness (Ohmo!)** | 하네스 자체 (실험 도구 아님) | 비교 대상이지 비교 도구 아님 |
| Vibe Code Bench v1.1 | 바이브 코딩 표준 벤치 | 모델 비교용 데이터셋. 본 프로젝트는 데이터셋 소비자 |

**차별화 핵심:**
- "**모델 고정 + 하네스 변경**"이라는 **변인 통제 방향**이 거의 비어있는 영역. 위 도구들은 그 반대(하네스 고정 + 모델 변경).
- 커스텀 하네스를 reference harness로 끼워넣어 "**자기 하네스를 객관적으로 평가받는 메타 자세**"가 드러남.
- 보안/스코프/원복 가능성을 평가축에 넣은 것 — Vibe Code Bench의 8.25% safe 결과 같은 통찰을 도구에 박아넣은 사례.

**리스크:**
- 네이밍 — "harness"가 들어간 OSS가 너무 많다. 검색 노이즈 위험.
- promptfoo 위에 얇은 레이어로 보이면 "기존 도구 조합기"로 평가받을 수 있음 — 고유한 통찰(6축 rubric, 커스텀 하네스 reference, judge cross-family 검증)을 분명히 박아야.

**점수 7:** 비어있는 niche를 정확히 찌르지만, "도구의 도구"라는 한 단계 추상이라 한눈에 차별화가 안 보일 수 있음. 포지셔닝/네이밍 작업이 점수의 1점을 좌우.

### 4. 유지/지속성 — 8/10

**구조적 강점:**
- **자연스러운 운영 사이클** — 새 하네스 출시 / 새 모델 출시 / 커스텀 하네스 업데이트 → 자동 재실행 → 리포트 갱신. 별도 동기 없이 commit history가 쌓임.
- Dogfooding 구조 — 커스텀 하네스를 다듬을 때마다 본 도구로 측정 → 본 도구가 커스텀 하네스의 진화 증거가 됨. **양방향 강화**.
- 콘텐츠 의존성 낮음 — task 셋만 있으면 모델/하네스가 바뀔 때마다 의미 있는 새 데이터 생성.
- "지속적 개선" 흐름이 **데이터로 증명**됨 — 단순 commit message가 아니라 커스텀 하네스 v1.0 → v1.5 → v2.0의 점수 변화 곡선.

**위험:**
- 인프라/Docker 환경이 OS·LLM API 변경에 취약. 6개월 방치하면 동작 중단 가능. 최소 GitHub Actions로 매주 1회 자가 점검 필요.
- 평가 비용 — 매 실행마다 LLM API 호출. 무료 티어로 한계.
- task 셋이 학습 데이터로 leak 되면 시간 지나며 의미 퇴색. **task 셋 비공개 + 결과만 공개** 옵션 고려.

**점수 8:** 운영 부담 대비 자기증식 효과가 매우 크다. 무료 티어 + 비공개 task 셋으로 비용/leak 둘 다 관리 가능.

### 5. 적용 범용성 (다양한 기술 맥락에 통하는가) — 7/10

| 기술 맥락 | 효과 | 이유 |
|------|------|------|
| **AI/LLM 인프라, MLOps** | 9/10 | 이 도구가 다루는 문제가 정확히 그 영역의 일상. 가장 직접적인 적용처. |
| **DevTools / 개발자 생산성 도구** | 8/10 | "도구를 만들고 측정하는" 메타 감각이 정확히 핏. |
| **일반 SW 엔지니어링** | 5/10 | 시류는 통하지만, 일반 알고리즘/시스템 설계 역량과는 별개의 축. **보조적 기술 시연**으로는 강함. |
| **글로벌 OSS 커뮤니티** | 7/10 | OSS 활동 = 직접적 기여 신호. 단, GitHub stars 100+ 미달이면 가시성이 반감. |

**평균 7.25.** 다양한 맥락에 통하지만 **일반 SW 엔지니어링에는 보조적 기술 시연** 위치임을 인지해야 함.

**점수 7:** 광범위하지만 만능은 아니다. AI/LLM·DevTools 맥락에 가장 강하고 그 외에는 보조적이므로 7이 정확.

---

## 종합 점수

| 축 | 점수 |
|----|------|
| 구현 가능성 | 7 |
| 메시지 명확도 | 9 |
| 차별화 | 7 |
| 유지/지속성 | 8 |
| 적용 범용성 | 7 |
| **평균** | **7.6** |
| 최저 | 7 |

**판정: PASS** (평균 7+, 최저 5+)

---

## 경쟁자/대안 분석

**직접 경쟁자 (없음):** "동일 task, 동일 모델, 다른 하네스" 변인 통제 비교 자동화 도구는 검색 시점(2026-04) 기준 공개 OSS 형태로 발견되지 않음. 인접 도구는 다음과 같이 다른 변인을 다룬다:

- **promptfoo** — 빌딩블록으로 활용. 위에서 워크플로우 레이어 구성.
- **DeepEval** — judge 메트릭(G-Eval, hallucination) 활용 가능.
- **lm-evaluation-harness / BigCode harness** — task 셋 reference 또는 호환 모드 제공 가능.
- **OpenHarness, Claw Code, OMC, claude-code-harness** — **비교 대상**(즉, 본 도구의 대상)이지 경쟁자가 아님.

**Meta-Harness (arXiv 2026)** — End-to-End 하네스 최적화 논문. 이 분야 첫 학술 시도. 본 프로젝트가 **실용 도구** 측면에서 이 흐름의 OSS 후속이라 포지셔닝 가능.

---

## 추천 MVP 범위 (8주, 주 5–8h 기준)

> 8주 학습 로드맵(`harness-engineering-meta-learning` 문서)과 정확히 합쳐진다.

**MVP-0 (Week 1–2): 골격**
- task 셋 5개 (단순 patch / 멀티파일 refactor / 모호 명세 / 디버깅 / 보안 함정)
- 하네스 어댑터 인터페이스 정의 (run, capture diff, capture metadata)
- Docker 기반 격리 실행 환경

**MVP-1 (Week 3–4): 3개 하네스**
- vanilla (CLAUDE.md 없는 깨끗한 환경)
- 커스텀 하네스 (자체 설계)
- Claw Code (Rust 재구현, 가장 공식에 가까움)

**MVP-2 (Week 5–6): 평가 파이프라인**
- pytest 기반 기능 정확성 측정
- Semgrep/Bandit 보안 스캔
- LLM-as-judge (Claude Sonnet 4.6 + GPT-5 cross-family) — preference leakage 회피
- 6축 rubric 채점 → JSON 결과

**MVP-3 (Week 7–8): 리포트**
- 정적 HTML 대시보드 (Astro) — leaderboard + 분산 시각화 + task별 drilldown
- README에 "어떻게 측정했는가" 메타 글 (judge bias 회피, n≥3 반복, 블라인드 채점)
- GitHub Actions로 push 시 자동 재실행

**MVP-4 (Week 9–12, 완성도 강화):**
- 블로그 시리즈 3편: ① 왜 하네스 비교가 필요한가 ② 평가 rubric의 rubric ③ 커스텀 하네스가 어디서 이기고 어디서 진다
- "이번 달 새로 추가된 하네스" 변경 로그
- 라이브 데모 영상 (선택)

---

## 기술 스택 제안 & 예상 아키텍처

**언어:** Python (오케스트레이션 표준), 일부 셸/Bash (run 래퍼)
**격리:** Docker + 격리된 work dir per run
**평가:**
- 기능 정확성: pytest
- 보안: Semgrep, Bandit
- 정성: promptfoo (judge orchestration) 또는 자체 wrapper
- judge model: Claude Sonnet 4.6 + GPT-5 cross-family
**저장:** JSON 결과 → SQLite (간단), Parquet (확장 시)
**시각화:** Astro 정적 HTML (별도 서버 불필요)
**CI:** GitHub Actions (주 1회 cron + push 트리거)

**아키텍처 다이어그램:**

```
[task set] ──┐
             ▼
[harness adapter] ── A/B/C ── [Docker run] ──► [diff + meta] ──┐
                                                                ▼
                                              [pytest] [semgrep] [LLM-judge × 2 family]
                                                                │
                                                                ▼
                                                      [SQLite results.db]
                                                                │
                                                                ▼
                                                     [Astro static dashboard]
                                                                │
                                                                ▼
                                                        [GitHub Pages]
```

> 이 섹션은 `/spec` 실행 시 입력으로 그대로 참조 가능.

---

## 수익화 전략 제안

**해당 없음.** 본 평가는 수익화를 의도적으로 배제 — OSS로만 운영하는 전제.
선택지로 미래 변환 가능성만 기록:
- 기업용 변환: 사내 하네스 평가 SaaS. 현재 미고려.
- 후원: GitHub Sponsors. stars 수 일정 이상 시 자연 발생 가능. 단, 목적 외 활동.

---

## 리스크 & 주의사항

**높음:**
1. **Judge bias (preference leakage)** — 같은 family judge면 self-bias. ICLR 2026 논문 인용해 README에 회피 방법 명시 필수. 회피 못하면 도구 신뢰도 추락 + 역효과.
2. **Task leak** — 공개 task가 LLM 학습 데이터에 들어가면 시간 지나며 점수 왜곡. **공개 task 50% + 비공개 holdout 50%** 권장.
3. **"기존 도구 조합기" 인식** — promptfoo + DeepEval 위 얇은 레이어로만 보일 위험. 고유한 통찰(6축 rubric 정의서, 커스텀 하네스 reference 끼워넣기, cross-family judge 정당화)을 README/블로그에 분명히.

**중간:**
4. **API 비용** — 매 실행마다 LLM 호출. 월 $20–50 정도 예상. 무료 티어로 시작, 확장 시 모니터링 필수.
5. **유지비용 — 6개월 방치 시 동작 불능 위험.** GitHub Actions로 자가 점검 cron 필수.
6. **네이밍 충돌** — "harness"가 들어간 OSS 너무 많음. 좋은 후보: `harness-arena`, `harness-diff`, `agentic-bench`, `harnesslab`. 검색 가능성 사전 확인.

**낮음:**
7. **결과의 통계적 유의성** — n=3 정도로는 약함. 단, 학습·시연 목적이므로 "방법론 정직성"이 더 중요. README에 한계 명시.
8. **하네스 측 정치성** — Claw Code, OMC 등이 자기 도구의 점수에 민감하게 반응할 수 있음. 객관성 위해 모든 결과는 raw log 공개.

---

## 최종 판정

**PASS (7.6/10).**

의도한 4가지 기술 메시지(AI 활용 + 품질 검증 + 자체 하네스 + 지속 개선)가 한 프로젝트로 자연스럽게 동시 전달되는 보기 드문 정렬도. 인접 OSS는 모델 비교에 쏠려있어 "하네스 비교"라는 비어있는 niche를 정확히 찌른다. 8주 MVP / 12주 완성 산출 일정이 학습 로드맵과 정확히 합쳐지는 것도 강점.

**단, PASS는 "이대로 하면 무조건 좋다"는 뜻이 아니다.** judge bias 처리, 네이밍, 보고서 품질이 7.6을 9+로 끌어올리거나 5로 떨어뜨릴 수 있는 변수. 특히 README와 블로그 글 1편이 코드 절반보다 중요할 수 있음을 인지할 것.

**적용 범용성 측면:** AI/LLM·DevTools 맥락에는 단독으로도 강력하나, 일반 SW 엔지니어링 맥락에서는 다른 기술 축과 병행할 때 가치가 산다.

---

## 분석 과정 메모

**평가축 변경 근거:**
본 평가는 수익화/시장 수요를 배제하고 아이디어 자체의 기술적 가치와 학습·기술 시연 가치 중심으로 재정의.
- 제거: 수익화, 시장 수요
- 유지: 구현 가능성, 차별화, 지속 가능성
- 추가: 메시지 명확도(의도한 4가지 기술 메시지 전달력), 적용 범용성(다양한 기술 맥락 커버)

**WebSearch 쿼리:**
1. `harness comparison benchmark tool open source github 2026 LLM coding agent`
2. `AI coding agent eval framework side project github stars`
3. `"LLM-as-judge" evaluation pipeline open source 2026`
4. `developer AI infrastructure devtools open source 2026`

**핵심 발견:**
- "동일 모델 + 다른 하네스" 변인 통제 도구는 공개 OSS 형태로 부재. niche 비어있음.
- 인접 도구(promptfoo, DeepEval, lm-eval-harness)는 빌딩블록으로 활용 가능 — 처음부터 만들 필요 없음.
- ICLR 2026 "preference leakage" 논문 — judge bias가 학술적으로 인정된 함정. README에 인용 시 신뢰도 강화.
- Vibe Code Bench v1.1: Claude 4 Sonnet 결과 47.5% 정확 / 8.25%만 안전. 보안 평가축 정당화 데이터.
- 2026 트렌드: "production 신뢰성", "AI를 어떻게 사용하고 검증하는가"가 핵심 화두.
- Claw Code 72k stars 사례 — 본 프로젝트의 천장은 아니지만, "하네스 비교"의 시류 강도를 보여줌.

**유사한 기술 메시지를 주는 대안 아이디어도 검토했으나 본 안이 우월:**
- "커스텀 하네스만 OSS화" — 메시지 ③④는 강하지만 ②(품질 검증)가 약함. 너무 많은 유사 OSS와 묻힘.
- "단순 코드 품질 분석 도구" — 메시지 ①(AI 적극 활용)이 약함. 차별화도 낮음.
- "하네스 비교 자동화" — 4가지 메시지 모두 자연스럽게 전달. 가장 정렬도 높음.

**판정 변동 가능성:**
- 만약 적용 맥락을 "일반 SW 엔지니어링 단독"으로 좁히면 적용 범용성 5점 → 평균 7.0 → 여전히 PASS지만 강도 약화.
- 만약 투입 시간이 "주 2–3h"였다면 구현 가능성 5점 → 평균 7.0 → 12주가 16–20주로 늘어나 timing 리스크 증가.

---

## 후속 설계 (2026-05-29): 4-조합 어댑터 확장 (템플릿 × 표면)

> 출처: sigma-claude-antigravity-templates 설계 spec Phase 4 (설계 only).
> 전제: sigma-claude-v1(Claude Code용) + sigma-antigravity-v1(Antigravity용) 두 템플릿이 구현됨(Phase 1·2). 이 둘을 비교 도구의 어댑터 차원으로 확장.

### 비교 4-조합

| # | 템플릿 | 표면(surface) | 엔진/모델 |
|---|--------|---------------|-----------|
| 1 | sigma-claude-v1 | Cursor/VSCode/Antigravity IDE 확장 | Claude Code / Opus |
| 2 | sigma-claude-v1 | Claude 데스크탑 | Claude Code(desktop) / Opus |
| 3 | sigma-antigravity-v1 | Antigravity IDE | Antigravity / Gemini |
| 4 | sigma-antigravity-v1 | Antigravity 2.0 | Antigravity(desktop) / Gemini |

→ 변인이 **3축(템플릿 / 표면 / 모델)** 으로 확장. 기존 "하네스 고정+모델 변경"의 반대인 변인 통제를 더 정교화.

### 어댑터 인터페이스 (의사 스펙)

```
HarnessRunConfig: { template, surface, engine, model, task_id }
HarnessAdapter: setup(workdir) / run(task)->RunResult / capture()->{diff,meta,logs,artifacts} / teardown()
```

### ⚠️ A3 (QA 지적, /execute 전 미해결 — 구현 전 반드시 확정)

**4셀이 실제로 다른 결과를 내는지 불명.** combo 1·2는 둘 다 *Claude Code 엔진 + 동일 템플릿* → surface가 엔진 동작을 안 바꾸면 결과 동일 → 셀 collapse. **구현 전 "각 surface가 무엇을 바꾸는가"를 정의**하고, 동일하면 셀 통합 또는 surface를 부차 변인으로 강등할 것. (사용자 확인 필요 항목)

### A4 (QA 지적): 측정 모드 분리

CLI 자동(n≥3, combo 1·3는 Claude Code CLI/Antigravity CLI로 headless 가능)과 GUI 수동(n=1, combo 2·4 데스크탑)을 **같은 leaderboard에 혼합 금지**. 가능하면 4개 모두 CLI 동치 진입점으로 측정해 surface를 얇은 변인으로; 불가 시 GUI는 별도 정성 트랙.

### 이번 spec이 확보한 확장점 (구현됨)

- ✅ **state.json 스키마 동일** — 두 템플릿 setup/install이 동일 스키마 생성 → 비교 도구 단일 파서 가능.
- ✅ **CLI 진입점 명시** — sigma-claude-v1=Claude Code CLI, sigma-antigravity-v1=Antigravity CLI (각 README/DEPLOY).
- ⬜ **run manifest 컨벤션** (제안): 두 템플릿이 run마다 동일 포맷(diff+meta) 산출물을 emit하도록 표준화 → 추후 구현 spec에서.

### 비포함 (별도 Project /spec)

Docker 격리 · 6축 rubric · LLM-judge cross-family · Astro 대시보드 · GitHub Actions — 본 idea(MVP-0~4) 기반으로 추후 `/spec "하네스 비교 실험 자동화 도구 MVP"`.

---

*다음 단계: PASS — "하네스 비교 실험 자동화 도구 MVP" 설계 진입 권장.*
*보조: "rubric의 rubric — 평가 도구 자체를 어떻게 검증하는가"를 별도로 깊이 보강하면 평가 신뢰도가 강화된다.*
