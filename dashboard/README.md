# Dashboard

> `docs/` 콘텐츠를 웹으로 보여주는 정적 대시보드 (Astro)

## 실행

```bash
cd dashboard
npm install
npm run dev      # 로컬 개발 서버
npm run build    # 정적 빌드 (dist/)
npm run preview  # 빌드 결과 미리보기
```

> Node 22.11 환경에서 Astro 5로 고정되어 있습니다 (Astro 6은 Node 22.12+ 필요).

## 구조

- `src/content.config.ts` — docs 콘텐츠 컬렉션 정의 (claude-code / arsenal / projects)
- `src/lib/sections.ts` — 탭(섹션) 정의
- `src/pages/` — 진입점 + 탭별 목록/상세 페이지
- `src/components/` — Header, Footer, 카드, 검색, 차트 등

## 탭 추가/변경

`content.config.ts`의 컬렉션 + `sections.ts`의 섹션 + `pages/<slug>/` 페이지를 함께 맞춰야 합니다.

## 배포

`.github/workflows/deploy.yml`이 GitHub Pages 배포 워크플로우를 담고 있으나,
**자동 트리거는 비활성화**되어 있습니다. 호스팅 공개 범위를 결정한 뒤
`astro.config.mjs`의 `site`/`base`를 실제 값으로 바꾸고 워크플로우를 활성화하세요.
