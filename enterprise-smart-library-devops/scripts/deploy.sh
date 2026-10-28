#!/usr/bin/env bash
set -euo pipefail
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TF_DIR="${ROOT_DIR}/terraform"
ANSIBLE_DIR="${ROOT_DIR}/ansible"
SSH_PRIVATE_KEY="${SSH_PRIVATE_KEY:-$HOME/.ssh/library-aws-key}"

if [[ ! -f "${TF_DIR}/terraform.tfstate" ]]; then
  echo "Terraform state not found. Run terraform apply in ${TF_DIR} first." >&2
  exit 1
fi
if [[ ! -f "${SSH_PRIVATE_KEY}" ]]; then
  echo "SSH private key not found: ${SSH_PRIVATE_KEY}" >&2
  echo "Set SSH_PRIVATE_KEY=/path/to/key and rerun." >&2
  exit 1
fi
if [[ -z "${APP_IMAGE:-}" ]]; then
  echo "Set APP_IMAGE to your published library app image before deploying." >&2
  exit 1
fi

IP="$(terraform -chdir="${TF_DIR}" output -raw app_server_public_ip)"
cat > "${ANSIBLE_DIR}/inventory.ini" <<EOF
[library_servers]
library-host ansible_host=${IP} ansible_user=ubuntu ansible_ssh_private_key_file=${SSH_PRIVATE_KEY}
EOF

export APP_IMAGE
ansible-galaxy collection install community.docker community.general
ANSIBLE_CONFIG="${ANSIBLE_DIR}/ansible.cfg" ansible-playbook \
  -i "${ANSIBLE_DIR}/inventory.ini" \
  "${ANSIBLE_DIR}/site.yml" \
  -e "app_image=${APP_IMAGE}"
