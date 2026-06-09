---
title: "sigma-vnc-v1 템플릿 분석"
description: "현재 사용 중인 CC 워크플로우 템플릿의 아키텍처, 스킬, 훅, 메모리, 프로토콜 상세 분석"
date: 2026-04-01
progress: 100
tags: ["claude-code", "sigma-vnc-v1", "workflow", "analysis"]
order: 3
---

# sigma-vnc-v1 템플릿 분석

> 서버 없이 동작하는 개인 Claude Code 워크플로우

## 개요

sigma-vnc-v1은 ouroboros에서 서버 의존성을 완전히 제거한 경량 CC 워크플로우 템플릿이다. 파일 기반 메모리, 5개 Hook, 14개 스킬, 10개 명문화 프로토콜로 구성되며, 별도 설치 없이 파일 복사만으로 어떤 프로젝트에든 적용할 수 있다.

## 아키텍처

```
.sigma-vnc-v1/
├── VERSION                          # 템플릿 버전 (1.0.0)
├── Makefile                         # 40+ make 타겟 (진단, 설정, 가이드)
├── context/
│   ├── current.md                   # 세션 상태 (사람용, 100줄 제한)
│   └── state.json                   # 세션 상태 (기계용, Hook 파싱)
├── docs/                            # 산출물 저장소
│   ├── spec/   qa/   study/         # 스킬별 산출물
│   ├── knowledge/   todo/   idea/
│   └── _index.md                    # 자동 갱신 인덱스
├── hooks/                           # 5개 자동화 Hook
│   ├── user-prompt-reminder.sh
│   ├── git-guard.sh
│   ├── index-sync.sh
│   ├── context-compact-recovery.sh
│   ├── knowledge-signal.sh
│   └── lib/common.sh
├── scripts/                         # 유틸리티
│   ├── setup-env.sh   guide.sh
│   ├── init-indexes.sh   claude-new-doc.sh
└── workflow/
    ├── protocols/                   # 10개 운영 프로토콜
    └── templates/                   # 등급별 spec 템플릿

.claude/
├── CLAUDE.md                        # SSoT (상세 가이드)
├── settings.json                    # Hook 등록 + MCP 권한
└── commands/                        # 14개 스킬 정의
```

## 스킬 시스템 (14개)

### Core (실행 경로)

| 스킬 | 용도 | 입력 → 출력 |
|------|------|------------|
| `/patch` | spec 없이 즉시 수정 | "수정 내용" → 코드 변경 (1-2 파일) |
| `/spec` | 5-Tier 복잡도 분석 → 설계 문서 | "기능 설명" → spec.md |
| `/execute` | spec 기반 구현 | spec 경로 → 코드 + Signal + Scope Audit |
| `/fix` | 7단계 에스컬레이션 디버깅 | 에러 메시지 → 버그 수정 (5회 hard limit) |
| `/qa` | 동적 전문가 패널 리뷰 | spec 또는 code → 채택/보류/기각 보고서 |

### Periodic (지식 합성)

| 스킬 | 용도 | 주기 |
|------|------|------|
| `/reflect` | 회고 + 인사이트 발견 + 메모리 저장 | /execute 후 |
| `/onboarding` | 프로젝트 구조/선호 동기화 (3모드) | 큰 변경 후 |
| `/housekeeping` | 메모리 정리 (중복/stale/위반 검사) | 월 1회 |

### On-demand (경량 도구)

| 스킬 | 용도 |
|------|------|
| `/ask` | 전문가 팀에 경량 질문 (문서 미생성) |
| `/suggest` | 현재 상태 분석 → 다음 액션 추천 |
| `/guide` | 워크플로우 사용법 안내 |
| `/study` | 특정 기술/개념의 수준별 교육 자료 생성 |
| `/idea` | 사이드 프로젝트 아이디어 5축 검증 |
| `/learn` | AI 시대 학습 고민 상담 + Q&A 기록 |

### 표준 워크플로우

```
단순 수정:  /patch "내용"

일반 작업:  /spec → /qa spec → /execute → /qa code → /reflect
```

## Hook 시스템 (5개)

모든 Hook은 exit 0 보장. 서버 의존성 없음.

| Hook | 이벤트 | 역할 |
|------|--------|------|
| user-prompt-reminder | UserPromptSubmit | 매 입력마다 가이드라인 + 미완료 경고 주입 |
| git-guard | PreToolUse(Bash) | git 변경 명령어(commit/push/reset) 사용자 확인 |
| index-sync | PostToolUse(Edit\|Write) | .sigma-vnc-v1/docs/ 내부 _index.md 자동 갱신 |
| context-compact-recovery | PreCompact | CC 발생 시 state.json 기반 정밀 복구 지침 주입 |
| knowledge-signal | PostToolUse(AskUserQuestion) | 사용자 응답에서 선호 신호 감지 유도 |

## 메모리 시스템 (파일 기반)

### 저장 구조

```
~/.claude/projects/<project-hash>/memory/
├── MEMORY.md              # 인덱스 (200줄 제한, 매 세션 자동 로드)
├── gotcha_*.md            # 함정/예상과 다른 동작
├── pattern_*.md           # 재사용 가능한 패턴
├── decision_*.md          # 아키텍처/기술 결정
├── insight_*.md           # 비자명한 동작 원리
└── archived/              # 30일+ 미사용 항목
```

### 라이프사이클

```
active (MEMORY.md 인덱싱)
  → 30일 미사용 → stale_candidate
  → archived/ 이동 + 인덱스 제거
```

### Auto-Collection (/execute 중)

6가지 트리거로 인사이트를 자동 감지하여 메모리에 저장:
- 예상과 다른 동작 → gotcha
- 3회+ 시도 후 해결 → gotcha
- 재사용 가능한 패턴 → pattern
- 설계/기술 선택 → decision
- 비자명한 동작 원리 → insight
- 세션당 최대 5건, Idea-Only 검증 (코드/경로 포함 금지)

## 프로토콜 라이브러리 (10개)

`.sigma-vnc-v1/workflow/protocols/`에 명문화된 운영 규칙:

| 프로토콜 | 역할 |
|----------|------|
| auto-collection | /execute 중 인사이트 자동 수집 (6 트리거, 5건 제한) |
| signal-governance | Signal 큐 관리 (6 타입, TTL + persistent) |
| checkpoint-strategy | Phase 진행 시 검증 게이트 |
| phase-memory-retrieval | Phase별 관련 메모리 사전 로딩 |
| knowledge-signal | 사용자 응답에서 선호 추론 |
| root-cause | 체계적 근본 원인 분석 |
| self-verification | 커밋 전 코드/설계 정합성 검증 |
| staleness-detection | 메모리 신선도 검증 |
| verification-pyramid | 다단계 품질 보증 (unit → integration → system) |
| agent-invocation | 동적 전문가 구성 규칙 |

## 5-Tier 복잡도 체계

| 등급 | 파일 수 | 특징 | 전문가 |
|------|--------|------|--------|
| Patch | 1-2 | 로직 변경 없음 | 0명 |
| Task | 2-5 | 단일 관심사 | 0-2명 |
| Feature | 5+ | FE+BE, 새 API | 2-3명 |
| Project | 8+ | 멀티 도메인, DB | 3-5명 |
| Epic | 다수 | 멀티 프로젝트 | 3-5명 |

점수 기반 자동 판정 + Floor Rule(구조적 최소 등급) + 사용자 확인.

## 동적 전문가 시스템

가짜 인명 생성 금지. 역할 자체가 이름이다.

- Claude가 작업 성격을 분석하여 적합한 전문가를 자동 정의
- 각 전문가의 역할, 전문 분야, 리뷰 관점을 동적으로 생성
- /qa, /ask에서 활용
- 전문가당 토큰 예산: ~8,000 토큰

## 강점

- **설치 제로** — 파일 복사만으로 적용. Docker, DB, 서버 불필요
- **포터블** — 환경에 종속되지 않음. 어디서든 동작
- **사람이 읽을 수 있는 메모리** — 마크다운 파일이라 직접 편집 가능
- **명문화된 프로토콜** — 암묵지를 형식지로 전환
- **Hook 자동화** — 가이드라인 주입, git 안전장치, 인덱스 동기화, CC 복구가 자동

## 한계

- **시맨틱 검색 없음** — description 기반 매칭이라 메모리 수백 건 이상 시 정확도 하락
- **이벤트 로깅 없음** — 세션 간 정량적 분석 불가
- **지식 그래프 없음** — 메모리 간 관계/일반화 기능 미지원
- **메모리 200줄 제한** — MEMORY.md 인덱스가 200줄을 넘으면 잘림

---
*Claude Code Refine*
