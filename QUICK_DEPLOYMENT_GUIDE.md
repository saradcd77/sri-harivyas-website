# 🚀 Quick Deployment Guide - Fix Permission Denied Error

## Problem: Permission Denied When Cloning Repository

You're getting a permission denied error because the repository needs proper authentication and the directory needs correct permissions.

## ✅ Solution: Follow These Steps

### **Step 1: SSH into Your Lightsail Instance**

```bash
ssh username@YOUR_LIGHTSAIL_IP
```

Replace `username` with your actual username (usually `ubuntu`, `bitnami`, or `admin`).

### **Step 2: Run the Automated Setup Script**

We've created a script that will handle everything for you:

```bash
# Download the setup script
curl -o setup.sh https://raw.githubusercontent.com/saradcd77/sri-harivyas-website/main/scripts/lightsail-initial-setup.sh

# Make it executable
chmod +x setup.sh

# Run the script
./setup.sh
```

The script will:
- ✅ Install/upgrade Node.js 20
- ✅ Install PM2 and Nginx
- ✅ Create deployment directory with correct permissions
- ✅ Generate SSH keys for GitHub
- ✅ Clone the repository
- ✅ Install dependencies and build
- ✅ Start the application with PM2
- ✅ Show you the keys to add to GitHub

### **Step 3: Add Deploy Key to GitHub**

The script will show you a public key. Copy it and:

1. Go to: https://github.com/saradcd77/sri-harivyas-website/settings/keys
2. Click **"Add deploy key"**
3. Title: `Lightsail Server`
4. Paste the public key
5. ✅ Check **"Allow write access"** (optional, only if you want to push from server)
6. Click **"Add key"**

### **Step 4: Add GitHub Secrets for Automatic Deployment**

The script will show you all the values. Go to:

https://github.com/saradcd77/sri-harivyas-website/settings/secrets/actions

Add these secrets:

| Secret Name | Value | Where to Get It |
|-------------|-------|-----------------|
| `LIGHTSAIL_HOST` | Your server IP | Script shows this |
| `LIGHTSAIL_USERNAME` | Your SSH username | Script shows this |
| `LIGHTSAIL_PORT` | `22` | Default SSH port |
| `LIGHTSAIL_SSH_KEY` | Private key | Script shows this (copy entire key) |
| `DEPLOY_PATH` | `/var/www/ashram-website` | Script shows this |

### **Step 5: Configure Nginx**

Create Nginx configuration:

```bash
sudo nano /etc/nginx/sites-available/ashram-website
```

Paste this (replace `YOUR_DOMAIN` with your actual domain):

```nginx
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
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/ashram-website /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### **Step 6: Test Automatic Deployment**

Make a small change to your code locally:

```bash
# In your local project
echo "Test deployment" >> README.md
git add .
git commit -m "Test automatic deployment"
git push origin main
```

Then:
1. Go to: https://github.com/saradcd77/sri-harivyas-website/actions
2. Watch the deployment workflow run
3. Once complete, check your website!

---

## 🔧 Manual Setup (If Script Doesn't Work)

If you prefer to do it manually or the script fails:

### 1. Fix Directory Permissions

```bash
sudo mkdir -p /var/www/ashram-website
sudo chown -R $USER:$USER /var/www/ashram-website
```

### 2. Generate SSH Key for GitHub

```bash
ssh-keygen -t ed25519 -C "lightsail-deploy" -f ~/.ssh/github_deploy -N ""

# Show the public key
cat ~/.ssh/github_deploy.pub
```

Copy this key and add it to GitHub (Settings → Deploy keys).

### 3. Configure SSH

```bash
cat >> ~/.ssh/config << EOF
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/github_deploy
EOF
```

### 4. Clone Repository

```bash
cd /var/www/ashram-website
git clone git@github.com:saradcd77/sri-harivyas-website.git .
```

### 5. Install and Build

```bash
cd /var/www/ashram-website/ashram-website
npm install
npm run build
```

### 6. Start with PM2

```bash
pm2 start npm --name "ashram-website" -- start
pm2 save
pm2 startup
```

---

## 🔍 Troubleshooting

### Error: "Permission denied (publickey)"

**Solution**: Make sure you've added the deploy key to GitHub.

```bash
# Test SSH connection
ssh -T git@github.com

# Should see: "Hi username! You've successfully authenticated"
```

### Error: "Could not resolve host: github.com"

**Solution**: Check internet connection on Lightsail.

```bash
ping github.com
```

### Error: "Port 3000 already in use"

**Solution**: Use a different port.

```bash
# Check what's using port 3000
sudo lsof -i :3000

# Use port 3001 instead
# Update next.config.ts and Nginx config
```

### Check Application Status

```bash
# Check PM2 status
pm2 status
pm2 logs ashram-website

# Check Nginx status
sudo systemctl status nginx
sudo nginx -t

# Check if port is listening
sudo netstat -tulpn | grep 3000
```

---

## 📊 Useful Commands

### PM2 Commands

```bash
pm2 list                    # List all apps
pm2 logs ashram-website     # View logs
pm2 restart ashram-website  # Restart app
pm2 stop ashram-website     # Stop app
pm2 delete ashram-website   # Delete app
```

### Git Commands

```bash
cd /var/www/ashram-website
git pull origin main        # Pull latest changes
git status                  # Check status
git log --oneline -5        # View recent commits
```

### Nginx Commands

```bash
sudo nginx -t                    # Test configuration
sudo systemctl reload nginx      # Reload config
sudo systemctl restart nginx     # Restart Nginx
sudo tail -f /var/log/nginx/error.log  # View error logs
```

---

## 🔒 Add SSL Certificate (After Everything Works)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Test auto-renewal
sudo certbot renew --dry-run
```

---

## 🎯 What Happens After Setup

Once everything is configured:

1. **You make changes locally** → Edit code
2. **Commit and push** → `git push origin main`
3. **GitHub Actions runs automatically** → Builds and deploys
4. **Your website updates** → Live in minutes!

---

## 📝 Important Notes

- The repository structure has `ashram-website` folder inside the repo
- The actual Next.js app is in `/var/www/ashram-website/ashram-website/`
- PM2 runs from the `ashram-website` subdirectory
- Make sure port 3000 is open in Lightsail firewall
- Keep your SSH keys secure and never commit them

---

## 🆘 Still Having Issues?

1. **Check GitHub Actions logs**: Repository → Actions tab
2. **Check server logs**: `pm2 logs ashram-website`
3. **Check Nginx logs**: `sudo tail -f /var/log/nginx/error.log`
4. **Verify SSH keys**: `ssh -T git@github.com`
5. **Check permissions**: `ls -la /var/www/ashram-website`

---

**राधेकृष्ण राधेकृष्ण कृष्णकृष्ण राधेराधे** 🙏

