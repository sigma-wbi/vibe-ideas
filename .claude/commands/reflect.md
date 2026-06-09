최근 작업을 회고하여 인사이트를 발견하고 CC auto memory에 저장한다. gotcha/pattern/decision/insight 유형별로 분류하여 파일로 저장하고 MEMORY.md 인덱스를 업데이트한다. evolve 스킬의 "지식 정리/일반화" 기능도 이 스킬에서 수행한다.

## 파라미터

- `$ARGUMENTS` (선택): 회고 대상 (없으면 최근 작업)

---

## Step 1: 최근 작업 분석

current.md에서 최근 완료 작업 확인:
- 관련 spec 문서 경로
- 수행한 작업 목록
- 발생한 이슈/차단 요소

**코드 변경 영향 파악 (serena):**
```
mcp__serena__find_referencing_symbols(symbol_name="{변경한 핵심 심볼}")
```
→ 작업 중 변경한 코드가 다른 곳에 미친 영향을 파악하여 인사이트 발굴에 활용
- **fallback:** serena MCP 미연결 시 git diff 기반으로 파악

---

## Step 2: 기존 메모리 중복 확인

MEMORY.md 인덱스를 읽어 기존 메모리와 중복 여부 확인:

**중복 판단 기준:**
- 같은 기술 + 같은 문제 → 기존 파일을 Edit으로 보강
- 같은 기술 + 다른 문제 → 새 파일로 저장
- 기존 메모리 부정확 → 기존 파일을 Edit으로 수정

---

## Step 3: 인사이트 발견

작업 과정에서 다음 유형의 인사이트 식별:

| 유형 | 파일 패턴 | 설명 | 예시 |
|------|----------|------|------|
| **gotcha** | `gotcha_*.md` | 예상과 다른 동작, 삽질, 함정 | "bcrypt hash 비교 시 timing attack 주의" |
| **pattern** | `pattern_*.md` | 재사용 가능한 패턴 | "3계층 에러 처리 전략" |
| **decision** | `decision_*.md` | 설계 결정 + 근거 | "JWT 대신 세션 선택: 이유는..." |
| **insight** | `insight_*.md` | 비자명한 동작 원리, 맥락 이해 | "비동기 처리에서 상태 관리 순서가 중요한 이유" |

**지식 정리 (evolve 흡수):**
- 여러 gotcha/pattern이 같은 주제로 쌓여있으면 → 하나의 종합 insight로 정리
- 이전 메모리를 archived/로 이동하고 새 종합 문서 작성

---

## Step 4: 저장 품질 체크리스트

각 인사이트에 대해 검증:

1. **제목이 검색 가능한가?** — 6개월 후 MEMORY.md에서 이 항목을 찾을 수 있는가?
2. **내용이 자기완결적인가?** — 이 파일만 읽고 문제를 이해+해결 가능한가?
3. **코드 스니펫이 없는가?** — 파일 경로, 코드 블록, 라인 번호 포함 금지 (Idea-Only)
4. **중복이 아닌가?** — Step 2에서 확인

검증 실패 → 인사이트 재작성 또는 폐기

---

## Step 5: 사용자 확인

AskUserQuestion으로 발견된 인사이트 요약 제시:
- 유형별 목록
- 저장 예정 내용 요약
- 수정/추가/삭제 가능

---

## Step 6: CC auto memory에 저장

각 인사이트를 파일로 저장:

**1. 메모리 파일 생성:**
```
Write(
    file_path="~/.claude/projects/<project>/memory/{type}_{slug}.md",
    content=파일내용
)
```

**메모리 파일 포맷:**
```markdown
---
name: {검색 가능한 제목}
description: {한줄 설명 — MEMORY.md 인덱스에 사용}
type: {user|feedback|project|reference}
---

{자기완결적 내용}

**Why:** {왜 이것이 중요한가}
**How to apply:** {언제/어디서 이 지식을 적용하는가}
```

**유형 → CC 타입 매핑:**

| 유형 | CC type | 사유 |
|------|---------|------|
| gotcha | feedback | 실수/함정 → 교정 정보 |
| pattern | project | 프로젝트에서 재사용 |
| decision | project | 프로젝트 맥락의 결정 |
| insight | project | 프로젝트 관련 이해 |

**2. MEMORY.md 인덱스에 추가:**
```
- [{제목}]({type}_{slug}.md) — {한줄 설명}
```

**3. 사용자에게 보고:**
```
💾 메모리 저장: {type}_{slug}.md — "{제목}"
```

---

## Step 7: current.md 업데이트

완료된 회고 내역 기록.

---

## 선택적: 이전 코드 제거 논의

/execute 중 "코드 변경 보존 규칙"으로 주석 처리된 기존 코드가 있다면:
- 안정성이 확인되었는지 AskUserQuestion
- 확인되면 기존 주석 코드 제거 제안

---

## 등급별 차이

없음 (모든 등급에서 동일)

---

## 실패/fallback

- **인사이트 없음:** "이 세션에서 특별한 학습 사항 없음" 안내 후 종료
- **"순조로운 작업" 저장 폐지:** 문제 없이 동작한 것은 지식이 아님 — 아무것도 저장하지 않음

---

## 다음 단계

회고 완료 시 안내:

```
✅ 회고 완료: {저장된 인사이트 수}건 저장

📋 다음 단계:
  새 작업: /suggest — 다음 할 일 추천
  정리: /housekeeping — 메모리 품질 관리
```
