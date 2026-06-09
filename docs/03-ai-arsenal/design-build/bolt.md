---
title: "Bolt.new"
description: "프레임워크 자유도 최강 + 라이브 실행 + 자가 디버깅"
date: 2026-05-15
last_verified: 2026-05-15
progress: 100
tags: ["ai-builder", "stackblitz", "fullstack"]
order: 4
---

# Bolt.new

> v0/Lovable이 지원하는 프레임워크를 **다 합쳐도** Bolt가 더 많다.

## 한줄 요약

StackBlitz가 만든 AI 풀스택 빌더. 브라우저 안에서 **라이브로 코드를 실행**하면서 생성하고, 에러를 직접 보면서 자가 수정한다. **프레임워크 선택 자유도 최강**.

## 강점 (이럴 때 쓰면 좋다)

- **프레임워크 자유도 최강** — React, Vue, Svelte, Angular, Astro, Remix, Next.js, Expo(모바일) 모두 지원
- **라이브 실행 + 자가 디버깅** — 코드를 생성하면서 **실제로 실행**한다. 에러가 나면 AI가 콘솔/터미널을 보고 직접 고침
- **풀스택 가능** — 프론트 + 백엔드(Node 서버) + DB 연결까지 한 환경에서
- **터미널 / 파일시스템 / 패키지 매니저 접근** — 진짜 개발 환경에 가까운 자율도
- **WebContainer 기반** — 브라우저 안에서 Node.js가 도는 신기술. 로컬 설치 없이 풀 개발 환경
- **모바일 앱도 가능** — Expo 지원으로 React Native 앱까지

## 약점 (이럴 때는 피하자)

- **UI 미감은 v0보다 약함** — production-grade 디자인이 필요하면 v0가 우위
- **자유도가 양날의 칼** — 명확한 가이드라인 없으면 결과물이 산만해질 수 있음
- **WebContainer 한계** — 일부 native 의존 패키지는 안 돌아감 (Sharp, Puppeteer 등)
- **러닝 커브 약간** — 개발 환경에 익숙한 사람에게 최적. 완전 비개발자에게는 Lovable이 더 편함

## 가격 & 접근성

| 플랜 | 가격 | 비고 |
|------|------|------|
| 무료 | $0 | 일일 토큰 제한 |
| Pro | $20/월 | 개인 충분 |
| Pro 50 | $50/월 | 더 큰 토큰 |
| Pro 100 | $100/월 | 헤비 유저 |
| Teams | 협의 | 협업 |

## 실전 팁

### 가장 효율적으로 쓰는 법

1. **스택을 명시** — "Vite + React + TypeScript + Tailwind + Supabase" 같이 처음에 정확히 지시
2. **작은 단위로 분할 요청** — 한 번에 풀스택 앱 시도하지 말고 화면 단위로
3. **에러를 일부러 보여주기** — 자가 디버깅 능력이 강점이라 에러를 가리지 말고 노출해서 고치게 하기
4. **GitHub 연동** — 코드를 깃허브로 export해서 영구 보관

### 이 도구에서만 잘 되는 것

- **다양한 스택 실험** — "이 아이디어를 Vue로 만들면?" "Svelte로?" 같은 빠른 PoC
- **풀스택 MVP** — DB까지 포함한 작동하는 앱 1일 만에
- **모바일 + 웹 동시 PoC** — Expo로 모바일도 같이

### 다른 도구로 전환해야 할 신호

- production 디자인 품질이 중요하면 → **v0**
- 비개발자가 직접 만들 거면 → **Lovable**
- 이미 자기 IDE에서 작업 중이면 → **Cursor** 또는 **Claude Code** (Bolt는 새 프로젝트 시작에 강점)
- Next.js 표준 스택 고정이면 → **v0** (Vercel 생태계 친화)

## 실무 조합

- **Bolt → Cursor / Claude Code** — Bolt로 빠르게 PoC 후 GitHub로 export → IDE에서 production화 (Graduate Workflow의 가장 흔한 패턴)
- **Bolt + Supabase** — 백엔드는 Supabase, 프론트+서버 로직은 Bolt에서. 1인 풀스택 표준

## 참고 자료

- [Bolt.new 공식](https://bolt.new)
- [v0 vs Bolt vs Lovable 비교 2026 — ToolJet](https://blog.tooljet.com/lovable-vs-bolt-vs-v0/)
- [Vibe Coding 2026 가이드 — Lushbinary](https://lushbinary.com/blog/vibe-coding-developer-guide-ai-first-development/)
