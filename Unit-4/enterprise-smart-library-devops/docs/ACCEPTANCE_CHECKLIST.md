# Acceptance Checklist

- [ ] `aws sts get-caller-identity` succeeds in the intended AWS account.
- [ ] `terraform fmt -check` and `terraform validate` pass.
- [ ] `terraform plan` reviewed before apply.
- [ ] VPC, public subnet, IGW, route table, security group, EC2 and S3 bucket exist.
- [ ] SSH access is restricted to a trusted CIDR.
- [ ] Ansible playbook completes successfully.
- [ ] Docker and Nginx services are active.
- [ ] `library-app` container is running.
- [ ] HTTP health endpoint responds as expected.
- [ ] S3 bucket public access block, encryption and versioning are enabled.
- [ ] Teardown tested and retained data/backups reviewed.
