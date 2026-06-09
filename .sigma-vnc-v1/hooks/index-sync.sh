#!/bin/bash
# PostToolUse (Write|Edit) Hook — .sigma-vnc-v1/ 내부 _index.md 자동 갱신
# 주의: bash echo로 직접 파일 쓰기하므로 PostToolUse 재트리거 안 됨
set -euo pipefail

CHANGED_FILE="${CLAUDE_TOOL_INPUT_FILE_PATH:-}"
SIGMA_VNC_DIR=".sigma-vnc-v1"

# .sigma-vnc-v1/ 내부 파일이 아니면 무시
[[ -z "$CHANGED_FILE" || "$CHANGED_FILE" != *"$SIGMA_VNC_DIR"* ]] && exit 0
# _index.md 자체 변경은 무시
[[ "$(basename "$CHANGED_FILE")" == "_index.md" ]] && exit 0

# 텍스트 확장자 화이트리스트
TEXT_EXTS="md|sh|json|yml|yaml|toml|txt|ts|tsx|js|py|rs"

generate_index() {
    local dir="$1"
    local index_file="${dir}/_index.md"
    local dir_name
    dir_name=$(basename "$dir")

    {
        echo "# ${dir_name}/"
        echo ""
        echo "| 파일 | 수정일 | 설명 |"
        echo "|------|--------|------|"

        for item in "$dir"/*; do
            [ ! -e "$item" ] && continue
            local name
            name=$(basename "$item")
            [ "$name" = "_index.md" ] && continue

            local mod_date
            mod_date=$(date -r "$item" "+%Y-%m-%d" 2>/dev/null || echo "-")

            if [ -d "$item" ]; then
                echo "| ${name}/ | ${mod_date} | 디렉토리 |"
            else
                local desc="-"
                if echo "$name" | grep -qE "\.(${TEXT_EXTS})$"; then
                    desc=$(head -1 "$item" 2>/dev/null | sed 's/^#* *//' | sed 's/|/\\|/g' | cut -c1-60)
                    [ -z "$desc" ] && desc="-"
                fi
                echo "| ${name} | ${mod_date} | ${desc} |"
            fi
        done
    } > "$index_file"
}

# 변경 디렉토리에서 .sigma-vnc-v1/ root까지 연쇄 갱신
TARGET_DIR=$(dirname "$CHANGED_FILE")
current="$TARGET_DIR"
while [[ "$current" == *"$SIGMA_VNC_DIR"* && "$current" != "." ]]; do
    generate_index "$current"
    current=$(dirname "$current")
done
