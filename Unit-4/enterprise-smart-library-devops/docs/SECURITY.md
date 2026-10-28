# Security Notes

- Restrict `ssh_allowed_cidr` to an administrator's current public IP/CIDR. Never use `0.0.0.0/0` for SSH.
- Direct port 5000 is restricted by default. The application container binds to host loopback and Nginx is the public entry point.
- Use HTTPS/TLS for any non-local or sensitive deployment; this starter only configures HTTP.
- Do not commit `.tfvars`, state files, AWS credentials, registry secrets, or private keys.
- EC2 uses IMDSv2 token enforcement and an encrypted gp3 root volume.
- The S3 bucket blocks public access, enables AES-256 encryption and versioning.
- The instance does not yet have an IAM instance profile or automated S3 upload policy. Add a narrowly scoped role before implementing backups.
- Use remote Terraform state with encryption, access controls, versioning, and locking before team/production use.
- UFW is enabled by Ansible and allows SSH and HTTP. Keep AWS security-group rules aligned with this host firewall.
- This is a learning/starter architecture. Production should use private subnets where possible, managed access, HTTPS, patching, monitoring, log retention, and least-privilege IAM.
