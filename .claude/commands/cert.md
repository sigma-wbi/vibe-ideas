자유 형식 입력을 정규 frontmatter로 자동 변환하여 자격증을 등록한다. 카테고리 자동 분류 + 증명서 사이트 자동 검색 + 만료일 자동 계산.

## 분류

**On-demand** (독립 실행, state.json 변경 없음)

## 파라미터

- `$ARGUMENTS` (필수): 자유 형식 자격증 정보
- `--planned`: planned 폴더에 저장 (취득 전 등록). 명시 옵션이 자연어 추론보다 우선.
- `--update <slug>`: 기존 자격증 갱신 (점수 변경, 상태 전이). planned → acquired 이동 시 `git mv` 사용.

## 예시 입력

```
/cert 260528 토익 900점 획득
/cert 250115 AWS Solutions Architect Associate 합격
/cert --planned AWS Machine Learning Specialty 2026년 9월 응시 P1
/cert --update toeic-900 점수 920점으로 갱신
```

---

## Step 1: 입력 파싱

`$ARGUMENTS`에서 다음을 추출:

| 항목 | 추출 방법 | 예 |
|------|----------|-----|
| 날짜 | `YYMMDD` 또는 자연어("2026년 5월 28일") | 260528 → 2026-05-28 |
| 자격증명 | 알려진 키워드 매칭 + LLM 판단 | 토익 → TOEIC |
| 점수 | 숫자/PASS/등급 | 900, PASS, L2 IH |
| 상태 추론 | "획득"/"취득" → acquired, "응시 예정"/"목표" → planned | |
| 우선순위 | "P0"~"P3" 명시 시 | P1 |

**옵션 vs 자연어 우선순위 (QA W-5):**
- 명시적 옵션(`--planned`)이 자연어 추론보다 항상 우선
- 충돌 시(예: `--planned ... 획득`) AskUserQuestion으로 1회 확인

**불확실 시 AskUserQuestion** (자격증 정식명, 카테고리)

---

## Step 2: 카테고리 자동 분류

**단일 소스 (QA W-1):** `dashboard/src/lib/certificates.ts`의 `CATEGORY_KEYWORDS`를 Read로 동적 참조.

```
Read('dashboard/src/lib/certificates.ts')
```

읽은 키워드 매핑을 기반으로 자격증명에 포함된 키워드를 검색. 대소문자 무시.

| 매칭 예 | category |
|---------|----------|
| TOEIC, OPIc, JLPT, TOEFL, TEPS, IELTS | language |
| AWS, GCP, Azure, Kubernetes, CKA, 정보처리 | dev |
| ISO, ITIL | cert |
| CISSP, OSCP, CISA, 정보보안, 보안기사 | security |
| ADsP, SQLD, 빅데이터, 데이터분석 | data |
| PMP, PgMP, PRINCE2 | pm |
| (매칭 없음) | etc |

미매칭 시 AskUserQuestion으로 7개 enum 선택지 제시.

**카테고리 사전을 cert.md에 하드코딩하지 않는다.** ts 파일이 단일 소스.

---

## Step 3: 자동 메타 채움 (검증 가능한 항목만)

**채움 대상 (QA W-2):**
- `cert_url`: WebSearch로 공식 증명서 사이트 검색
  ```
  WebSearch(query="{자격증명} 증명서 발급 공식 site")
  ```
- `issuer`: WebSearch 결과에서 발급기관 추출

**자동 채움 제외 (LLM 환각 위험):**
- `exam_cost`, `pass_rate`, `exam_period` → frontmatter에 비워두고, 사용자에게 안내:
  > "비용/합격률은 공식 사이트({cert_url})에서 직접 확인하세요"

신뢰도 낮으면 사용자에게 URL 확인 요청.

---

## Step 3.5: 만료일 자동 계산

`lib/certificates.ts`의 `EXPIRY_YEARS` 사전을 Read로 동적 참조.

| 매칭 | 유효기간 |
|------|----------|
| TOEIC, OPIc, TOEFL, IELTS | 2년 |
| AWS, CKA, PMP, CISSP, OSCP | 3년 |
| GCP, Azure | 2년 |
| (사전에 없음) | 무기한 → `expires_at` omit |

계산: `expires_at = acquired_at + EXPIRY_YEARS[자격증명] 년`

등록 후 사용자에게 안내:
> "유효기간 {N}년 자동 계산. 다를 경우 수정 요청"

---

## Step 4: 파일 생성

**경로 결정:**
- acquired: `docs/06-certificates/acquired/{YYYYMMDD}_{slug}.md`
- planned: `docs/06-certificates/planned/{slug}.md` (날짜 prefix 없음)

**slug 규칙:**
- 자격증명 소문자 + 점수 (예: `toeic-900`, `aws-saa`, `aws-mlspecialty`)
- 한글 → 영문 슬러그 (TOEIC → toeic)
- 동일 자격증 재응시: `-v2` suffix (`toeic-900-v2`) 또는 `--update` 사용

**frontmatter 템플릿:**

```yaml
---
title: "{자격증명} {점수}{단위}"
description: "{카테고리 label} - {자격증명}"
name: "{자격증 정식 명칭}"
category: {language|dev|cert|security|data|pm|etc}
status: {acquired|planned}
score: "{점수 문자열}"
acquired_at: YYYY-MM-DD
expires_at: YYYY-MM-DD       # 무기한 시 생략
cert_url: "{공식 증명서 URL}"
issuer: "{발급기관}"
priority: P0~P3              # planned 전용
resume_tag: []
date: YYYY-MM-DD
progress: 100                # acquired 100, planned 0
tags: ["certificate", "{category}"]
order: 999
---

# {자격증명} {점수}{단위} {취득|목표}

> {취득일|목표 응시일}: {date}
> 유효기간: {expires_at} (D-{days})       # 있을 때만

## 시험 정보

- 비용: (공식 사이트 확인)
- 응시 주기: (공식 사이트 확인)

## 학습 메모

(선택 — 후일 추가)
```

---

## Step 5: planned → acquired 자동 이동 (`--update` 시)

planned/{slug}.md가 있고 acquired 상태로 갱신되면:

**git mv 사용 (QA W-3 — history 보존):**
```bash
git mv docs/06-certificates/planned/{slug}.md \
       docs/06-certificates/acquired/{YYYYMMDD}_{slug}.md
```

미커밋 working tree만 변경된 상태여도 `git mv` 우선 사용 (안전).

이동 후 Edit으로 frontmatter 갱신:
- `status: acquired`
- `acquired_at: {today}`
- `score: {새 점수}`
- `expires_at: {계산값}`
- `progress: 100`

---

## Step 6: 완료 보고

```
🎓 자격증 등록: {자격증명} {점수}
   카테고리: {label} ({category})
   상태: {취득|계획}
   파일: docs/06-certificates/{status}/{filename}
   유효기간: ~{expires_at} (D-{days})      # 있을 때만

   ⚠ 비용/합격률은 공식 사이트에서 직접 확인하세요:
     {cert_url}

   다음:
     /cert "{다음 자격증}"          — 추가 등록
     cd dashboard && npm run dev    — /certificates 에서 확인
```

---

## state.json 관리

state.json 변경 없음 (On-demand 유틸리티 스킬). current.md도 변경 없음.

---

## 실패/fallback

- **자격증명 불명확:** AskUserQuestion (정식 명칭, 카테고리)
- **카테고리 미매칭:** AskUserQuestion (7개 enum 선택지)
- **WebSearch 실패:** cert_url 비워두고 사용자에게 직접 입력 요청
- **점수 형식 불명확:** 문자열 그대로 저장 (z.string())
- **만료기간 사전 미매칭:** expires_at 필드 omit (무기한 가정) + 사용자에게 명시적 확인

---

## 디자인 원칙

1. **단일 소스:** 카테고리/만료기간 사전은 `lib/certificates.ts` 한 곳 (insight_mcp_config_single_source).
2. **환각 회피:** 검증 가능한 메타(URL, 발급기관)만 자동 채움. 가변 정보(비용/합격률)는 사용자 입력.
3. **history 보존:** 파일 이동은 `git mv` (gotcha_root_and_template_dual_update의 교훈).
4. **옵션 우선:** 명시 옵션이 자연어 추론을 항상 이긴다.
