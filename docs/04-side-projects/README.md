---
title: "Side Projects"
description: "사이드 프로젝트 소개와 아이디어 검증 기록"
date: 2026-03-31
progress: 20
tags: ["side-project"]
order: 1
---

# Side Projects

> 사이드 프로젝트 소개와 회고, 아이디어 검증 기록

## 이 섹션에서 다루는 것

앞선 섹션들의 노하우를 실제로 적용하여 만든 사이드 프로젝트들의 소개와 회고를 기록합니다. 각 프로젝트의 실제 코드는 별도 GitHub 저장소에 있습니다.

## 아이디어 파이프라인

사이드 프로젝트는 `/idea` 스킬을 통한 아이디어 검증에서 시작합니다.
PASS 판정을 받은 아이디어만 `/spec` → `/execute`를 거쳐 프로젝트로 등록됩니다.

- [아이디어 검증 기록](idea/) — 5축 분석 결과 모음

## 프로젝트 목록

### 아이디어 대시보드

- **저장소**: [dashboard/](../../dashboard/) (이 저장소 내)
- **기술 스택**: Astro 5, React 19 (Islands), Tailwind CSS 4, Chart.js, Pagefind
- **활용한 워크플로우**: sigma 워크플로우 (/spec → /qa → /execute 5 Phase), CC auto memory
- **한줄 회고**: Astro의 Content Collections + Islands Architecture가 콘텐츠 중심 정적 사이트에 최적이라는 것을 확인
- **상세**: [dashboard.md](dashboard.md)

<!-- 새 프로젝트 추가 시 아래 형식을 사용하세요:

### 프로젝트명

- **저장소**: [링크]()
- **기술 스택**: 
- **활용한 워크플로우**: 
- **한줄 회고**: 

-->
