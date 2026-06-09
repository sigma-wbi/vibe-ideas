---
title: "AI 코딩 에이전트 비교 — Claude Code vs Codex vs Antigravity"
description: "세 제품의 특장점, IDE 대화창 vs 에이전트 데스크탑 패러다임 차이, 슬래시 명령어/커스텀 스킬, 가격까지 광범위 비교 (2026년 5월 기준)"
date: 2026-05-29
last_verified: 2026-05-29
progress: 100
tags: ["arsenal", "coding-agent", "claude-code", "codex", "antigravity", "comparison"]
order: 5
---

# AI 코딩 에이전트 비교 — Claude Code vs Codex vs Antigravity

> ⚠️ 신뢰도 주의: 컷오프(2026-01) 이후 출시물이 많아 **2026-05-29 시점 웹 리서치** 기반. 공식 소스 우선, 미확인 항목은 "🟡 확인 불가"로 표시. 모델 성능 비교는 [→ 플래그십 모델 벤치마크](../benchmarks.md) 참조.

## 핵심 요약 (5줄)

1. **2026년 5월, 셋 다 "하나의 에이전트 × 여러 표면(surface)" 구조로 수렴했다.** Claude Code·Codex·Antigravity 모두 이제 **CLI + IDE 확장 + 독립 데스크탑 앱 + 클라우드(비동기) 에이전트**를 동시에 제공한다. "IDE냐 데스크탑이냐"는 더 이상 제품을 가르는 축이 아니다.
2. **흔한 오해: "Antigravity 2.0이 IDE를 분리한 별개 데스크탑 앱"은 절반만 맞다.** 정확히는 *에이전트 우선으로 재설계됐지만 IDE(Editor view)를 그대로 내장한* 데스크탑 앱이다. 초기 UI가 IDE를 가려서 생긴 오해를 Google이 5/23 패치로 정정했다 (아래 §0).
3. **진짜 갈리는 축은 "동기적 페어프로그래밍 vs 비동기적 위임/오케스트레이션"이다.** 코드에디터 취향 문제가 아니라 *매 단계를 지켜보며 같이 짜느냐, 목표만 던지고 여러 에이전트에게 맡긴 뒤 결과물(artifact)을 검토하느냐*의 작업 모델 차이다.
4. **같은 모델을 써도 결과는 항상 같지 않다.** 출력 품질을 좌우하는 건 모델만큼이나 **하네스(harness)** — 컨텍스트 관리, 도구 접근권, 검증 루프, 코드베이스 읽는 방식 — 다. 좋은 하네스가 원 모델보다 체감 차이를 더 크게 만든다.
5. **커스텀 스킬은 셋 다 가능하고, 사실상 표준이 통일됐다.** `AGENTS.md`(프로젝트 지침) + `SKILL.md`(재사용 능력 패키지)라는 **Agent Skills 오픈 표준**으로 수렴해서, 한 번 만든 스킬이 Claude Code·Codex·Antigravity·Cursor·Copilot 사이에서 거의 그대로 호환된다.

---

## §0. "Antigravity 2.0 = IDE 분리 데스크탑 앱"은 절반만 맞다

자주 도는 전제부터 교정한다. (출처: TechCrunch·MarkTechPost 2026-05-19, piunikaweb 2026-05-23, Wikipedia 2026-05-25 갱신)

- **맞는 부분**: 2026년 5월 19일 **Google I/O 2026**에서 **Antigravity 2.0**이 발표됐고, "agent-first(에이전트 우선)" 철학으로 **독립 데스크탑 앱**으로 재구축됐다. 다수 매체가 "IDE 중심에서 벗어나 에이전트 오케스트레이션을 1차 추상화로 삼았다"고 보도.
- **틀린 부분(중요)**: **IDE는 제거되지 않았다.** 출시 직후 초기 UI가 IDE를 전면에 안 띄워서 "코드 에디터를 없앴다"는 오해와 개발자 반발이 일었고, Google은 **5/23 UI 패치**로 "Open IDE" 버튼을 추가하며 정정했다. 담당자(Varun Mohan)가 "IDE 지원을 뺄 의도는 전혀 없었다"고 공식 인정.
- **정확한 현재 형태**: Antigravity 2.0 = **Agent Manager(메인) + Editor(IDE) 두 뷰를 가진 단일 데스크탑 앱** + **CLI + SDK + Managed Agents**. Claude Desktop처럼 IDE가 완전히 떨어져 나간 게 아니라, *무게중심이 "IDE 1차"에서 "에이전트 1차, IDE 2차"로 이동*한 것.

→ 결론: 세 회사 모두 같은 방향("에이전트 우선")으로 가고 있지만, **누구도 IDE를 버리지 않았다.** IDE는 이제 에이전트 플랫폼 안의 한 뷰로 들어갔다.

---

## §1. 세 제품의 정체와 특장점

### 한눈에 보는 표면(surface) 비교 (2026-05)

| | **Claude Code** (Anthropic) | **Codex** (OpenAI) | **Antigravity** (Google) |
|---|---|---|---|
| CLI | ✅ 핵심 진입점 | ✅ 오픈소스(`openai/codex`) | ✅ Antigravity CLI (Go, 신설) |
| IDE 확장 | ✅ VS Code/Cursor/Windsurf + JetBrains | ✅ VS Code 계열 + JetBrains | — (자체 데스크탑 앱에 Editor 뷰 내장) |
| 독립 데스크탑 앱 | ✅ mac/win | ✅ mac/win (Linux 예고) | ✅ mac/win/linux (앱이 곧 본체) |
| 클라우드/비동기 | ✅ claude.ai/code (web) | ✅ Codex Cloud + Mobile | ✅ Managed Agents (Gemini API) |
| 기본 모델 | Claude Opus 4.8 | GPT-5.5 | Gemini 3.5 Flash |
| 멀티모델 | 자사 모델 | 자사 모델 | ✅ **Claude/GPT-OSS도 지원** |

> 핵심: **세 제품 다 "CLI·IDE·데스크탑·클라우드"를 전부 갖췄다.** 차이는 "무엇을 처음 화면에 띄우느냐"(기본 철학)와 디테일.

### Claude Code 특장점
- **하네스 완성도 + IDE 통합이 가장 성숙**하다는 평가. VS Code 확장의 그래픽 chat panel, checkpoint 기반 undo(`/rewind`), 병렬 대화 등.
- **`/effort` 레벨 슬라이더**: `low → medium → high → xhigh → max → ultracode`로 추론량(품질 vs 속도/rate-limit)을 직접 조절. Opus 4.8과 함께 전면화.
- **Dynamic Workflows**: 한 세션에서 수백 개 subagent를 fan-out해 코드베이스 규모(수십만 줄) 마이그레이션 처리. (Enterprise/Team/Max research preview)
- **세션 이동성**: `/teleport`(web→터미널), `/remote-control`(로컬 세션을 다른 기기에서 제어), `/code-review ultra`(클라우드 멀티에이전트 리뷰).
- 시장 위치(2차 매체): VS Code 확장 설치 수·평점에서 Codex보다 소폭 우위라는 보도(단일 출처, 참고용).

### Codex 특장점
- **출력이 간결(terse)**하다는 점이 Claude Code 대비 차별점으로 자주 꼽힘.
- **Goal mode**(2026-05-21 정식): 목표를 향해 수 시간~수일 자율 주행. 모든 표면(app/IDE/CLI)에서 사용.
- **Computer use / Remote computer use**: macOS에서 네이티브 앱·브라우저를 직접 조작, **Mac이 잠긴 뒤에도 원격으로**(Codex Mobile 경유 포함) 데스크탑 앱 사용.
- **Appshots**: 최전면 앱 창을 스크린샷+텍스트로 Codex에 전달.
- **데스크탑 앱이 "병렬 스레드 허브"**: worktree·automations·Git 내장, 여러 Codex 스레드를 동시에 굴리는 집중형 경험.
- 3rd-party 평가: "2026년 5월 시점 Codex와 Claude Code 어느 쪽도 명확히 우월하지 않으며, 팀들은 워크플로우별로 둘 다 유지하는 경향".

### Antigravity 특장점
- **Artifacts(검증 가능한 산출물)가 핵심 차별점**: 에이전트가 작업을 ① Task List(코딩 전 계획) ② Implementation Plan(리뷰 체크포인트) ③ Code Diffs ④ Walkthrough(완료 요약) ⑤ 웹 작업 시 스크린샷·브라우저 녹화로 문서화. **Google Docs 스타일로 계획에 직접 코멘트** 가능(재프롬프트 불필요).
- **Browser control**: 에이전트가 로컬 dev 서버 띄우고 → 관리형 Chrome 실행 → 버튼 클릭·폼 입력·상호작용 영상 녹화까지.
- **Parallel agents / Scheduled tasks**: 여러 작업 동시 실행 + cron 스타일 예약(1회/일간/주간).
- **멀티모델**: 기본 Gemini 3.5 Flash 외에 **Claude Sonnet/Opus 4.6, GPT-OSS-120B**도 선택 가능 (셋 중 유일하게 타사 모델 1급 지원).
- **네이티브 음성 명령**, AI Studio "Export to Antigravity", Android/Firebase 통합.
- ⚠️ 단, 출시 직후라 IDE 혼란 사례처럼 안정성/UX가 아직 다듬어지는 중.

---

## §2. IDE 대화창 vs 에이전트 데스크탑 — 취향인가, 본질인가?

핵심 질문. 답은 **"코드에디터 취향 문제가 아니다. 작업 모델 자체가 다르다. 그리고 결과는 항상 같지 않다."**

### (a) 진짜 축은 IDE-vs-데스크탑이 아니라 "동기 vs 비동기"

| | **동기적 (Synchronous)** | **비동기적 (Asynchronous)** |
|---|---|---|
| 비유 | 옆에서 같이 짜는 페어프로그래밍 | 일감을 던지고 결과물을 나중에 리뷰 |
| 전형 | IDE 확장의 대화창 세션 | 데스크탑 앱 Agent Manager / 클라우드 위임 |
| 인터랙션 | 매 턴 보고 승인 | 목표만 주고 자율 주행 → artifact 검토 |
| 적합 작업 | 탐색적·미정의·잘 아는 코드 | 정의 잘 된·반복·대규모·병렬 가능 작업 |
| 동시 처리 | 보통 1개 흐름에 집중 | 여러 에이전트 병렬 (5개씩) |

→ **그래서 "IDE 확장 vs 데스크탑 앱"은 사실 이 동기/비동기 축의 그림자다.** 그리고 2026년 5월엔 **셋 다 양쪽 모드를 한 제품에 담았다.** Claude Code도 IDE 확장(동기)과 background agents/web(비동기)을 다 갖고, Antigravity도 Editor(동기)와 Agent Manager(비동기)를 다 갖는다. 그러니 "둘 중 뭘 쓰냐"보다 **"이 작업이 동기형이냐 비동기형이냐"로 모드를 고르는 것**이 맞다.

### (b) "결과는 항상 동일한가?" → 아니다

같은 모델(예: Opus 4.8)을 IDE 확장에서 쓰든 데스크탑 앱에서 쓰든, **결과가 항상 같지는 않다.** 이유:

1. **하네스(harness)가 다르다.** 컨텍스트를 어떻게 압축/주입하는지, 어떤 도구(파일읽기·터미널·브라우저·서브에이전트)에 접근시키는지, 검증 루프(테스트·리뷰·롤백)를 어떻게 거는지가 표면마다 다르다. → 같은 두뇌라도 작업 환경이 다르면 산출물이 달라진다.
2. **자율성 수준이 다르다.** 동기 모드는 중간중간 개입해 궤도를 수정 → 작은 실수 누적 방지. 비동기 모드는 멀리 가서 한 번에 가져오므로 *잘 풀리면 훨씬 빠르고, 빗나가면 크게 빗나간다*.
3. **컨텍스트 양이 다르다.** 데스크탑/클라우드 에이전트는 보통 더 많은 파일을 스스로 읽고 더 긴 작업을 이어가도록 설계 → 대규모 작업에서 우위.

> 즉 **"단순 취향 차이"가 아니라, 작업 성격에 따라 결과 품질·속도·실패 양상이 실제로 갈린다.** 다만 *잘 정의된 작은 작업*에서는 어느 모드든 결과가 수렴하는 경향이 있어서, "취향처럼 느껴지는 구간"도 분명히 있다.

### (c) 그래서 차별화된 특장점은?

- **동기(IDE 대화창)의 강점**: 잘 아는 코드, 탐색·디버깅, 한 줄 한 줄 통제하고 싶을 때. 학습 효과도 큼(과정을 본다).
- **비동기(에이전트 데스크탑)의 강점**: 반복·대규모·병렬 작업, "자는 동안 돌려놓기", 여러 갈래 동시 시도 후 베스트 채택. 단 **검증 능력이 전제**다 — 결과물을 읽고 고칠 수 있어야 비동기의 이득을 실제로 가져간다.

---

## §3. 슬래시 명령어 & 커스텀 스킬

### (a) Claude Code 기본 슬래시 명령 (공식 문서 60+개 중 핵심)

| 명령 | 용도 |
|---|---|
| `/clear`(=`/new`,`/reset`) | 빈 컨텍스트로 새 대화 |
| `/compact [지시]` | 대화 요약으로 컨텍스트 확보 |
| `/init` | `CLAUDE.md` 생성(프로젝트 지침) |
| `/model`, `/effort` | 모델·추론량 선택 |
| `/review [PR]`, `/security-review` | 코드/보안 리뷰 |
| `/agents`, `/hooks`, `/mcp`, `/plugin` | 서브에이전트·훅·MCP·플러그인 관리 |
| `/rewind`(=`/checkpoint`,`/undo`) | 코드+대화 롤백 |
| `/background`(`/bg`), `/tasks`, `/batch` | 병렬·백그라운드 작업 |
| `/teleport`, `/remote-control` | 세션 이동/원격 제어 |
| `/code-review`, `/simplify`, `/deep-research`, `/loop` | 번들 스킬/워크플로우 |
| `/config`(=`/settings`), `/context`, `/usage`(=`/cost`) | 설정·상태·비용 |

> 주의: "Not every command appears for every user" — 플랜/플랫폼/환경에 따라 노출이 다름.

### (b) Codex 기본 슬래시 명령 (CLI 기준 핵심)

| 명령 | 용도 |
|---|---|
| `/model`, `/fast` | 모델·fast tier 선택 |
| `/plan`, `/goal` | 계획 모드 / 영속 목표 설정 |
| `/new`, `/resume`, `/fork`, `/side`, `/clear` | 세션·스레드 관리 |
| `/permissions`, `/approve`, `/agent` | 승인 정책 / 서브에이전트 전환 |
| `/ide`, `/mention`(`@`), `/vim` | 에디터 연동 |
| `/mcp`, `/plugins`, `/apps`, `/skills`(`$`), `/hooks` | 도구·스킬·훅 |
| `/diff`, `/review`, `/status`, `/compact` | 리뷰·상태·요약 |
| `/init` | 저장소용 `AGENTS.md` 스캐폴드 |
| `/memories` | 메모리 주입 on/off |

> 큐잉: 작업 실행 중엔 슬래시 명령 입력 후 **Tab**으로 다음 턴에 큐잉.

### (c) Antigravity 기본 슬래시 명령 (I/O 2026 신규 4종)

| 명령 | 용도 |
|---|---|
| `/goal` | 중간 확인 없이 완료까지 자율 실행 |
| `/grill-me` | 파일 건드리기 전 에이전트가 **요구사항을 역질문** |
| `/schedule` | cron 스타일 예약 작업 등록 |
| `/browser` | Chrome 브라우저 제어 명시적 활성화 |

> 사용자가 만든 워크플로우도 agent 패널에서 `/`로 호출됨(아래 (e)). 🟡 공식 docs가 JS 렌더링이라 전체 내장 명령 목록은 확인 불가.

### (d) "Codex/Antigravity도 커스텀 스킬을 추가할 수 있나?" → **셋 다 가능. 표준이 거의 통일됐다.**

가장 실용적인 발견. **`AGENTS.md` + `SKILL.md` = Agent Skills 오픈 표준**(agentskills.io)으로 세 회사가 수렴 중이라, *한 번 만든 스킬이 도구 간에 거의 그대로 호환*된다.

| | **프로젝트 지침** | **커스텀 슬래시 명령** | **재사용 스킬 패키지** |
|---|---|---|---|
| **Claude Code** | `CLAUDE.md` | `.claude/commands/<name>.md` 또는 `.claude/skills/<name>/SKILL.md` (둘 다 `/name` 생성) | `.claude/skills/<name>/SKILL.md` (+ `~/.claude/skills/` 글로벌) |
| **Codex** | `AGENTS.md` (글로벌 `~/.codex/AGENTS.md` + 프로젝트별 레이어링) | `~/.codex/prompts/<name>.md` → `/prompts:name` | `.agents/skills/<name>/SKILL.md` (+ `$HOME/.agents/skills/`) |
| **Antigravity** | 프로젝트 루트 `AGENTS.md` (구 `GEMINI.md` 대체) | `.agents/workflows/<name>.md` → agent 패널 `/`로 트리거 | `.agents/skills/<name>/SKILL.md` (+ 글로벌 `~/.gemini/antigravity/skills/`) |

**`SKILL.md` 공통 구조** (세 도구 호환):
```markdown
---
name: skill-name
description: 언제 이 스킬이 트리거되어야/되지 말아야 하는지 명확히
---
에이전트가 따를 지시사항 (+ scripts/ references/ assets/ 동봉 가능)
```

추가로 알아둘 메커니즘:
- **Claude Code**: 커스텀 커맨드가 **Skills로 통합**됨. 기존 `.claude/commands/*.md`는 계속 작동하되, Skills는 보조 파일·frontmatter invocation 제어·자동 로드를 추가 제공. 본문에 `` !`git diff HEAD` `` 같은 줄로 **동적 컨텍스트 주입** 가능.
- **Codex**: Skills는 **progressive disclosure**(초기엔 이름·설명만 ~8000자 cap 로드, 선택 시 본문). `agents/openai.yaml`로 MCP 의존성·invocation 정책 선언. 🟡 일부 3rd-party는 `~/.codex/skills/` 경로를 안내하나 **공식 문서는 `.agents/skills`** — 공식 우선.
- **Antigravity**: 워크플로우 step 위에 **`// turbo`** 디렉티브를 넣으면 터미널 명령 권한 요청을 건너뛰고 자동 실행(Turbo Mode). Rules는 항상 적용(`.agents/rules/`), Workflows는 온디맨드.

> 💡 시사점: `.claude/commands/`에 만든 `/spec`·`/execute` 같은 커스텀 스킬을, **`SKILL.md` 표준으로 옮기면 Codex/Antigravity에서도 거의 그대로 재사용** 가능. 멀티 도구 워크플로우를 쓰게 될 때 이식 비용이 낮아진다.

### (e) MCP는 셋 다 공통 표준

세 제품 모두 **MCP(Model Context Protocol) 클라이언트**다. Claude Code/Cursor에서 쓰던 MCP 서버 설정이 Codex·Antigravity에서도 동일 포맷으로 동작. (Antigravity는 내장 MCP 스토어 + `~/.gemini/antigravity/mcp_config.json`)

---

## §4. 추가로 알면 좋은 것

1. **"표준 전쟁"이 사용자에게 유리하게 끝나가는 중.** `AGENTS.md`·`SKILL.md`·MCP가 사실상 공통 규격이 되면서, **특정 벤더에 락인되는 위험이 줄었다.** 도구를 갈아타도 지침·스킬·MCP 설정 자산은 대부분 이식된다. → 한 도구에 올인하기보다 *이식 가능한 형태로 자산을 쌓는 것*이 안전.

2. **Gemini CLI / Code Assist는 일몰(sunset) 중.** 기존 Gemini CLI·Code Assist IDE 확장은 **2026-06-18부로** Pro/Ultra/무료 사용자 요청 처리를 중단하고 **Antigravity CLI로 이관**(유료 Code Assist 라이선스 보유 조직은 예외). Gemini CLI를 쓰던 사람은 마이그레이션 필요.

3. **멀티모델은 Antigravity만의 무기.** Claude Code는 Claude만, Codex는 OpenAI 모델만 돌리지만, **Antigravity는 Gemini + Claude(Opus/Sonnet 4.6) + GPT-OSS-120B**를 한 도구에서 선택 가능. "모델 비교/혼용"을 한 곳에서 하고 싶으면 Antigravity가 유리.

4. **가격대는 셋이 거의 똑같다** (월 구독, 2026-05):
   - 입문 유료 **$20** (ChatGPT Plus / Claude Pro / Google AI Pro)
   - 헤비 **$100** (ChatGPT Pro / Google AI Ultra / Claude Max 계열)
   - 최상위 **$200** (ChatGPT Pro 상위 / Google AI Ultra Premium)
   - Codex는 별도 구독 없이 ChatGPT 구독에 포함, 2026-04-02부터 **per-message → 토큰 사용량 기반** 과금으로 전환.

5. **"GPT-5.6"은 아직 루머다.** Codex 백엔드 로그·코드명·예측시장 기반 소문은 있으나 **2026-05-29 현재 공식 발표 없음**(6월 예상은 추측). 마찬가지로 Gemini 3.5 **Pro**는 "곧 롤아웃" 예고만 됐고 정식 벤치마크 미공개. → 모델 세부는 [플래그십 모델 벤치마크](../benchmarks.md) 참조.

6. **검증 능력 = 비동기 시대의 해자(moat).** Artifacts·Walkthrough·browser 녹화처럼 *에이전트가 자기 작업을 설명·증명하는 장치*가 늘어나는 건, 역설적으로 **"읽고 판단하는 사람"의 가치가 올라간다**는 뜻. 만드는 건 에이전트가 하고, *맞는지 가르는 건 여전히 사람* 몫.

---

## §5. 선택 가이드 — 언제 무엇을 쓰나

- **메인 작업용**: 하네스 성숙도·IDE 통합·커스텀 워크플로우(`.claude/commands/`) 측면에서 **Claude Code**가 가장 안정적. 이 sigma 워크플로우 템플릿도 그 위에 구축돼 있다.
- **한 도구, 두 모드 병행**: ① IDE 대화창(동기)으로 잘 모르는 코드를 검증하며 익히고 → ② 검증 가능한 영역부터 background/batch(비동기)로 위임하는 2단계 운용이 생산성과 안전성을 모두 잡는다. *검증 능력이 약한 단계일수록 동기 모드 비중을 높게.*
- **이식 가능한 자산으로**: 커스텀 스킬을 `SKILL.md` 오픈 표준으로 정리해두면 도구를 갈아타도 손해가 없다(벤더 락인 회피).
- **모델 비교/혼용**: 같은 작업에 Gemini/Claude/GPT를 돌려보고 싶으면 **Antigravity**가 멀티모델이라 "실험실"로 적합. 메인은 Claude Code, 비교·탐색은 Antigravity 식 분업도 한 방법.

---

*2026-05-29 웹 리서치 기반. 미확인 항목은 🟡 표시.*
*출처: developers.openai.com/codex(공식), code.claude.com/docs(공식), anthropic.com(공식), blog.google·developers.googleblog.com(공식), TechCrunch·MarkTechPost·Wikipedia·9to5mac 등 2026-05 보도.*
