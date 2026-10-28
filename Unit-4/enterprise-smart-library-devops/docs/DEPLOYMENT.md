# Deployment and Operations Runbook

## 1. Local toolchain

On Ubuntu/WSL2, install AWS CLI v2, Terraform 1.7+, Ansible 2.16+, Git, and Python 3.10+. The supplied setup guide covers the workstation installation process. Confirm:
```bash
aws --version
terraform -version
ansible --version
aws sts get-caller-identity
```

## 2. AWS access and SSH

Configure AWS credentials using an approved method. Do not put access keys in this repository. Create/import an EC2 key pair in the selected region, and keep the private key private:
```bash
chmod 400 ~/.ssh/library-aws-key
```
Set `key_name` to the AWS EC2 key pair name and `ssh_allowed_cidr` to your public IP `/32`.

## 3. Terraform

```bash
cp terraform/terraform.tfvars.example terraform/terraform.tfvars
# Edit terraform.tfvars with your values
cd terraform
terraform init
terraform fmt -recursive
terraform validate
terraform plan
terraform apply
```

Review the plan and cost implications before applying. Resource names, IP ranges, region capacity, and account quotas can affect deployment.

## 4. Ansible deployment

Publish your app image to a registry accessible from EC2. The container must listen on port 5000 and use `/app/data` for persistent data if SQLite persistence is desired.
```bash
cd ..
export APP_IMAGE="registry.example.com/your-org/library-app:latest"
./scripts/deploy.sh
```
The role deploys Docker, Nginx, and the container. It binds the application port to loopback on the EC2 host; Nginx exposes it through port 80.

## 5. Validation

```bash
./scripts/smoke-test.sh
```
The default endpoint is `/api/health`. If your application has a different endpoint:
```bash
HEALTH_PATH=/health ./scripts/smoke-test.sh
```
If validation fails, inspect:
```bash
ssh -i ~/.ssh/library-aws-key ubuntu@PUBLIC_IP
sudo systemctl status docker nginx
sudo docker ps -a
sudo docker logs library-app
sudo nginx -t
sudo journalctl -u nginx --no-pager -n 100
```

## 6. Teardown

```bash
cd terraform
terraform plan -destroy
terraform destroy
```
S3 bucket deletion is intentionally blocked while objects remain. Empty it only after verifying that no required backups are present.
