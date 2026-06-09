AI 시대 학습 고민을 대화형으로 상담하고, Q&A 문서를 docs/02-career-and-learning/learn/에 저장한다. 학습 전략/방법론에 대한 메타 학습 상담 스킬이다.

## 분류

**On-demand** (독립 실행, state.json 변경 없음)

## `/study`와의 차이

| | /study | /learn |
|---|---|---|
| 목적 | 특정 기술/개념 교육자료 생성 | 학습 전략/방법론 상담 (메타 학습) |
| 입력 | "React hooks", "TCP/IP" | "AI 시대 전공 공부법", "일본어 효율적 학습" |
| 출력 | 체계적 교육 문서 | 대화형 Q&A 기록 |
| 저장 | .sigma-vnc-v1/docs/study/ | docs/02-career-and-learning/learn/ |

**리다이렉트:** "React useEffect 알려줘" 같은 구체적 기술 질문 → `/study` 안내.

## 파라미터

- `$ARGUMENTS` (필수): 학습 고민 (자연어)
- `--quick` (선택): Step 1 질문 스킵, WebSearch 스킵, 문서 저장 없이 콘솔 출력만

---

## Step 1: 고민 파악

1. 사용자 입력에서 핵심 고민 추출
2. 구체적 기술 질문이면 → "/study를 사용하시면 더 체계적인 교육 자료를 받을 수 있습니다" 안내 후 진행 여부 확인
3. `--quick` 모드 → 질문 스킵, 바로 Step 2
4. AskUserQuestion으로 상황 파악:
   - 현재 수준/배경은? (입문/초급/중급/고급)
   - 이 고민의 구체적 목표는? (취업/역량강화/취미/...)
   - 주당 투입 가능 시간은?

---

## Step 2: 맞춤 답변 생성

사용자 상황에 맞는 실용적 가이드를 작성한다. **기본 태도: 공감 + 실용**.

**WebSearch 필수 사용 (`--quick` 제외):**
- 최신 학습법: `WebSearch(query="{고민 주제} 학습법 2025 2026")`
- AI 활용 사례: `WebSearch(query="{분야} AI tool learning strategy")`
- 추천 리소스: `WebSearch(query="{분야} best resources beginners 2026")`

**`--quick` 모드:** WebSearch 스킵, 일반 지식 기반으로 답변.

**답변 구성:**
1. **핵심 조언** — 3-5줄 요약
2. **학습 로드맵** — 단계별 가이드 (기간 포함)
3. **AI 활용 팁** — 이 분야에서 AI를 어떻게 활용할지
4. **추천 리소스** — 링크, 도구, 커뮤니티

---

## Step 3: 문서 저장

> `--quick` 모드: 이 Step 스킵. 콘솔 출력만.

**문서 저장:**
- 경로: `docs/02-career-and-learning/learn/YYYYMMDD_{slug}.md`
- frontmatter 포함 (title, description, date, progress: 100, tags)
- 질문 원문 + 상황 + 답변 전체 기록

**README 상담 목록 갱신:**
- `docs/02-career-and-learning/learn/README.md`의 "상담 목록" 섹션에 새 문서 링크 추가
- 형식: `- [{날짜} {고민 제목}](YYYYMMDD_{slug}.md) — {분야}`

**문서 템플릿:**

```markdown
---
title: "{고민 제목}"
description: "{한줄 요약}"
date: YYYY-MM-DD
progress: 100
tags: ["learn", "{분야}"]
order: 99
---

# {고민 제목}

> 상담일: {날짜}
> 분야: {CS/언어/AI활용/커리어/...}

## 질문

{사용자 원문 고민}

## 상황

{Step 1에서 파악한 배경, 수준, 목표, 시간}

## 답변

### 핵심 조언
{3-5줄 핵심}

### 학습 로드맵
{단계별 가이드}

### AI 활용 팁
{이 분야에서 AI를 어떻게 활용할지}

### 추천 리소스
{링크, 도구, 커뮤니티 등}

## 후속 질문

{더 깊이 탐구할 수 있는 후속 질문 2-3개}

---
*`/learn`으로 생성 — Career & Learning*
```

---

## Step 4: 완료 보고

```
📚 학습 상담 완료: {고민 제목}
   분야: {분야}
   문서: docs/02-career-and-learning/learn/YYYYMMDD_{slug}.md

   후속: /learn "{후속 질문}" — 더 깊이 탐구
         /study "{구체적 기술}" — 특정 기술 교육자료
```

---

## state.json 관리

state.json 변경 없음 (유틸리티 스킬). current.md도 변경 없음.

---

## 실패/fallback

- **WebSearch 실패:** 일반 지식 기반으로 답변 (정확도 하락 경고)
- **고민 정보 부족:** AskUserQuestion으로 추가 정보 요청
- **구체적 기술 질문:** /study 리다이렉트 안내
