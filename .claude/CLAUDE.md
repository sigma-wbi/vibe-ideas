# .claude/CLAUDE.md -- 워크플로우 가이드 (Single Source of Truth)

> sigma-vnc-v1 — 서버 없이 동작하는 개인 Claude Code 워크플로우.
> 이 파일이 유일한 상세 가이드. 다른 곳과 충돌 시 이 파일 우선.

---

## 1. 핵심 원칙

| # | 원칙 | 설명 |
|---|------|------|
| 1 | 불확실하면 질문 | 의도/범위가 애매하면 AskUserQuestion. 추측 금지. |
| 2 | 작업 범위 준수 | current.md "작업 범위" 내 파일만 수정. |
| 3 | CC 복구 | Hook 지침대로 복구. "어디까지 했나요?" 묻지 않기. |
| 4 | 5분 규칙 | 5분 이상 결과물 없는 자율 탐색 금지. 차단 시 즉시 보고. |
| 5 | 실시간 동기화 | 매 작업 완료 즉시 current.md + state.json 업데이트. |

---

## 2. 메모리 시스템

### CC 내장 auto memory (서버 불필요)

모든 메모리는 **Claude Code 내장 파일 기반 메모리 시스템**을 사용한다.
외부 서버(DB, API 등) 없이 로컬 파일만으로 동작한다.

**저장 위치:** `~/.claude/projects/<project-hash>/memory/`
**인덱스:** `MEMORY.md` — 매 대화 시작 시 자동으로 컨텍스트에 로드됨

### 메모리 저장 방법

```
1. 인사이트 감지
2. MEMORY.md 인덱스 확인 (중복 체크 — 제목/설명 기반)
3. Write 도구로 새 파일 생성: {타입}_{slug}.md
4. MEMORY.md에 1줄 인덱스 추가
5. 사용자에게 1줄 보고
```

### 메모리 검색 방법

CC가 MEMORY.md를 자동 로드하므로, 관련 메모리 파일은 description 기반으로 판단.
필요 시 `Read` 도구로 개별 파일 열람.

### 파일 네이밍 규약 (QA-B1)

| 타입 | 파일 패턴 | CC 타입 매핑 | 설명 |
|------|----------|-------------|------|
| gotcha | `gotcha_*.md` | feedback | 삽질/함정/예상과 다른 동작 |
| pattern | `pattern_*.md` | project | 재사용 가능한 코드/설계 패턴 |
| decision | `decision_*.md` | project | 아키텍처/기술 결정 |
| insight | `insight_*.md` | project | 비자명한 동작 원리/맥락 이해 |

### MEMORY.md 운영 가이드 (QA-B2)

- **200줄 이내** 유지 (CC 자동 로드 제한)
- 각 항목 1줄: `- [제목](파일.md) — 한줄 설명`
- 오래되거나 무관한 항목은 `archived/` 폴더로 이동 + 인덱스에서 제거
- /housekeeping에서 주기적으로 정리

### 메모리 라이프사이클

```
active (memory/) → archived (memory/archived/)
```

- **active:** MEMORY.md에 인덱싱. 매 대화 시 자동 로드.
- **archived:** 인덱스에서 제거. Read로 직접 접근 가능.

### 자동 수집 규칙 (Auto-Collection)

- 감지 → MEMORY.md 확인 (제목/설명 기반 중복 체크) → 파일 저장 → MEMORY.md 업데이트 → 1줄 보고
- 세션당 최대 5건
- 저장 금지: 일회성 단계, 자명한 사실, 코드 스니펫(Idea-Only)

### MCP 도구 (서버 불필요)

| 도구 | 용도 | 활용 시점 |
|------|------|----------|
| **serena** | 코드 구조 분석 (심볼 탐색, 참조 추적, 심볼 수정) | 코드를 읽거나 수정할 때 우선 사용. **미연결 시 Read/Grep/Edit로 대체.** |
| **context7** | 라이브러리/프레임워크 최신 문서 조회 | 새 기술 도입, API 사용법 불확실, 버전 호환성 체크 시 |
| **sequential-thinking** | 복잡한 추론을 단계적으로 분해 | 멀티파일 설계, 어려운 디버깅, 아키텍처 결정 시 |

### WebSearch 활용 규칙

다음 상황에서는 **반드시** WebSearch를 사용:
- context7에서 문서를 찾을 수 없는 기술/라이브러리
- 에러 메시지를 코드 분석만으로 해결할 수 없을 때
- 최신 보안 취약점, 버전 변경사항 확인 필요 시
- 커뮤니티 사례/패턴이 필요한 경우 (Stack Overflow, GitHub Issues 등)

```
WebSearch(query="{에러 메시지} {기술 스택} site:stackoverflow.com OR site:github.com")
```

---

## 3. 5-Tier 복잡도 체계

| 등급 | 기준 | 동적 전문가 |
|------|------|-----------|
| Patch | 파일 1-2, 로직 변경 없음 | 스킵 |
| Task | 파일 2-5, 단일 관심사, 로직 변경 포함 | 선택적 (1-2명) |
| Feature | 파일 5+, FE+BE, 새 API | 필수 (2-3명) |
| Project | 멀티 도메인, DB 변경 | 필수 (3-5명) |
| Epic | 멀티 프로젝트 | 필수 (3-5명) |

---

## 4. 스킬 목록

> 각 스킬의 상세 프로토콜은 `.claude/commands/<스킬명>.md` 참조.

| # | 스킬 | 파일 | 분류 | 용도 |
|---|------|------|------|------|
| 1 | /patch | commands/patch.md | Core | spec 없이 단순 수정 즉시 실행 (파일 1-2개) |
| 2 | /spec | commands/spec.md | Core | 5-Tier 복잡도 분석 -> 등급별 스펙 생성 |
| 3 | /execute | commands/execute.md | Core | 스펙 실행 (SV + checkpoint) |
| 4 | /fix | commands/fix.md | Core | 점진적 에스컬레이션 디버깅 (5회 hard limit) |
| 5 | /qa | commands/qa.md | Core | 전문가 패널 리뷰 (spec 또는 code) |
| 6 | /reflect | commands/reflect.md | Periodic | 회고 + 메모리 보완 + 지식 정리 |
| 7 | /onboarding | commands/onboarding.md | Periodic | 프로젝트 구조 동기화 |
| 8 | /housekeeping | commands/housekeeping.md | Periodic | 메모리 정리 + stale 검증 |
| 9 | /ask | commands/ask.md | On-demand | 전문가 팀 질문 (경량) |
| 10 | /suggest | commands/suggest.md | On-demand | 상태 분석 + 다음 액션 추천 |
| 11 | /guide | commands/guide.md | On-demand | 워크플로우 가이드 |
| 12 | /study | commands/study.md | On-demand | 수준별 맞춤 교육 자료 생성 |
| 13 | /idea | commands/idea.md | On-demand | 사이드 프로젝트 아이디어 냉정 검증 (5축 분석) |
| 14 | /learn | commands/learn.md | On-demand | AI 시대 학습 고민 상담 + docs/02 Q&A 저장 |
| 15 | /cert | commands/cert.md | On-demand | 자격증 자동 등록 (자유 입력 → frontmatter) + planned→acquired git mv |

### 표준 워크플로우

**단순 수정 (파일 1-2개):**
```
/patch "수정 내용"       즉시 구현 (spec 불필요)
```

**일반 작업 (Task 이상):**
```
/spec "기능 설명"        설계 문서 생성
  ↓
/qa spec                 설계 리뷰 (권장)
  ↓
/execute                 구현
  ↓
/qa code                 코드 리뷰 (권장)
  ↓
/fix                     문제 발생 시 (필요할 때만)
  ↓
/reflect                 회고 + 인사이트 저장
```

각 스킬 완료 시 "다음 단계"가 자동 안내됩니다.
뭘 해야 할지 모르겠으면 `/suggest`.

### /execute 인사이트 자동 저장 규칙

/execute 실행 중 아래 이벤트 감지 시 CC auto memory에 즉시 저장:

| 이벤트 | 파일 패턴 | 예시 |
|--------|----------|------|
| 예상과 다른 동작/함정 | `gotcha_*.md` | "이 API는 null을 빈 배열로 반환한다" |
| 재사용 패턴/접근법 | `pattern_*.md` | "이 프로젝트에서 에러 핸들링은 Result 타입으로 통일" |
| 비자명한 동작 원리 | `insight_*.md` | "이 미들웨어는 순서가 중요: auth -> rate-limit -> handler" |

플로우: 감지 → MEMORY.md 중복 확인 → 파일 저장 → MEMORY.md 인덱스 추가 → 1줄 보고

### /fix 에스컬레이션

| 횟수 | 동작 |
|------|------|
| 1회 | 직접 수정 시도 |
| 2회 | 스택트레이스 + 관련 코드 재분석 |
| 3회 | CC memory에서 유사 gotcha 확인 |
| 4회 | root-cause 프로토콜 적용 |
| 5회 | hard limit. 사용자에게 에스컬레이션 보고 |

---

## 5. 동적 전문가

복잡한 작업 시 Claude가 작업 성격을 분석하여 적합한 전문가를 동적으로 구성:

- /qa 또는 /ask 실행 시 작업 내용에 맞는 전문가를 자동 정의
- 각 전문가의 역할, 전문 분야, 리뷰/분석 관점을 Claude가 직접 생성
- 전문가 수: Task 1-2명 / Feature 2-3명 / Project+ 3-5명
- 결과물에 참여 전문가의 역할과 전문 분야를 명시
- **가짜 인명 생성 절대 금지**. 역할 자체가 이름 (예: "Docker 아키텍트", "보안 감사관")

호출 조건: Feature+ 등급에서만 기본 적용. Patch/Task는 선택적.

---

## 6. current.md 관리

위치: `.sigma-vnc-v1/context/current.md`

- **100줄 이내** 유지
- 매 작업 완료 즉시 업데이트
- state.json과 동기 (state.json = Primary, current.md = View)

### 필수 섹션

1. 세션 상태 (active/idle)
2. 활성 작업 (이름, 등급, phase, spec 경로)
3. 작업 범위 (수정 대상 파일 목록)
4. 현재 위치 (마지막 완료, 다음 작업)
5. 차단 요소 (있을 때만)

---

## 7. Hook 시스템

| # | Hook | 이벤트 | 동기 | 역할 |
|---|------|--------|------|------|
| 1 | user-prompt-reminder | UserPromptSubmit | 동기 | 가이드라인 + 미완료 경고 |
| 2 | context-compact-recovery | PreCompact | 동기 | CC 복구 지침 주입 |
| 3 | git-guard | PreToolUse (Bash) | 동기 | git 변경 명령어 사용자 확인 |
| 4 | index-sync | PostToolUse (Edit\|Write) | 동기 | .sigma-vnc-v1/ 내부 _index.md 자동 갱신 |
| 5 | knowledge-signal | PostToolUse (AskUserQuestion) | 동기 | 선호 감지 유도 |

모든 Hook은 exit 0 보장. 실패 시 graceful degradation.

> **제거된 Hook (서버 의존):** event-capture (ClickHouse), conversation-sync (ClickHouse)

---

## 8. Context Compact 복구 프로토콜

### 정밀 복구 (state.json 기반)

Hook이 active_skill을 읽어 스킬별 최소 읽기 세트 안내:

| active_skill | 읽기 세트 | 예상 토큰 |
|-------------|----------|----------|
| spec, reflect, fix 등 | current.md만 | ~200 |
| execute (Step 1-3) | current.md → spec shell | ~400 |
| execute (Step 4+) | current.md → spec shell → 현재 phase 문서 | ~600 |
| execute --continue | current.md → 다음 phase 문서 | ~400 |
| null/missing | current.md → 등급별 전량 읽기 | ~800 |

### Fallback (state.json 없음)

1. CC summary에서 작업 파악
2. current.md 전문 읽기
3. 활성 작업의 spec 문서 읽기
4. 기록 지점에서 재개
5. 불확실하면 AskUserQuestion

### 금지

- "어디까지 했나요?" 질문
- 문서/Memory 미확인 후 추측 진행

---

## 9. 문서 산출물 저장 규칙

모든 산출물 문서는 `.sigma-vnc-v1/docs/{카테고리}/`에 저장한다.

| 폴더 | 용도 | 생성 스킬 |
|------|------|----------|
| `spec/` | 설계 문서 | /spec |
| `qa/` | QA/리뷰 결과 | /qa |
| `study/` | 학습 자료 | /study |
| `todo/` | 작업 목록 | /spec, /execute |
| `knowledge/` | 지식 정리 | /reflect, /onboarding |
| `idea/` | 아이디어 검증 | /idea |

- 프로젝트 루트나 임의 위치에 워크플로우 문서를 생성하지 않는다
- 파일 네이밍: `YYYYMMDD_{slug}_{카테고리}.md`
- `_index.md`가 디렉토리별 문서 목록을 자동 관리한다 (index-sync Hook)

---

## 10. 코드 변경 보존 규칙

알고리즘 개선/교체 시 기존 코드의 원복 가능성을 보장한다.

- **기존 함수 본체**: 삭제하지 않는다. 새 함수를 별도로 추가한다.
- **기존 호출부**: 삭제하지 않고 주석 처리하여 실행만 차단한다.
- **새 호출부**: 주석 처리된 기존 호출 바로 아래에 추가하여 대비가 명확하도록 한다.

안정성 확인 후 `/reflect`에서 이전 코드 제거 여부를 논의한다.

---

## 11. 행동 규칙

### 요청 유형 구분

| 요청 | 산출물 | 금지 |
|------|--------|------|
| "스펙/계획/spec" | .md 문서 | 코드 구현 |
| "구현/implement" | 코드 변경 | 문서만 작성 |
| 불명확 | AskUserQuestion | 추측 후 진행 |

### Multi-file 변경 프로토콜

1. **Grep** -- 전체 사용처 검색
2. **체크리스트** -- 모든 수정 대상 파일 목록
3. **수정** -- 파일별 하나씩
4. **검증** -- 최종 Grep으로 누락 확인

---

## 12. 절대 규칙

### 금지

1. 문서 동기화 없이 다음 작업 진행
2. 여러 작업 후 일괄 문서화
3. CC 후 문서/Memory 미확인
4. 5분 이상 결과물 없는 자율 탐색
5. "스펙" 요청에 코드 구현으로 응답
6. EnterPlanMode 사용 (반드시 /spec)

### 필수

1. 실시간 current.md + state.json 동기화
2. current.md 100줄 이내 유지
3. /execute 중 인사이트 자동 감지 및 저장
4. Multi-file 변경 시 Grep -> 체크리스트 -> 수정 -> 검증

---

## 13. state.json 관리

Hook이 파싱하는 기계용 상태 파일. 위치: `.sigma-vnc-v1/context/state.json`

스킬 시작/종료 시 업데이트. 초기값/파손 시 아래 스키마로 재생성:

```json
{
  "active_skill": null,
  "skill_step": null,
  "grade": null,
  "phase": null,
  "spec_path": null,
  "active_files": [],
  "tasks": {},
  "cc_count": 0,
  "last_verification": null,
  "debug_context": null,
  "last_updated": null
}
```

| 필드 | 타입 | 설명 |
|------|------|------|
| `active_skill` | string\|null | 현재 실행 중 스킬 (idle이면 null) |
| `skill_step` | number\|null | 스킬 내 Step 번호 |
| `grade` | string\|null | 5-Tier 등급 (patch/task/feature/project/epic) |
| `phase` | string\|null | 현재 Phase (Feature+ 전용) |
| `spec_path` | string\|null | 활성 spec 문서 경로 |
| `active_files` | string[] | 수정 중인 파일 목록 (최대 20개, FIFO) |
| `tasks` | object | 작업별 상태 맵 |
| `debug_context` | object\|null | /fix 실행 시 디버그 컨텍스트 |
| `cc_count` | number | Context Compact 발생 횟수 |

---

## 14. 커밋 컨벤션

사용자가 "커밋해줘"라고 요청하면 아래 규칙을 따른다.

### 포맷

```
{type}: {번호}-{설명}
```

### type 목록

| type | 용도 |
|------|------|
| feat | 새 기능/규칙 추가 |
| refactor | 기존 코드/문서 구조 변경 |
| chore | 설정, 환경, 잡무 |
| fix | 버그 수정 |
| docs | 문서 추가/수정 (코드 변경 없음) |
| idea | /idea 스킬 분석 결과물 |

### 번호 규칙

번호는 **docs 폴더 번호**를 의미한다. 변경 내용이 어느 영역에 해당하는지로 판단.

| 번호 | 영역 | 폴더 |
|------|------|------|
| 01 | Claude Code 규칙/설정 개선 | `docs/01-claude-code-refine` |
| 03 | AI 무기고 | `docs/03-ai-arsenal` |
| 04 | 사이드 프로젝트 / 아이디어 | `docs/04-side-projects` |

- **영역 미해당 시 번호 생략 가능:** 루트 설정, gitignore, CI 등 특정 영역에 속하지 않는 변경은 `chore: {설명}` 형태로 번호 없이 커밋
- **멀티 영역 변경 시:** 주된 변경 영역의 번호를 사용

### 설명

- 소문자 영어, 단어 구분은 하이픈(`-`)
- 간결하게 (what, not why)

### 커밋 절차

1. `git log --oneline`로 최근 커밋 스타일 확인
2. `git diff`로 변경 내용 파악
3. 변경 영역에 맞는 번호 + 설명으로 메시지 생성
4. `Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>` 트레일러 추가
