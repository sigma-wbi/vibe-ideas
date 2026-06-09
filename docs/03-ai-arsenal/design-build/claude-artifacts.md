---
title: "Claude Artifacts"
description: "Claude.ai 채팅 안의 인터랙티브 코드/디자인 프리뷰"
date: 2026-05-15
last_verified: 2026-05-15
progress: 100
tags: ["design", "anthropic", "claude", "prototyping"]
order: 2
---

# Claude Artifacts

> "대시보드 만들어줘" 한 마디면 5분 뒤 실제로 작동하는 React 앱이 옆 패널에 떠 있다.

## 한줄 요약

Claude.ai 일반 채팅에서 코드/디자인/문서 요청 시 자동으로 열리는 사이드 패널. **샌드박스에서 실제 실행되는** React 앱·HTML·SVG·Mermaid 다이어그램 등을 만들고 즉시 미리볼 수 있다.

## 강점 (이럴 때 쓰면 좋다)

- **즉시 프리뷰** — 코드가 나오자마자 옆 패널에서 실행됨. 버튼 클릭, 화면 이동, 드롭다운 조작 등 진짜 인터랙션 가능
- **자연어 반복 수정** — "버튼 더 크게", "색을 다크 테마로", "200자 이내로 답해" 같은 지시로 즉석 변경
- **손그림 → 프로토타입** — 종이에 그린 와이어프레임 사진 업로드 → 인터랙티브 프로토타입 변환
- **공유 가능한 링크** — 결과물을 URL로 공유 (편집 가능 / 읽기 전용 선택)
- **다양한 출력 형식** — React 앱, HTML 페이지, SVG, Mermaid 다이어그램, 코드 스니펫, 마크다운 문서, 차트
- **Live Artifacts** — 시간이 지나도 살아있는 작업공간으로 이어서 작업 가능

## 약점 (이럴 때는 피하자)

- **단일 파일 제약** — 컴포넌트 분리, 멀티 페이지 라우팅 등 복잡한 구조는 어려움
- **백엔드/DB 연결 불가** — 데이터 영속성 없음. 새로고침하면 상태 초기화
- **배포/호스팅 X** — 프리뷰 환경에 머무름. production에 올리려면 코드 복사 → 별도 프로젝트
- **70% 룰** — 실제 production까지 가려면 마지막 30%(에러 핸들링, a11y, 성능 등)는 직접 작업 필요
- **공유 링크는 영구적이지 않을 수 있음** — 정책 변경 가능성 (현재는 안정적)

## 가격 & 접근성

| 플랜 | 가격 | Artifacts 사용 |
|------|------|----------------|
| 무료 | $0 | ✅ (제한적) |
| Pro | $20/월 | ✅ (Sonnet/Opus, 높은 사용량) |
| Max | $100/월 | ✅ (최대 사용량) |

> Pro 이상에서 Sonnet 4.6 / Opus 4.6 사용 가능. 코딩 품질을 위해서는 Pro 권장.

## 실전 팁

### 가장 효율적으로 쓰는 법

1. 한 번에 너무 많이 요청하지 않기. "전체 SaaS 만들어줘" 보다 "이 페이지 한 장 만들어줘"가 결과 품질이 훨씬 좋음
2. 수정은 짧고 명확하게. "버튼 색을 indigo-600으로" > "디자인 좀 더 세련되게"
3. 결과물이 마음에 들면 코드 복사 → 자기 프로젝트에 붙여넣기. Artifacts 자체에 의존하지 말 것

### 이 도구에서만 잘 되는 것

- **빠른 시각화 PoC** — 차트, 대시보드, 게임 같은 시각적 결과물의 첫 안 만들기
- **회의 중 즉석 데모** — 화면 공유하면서 5분 만에 "이런 거 어때?" 보여주기
- **알고리즘 시각화** — "정렬 알고리즘 애니메이션" 같은 교육용 콘텐츠

### 다른 도구로 전환해야 할 신호

- 백엔드/DB가 필요해지면 → **Bolt** 또는 **Lovable**
- production 코드까지 직접 만들 거면 → **v0** (코드 품질 더 좋음)
- 디자인 시스템 일관성이 중요해지면 → **Claude Design** (시스템 학습 기능 있음)
- 멀티파일 React 프로젝트가 필요하면 → **Claude Code** (실제 프로젝트 작업)

## 참고 자료

- [공식 가이드 — Claude Support](https://support.claude.com/en/articles/11649438-prototype-ai-powered-apps-with-claude-artifacts)
- [Claude Artifacts 2026 — 한계와 가능](https://p0stman.com/guides/claude-artifacts-limitations)
- [Claude Live Artifacts 가이드 2026](https://www.eigent.ai/blog/claude-live-artifacts-guide)
- [Jane Street: I design with Claude more than Figma now](https://blog.janestreet.com/i-design-with-claude-code-more-than-figma-now-index/) — 실무자 관점
