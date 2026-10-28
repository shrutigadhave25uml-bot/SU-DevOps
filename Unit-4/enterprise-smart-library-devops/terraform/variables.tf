variable "aws_region" {
  description = "AWS region for all resources."
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Short project name used in resource names."
  type        = string
  default     = "smart-library"
}

variable "environment" {
  description = "Deployment environment label."
  type        = string
  default     = "dev"
}

variable "vpc_cidr" {
  description = "VPC IPv4 CIDR."
  type        = string
  default     = "10.0.0.0/16"
}

variable "public_subnet_cidr" {
  description = "Public subnet IPv4 CIDR."
  type        = string
  default     = "10.0.1.0/24"
}

variable "instance_type" {
  description = "EC2 instance type."
  type        = string
  default     = "t2.micro"
}

variable "key_name" {
  description = "Name of an existing EC2 key pair in the target region."
  type        = string
}

variable "ssh_allowed_cidr" {
  description = "CIDR allowed to connect to SSH/22. Use your IP /32."
  type        = string
  validation {
    condition     = can(cidrnetmask(var.ssh_allowed_cidr))
    error_message = "ssh_allowed_cidr must be a valid IPv4 CIDR."
  }
}

variable "app_allowed_cidr" {
  description = "CIDR allowed to connect directly to app port 5000. Restrict this unless direct API access is needed."
  type        = string
  default     = "127.0.0.1/32"
  validation {
    condition     = can(cidrnetmask(var.app_allowed_cidr))
    error_message = "app_allowed_cidr must be a valid IPv4 CIDR."
  }
}

variable "app_image" {
  description = "Container image for the library application; must listen on port 5000."
  type        = string
  default     = "REPLACE_WITH_YOUR_LIBRARY_APP_IMAGE"
}

variable "app_container_port" {
  description = "Port exposed by the app container."
  type        = number
  default     = 5000
}

variable "health_path" {
  description = "Application health endpoint path used by smoke tests."
  type        = string
  default     = "/api/health"
}
