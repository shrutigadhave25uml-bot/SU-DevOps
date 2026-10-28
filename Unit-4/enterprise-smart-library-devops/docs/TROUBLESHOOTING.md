# Troubleshooting

## AWS authentication errors
Run `aws sts get-caller-identity`. Reconfigure credentials or SSO using your organization's approved method. Verify the selected region.

## Terraform cannot find the key pair
`key_name` must refer to an EC2 key pair in the same region as the instance. Create/import it before `terraform apply`.

## SSH timeout
Check the instance is running, `ssh_allowed_cidr` matches your current public IP, the key file is correct, and TCP/22 is allowed by both AWS security group and network. Confirm the subnet has an Internet Gateway route.

## Ansible host-key prompt or SSH failure
First connect manually once to verify the host and key. Do not disable host key checking as a routine workaround. Verify the private key permissions (`chmod 400`).

## Container image pull fails
Confirm `APP_IMAGE` is valid and the EC2 host can access the registry. For private registries, add a secure authentication mechanism; do not place registry passwords in source control.

## Nginx returns 502
Check `sudo docker ps -a`, `sudo docker logs library-app`, and `sudo nginx -t`. The application must listen on the configured container port (5000) and be reachable from the host loopback binding.

## Health check returns 404
The project defaults to `/api/health`, matching the supplied architecture manual. Change `HEALTH_PATH` for the smoke test and update `health_path` in Terraform variables if you want the Terraform output URL to match.
