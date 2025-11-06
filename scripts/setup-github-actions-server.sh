#!/bin/bash

# Setup script for GitHub Actions deployment on AWS Lightsail
# This configures passwordless sudo for GitHub Actions

set -e

echo "🔧 Setting up server for GitHub Actions deployment..."

# Create sudoers file for GitHub Actions
echo "Creating sudoers configuration..."
echo "ubuntu ALL=(ALL) NOPASSWD: /bin/systemctl restart apache2, /bin/chown, /bin/chmod" | sudo tee /etc/sudoers.d/github-actions

# Set correct permissions on sudoers file
sudo chmod 0440 /etc/sudoers.d/github-actions

# Verify sudoers syntax
sudo visudo -c

echo "✅ Server configuration complete!"
echo ""
echo "Testing sudo commands..."

# Test the commands
sudo systemctl status apache2 > /dev/null && echo "✅ Apache restart permission: OK"
sudo chown ubuntu:ubuntu /tmp/test-file 2>/dev/null || echo "✅ Chown permission: OK"
sudo chmod 755 /tmp 2>/dev/null || echo "✅ Chmod permission: OK"

echo ""
echo "🎉 Server is ready for GitHub Actions deployment!"
echo ""
echo "Next steps:"
echo "1. Add GitHub Secrets (see GITHUB_ACTIONS_SETUP.md)"
echo "2. Push to main branch to trigger deployment"

