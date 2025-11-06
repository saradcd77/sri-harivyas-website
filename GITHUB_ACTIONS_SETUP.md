# GitHub Actions Auto-Deployment Setup

This guide will help you set up automatic deployment to your AWS Lightsail server whenever you push to the `main` branch.

## 🎯 Overview

When you push code to the `main` branch, GitHub Actions will automatically:
1. Build the Next.js static site
2. Upload the `out/` folder to your server
3. Set correct permissions
4. Restart Apache

---

## 📋 Prerequisites

You need the following information from your server:
- **Server IP**: `3.24.251.9`
- **SSH Username**: `ubuntu`
- **SSH Private Key**: Your `.pem` file
- **Deploy Path**: `/var/www/ashram-website-static`
- **SSH Port**: `22` (default)

---

## 🔐 Step 1: Get Your SSH Private Key

On your local machine, find your Lightsail SSH key:

```bash
# Usually located at:
ls ~/.ssh/*.pem

# Or check your AWS Lightsail console to download it
```

Copy the **entire contents** of your `.pem` file:

```bash
cat ~/.ssh/your-lightsail-key.pem
```

Copy everything from `-----BEGIN RSA PRIVATE KEY-----` to `-----END RSA PRIVATE KEY-----` (inclusive).

---

## 🔧 Step 2: Add GitHub Secrets

1. Go to your GitHub repository: https://github.com/saradcd77/sri-harivyas-website

2. Click **Settings** → **Secrets and variables** → **Actions**

3. Click **New repository secret** and add each of these:

### Secret 1: LIGHTSAIL_HOST
- **Name**: `LIGHTSAIL_HOST`
- **Value**: `3.24.251.9`

### Secret 2: LIGHTSAIL_USERNAME
- **Name**: `LIGHTSAIL_USERNAME`
- **Value**: `ubuntu`

### Secret 3: LIGHTSAIL_SSH_KEY
- **Name**: `LIGHTSAIL_SSH_KEY`
- **Value**: Paste the entire contents of your `.pem` file (including BEGIN/END lines)

### Secret 4: LIGHTSAIL_PORT
- **Name**: `LIGHTSAIL_PORT`
- **Value**: `22`

### Secret 5: DEPLOY_PATH
- **Name**: `DEPLOY_PATH`
- **Value**: `/var/www/ashram-website-static`

---

## 🔑 Step 3: Configure Server for Passwordless Sudo

GitHub Actions needs to restart Apache without a password prompt.

SSH into your server and run:

```bash
# SSH into your server
ssh -i ~/.ssh/your-key.pem ubuntu@3.24.251.9

# Add ubuntu user to sudoers for apache2 restart
echo "ubuntu ALL=(ALL) NOPASSWD: /bin/systemctl restart apache2, /bin/chown, /bin/chmod" | sudo tee /etc/sudoers.d/github-actions

# Set correct permissions
sudo chmod 0440 /etc/sudoers.d/github-actions

# Test it works
sudo systemctl restart apache2
```

---

## ✅ Step 4: Test the Deployment

1. Make a small change to your code (e.g., edit a comment)
2. Commit and push to `main`:

```bash
git add .
git commit -m "Test auto-deployment"
git push origin main
```

3. Go to your GitHub repository → **Actions** tab
4. You should see a workflow running
5. Wait for it to complete (usually 2-3 minutes)
6. Visit http://srihansakul.org to see your changes!

---

## 🔍 Troubleshooting

### If deployment fails:

1. **Check GitHub Actions logs**:
   - Go to Actions tab → Click on the failed workflow → View logs

2. **Common issues**:
   - **SSH key format**: Make sure you copied the entire `.pem` file including BEGIN/END lines
   - **Permissions**: Make sure the sudoers file is configured correctly
   - **Path**: Verify `/var/www/ashram-website-static` exists on the server

3. **Test SSH connection manually**:
```bash
ssh -i ~/.ssh/your-key.pem ubuntu@3.24.251.9 "ls -la /var/www/ashram-website-static"
```

### View deployment logs on server:

```bash
# SSH into server
ssh -i ~/.ssh/your-key.pem ubuntu@3.24.251.9

# Check Apache logs
sudo tail -f /var/log/apache2/error.log

# Check if files were deployed
ls -la /var/www/ashram-website-static
```

---

## 🎉 Success!

Once configured, every push to `main` will automatically deploy to your server!

You can also manually trigger deployment:
1. Go to GitHub → Actions
2. Select "Deploy Static Site to AWS Lightsail"
3. Click "Run workflow"

---

## 📝 Workflow File Location

The workflow is defined in: `.github/workflows/deploy-static.yml`

You can customize it if needed (e.g., add Slack notifications, run tests before deploy, etc.)

---

**राधेकृष्ण राधेकृष्ण कृष्णकृष्ण राधेराधे** 🙏

