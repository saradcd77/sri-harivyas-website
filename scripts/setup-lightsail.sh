#!/bin/bash

# Setup script for AWS Lightsail instance
# Run this on your Lightsail instance after SSH

set -e

echo "🕉️  Setting up Sri Harivyas Nikunja Mandir Website on Lightsail"
echo "================================================================"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Update system
echo -e "${BLUE}📦 Updating system packages...${NC}"
sudo apt update && sudo apt upgrade -y

# Install Node.js 20
echo -e "${BLUE}📦 Installing Node.js 20...${NC}"
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify Node.js installation
NODE_VERSION=$(node --version)
echo -e "${GREEN}✅ Node.js installed: $NODE_VERSION${NC}"

# Install PM2
echo -e "${BLUE}📦 Installing PM2...${NC}"
sudo npm install -g pm2

# Install Nginx
echo -e "${BLUE}📦 Installing Nginx...${NC}"
sudo apt install nginx -y
sudo systemctl enable nginx
sudo systemctl start nginx

# Create deployment directory
echo -e "${BLUE}📁 Creating deployment directory...${NC}"
sudo mkdir -p /var/www/ashram-website
sudo chown -R $USER:$USER /var/www/ashram-website

# Clone repository
echo -e "${BLUE}📥 Cloning repository...${NC}"
cd /var/www/ashram-website
git clone https://github.com/saradcd77/sri-harivyas-website.git .

# Install dependencies
echo -e "${BLUE}📦 Installing dependencies...${NC}"
npm install

# Build application
echo -e "${BLUE}🔨 Building application...${NC}"
npm run build

# Generate SSH key for GitHub Actions
echo -e "${BLUE}🔑 Generating SSH key for GitHub Actions...${NC}"
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/github_actions -N ""
cat ~/.ssh/github_actions.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys

echo ""
echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo -e "${YELLOW}📋 Next steps:${NC}"
echo "1. Copy this private key and add it to GitHub Secrets as LIGHTSAIL_SSH_KEY:"
echo ""
cat ~/.ssh/github_actions
echo ""
echo "2. Configure Nginx (choose one option):"
echo "   - For Node.js: sudo nano /etc/nginx/sites-available/ashram-website"
echo "   - For Static: sudo nano /etc/nginx/sites-available/ashram-website"
echo ""
echo "3. Start the application:"
echo "   - For Node.js: pm2 start npm --name 'ashram-website' -- start"
echo "   - For Static: Build creates 'out' directory"
echo ""
echo "4. Add GitHub Secrets:"
echo "   LIGHTSAIL_HOST: $(curl -s ifconfig.me)"
echo "   LIGHTSAIL_USERNAME: $USER"
echo "   LIGHTSAIL_PORT: 22"
echo "   LIGHTSAIL_SSH_KEY: (private key shown above)"
echo "   DEPLOY_PATH: /var/www/ashram-website"
echo ""
echo -e "${GREEN}राधेकृष्ण राधेकृष्ण कृष्णकृष्ण राधेराधे 🙏${NC}"

