# Repository Structure

```text
.
├── README.md
├── .gitignore
├── terraform/
│   ├── versions.tf
│   ├── provider.tf
│   ├── variables.tf
│   ├── main.tf
│   ├── outputs.tf
│   ├── user_data.sh
│   └── terraform.tfvars.example
├── ansible/
│   ├── ansible.cfg
│   ├── inventory.ini.example
│   ├── site.yml
│   └── roles/
│       ├── common/
│       ├── docker/
│       ├── nginx/
│       └── library_app/
├── scripts/
│   ├── deploy.sh
│   └── smoke-test.sh
└── docs/
    ├── DEPLOYMENT.md
    ├── SECURITY.md
    └── PROJECT_STRUCTURE.md
```

Terraform owns cloud resources. Ansible owns host configuration and application container deployment. The deploy script bridges Terraform output into an Ansible inventory.
