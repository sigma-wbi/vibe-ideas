---
title: "AI Design & Build 도구 비교"
description: "상황별 추천 매트릭스 — 어느 도구를 언제 꺼낼까"
date: 2026-05-15
last_verified: 2026-05-15
progress: 100
tags: ["arsenal", "design", "comparison"]
order: 99
---

# AI Design & Build 도구 비교

> 어느 도구를 언제 꺼낼까. 한 장으로 보는 의사결정 가이드.

## 한눈에 보기

| 도구 | 카테고리 | 결과물 | 강점 | 약점 | 가격 (개인) |
|------|---------|--------|------|------|-----------|
| **Claude Design** | 대화형 디자인 | 인터랙티브 프로토타입, PDF/PPTX/HTML | 디자인 시스템 자동 학습, Claude Code 핸드오프 | Pro 구독 필요, 신생(2026.04) | Pro $20/월 |
| **Claude Artifacts** | 대화형 프리뷰 | React 앱, HTML, SVG (단일 파일) | 채팅 안에서 즉시 미리보기, 손그림 → 프로토타입 | 단일 파일, 백엔드/DB X, 배포 X | Claude Pro $20/월 |
| **v0** | AI 앱 빌더 | Next.js + shadcn/ui + Tailwind 코드 | UI 미감 최상, production-grade 코드 | 프론트엔드 전용 (백엔드 X) | 무료/$20/월 |
| **Bolt.new** | AI 앱 빌더 | 다양한 프레임워크 (React/Vue/Svelte 등) | 프레임워크 자유도 최강, 라이브 실행 + 에러 자가 수정 | UI 미감은 v0보다 약함 | 무료/$20/월 |
| **Lovable** | AI 앱 빌더 | React 풀스택 앱 | 풀스택, 비개발자 친화, SOC2/ISO27001/GDPR | 프레임워크 선택 폭 좁음 | 무료/$25/월~ |
| **shadcn/ui** | 디자인 시스템 | 컴포넌트 소스코드 (라이브러리 X) | AI가 가장 잘 뱉는 표준, Open Code | 직접 설치/유지 필요 | 무료 (오픈소스) |

## 상황별 추천

### "디자인 시안만 빠르게 보고 싶다" (검토용)

→ **Claude Artifacts** (가장 빠름, 5분이면 결과) 또는 **v0** (UI 미감 좋음)
- 회사 사람들과 공유해서 의견 받기: v0의 공유 링크 추천

### "Figma 대체로 진지하게 도입하고 싶다"

→ **Claude Design** (디자인 시스템 학습 + Claude Code 핸드오프가 결정적)
- 단점: 신생 제품 (2026.04). 안정성/대형 팀 협업 검증은 아직.

### "MVP 하나 빨리 만들어보고 싶다"

→ **Lovable** (풀스택, 비개발자도 가능) 또는 **Bolt** (개발자라면 스택 선택권 큼)
- 백엔드/DB 필요: Lovable
- 개발자가 직접 손볼 거면: Bolt

### "production 코드까지 직접 만들고 싶다"

→ **v0**로 컴포넌트 생성 → IDE(Cursor/Claude Code)로 옮겨 다듬기
- v0가 뱉는 코드 품질이 셋 중 가장 production에 가깝다

### "엔터프라이즈/규제 환경"

→ **Lovable** (SOC2 / ISO27001 / GDPR 보유)

### "디자인 시스템을 새로 깔아야 한다"

→ **shadcn/ui** + Tailwind (선택 여지 거의 없음, AI 시대의 사실상 표준)

## 자주 보는 조합 패턴

### 1. "Graduate Workflow" (가장 일반적)

```
Claude Artifacts / v0    →    Bolt / Lovable    →    Cursor / Claude Code
(아이디어 탐색)               (앱 단위 통합)            (production)
```

### 2. "Agency Stack" (대행사/프리랜서)

```
v0 (컴포넌트)    →    Lovable (앱 조립)    →    Claude Code (정리)
```

### 3. "Designer Solo" (디자이너 1인 프로토타이핑)

```
Claude Design (디자인+프로토)    →    Claude Code 핸드오프    →    개발팀
```

## 출시일 / 성숙도

| 도구 | 출시 | 성숙도 (2026.05 기준) |
|------|------|----------------------|
| Claude Artifacts | 2024 | 안정 |
| v0 | 2023 | 안정, 시장 1위 (UI 부문) |
| Bolt.new | 2024 | 안정 |
| Lovable | 2024 | 안정, 빠르게 성장 |
| **Claude Design** | **2026.04** | **신생** — 도입 시 안정성 리스크 인식 필요 |
| shadcn/ui | 2023 | 안정, 사실상 표준. v4 (2026.03) 출시 |

## 비용 감각

- **무료로 시작 가능**: v0, Bolt, Lovable 모두 무료 티어 있음 (월 메시지/프로젝트 제한)
- **Claude 진영 묶어 쓸 거면**: Claude Pro $20/월 하나로 Artifacts + Design + Code 모두 사용 (가성비 최강)
- **회사 도입**: v0 Team / Lovable Enterprise / Claude Team 검토. 보안 컴플라이언스는 Lovable이 가장 앞섬

## 회의주의자를 위한 한 줄

- AI 빌더가 만드는 코드의 70%는 작동하지만, **production 품질의 마지막 30%는 사람이 한다**. AI 결과물을 읽고 고칠 수 있는 능력이 결국 차이를 만든다.
- 학습 데이터 편향 때문에 결과물이 **shadcn/Tailwind에 수렴**한다. 다양한 디자인을 원하면 의식적으로 다른 라이브러리를 지시해야 함.
