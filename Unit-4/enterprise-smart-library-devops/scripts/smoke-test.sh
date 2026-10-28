#!/usr/bin/env bash
set -euo pipefail
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TF_DIR="${ROOT_DIR}/terraform"
IP="$(terraform -chdir="${TF_DIR}" output -raw app_server_public_ip)"
HEALTH_PATH="${HEALTH_PATH:-/api/health}"
URL="http://${IP}${HEALTH_PATH}"

echo "Checking ${URL}"
curl --connect-timeout 5 --max-time 15 --fail --show-error "${URL}"
echo
echo "HTTP smoke test completed."
