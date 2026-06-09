---
title: "아이디어 대시보드"
description: "docs/ 주제를 웹 대시보드로 시각화하는 정적 사이트"
date: 2026-04-01
progress: 80
tags: ["astro", "dashboard", "tailwind", "react", "pagefind"]
order: 2
---

# 아이디어 대시보드

> docs/ 주제를 웹 대시보드로 보여주는 정적 사이트

## 개요

`docs/`의 주제(Claude Code Refine, AI Arsenal, Side Projects)를 웹 대시보드로 시각화하여
정적 사이트로 배포하는 프로젝트. 마크다운 콘텐츠를 그대로 카드/검색/차트로 보여준다.

## 기술 스택

| 기술 | 역할 | 선택 이유 |
|------|------|----------|
| Astro 5 | 프레임워크 | Content Collections로 마크다운 네이티브 지원, zero JS by default |
| React 19 | Islands | 검색/차트 등 인터랙티브 컴포넌트만 클라이언트 사이드 |
| Tailwind CSS 4 | 스타일링 | `@tailwindcss/vite` 플러그인, CSS 기반 설정 |
| Pagefind | 검색 | 빌드 타임 인덱싱, 정적 사이트 완벽 호환 |
| Chart.js | 차트 | 경량, tree-shaking 지원, 도넛 차트로 진행률 시각화 |
| GitHub Actions | 배포 | `withastro/action@v5`로 빌드 + GitHub Pages 배포 (공개 범위 결정 후 활성화) |

## 주요 기능

- **주제 카드 대시보드** — 아이콘, 문서 수, 진행률 바, 섹션별 강조색
- **마크다운 렌더링** — docs/ 콘텐츠를 Content Collections (glob 로더)로 직접 참조
- **전문 검색** — Pagefind 빌드 타임 인덱싱, Ctrl+K 단축키
- **진행률 차트** — Chart.js 도넛 차트 (React Island, `client:visible`)
- **다크/라이트 테마** — localStorage 기반, FOUC 방지 blocking script
- **반응형** — 모바일 햄버거 메뉴, 1열/2열 카드 그리드
- **접근성** — 시맨틱 HTML, `role="progressbar"`, sr-only 대체 텍스트 테이블
- **SEO** — Open Graph 태그, sitemap, robots.txt

## 구현 과정

sigma 워크플로우를 전체 사이클 돌려 완성:

```
/spec   → 등급 판정, Phase별 spec 생성
/qa     → spec 리뷰 (Critical: Tailwind v4 방식, .github 위치, base path)
/spec   → QA 채택 반영
/execute → Phase 순차 구현
/qa     → code 리뷰 (OG 경로, client:idle, 타입 선언, progressbar)
```

## 불채택 기술과 이유

| 후보 | 불채택 이유 |
|------|-----------|
| Next.js | 정적 사이트 대비 과도한 JS 번들, GitHub Pages 설정 복잡 |
| VitePress | 대시보드 커스터마이징 제한적 |
| Docusaurus | 문서 특화, 인터랙티브 대시보드 구현 어려움 |
| Astro 6 | Node >=22.12.0 필수, 빌드 환경(22.11) 미지원 → Astro 5 고정 |

## 발견한 교훈

1. **Astro glob 로더는 상위 디렉토리를 잘 참조한다** — `base: '../docs/'` 패턴이 로컬/CI 모두 정상 동작. 심볼릭 링크나 복사 스크립트 불필요.
2. **Tailwind v4는 `@astrojs/tailwind`가 아닌 `@tailwindcss/vite`** — v3와 v4의 통합 방식이 완전히 다르다.
3. **Pagefind는 빌드 후에만 동작** — React에서 직접 import 불가, 동적 script 태그로 로딩해야 한다.
4. **FOUC 방지는 `<head>` blocking script 필수** — SSG에서 다크/라이트 토글은 JS 실행 전에 class를 적용해야 깜빡임이 없다.

## 남은 작업

- GitHub Pages 등 호스팅 공개 범위 결정 후 배포 활성화 (repo Settings → Pages → Source: GitHub Actions)
- 콘텐츠 추가에 따른 대시보드 자동 반영 확인
