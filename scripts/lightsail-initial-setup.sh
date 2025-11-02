#!/bin/bash

# Initial setup script for AWS Lightsail instance
# This script helps you set up the server for the first time
# Run this on your Lightsail instance after SSH

set -e

echo "🕉️  Sri Harivyas Nikunja Mandir Website - Lightsail Setup"
echo "=========================================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Get user input
echo -e "${YELLOW}This script will set up your Lightsail instance for deployment.${NC}"
echo ""
read -p "Enter your GitHub username (default: saradcd77): " GITHUB_USER
GITHUB_USER=${GITHUB_USER:-saradcd77}

read -p "Enter repository name (default: sri-harivyas-website): " REPO_NAME
REPO_NAME=${REPO_NAME:-sri-harivyas-website}

read -p "Enter deployment path (default: /var/www/ashram-website): " DEPLOY_PATH
DEPLOY_PATH=${DEPLOY_PATH:-/var/www/ashram-website}

read -p "Enter port for Node.js server (default: 3000): " NODE_PORT
NODE_PORT=${NODE_PORT:-3000}

echo ""
echo -e "${BLUE}Configuration:${NC}"
echo "  GitHub: https://github.com/$GITHUB_USER/$REPO_NAME"
echo "  Deploy Path: $DEPLOY_PATH"
echo "  Node.js Port: $NODE_PORT"
echo ""
read -p "Continue with this configuration? (y/n): " CONFIRM
if [ "$CONFIRM" != "y" ]; then
    echo "Setup cancelled."
    exit 1
fi

echo ""
echo -e "${BLUE}📦 Step 1: Updating system packages...${NC}"
sudo apt update && sudo apt upgrade -y

# Check if Node.js is installed
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✅ Node.js already installed: $NODE_VERSION${NC}"
    
    # Check if version is 20 or higher
    NODE_MAJOR=$(node --version | cut -d'.' -f1 | sed 's/v//')
    if [ "$NODE_MAJOR" -lt 20 ]; then
        echo -e "${YELLOW}⚠️  Node.js version is less than 20. Upgrading...${NC}"
        curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
        sudo apt-get install -y nodejs
    fi
else
    echo -e "${BLUE}📦 Installing Node.js 20...${NC}"
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

NODE_VERSION=$(node --version)
NPM_VERSION=$(npm --version)
echo -e "${GREEN}✅ Node.js: $NODE_VERSION${NC}"
echo -e "${GREEN}✅ npm: $NPM_VERSION${NC}"

# Install PM2
if command -v pm2 &> /dev/null; then
    echo -e "${GREEN}✅ PM2 already installed${NC}"
else
    echo -e "${BLUE}📦 Installing PM2...${NC}"
    sudo npm install -g pm2
fi

# Install Nginx
if command -v nginx &> /dev/null; then
    echo -e "${GREEN}✅ Nginx already installed${NC}"
else
    echo -e "${BLUE}📦 Installing Nginx...${NC}"
    sudo apt install nginx -y
    sudo systemctl enable nginx
    sudo systemctl start nginx
fi

echo ""
echo -e "${BLUE}📁 Step 2: Setting up deployment directory...${NC}"
sudo mkdir -p $DEPLOY_PATH
sudo chown -R $USER:$USER $DEPLOY_PATH
echo -e "${GREEN}✅ Directory created: $DEPLOY_PATH${NC}"

echo ""
echo -e "${BLUE}🔑 Step 3: Setting up SSH keys...${NC}"

# Generate SSH key for GitHub Actions
if [ ! -f ~/.ssh/github_actions ]; then
    echo "Generating SSH key for GitHub Actions..."
    ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github_actions -N ""
    cat ~/.ssh/github_actions.pub >> ~/.ssh/authorized_keys
    chmod 600 ~/.ssh/authorized_keys
    echo -e "${GREEN}✅ GitHub Actions SSH key created${NC}"
else
    echo -e "${YELLOW}⚠️  GitHub Actions SSH key already exists${NC}"
fi

# Generate SSH key for GitHub repository access
if [ ! -f ~/.ssh/github_deploy ]; then
    echo "Generating SSH key for GitHub repository access..."
    ssh-keygen -t ed25519 -C "lightsail-github-access" -f ~/.ssh/github_deploy -N ""
    
    # Add to SSH config
    if ! grep -q "Host github.com" ~/.ssh/config 2>/dev/null; then
        cat >> ~/.ssh/config << EOF

Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/github_deploy
    IdentitiesOnly yes
EOF
        chmod 600 ~/.ssh/config
    fi
    echo -e "${GREEN}✅ GitHub repository SSH key created${NC}"
else
    echo -e "${YELLOW}⚠️  GitHub repository SSH key already exists${NC}"
fi

echo ""
echo -e "${BLUE}📥 Step 4: Cloning repository...${NC}"
echo ""
echo -e "${YELLOW}⚠️  IMPORTANT: You need to add the deploy key to GitHub first!${NC}"
echo ""
echo "Copy this public key and add it to GitHub:"
echo "GitHub Repo → Settings → Deploy keys → Add deploy key"
echo ""
echo -e "${GREEN}========== COPY THIS KEY ==========${NC}"
cat ~/.ssh/github_deploy.pub
echo -e "${GREEN}===================================${NC}"
echo ""
read -p "Press Enter after you've added the deploy key to GitHub..."

cd $DEPLOY_PATH
if [ -d ".git" ]; then
    echo -e "${YELLOW}⚠️  Repository already cloned. Pulling latest changes...${NC}"
    git pull origin main
else
    echo "Cloning repository..."
    git clone git@github.com:$GITHUB_USER/$REPO_NAME.git .
fi

echo ""
echo -e "${BLUE}📦 Step 5: Installing dependencies...${NC}"
cd $DEPLOY_PATH/ashram-website
npm install

echo ""
echo -e "${BLUE}🔨 Step 6: Building application...${NC}"
npm run build

echo ""
echo -e "${BLUE}⚙️  Step 7: Starting application with PM2...${NC}"
pm2 delete ashram-website 2>/dev/null || true
cd $DEPLOY_PATH/ashram-website
pm2 start npm --name "ashram-website" -- start
pm2 save
pm2 startup | tail -n 1 | bash

echo ""
echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo -e "${YELLOW}========================================${NC}"
echo -e "${YELLOW}📋 NEXT STEPS - GitHub Configuration${NC}"
echo -e "${YELLOW}========================================${NC}"
echo ""
echo "1. Go to: https://github.com/$GITHUB_USER/$REPO_NAME/settings/secrets/actions"
echo ""
echo "2. Add these secrets:"
echo ""
echo "   Secret Name: LIGHTSAIL_HOST"
echo "   Value: $(curl -s ifconfig.me)"
echo ""
echo "   Secret Name: LIGHTSAIL_USERNAME"
echo "   Value: $USER"
echo ""
echo "   Secret Name: LIGHTSAIL_PORT"
echo "   Value: 22"
echo ""
echo "   Secret Name: DEPLOY_PATH"
echo "   Value: $DEPLOY_PATH"
echo ""
echo "   Secret Name: LIGHTSAIL_SSH_KEY"
echo "   Value: (copy the private key below)"
echo ""
echo -e "${GREEN}========== PRIVATE KEY FOR GITHUB ACTIONS ==========${NC}"
cat ~/.ssh/github_actions
echo -e "${GREEN}====================================================${NC}"
echo ""
echo -e "${YELLOW}========================================${NC}"
echo -e "${YELLOW}🌐 NGINX Configuration${NC}"
echo -e "${YELLOW}========================================${NC}"
echo ""
echo "Create Nginx configuration:"
echo ""
echo "  sudo nano /etc/nginx/sites-available/ashram-website"
echo ""
echo "Paste this configuration (replace YOUR_DOMAIN):"
echo ""
cat << 'NGINX_EOF'
server {
    listen 80;
    server_name YOUR_DOMAIN www.YOUR_DOMAIN;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
NGINX_EOF
echo ""
echo "Then enable the site:"
echo ""
echo "  sudo ln -s /etc/nginx/sites-available/ashram-website /etc/nginx/sites-enabled/"
echo "  sudo nginx -t"
echo "  sudo systemctl reload nginx"
echo ""
echo -e "${YELLOW}========================================${NC}"
echo -e "${YELLOW}🔒 SSL Certificate (Optional)${NC}"
echo -e "${YELLOW}========================================${NC}"
echo ""
echo "After Nginx is configured, secure with SSL:"
echo ""
echo "  sudo apt install certbot python3-certbot-nginx -y"
echo "  sudo certbot --nginx -d YOUR_DOMAIN -d www.YOUR_DOMAIN"
echo ""
echo -e "${GREEN}राधेकृष्ण राधेकृष्ण कृष्णकृष्ण राधेराधे 🙏${NC}"
echo ""

