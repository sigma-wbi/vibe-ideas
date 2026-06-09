#!/bin/bash
# .sigma-vnc-v1/ 내 모든 디렉토리에 _index.md 초기 생성
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"

find "$PROJECT_DIR/.sigma-vnc-v1" -type d | while read dir; do
    CLAUDE_TOOL_INPUT_FILE_PATH="${dir}/dummy" \
    "$PROJECT_DIR/.sigma-vnc-v1/hooks/index-sync.sh" 2>/dev/null || true
done
echo "✓ _index.md 초기 생성 완료"
