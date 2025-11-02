# 🚀 Automatic Deployment Guide - GitHub to AWS Lightsail

This guide will help you set up automatic deployment from GitHub to your AWS Lightsail instance.

## ⚠️ Important: Multi-Website Setup

**Your Lightsail instance hosts multiple websites.** This deployment is configured to:

- Deploy ONLY to `/var/www/ashram-website` directory
- Use a separate Nginx configuration file
- Use PM2 with a unique app name (`ashram-website`)
- NOT interfere with your other websites

Make sure to:

1. Use a unique directory path
2. Use a unique Nginx config file name
3. Use a unique PM2 app name
4. Configure a unique domain/subdomain

## 📋 Prerequisites

- AWS Lightsail instance running (with other websites)
- SSH access to your Lightsail instance
- GitHub repository (already created: https://github.com/saradcd77/sri-harivyas-website)
- A domain or subdomain for this website (e.g., ashram.yourdomain.com)

## 🔧 Setup Steps

### Step 1: Prepare Your Lightsail Instance

SSH into your Lightsail instance:

```bash
ssh username@your-lightsail-ip
```

#### Check existing setup

```bash
# Check if Node.js is already installed
node --version

# Check if PM2 is already installed
pm2 --version

# Check if Nginx is already installed
nginx -v

# List existing websites
ls -la /var/www/

# Check existing PM2 apps (don't interfere with these!)
pm2 list
```

#### Install Node.js 20+ (if needed or upgrade)

```bash
# Only if Node.js is not installed or version is < 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version  # Should show v20.x.x
npm --version
```

#### Install PM2 (if not already installed)

```bash
# Check if PM2 is installed
pm2 --version || sudo npm install -g pm2
```

#### Create deployment directory (separate from other websites)

```bash
# Create directory for THIS website only
sudo mkdir -p /var/www/ashram-website
sudo chown -R $USER:$USER /var/www/ashram-website
cd /var/www/ashram-website
```

#### Clone your repository

```bash
git clone https://github.com/saradcd77/sri-harivyas-website.git .
npm install
npm run build
```

### Step 2: Configure Nginx (Separate from other websites)

**Important**: This creates a NEW Nginx config file that won't affect your existing websites.

Choose one of the deployment methods:

#### Option A: Node.js Server (Recommended for dynamic features)

**Note**: This will run on port 3000. Make sure this port is not used by your other websites!

Check available ports:

```bash
# Check what ports are in use
sudo netstat -tulpn | grep LISTEN

# If port 3000 is taken, you'll need to use a different port (e.g., 3001, 3002)
# Update next.config.ts and Nginx config accordingly
```

Create a SEPARATE Nginx config file:

```bash
sudo nano /etc/nginx/sites-available/ashram-website
```

Add this configuration (replace `ashram.yourdomain.com` with your actual domain/subdomain):

```nginx
server {
    listen 80;
    server_name ashram.yourdomain.com;  # CHANGE THIS to your domain

    location / {
        proxy_pass http://localhost:3000;  # Use 3001, 3002 if 3000 is taken
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
```

Enable the site (this creates a symlink, won't affect other sites):

```bash
sudo ln -s /etc/nginx/sites-available/ashram-website /etc/nginx/sites-enabled/
sudo nginx -t  # Test configuration
sudo systemctl reload nginx  # Reload, not restart (keeps other sites running)
```

Start the application with PM2 (with unique name):

```bash
cd /var/www/ashram-website
pm2 start npm --name "ashram-website" -- start
pm2 save  # Save PM2 process list
pm2 list  # Verify it's running alongside your other apps
```

#### Option B: Static Export (Faster, simpler)

First, update `next.config.ts` to enable static export:

```typescript
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

Build static site:

```bash
npm run build
```

Create Nginx config:

```bash
sudo nano /etc/nginx/sites-available/ashram-website
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    root /var/www/ashram-website/out;
    index index.html;

    location / {
        try_files $uri $uri.html $uri/ =404;
    }

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/ashram-website /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Step 3: Generate SSH Key for GitHub Actions

On your Lightsail instance:

```bash
# Generate SSH key (press Enter for all prompts)
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/github_actions

# Display the private key (you'll need this for GitHub)
cat ~/.ssh/github_actions

# Add public key to authorized_keys
cat ~/.ssh/github_actions.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

**Important**: Copy the entire private key output (including `-----BEGIN OPENSSH PRIVATE KEY-----` and `-----END OPENSSH PRIVATE KEY-----`)

### Step 4: Configure GitHub Secrets

1. Go to your GitHub repository: https://github.com/saradcd77/sri-harivyas-website

2. Click **Settings** → **Secrets and variables** → **Actions**

3. Click **New repository secret** and add these secrets:

| Secret Name          | Value                                        | Example                   |
| -------------------- | -------------------------------------------- | ------------------------- |
| `LIGHTSAIL_HOST`     | Your Lightsail IP address                    | `54.123.45.67`            |
| `LIGHTSAIL_USERNAME` | SSH username (usually `ubuntu` or `bitnami`) | `ubuntu`                  |
| `LIGHTSAIL_SSH_KEY`  | Private key from Step 3                      | Paste entire private key  |
| `LIGHTSAIL_PORT`     | SSH port (usually 22)                        | `22`                      |
| `DEPLOY_PATH`        | Deployment directory                         | `/var/www/ashram-website` |

### Step 5: Choose Deployment Workflow

You have two workflow files created:

#### For Node.js Server Deployment:

Keep `.github/workflows/deploy.yml` and delete `deploy-static.yml`

```bash
# In your local project
rm .github/workflows/deploy-static.yml
git add .
git commit -m "Configure Node.js deployment"
git push
```

#### For Static Site Deployment:

Keep `.github/workflows/deploy-static.yml` and delete `deploy.yml`

```bash
# In your local project
rm .github/workflows/deploy.yml
git add .
git commit -m "Configure static deployment"
git push
```

### Step 6: Test Automatic Deployment

1. Make a small change to your code (e.g., update README.md)

2. Commit and push:

   ```bash
   git add .
   git commit -m "Test automatic deployment"
   git push
   ```

3. Go to your GitHub repository → **Actions** tab

4. You should see the deployment workflow running

5. Once complete, check your website!

## 🔒 Setup SSL Certificate (Recommended)

After deployment works, secure your site with Let's Encrypt:

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal is set up automatically
sudo certbot renew --dry-run
```

## 🔍 Troubleshooting

### Check deployment logs on GitHub

- Go to **Actions** tab in your repository
- Click on the latest workflow run
- Check the logs for errors

### Check application logs on Lightsail

For Node.js deployment:

```bash
pm2 logs ashram-website
pm2 status
```

For static deployment:

```bash
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

### Common Issues

**Issue**: SSH connection fails

- Check if your Lightsail firewall allows SSH (port 22)
- Verify the SSH key is correct in GitHub secrets
- Test SSH manually: `ssh -i ~/.ssh/github_actions username@your-ip`

**Issue**: Build fails

- Check Node.js version on Lightsail: `node --version`
- Ensure all dependencies are installed
- Check GitHub Actions logs for specific errors

**Issue**: Website not loading

- Check Nginx status: `sudo systemctl status nginx`
- Check Nginx config: `sudo nginx -t`
- For Node.js: Check PM2 status: `pm2 status`

### Manual Deployment (if automatic fails)

SSH into Lightsail and run:

```bash
cd /var/www/ashram-website
git pull origin main
npm install
npm run build

# For Node.js deployment
pm2 restart ashram-website

# For static deployment
sudo systemctl reload nginx
```

## 📊 Monitoring

### Set up PM2 monitoring (for Node.js deployment)

```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

### Monitor Nginx

```bash
# Check access logs
sudo tail -f /var/log/nginx/access.log

# Check error logs
sudo tail -f /var/log/nginx/error.log
```

## 🎯 Deployment Workflow

Once set up, your workflow will be:

1. **Make changes locally**
2. **Commit and push to GitHub**
   ```bash
   git add .
   git commit -m "Your changes"
   git push
   ```
3. **GitHub Actions automatically**:

   - Checks out code
   - Installs dependencies
   - Builds the application
   - Deploys to Lightsail
   - Restarts the application

4. **Your website is updated!** 🎉

## 🌐 Managing Multiple Websites on Same Lightsail Instance

### Current Setup Checklist

Before deploying, verify these don't conflict with your existing websites:

```bash
# 1. Check existing directories
ls -la /var/www/
# Make sure /var/www/ashram-website doesn't conflict

# 2. Check existing Nginx configs
ls -la /etc/nginx/sites-available/
ls -la /etc/nginx/sites-enabled/
# Make sure ashram-website config doesn't exist or conflict

# 3. Check existing PM2 apps
pm2 list
# Make sure "ashram-website" name is not used

# 4. Check ports in use
sudo netstat -tulpn | grep LISTEN
# Make sure port 3000 (or your chosen port) is available

# 5. Check domains configured
cat /etc/nginx/sites-available/*
# Make sure your domain/subdomain is not already used
```

### Isolation Strategy

This deployment is isolated from your other websites:

| Component      | This Website              | Your Other Websites           |
| -------------- | ------------------------- | ----------------------------- |
| Directory      | `/var/www/ashram-website` | `/var/www/other-site-1`, etc. |
| Nginx Config   | `ashram-website`          | `other-site-1`, etc.          |
| PM2 App Name   | `ashram-website`          | `other-app-1`, etc.           |
| Port (Node.js) | `3000` (or 3001, 3002)    | Other ports                   |
| Domain         | `ashram.yourdomain.com`   | Other domains                 |

### Safe Deployment Commands

Always use these safe commands that won't affect other sites:

```bash
# Reload Nginx (not restart) - keeps other sites running
sudo systemctl reload nginx

# Restart only this PM2 app
pm2 restart ashram-website

# View logs for only this app
pm2 logs ashram-website

# Stop only this app (if needed)
pm2 stop ashram-website

# Delete only this app (if needed)
pm2 delete ashram-website
```

### What NOT to Do

❌ **Don't run these commands** (they affect ALL websites):

```bash
# DON'T restart Nginx (use reload instead)
sudo systemctl restart nginx

# DON'T restart all PM2 apps
pm2 restart all

# DON'T delete all PM2 apps
pm2 delete all

# DON'T modify other website configs
```

## 📝 Best Practices

1. **Test locally first**: Always run `npm run build` locally before pushing
2. **Use branches**: Create feature branches and merge to main when ready
3. **Monitor logs**: Check GitHub Actions and server logs regularly
4. **Backup**: Keep regular backups of your Lightsail instance
5. **Security**: Keep Node.js and dependencies updated
6. **Unique names**: Always use unique names for directories, configs, and PM2 apps
7. **Port management**: Document which ports are used by which website
8. **Domain management**: Keep track of which domains point to which websites

## 🆘 Need Help?

- Check GitHub Actions logs for deployment errors
- SSH into Lightsail to check application logs
- Review Nginx error logs
- Test the build locally first

---

**राधेकृष्ण राधेकृष्ण कृष्णकृष्ण राधेराधे** 🙏
