# Vibe Ideas

> 사이드 프로젝트 아이디어 검증 기록 + AI 활용 노하우 + Claude Code 워크플로우 템플릿을 담은 팀 공유 저장소.

## 이 저장소는

팀이 함께 사이드 프로젝트 아이디어를 모으고 검증·발전시키기 위한 공간입니다.
아이디어 기록, AI 도구 활용 레퍼런스, 그리고 이를 시각화하는 대시보드로 구성됩니다.

> **공유/IP 안내:** `docs/02-side-projects/idea/`의 아이디어 모음은 팀 브레인스토밍 공유용입니다.
> 특정 아이디어의 사업화·구현·지식재산권(IP) 귀속은 별도 합의로 정합니다.
> 검증 점수/판정은 작성 시점의 1차 분석이며 확정된 의사결정이 아닙니다.

## 구조

| 경로 | 내용 |
|------|------|
| `docs/01-claude-code-refine/` | 이 저장소가 쓰는 Claude Code 워크플로우 템플릿 설명 |
| `docs/02-side-projects/` | 사이드 프로젝트 소개 + `idea/` 아이디어 검증 기록 |
| `docs/03-ai-arsenal/` | LLM·이미지·영상·코딩 에이전트·디자인 툴 등 AI 도구 활용 레퍼런스 |
| `dashboard/` | 위 docs를 웹으로 보여주는 정적 대시보드 (Astro) |
| `.claude/`, `.sigma-vnc-v1/` | Claude Code 워크플로우 엔진 (스킬·Hook·스크립트) |

## 대시보드 실행

```bash
cd dashboard
npm install
npm run dev      # 로컬 개발 서버 (http://localhost:4321)
npm run build    # 정적 빌드 → dist/
```

> Node 22.11에서 Astro 5로 고정. 배포(GitHub Pages 등)는 공개 범위를 정한 뒤
> `dashboard/astro.config.mjs`의 `site`/`base`와 `.github/workflows/deploy.yml`을 활성화하세요.
> (현재 자동 배포는 비활성 상태)

## 워크플로우 (Claude Code)

이 저장소는 sigma 워크플로우 템플릿을 사용합니다. 주요 스킬:

| 스킬 | 용도 |
|------|------|
| `/idea` | 새 아이디어를 5축으로 검증 (구현가능성·수익화·시장수요·차별화·지속가능성) |
| `/spec` | 작업 설계 문서 생성 |
| `/qa` | 설계/코드 리뷰 |
| `/execute` | 설계 기반 구현 |

새 아이디어는 `/idea "아이디어 설명"` → PASS 시 `/spec` → `/execute` 흐름으로 발전시킵니다.
상세 규칙은 [CLAUDE.md](CLAUDE.md) / [.claude/CLAUDE.md](.claude/CLAUDE.md) 참고.

## 아이디어 추가 방법

1. `docs/02-side-projects/idea/`에 `YYYYMMDD_slug.md`로 분석 문서 추가 (또는 `/idea` 사용)
2. `docs/02-side-projects/idea/README.md` 목록에 한 줄 추가
3. 대시보드는 빌드 시 자동 반영
