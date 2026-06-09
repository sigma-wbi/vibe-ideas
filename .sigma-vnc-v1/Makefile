# =============================================================================
# Claude Code Workflow -- 프로젝트용 Makefile
# 중앙 인프라(sigma-vnc-v1 MCP)는 별도 배포
# =============================================================================

.DEFAULT_GOAL := help

SHELL := /bin/bash

.PHONY: help init setup env \
        mcp-add mcp-list mcp-check \
        hooks-check hooks-test hooks-debug \
        status doc-new clean \
        update version doctor reset-state \
        guide

# =============================================================================
# 도움말
# =============================================================================
help:
	@echo ""
	@echo "  🔮 sigma-vnc-v1 Workflow"
	@echo "  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
	@echo ""
	@echo "  처음 시작하기:"
	@echo "    make env              API 키 검증 + 프로젝트 선택 + .sigma-vnc-v1/env/.env 생성"
	@echo "    make init             Hook 권한 + 디렉토리 + 상태 검증"
	@echo "    make setup            위 두 개를 한 번에 (env → init)"
	@echo ""
	@echo "  Claude Code에서 사용하는 스킬 (토큰 사용):"
	@echo "    /patch \"설명\"         단순 수정 즉시 실행 (spec 불필요)"
	@echo "    /spec \"설명\"          복잡도 분석 → 설계 문서 생성"
	@echo "    /execute              설계 기반 구현 (자동 메모리 수집)"
	@echo "    /fix                  에스컬레이션 디버깅 (5단계)"
	@echo "    /qa                   전문가 패널 리뷰 (spec/code)"
	@echo "    /suggest              현재 상태 분석 → 다음 액션 추천"
	@echo "    /guide                시스템 가이드 (대화형)"
	@echo ""
	@echo "  터미널에서 확인 (토큰 소비 없음):"
	@echo "    make guide            시스템 전체 개요"
	@echo "    make guide TOPIC=skills    13개 스킬 상세"
	@echo "    make guide TOPIC=memory    메모리 시스템"
	@echo "    make guide TOPIC=hooks     Hook 시스템"
	@echo "    make guide TOPIC=tiers     5-Tier 복잡도"
	@echo "    make guide TOPIC=agents    동적 전문가"
	@echo "    make guide TOPIC=dashboard 대시보드 사용법"
	@echo "    make guide TOPIC=config    설정 파일 설명"
	@echo "    make guide TOPIC=suggest   /suggest 사용법"
	@echo ""
	@echo "  상태 확인:"
	@echo "    make status           설정 + Hook + 서버 연결 상태"
	@echo "    make doctor           전체 건강 진단 (python3/jq/curl/파일구조)"
	@echo "    make version          설치된 템플릿 버전"
	@echo ""
	@echo "  MCP 서버:"
	@echo "    make mcp-add          .mcp.json.example → .mcp.json 생성"
	@echo "    make mcp-list         등록된 MCP 서버 목록"
	@echo "    make mcp-check        .mcp.json 설정 검증"
	@echo ""
	@echo "  Hook 관리:"
	@echo "    make hooks-check      Hook 설정 + 실행 권한 확인"
	@echo "    make hooks-test       6개 Hook exit 0 테스트"
	@echo "    make hooks-debug      디버그 모드로 전체 Hook 실행"
	@echo ""
	@echo "  문서:"
	@echo "    make doc-new TYPE=spec NAME=feature"
	@echo "                          문서 생성 (spec/review/knowledge)"
	@echo ""
	@echo "  유지보수:"
	@echo "    make clean            임시 파일 + CC 카운터 정리"
	@echo "    make reset-state      state.json 초기화 (작업 상태 리셋)"
	@echo "    make update           최신 템플릿으로 업데이트"
	@echo ""
	@echo "  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
	@echo "  Dashboard: 제거됨 — 서버 불필요"
	@echo "  Docs:      제거됨 — 서버 불필요"
	@echo ""

# =============================================================================
# 환경변수 생성
# =============================================================================
env:
	@bash .sigma-vnc-v1/scripts/setup-env.sh

# =============================================================================
# 초기 설정
# =============================================================================
init:
	@echo "=== 프로젝트 워크플로우 초기화 ==="
	@echo ""
	@# Hook 실행 권한
	@chmod +x .sigma-vnc-v1/hooks/*.sh 2>/dev/null || true
	@chmod +x .sigma-vnc-v1/hooks/lib/*.sh 2>/dev/null || true
	@chmod +x .sigma-vnc-v1/scripts/*.sh 2>/dev/null || true
	@echo "  [OK] Hook/스크립트 실행 권한 설정"
	@# docs 디렉토리 생성
	@mkdir -p .sigma-vnc-v1/docs/spec .sigma-vnc-v1/docs/review .sigma-vnc-v1/docs/knowledge .sigma-vnc-v1/docs/study .sigma-vnc-v1/docs/qa
	@echo "  [OK] .sigma-vnc-v1/docs/ 디렉토리 생성"
	@# settings.json 확인
	@test -f .claude/settings.json && echo "  [OK] settings.json" || echo "  [!!] settings.json 없음"
	@# VERSION 확인
	@test -f .sigma-vnc-v1/VERSION && echo "  [OK] VERSION ($$(cat .sigma-vnc-v1/VERSION | tr -d '[:space:]'))" || echo "  [!!] VERSION 없음"
	@# .sigma-vnc-v1/env/.env 확인
	@test -f .sigma-vnc-v1/env/.env && echo "  [OK] .sigma-vnc-v1/env/.env" || echo "  [!!] .sigma-vnc-v1/env/.env 없음 -- make env 실행"
	@# .mcp.json 확인
	@(test -f .mcp.json && echo "  [OK] .mcp.json") || \
	 (test -f .mcp.json.example && echo "  [!!] .mcp.json 없음 -- cp .mcp.json.example .mcp.json") || \
	 echo "  [!!] .mcp.json 없음"
	@echo ""
	@echo "다음: make env -> make mcp-add -> claude 실행"

setup: env init

# =============================================================================
# MCP
# =============================================================================
mcp-add:
	@echo "=== MCP 서버 등록 ==="
	@if [ ! -f .sigma-vnc-v1/env/.env ]; then echo ".sigma-vnc-v1/env/.env 없음. make env 먼저 실행."; exit 1; fi
	@set -a; . ./.sigma-vnc-v1/env/.env 2>/dev/null; set +a; \
	echo ""; \
	echo "sigma-vnc-v1 (HTTP Streamable):"; \
	claude mcp add --transport http-stream sigma-vnc-v1 "$$SIGMA_VNC_URL/mcp?key=$$SIGMA_VNC_API_KEY" 2>/dev/null \
		&& echo "  [OK]" || echo "  [FAIL]"; \
	echo ""; \
	echo "sequential-thinking (stdio):"; \
	claude mcp add sequential-thinking -- npx -y @modelcontextprotocol/server-sequential-thinking 2>/dev/null \
		&& echo "  [OK]" || echo "  [FAIL]"; \
	echo ""; \
	echo "context7 (stdio):"; \
	claude mcp add context7 -- npx -y @upstash/context7-mcp 2>/dev/null \
		&& echo "  [OK]" || echo "  [FAIL]"; \
	echo ""; \
	echo "serena (stdio):"; \
	claude mcp add serena -- uvx --from "git+https://github.com/oraios/serena" \
		serena-mcp-server --context ide-assistant --project . 2>/dev/null \
		&& echo "  [OK]" || echo "  [FAIL]"

mcp-list:
	@claude mcp list 2>/dev/null || echo "claude CLI를 찾을 수 없습니다."

mcp-check:
	@echo "=== .mcp.json 설정 ==="
	@if [ -f .mcp.json ]; then \
		python3 -c "\
import json, sys; \
data = json.load(open('.mcp.json')); \
servers = data.get('mcpServers', {}); \
print(f'  등록된 서버: {len(servers)}개'); \
print(); \
[print(f'  {n:25s} [{c.get(\"type\",\"stdio\"):12s}] {c.get(\"url\",c.get(\"command\",\"\"))}') for n,c in servers.items()]" 2>/dev/null \
			|| echo "  .mcp.json 파싱 오류 (JSON 문법 확인)"; \
	else \
		echo "  .mcp.json 없음"; \
		if [ -f .mcp.json.example ]; then \
			echo "  -> cp .mcp.json.example .mcp.json 후 편집"; \
		fi; \
	fi

# =============================================================================
# Hook
# =============================================================================
hooks-check:
	@echo "=== Hook 설정 확인 ==="
	@echo ""
	@# settings.json 유효성
	@if [ -f .claude/settings.json ]; then \
		python3 -m json.tool .claude/settings.json > /dev/null 2>&1 \
			&& echo "  settings.json: 유효" \
			|| echo "  settings.json: JSON 문법 오류"; \
	else \
		echo "  settings.json: 없음"; \
	fi
	@# settings.local.json 오버라이드 감지
	@if [ -f .claude/settings.local.json ]; then \
		echo "  settings.local.json: 존재 (로컬 오버라이드 활성)"; \
		python3 -m json.tool .claude/settings.local.json > /dev/null 2>&1 \
			|| echo "    경고: settings.local.json JSON 문법 오류"; \
	else \
		echo "  settings.local.json: 없음 (기본 설정 사용)"; \
	fi
	@echo ""
	@echo "  Hook 스크립트:"
	@for f in .sigma-vnc-v1/hooks/*.sh; do \
		if [ -f "$$f" ]; then \
			if [ -x "$$f" ]; then \
				echo "    [OK]  $$(basename $$f)"; \
			else \
				echo "    [ERR] $$(basename $$f) (chmod +x 필요)"; \
			fi; \
		fi; \
	done 2>/dev/null || echo "    (없음)"
	@echo ""
	@if [ -f .sigma-vnc-v1/hooks/lib/common.sh ]; then \
		if [ -x .sigma-vnc-v1/hooks/lib/common.sh ]; then \
			echo "  lib/common.sh: 존재 (+x)"; \
		else \
			echo "  lib/common.sh: 존재 (chmod +x 필요)"; \
		fi; \
	else \
		echo "  lib/common.sh: 없음 (필수!)"; \
	fi

hooks-test:
	@echo "=== Hook 동작 테스트 ==="
	@echo ""
	@echo "--- user-prompt-reminder ---"
	@CLAUDE_PROJECT_DIR=$$(pwd) bash .sigma-vnc-v1/hooks/user-prompt-reminder.sh 2>/dev/null; echo "(exit: $$?)"
	@echo ""
	@echo "--- knowledge-signal ---"
	@echo '{}' | CLAUDE_PROJECT_DIR=$$(pwd) bash .sigma-vnc-v1/hooks/knowledge-signal.sh 2>/dev/null; echo "(exit: $$?)"
	@echo ""
	@echo "--- event-capture (네트워크 실패 허용) ---"
	@echo '{"session_id":"test","tool_name":"test"}' | \
		CLAUDE_PROJECT_DIR=$$(pwd) bash .sigma-vnc-v1/hooks/event-capture.sh 2>/dev/null; echo "(exit: $$?)"
	@echo ""
	@echo "--- context-compact-recovery ---"
	@CLAUDE_PROJECT_DIR=$$(pwd) bash .sigma-vnc-v1/hooks/context-compact-recovery.sh 2>/dev/null; echo "(exit: $$?)"

hooks-debug:
	@echo "=== Hook 디버그 모드 (CLAUDE_HOOK_DEBUG=1) ==="
	@echo ""
	@export CLAUDE_HOOK_DEBUG=1; \
	export CLAUDE_PROJECT_DIR=$$(pwd); \
	for f in .sigma-vnc-v1/hooks/*.sh; do \
		if [ -f "$$f" ] && [ -x "$$f" ]; then \
			name=$$(basename "$$f" .sh); \
			echo "--- $$name ---"; \
			echo '{}' | bash "$$f" 2>&1 || true; \
			echo ""; \
		fi; \
	done

# =============================================================================
# 상태 확인
# =============================================================================
status:
	@echo "=== 워크플로우 상태 ==="
	@echo ""
	@echo "-- current.md --"
	@if [ -f .sigma-vnc-v1/context/current.md ]; then \
		lines=$$(wc -l < .sigma-vnc-v1/context/current.md | tr -d ' '); \
		echo "  줄 수: $$lines / 100"; \
		head -5 .sigma-vnc-v1/context/current.md 2>/dev/null | sed 's/^/  /'; \
	else \
		echo "  (없음)"; \
	fi
	@echo ""
	@echo "-- state.json --"
	@if [ -f .sigma-vnc-v1/context/state.json ]; then \
		if command -v jq >/dev/null 2>&1; then \
			skill=$$(jq -r '.active_skill // "idle"' .sigma-vnc-v1/context/state.json 2>/dev/null); \
			grade=$$(jq -r '(.tasks | to_entries | first // {value:{}}).value.grade // "N/A"' .sigma-vnc-v1/context/state.json 2>/dev/null); \
			cc=$$(jq -r '.cc_count // 0' .sigma-vnc-v1/context/state.json 2>/dev/null); \
			echo "  Skill: $$skill | Grade: $$grade | CC: $$cc"; \
		else \
			echo "  (jq 미설치 -- 파싱 불가)"; \
			echo "  파일 존재: 예"; \
		fi; \
	else \
		echo "  (없음)"; \
	fi
	@echo ""
	@echo "-- MCP 연결 --"
	@if [ -f .sigma-vnc-v1/env/.env ]; then \
		set -a; . ./.sigma-vnc-v1/env/.env 2>/dev/null; set +a; \
		url=$${SIGMA_VNC_URL:-https://mcp.company.internal:8080}; \
		curl -sf --max-time 5 "$$url/health" > /dev/null 2>&1 \
			&& echo "  sigma-vnc-v1: OK ($$url)" \
			|| echo "  sigma-vnc-v1: FAIL ($$url)"; \
	else \
		echo "  .sigma-vnc-v1/env/.env 없음 -- 연결 확인 불가"; \
	fi
	@echo ""
	@echo "-- VERSION --"
	@if [ -f .sigma-vnc-v1/VERSION ]; then \
		echo "  $$(cat .sigma-vnc-v1/VERSION | tr -d '[:space:]')"; \
	else \
		echo "  (없음)"; \
	fi

# =============================================================================
# 문서 생성
# =============================================================================
doc-new:
ifndef TYPE
	@echo "사용법: make doc-new TYPE=<type> NAME=<name>"
	@echo "유효한 TYPE: spec, review, knowledge"
	@exit 1
endif
ifndef NAME
	@echo "사용법: make doc-new TYPE=$(TYPE) NAME=<name>"
	@exit 1
endif
	@bash .sigma-vnc-v1/scripts/claude-new-doc.sh "$(TYPE)" "$(NAME)"

# =============================================================================
# 유틸리티
# =============================================================================
clean:
	@echo "=== 임시 파일 정리 ==="
	@find . -name ".DS_Store" -delete 2>/dev/null || true
	@find . -name "*.tmp" -delete 2>/dev/null || true
	@find . -name "*~" -delete 2>/dev/null || true
	@rm -f /tmp/claude_ks_* /tmp/claude_cc_* 2>/dev/null || true
	@echo "정리 완료"

update:
	@echo "=== 템플릿 업데이트 ==="
	@if [ ! -f .sigma-vnc-v1/env/.env ]; then \
		echo "오류: .sigma-vnc-v1/env/.env 없음. API 키를 확인하세요."; \
		exit 1; \
	fi
	@OURO_URL=$$(grep SIGMA_VNC_URL .sigma-vnc-v1/env/.env | cut -d= -f2); \
	API_KEY=$$(grep SIGMA_VNC_API_KEY .sigma-vnc-v1/env/.env | cut -d= -f2); \
	echo "서버: $$OURO_URL"; \
	echo "재설치 중..."; \
	OURO_API_KEY=$$API_KEY curl -fsSL "$$OURO_URL/install.sh?key=$$API_KEY" | bash

version:
	@if [ -f .sigma-vnc-v1/VERSION ]; then \
		echo "Claude Code Workflow v$$(cat .sigma-vnc-v1/VERSION | tr -d '[:space:]')"; \
	else \
		echo "버전 정보 없음 (.sigma-vnc-v1/VERSION 파일 없음)"; \
	fi

doctor:
	@echo "=== 전체 건강 진단 ==="
	@echo ""
	@errors=0; warnings=0; \
	echo "-- 필수 도구 --"; \
	if command -v python3 >/dev/null 2>&1; then \
		echo "  [OK] python3 ($$(python3 --version 2>&1))"; \
	else \
		echo "  [ERR] python3 없음"; errors=$$((errors+1)); \
	fi; \
	if command -v jq >/dev/null 2>&1; then \
		echo "  [OK] jq ($$(jq --version 2>&1))"; \
	else \
		echo "  [WARN] jq 없음 (state.json 파싱 제한)"; warnings=$$((warnings+1)); \
	fi; \
	if command -v curl >/dev/null 2>&1; then \
		echo "  [OK] curl"; \
	else \
		echo "  [WARN] curl 없음 (서버 연결 확인 제한)"; warnings=$$((warnings+1)); \
	fi; \
	if command -v claude >/dev/null 2>&1; then \
		echo "  [OK] claude CLI"; \
	else \
		echo "  [WARN] claude CLI 없음"; warnings=$$((warnings+1)); \
	fi; \
	echo ""; \
	echo "-- 파일 구조 --"; \
	for f in .claude/settings.json .sigma-vnc-v1/VERSION CLAUDE.md .claude/CLAUDE.md; do \
		if [ -f "$$f" ]; then \
			echo "  [OK] $$f"; \
		else \
			echo "  [ERR] $$f 없음"; errors=$$((errors+1)); \
		fi; \
	done; \
	echo ""; \
	echo "-- 환경 설정 --"; \
	if [ -f .sigma-vnc-v1/env/.env ]; then \
		echo "  [OK] .sigma-vnc-v1/env/.env"; \
	else \
		echo "  [ERR] .sigma-vnc-v1/env/.env 없음 (make env 실행)"; errors=$$((errors+1)); \
	fi; \
	if [ -f .mcp.json ]; then \
		echo "  [OK] .mcp.json"; \
		python3 -m json.tool .mcp.json > /dev/null 2>&1 \
			&& echo "  [OK] .mcp.json JSON 유효" \
			|| { echo "  [ERR] .mcp.json JSON 오류"; errors=$$((errors+1)); }; \
	else \
		echo "  [ERR] .mcp.json 없음 (cp .mcp.json.example .mcp.json)"; errors=$$((errors+1)); \
	fi; \
	echo ""; \
	echo "-- Hook --"; \
	hook_ok=0; hook_err=0; \
	for f in .sigma-vnc-v1/hooks/*.sh; do \
		if [ -f "$$f" ]; then \
			if [ -x "$$f" ]; then \
				hook_ok=$$((hook_ok+1)); \
			else \
				echo "  [ERR] $$(basename $$f) (chmod +x 필요)"; \
				hook_err=$$((hook_err+1)); errors=$$((errors+1)); \
			fi; \
		fi; \
	done 2>/dev/null; \
	echo "  Hook: $$hook_ok OK, $$hook_err 오류"; \
	echo ""; \
	echo "-- 서버 연결 --"; \
	if [ -f .sigma-vnc-v1/env/.env ] && command -v curl >/dev/null 2>&1; then \
		set -a; . ./.sigma-vnc-v1/env/.env 2>/dev/null; set +a; \
		url=$${SIGMA_VNC_URL:-https://mcp.company.internal:8080}; \
		curl -sf --max-time 5 "$$url/health" > /dev/null 2>&1 \
			&& echo "  [OK] sigma-vnc-v1 ($$url)" \
			|| { echo "  [WARN] sigma-vnc-v1 연결 실패 ($$url)"; warnings=$$((warnings+1)); }; \
	else \
		echo "  [SKIP] 서버 연결 확인 불가"; \
	fi; \
	echo ""; \
	echo "==========================="; \
	if [ $$errors -eq 0 ] && [ $$warnings -eq 0 ]; then \
		echo "  결과: 모두 정상"; \
	elif [ $$errors -eq 0 ]; then \
		echo "  결과: 경고 $$warnings건 (동작에 문제 없음)"; \
	else \
		echo "  결과: 오류 $$errors건, 경고 $$warnings건"; \
	fi

reset-state:
	@echo "=== state.json + CC 카운터 초기화 ==="
	@if [ -f .sigma-vnc-v1/context/state.json ]; then \
		echo '{"active_skill":null,"skill_step":0,"active_files":[],"tasks":{},"cc_count":0,"last_updated":"'$$(date -u '+%Y-%m-%dT%H:%M:%SZ')'"}' \
			| python3 -m json.tool > .sigma-vnc-v1/context/state.json 2>/dev/null \
			|| echo '{"active_skill":null,"skill_step":0,"active_files":[],"tasks":{},"cc_count":0}' > .sigma-vnc-v1/context/state.json; \
		echo "  [OK] state.json 초기화"; \
	else \
		mkdir -p .sigma-vnc-v1/context; \
		echo '{"active_skill":null,"skill_step":0,"active_files":[],"tasks":{},"cc_count":0,"last_updated":"'$$(date -u '+%Y-%m-%dT%H:%M:%SZ')'"}' \
			| python3 -m json.tool > .sigma-vnc-v1/context/state.json 2>/dev/null \
			|| echo '{"active_skill":null,"skill_step":0,"active_files":[],"tasks":{},"cc_count":0}' > .sigma-vnc-v1/context/state.json; \
		echo "  [OK] state.json 생성"; \
	fi
	@rm -f /tmp/claude_cc_* 2>/dev/null || true
	@echo "  [OK] CC 카운터 초기화"
	@echo ""
	@echo "완료. current.md는 수동 편집이 필요합니다."

# =============================================================================
# 가이드 (토큰 소비 없음 — 터미널 직접 출력)
# =============================================================================
TOPIC ?= overview
guide:
	@bash .sigma-vnc-v1/scripts/guide.sh $(TOPIC)
