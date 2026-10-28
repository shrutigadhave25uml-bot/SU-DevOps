output "app_server_public_ip" {
  description = "Public IPv4 address of the application host."
  value       = aws_instance.app.public_ip
}

output "app_server_public_dns" {
  description = "Public DNS name of the application host."
  value       = aws_instance.app.public_dns
}

output "backup_bucket_name" {
  description = "Private versioned S3 backup bucket name."
  value       = aws_s3_bucket.backups.bucket
}

output "health_url" {
  description = "Configured application health endpoint URL."
  value       = "http://${aws_instance.app.public_ip}${var.health_path}"
}
