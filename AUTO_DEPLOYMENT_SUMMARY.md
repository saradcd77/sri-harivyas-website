# 🚀 Auto-Deployment Setup Summary

## ✅ What's Been Done

1. **GitHub Actions Workflow Created**: `.github/workflows/deploy-static.yml`
   - Triggers on push to `main` branch
   - Builds Next.js static site
   - Deploys to AWS Lightsail
   - Restarts Apache

2. **Server Setup Script Created**: `scripts/setup-github-actions-server.sh`
   - Configures passwordless sudo for deployment

3. **Documentation Created**: `GITHUB_ACTIONS_SETUP.md`
   - Complete step-by-step guide

---

## 🎯 What You Need to Do Now

### Step 1: Configure Server (5 minutes)

SSH into your server and run the setup script:

```bash
# SSH into your server
ssh -i ~/.ssh/your-lightsail-key.pem ubuntu@3.24.251.9

# Navigate to the project directory
cd /var/www/ashram-website-static

# If the script isn't there yet, create it manually:
cat > setup-github-actions.sh << 'EOF'
#!/bin/bash
set -e
echo "🔧 Setting up server for GitHub Actions deployment..."
echo "ubuntu ALL=(ALL) NOPASSWD: /bin/systemctl restart apache2, /bin/chown, /bin/chmod" | sudo tee /etc/sudoers.d/github-actions
sudo chmod 0440 /etc/sudoers.d/github-actions
sudo visudo -c
echo "✅ Server configuration complete!"
EOF

# Make it executable and run it
chmod +x setup-github-actions.sh
./setup-github-actions.sh
```

### Step 2: Add GitHub Secrets (5 minutes)

Go to: https://github.com/saradcd77/sri-harivyas-website/settings/secrets/actions

Add these 5 secrets:

| Secret Name | Value |
|-------------|-------|
| `LIGHTSAIL_HOST` | `3.24.251.9` |
| `LIGHTSAIL_USERNAME` | `ubuntu` |
| `LIGHTSAIL_PORT` | `22` |
| `DEPLOY_PATH` | `/var/www/ashram-website-static` |
| `LIGHTSAIL_SSH_KEY` | Contents of your `.pem` file |

**For LIGHTSAIL_SSH_KEY:**
```bash
# On your local machine, copy your SSH key:
cat ~/.ssh/your-lightsail-key.pem
```
Copy everything including `-----BEGIN RSA PRIVATE KEY-----` and `-----END RSA PRIVATE KEY-----`

### Step 3: Test Deployment (2 minutes)

```bash
# Make a small change
echo "# Test deployment" >> README.md

# Commit and push
git add .
git commit -m "Test auto-deployment"
git push origin main
```

Then:
1. Go to https://github.com/saradcd77/sri-harivyas-website/actions
2. Watch the workflow run
3. Visit http://srihansakul.org to see your changes!

---

## 🔍 How It Works

```mermaid
graph LR
    A[Push to main] --> B[GitHub Actions]
    B --> C[Build Next.js]
    C --> D[Upload to Server]
    D --> E[Set Permissions]
    E --> F[Restart Apache]
    F --> G[Live on srihansakul.org]
```

1. You push code to `main` branch
2. GitHub Actions automatically starts
3. Builds your Next.js site (`npm run build`)
4. Uploads `out/` folder to `/var/www/ashram-website-static`
5. Sets correct permissions (www-data:www-data)
6. Restarts Apache
7. Your site is live!

---

## 📊 Deployment Status

You can monitor deployments at:
https://github.com/saradcd77/sri-harivyas-website/actions

Each deployment shows:
- ✅ Build status
- ⏱️ Deployment time
- 📝 Detailed logs
- 🔄 Commit that triggered it

---

## 🎛️ Manual Deployment

You can also trigger deployment manually:

1. Go to: https://github.com/saradcd77/sri-harivyas-website/actions
2. Click "Deploy Static Site to AWS Lightsail"
3. Click "Run workflow" → "Run workflow"

---

## 🐛 Troubleshooting

### Deployment fails with "Permission denied"
- Check that you ran the server setup script
- Verify sudoers file: `sudo cat /etc/sudoers.d/github-actions`

### Deployment fails with "Host key verification failed"
- The SSH key in GitHub Secrets might be incorrect
- Make sure you copied the entire `.pem` file including BEGIN/END lines

### Files deployed but site not updating
- Check Apache is running: `sudo systemctl status apache2`
- Check file permissions: `ls -la /var/www/ashram-website-static`
- Clear browser cache (Ctrl+Shift+R)

### View logs on server
```bash
ssh -i ~/.ssh/your-key.pem ubuntu@3.24.251.9
sudo tail -f /var/log/apache2/error.log
```

---

## 📚 Additional Resources

- **Full Setup Guide**: `GITHUB_ACTIONS_SETUP.md`
- **Workflow File**: `.github/workflows/deploy-static.yml`
- **Server Setup Script**: `scripts/setup-github-actions-server.sh`

---

## 🎉 Benefits

✅ **No manual deployment** - Push and forget!  
✅ **Consistent builds** - Same environment every time  
✅ **Fast deployment** - 2-3 minutes from push to live  
✅ **Rollback easy** - Just revert the commit and push  
✅ **Audit trail** - See who deployed what and when  

---

**राधेकृष्ण राधेकृष्ण कृष्णकृष्ण राधेराधे** 🙏

