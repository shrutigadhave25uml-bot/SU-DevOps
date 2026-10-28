# Enterprise Smart Library Management Platform — Terraform + Ansible

Infrastructure-as-Code starter project based on the supplied Careertiq Unit 4 manuals. It provisions AWS networking, an EC2 Ubuntu host, a security group, and a private S3 backup bucket with Terraform; then configures Docker and Nginx and deploys a configurable application container with Ansible.

> **Important:** This is a reusable starter, not a claim that the application image or its API routes are included. Set `app_image` to an image you own that exposes the expected service on port `5000`. If your Unit 3 app uses a different image or port, adjust the variables and Nginx template.

## Architecture

- VPC: `10.0.0.0/16`
- Public subnet: `10.0.1.0/24`
- Internet Gateway + public route
- Ubuntu 22.04 EC2 (default `t2.micro`, configurable)
- Security group: SSH from your CIDR, HTTP/80 from the internet, app/5000 restricted to your CIDR by default
- Private S3 bucket with AES-256 server-side encryption and versioning
- Ansible roles: common, Docker, Nginx, application deployment
- Nginx on port 80 reverse-proxies to the application on port 5000

## Prerequisites

- AWS account and a region with available EC2 capacity
- AWS CLI v2 configured (`aws configure` or your organization's SSO flow)
- Terraform >= 1.7
- Ansible Core >= 2.16
- SSH key pair available locally
- A container image for your library application

Never commit AWS credentials, private SSH keys, Terraform state, or `.tfvars` files containing sensitive values.

## Quick start

1. Copy the example variables:
   ```bash
   cp terraform/terraform.tfvars.example terraform/terraform.tfvars
   ```
2. Edit `terraform/terraform.tfvars`. Set `ssh_allowed_cidr` to your public IP in CIDR notation (for example `203.0.113.10/32` — replace this example), and set `key_name` to an EC2 key pair already imported in your AWS region.
3. Set `app_image` to your own application image. The example placeholder will not deploy a working application.
4. Provision infrastructure:
   ```bash
   cd terraform
   terraform init
   terraform fmt -check
   terraform validate
   terraform plan
   terraform apply
   terraform output
   ```
5. Return to repository root and run Ansible:
   ```bash
   cd ..
   ./scripts/deploy.sh
   ```
   The script builds an inventory from Terraform output and invokes the playbook. It expects the private key at `~/.ssh/library-aws-key` by default; override `SSH_PRIVATE_KEY` if needed.
6. Validate:
   ```bash
   ./scripts/smoke-test.sh
   ```
   This checks HTTP reachability. The API health path is configurable with `health_path` in `terraform/terraform.tfvars` and the matching Ansible variable.

## Configuration

See `terraform/variables.tf` and `terraform/terraform.tfvars.example`.

| Variable | Purpose |
|---|---|
| `aws_region` | AWS deployment region |
| `project_name` | Name prefix for resources |
| `key_name` | Existing EC2 key pair name |
| `ssh_allowed_cidr` | CIDR permitted to SSH; do not use `0.0.0.0/0` |
| `app_allowed_cidr` | CIDR permitted direct access to port 5000; use `0.0.0.0/0` only if intentionally public |
| `app_image` | Container image to run |
| `instance_type` | EC2 size (default `t2.micro`) |

## Tear down

From `terraform/`:
```bash
terraform plan -destroy
terraform destroy
```
Review the plan before confirming. The S3 bucket is configured with `force_destroy = false`, so it will not be deleted if it contains objects. Back up anything important first.

## Notes / limitations

- Terraform creates an S3 bucket for backups, but does not automatically upload SQLite data to it. Add a scheduled backup job and IAM permissions before treating it as a backup solution.
- This starter uses a public EC2 instance and HTTP. For production, use HTTPS/TLS, Systems Manager Session Manager instead of public SSH where possible, least-privilege IAM, private subnets, monitoring, and a managed remote Terraform state backend.
- The supplied architecture manual mentions S3 + DynamoDB for remote state/locking. This starter intentionally uses local state to avoid silently creating shared state infrastructure. Configure a remote backend separately before team/production use.
- AMI selection uses Canonical's Ubuntu 22.04 image data source and is region-aware.
