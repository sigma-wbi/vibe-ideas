# CLAUDE.md

> sigma-vnc-v1 핵심 지침. 상세 규칙은 .claude/CLAUDE.md 참조.

## 3원칙

1. **불확실하면 질문** -- AskUserQuestion 사용. 추측 금지.
2. **작업 범위 지키기** -- current.md "작업 범위" 내 파일만 수정.
3. **컨텍스트 복구** -- CC 시 Hook 지침대로 복구. "어디까지 했나요?" 묻지 않기.

## 메모리 시스템

CC 내장 auto memory 사용 (서버 불필요).
- 감지 → MEMORY.md 확인 (중복 스킵) → 파일 저장 → MEMORY.md 인덱스 업데이트 → 1줄 보고
- 대상: gotcha(함정), pattern(재사용 패턴), insight(비자명 원리)
- 파일 네이밍: `gotcha_*.md`, `pattern_*.md`, `insight_*.md`, `decision_*.md`

## 스킬

> 전체 스킬: `.claude/commands/` 각 파일 참조.

| 분류 | 스킬 |
|------|------|
| Core | /patch, /spec, /execute, /fix, /qa |
| Periodic | /reflect, /onboarding, /housekeeping |
| On-demand | /ask, /suggest, /guide, /study, /idea, /learn, /cert |

## Hook 동작

5개 Hook이 작업 흐름을 자동 보조한다 (상세: .claude/CLAUDE.md 7절).

## CC 복구 프로토콜

1. Hook이 state.json 기반 최소 읽기 세트를 안내하면 그대로 따른다.
2. Hook 없으면: current.md -> spec 문서 -> 기록 지점에서 재개.
3. 불확실하면 AskUserQuestion. 절대 추측 진행하지 않는다.

## 참조 문서

| 문서 | 내용 |
|------|------|
| .claude/CLAUDE.md | 상세 워크플로우 가이드 (**SSoT**) |
| .sigma-vnc-v1/context/current.md | 현재 작업 상태 |
| .sigma-vnc-v1/context/state.json | 기계 읽기용 상태 (Primary) |
| .claude/commands/ | 스킬별 상세 프로토콜 |

EnterPlanMode 사용 금지 -- /spec 사용.

## 문서 읽기 규칙

**우선순위:** Read 도구 → markitdown(Python) → pandoc → libreoffice

| 포맷 | 방법 |
|------|------|
| PDF (≤20p) | `Read(file_path, pages="1-5")` — 네이티브 지원. **실패 시 아래 PyMuPDF 절차 사용.** |
| PDF (>20p) | pages 파라미터로 분할 읽기. 실패 시 PyMuPDF 또는 markitdown |
| PDF 이미지 | Read 도구로 직접 시각 확인. 실패 시 PyMuPDF로 PNG 변환 후 Read |
| DOCX | `markitdown` 변환 후 Read. pandoc 설치 시 `pandoc file.docx -t markdown` 우선 |
| XLSX | `markitdown` 변환 (마크다운 테이블) |
| PPTX | `markitdown` 변환 (텍스트). 시각 필요 시 libreoffice로 PDF 변환 후 Read |
| .doc/.xls | `libreoffice --headless --convert-to txt` |
| 이미지 | `Read(file_path)` — 멀티모달 네이티브 |

### PDF 읽기 실패 시 (Windows 등 pdftoppm 미설치 환경)

Read 도구의 PDF 지원은 내부적으로 `pdftoppm`(poppler-utils)에 의존한다.
Windows 등 미설치 환경에서는 **PyMuPDF 변환 방식**을 사용한다.

```bash
python3 -c "
import fitz, os
doc = fitz.open('PDF경로')
out_dir = os.path.dirname('PDF경로') + '/pdf_pages'
os.makedirs(out_dir, exist_ok=True)
for i in range(시작페이지, 끝페이지+1):
    pix = doc[i].get_pixmap(dpi=150)
    pix.save(os.path.join(out_dir, f'page_{i}.png'))
    print(f'page_{i}.png saved')
doc.close()
"
```

- 페이지 번호는 **0-based** (첫 페이지 = 0)
- `dpi=150`이 텍스트+이미지 모두 읽기에 적합
- 변환 후 `Read(pdf_pages/page_0.png)` 으로 확인
- **확인 완료 후 `rm -rf pdf_pages/` 필수** (임시 파일, 커밋 금지)

### 텍스트만 필요한 경우 (markitdown)

```bash
python3 -c "from markitdown import MarkItDown; print(MarkItDown().convert('파일경로').text_content)"
```

사전 설치: `pip install markitdown pymupdf pdfminer.six mammoth openpyxl pandas python-pptx`
