동적 전문가 팀을 호출하여 검토/비교/브레인스토밍 등 경량 협업 작업을 수행한다. 계획 문서를 생성하지 않고, current.md를 업데이트하지 않는 일회성 스킬이다.

## 파라미터

- `$ARGUMENTS` (필수): 질문/작업 설명
- `--experts <구성>` (선택): 전문가 구성 자연어 지정 (예: `--experts "보안 전문가 2명, 성능 전문가 1명"`)

---

## /spec, /qa와의 차이

- 계획 문서 생성 없음
- 복잡도 판정 없음
- current.md 업데이트 없음 (일회성)
- state.json 변경 없음 (유틸리티 스킬)
- 문서화 선택적

---

## Step 1: 관련 지식 검색

**MCP 도구:**
```
CC memory(MEMORY.md) 확인(query="{task keywords}", limit=5)
```

과거 gotcha/패턴 발견 시 → 전문가에게 컨텍스트로 전달.
MCP 실패 → 히스토리 없이 진행.

**코드 관련 질문 시 (serena):**
```
mcp__serena__get_symbols_overview(relative_path="{관련 파일}")
mcp__serena__find_symbol(name_path="{질문 대상 심볼}", include_body=true)
```
→ 질문 대상 코드의 구조와 본문을 전문가에게 컨텍스트로 전달
- **fallback:** serena MCP 미연결 시 Read로 대체

**기술 비교/선택 질문 시 (context7):**
```
mcp__context7__resolve-library-id(library="{비교 대상}")
→ mcp__context7__query-docs(library_id="{id}", query="{비교 기준}")
```
→ 최신 공식 문서 기반 비교 자료를 전문가에게 전달
- **fallback:** context7 MCP 미연결 시 WebSearch로 대체

**복잡한 질문 시 (sequential-thinking):**
```
mcp__sequential-thinking__sequentialthinking(thought="{질문 내용}을 분석하기 위한 체계적 접근 방법 수립")
```
→ 전문가에게 전달하기 전에 질문을 구조화
- **fallback:** sequential-thinking MCP 미연결 시 직접 구조화

---

## Step 2: 전문가 구성

`--experts` 지정 시: 자연어를 파싱하여 전문가 패널 구성.

`--experts` 미지정 시: Claude가 질문 내용을 분석하여 적합한 전문가를 자동 구성 (1-3명).
AskUserQuestion으로 구성 확인/수정.

**자동 구성 예시:**
| 질문 유형 | 자동 구성 예시 |
|----------|--------------|
| 설계 검토 | 시스템 아키텍트 2명, 보안 검증 전문가 1명 |
| 기술 분석 | 기술 비교 분석가 2명, 아키텍트 1명 |
| 버그 진단 | 디버깅 전문가 2명, 성능 분석가 1명 |
| 기타 | 질문 성격에 맞는 전문가 1-3명 |

---

## Step 3: 전문가 순차 분석

각 전문가의 관점에서 순차적으로 분석을 수행한다. 공통 컨텍스트(코드, 메모리, 문서)를 공유하고 관점만 달리한다:

```
FOR each expert in panel:
    [{역할}] 관점 분석:
    - 전문 분야: {Claude가 질문 성격에 맞게 정의}
    - 분석 관점: {Claude가 질문 성격에 맞게 정의}
    - 입력: 공통 컨텍스트 (질문 + 코드 + 메모리 + 문서)
    - 출력: 핵심 의견(2-3문장) + 상세 분석 + 구체적 제안
```

**구현:** Claude가 각 전문가 역할을 순차적으로 수행하며, 이전 전문가의 의견을 참고하여 다각도 분석을 축적한다.

---

## Step 4: 결과 통합

1. 참여 전문가 명시:
   ```
   🧑‍💼 참여 전문가:
     1. {역할} — {전문 분야}
     2. {역할} — {전문 분야}
     ...
   ```
2. 전문가별 핵심 의견 요약
3. 공통점/차이점 정리
4. AskUserQuestion으로 선택:
   - 특정 전문가 의견 채택
   - 여러 의견 혼합
   - 사용자 직접 작성
5. **선택적 저장:** 사용자가 원할 경우 `.claude/collaborations/` 에 저장

---

## 등급별 차이

없음 (등급 무관 경량 스킬)

---

## 실패/fallback

- **전문가 호출 실패:** 단일 전문가로 순차 실행
- **MCP 미연결:** 히스토리 없이 진행 (전문가 호출은 MCP 불필요)
- **전문가 응답 품질 낮음:** AskUserQuestion으로 재시도/다른 구성 제안
