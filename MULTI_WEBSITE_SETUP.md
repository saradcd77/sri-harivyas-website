# 🌐 Multi-Website Lightsail Setup - Quick Reference

## Overview

Your Lightsail instance hosts **3 websites** (including this one). This guide ensures they coexist peacefully.

## 🎯 Key Principle: Isolation

Each website must have:
1. ✅ Unique directory
2. ✅ Unique Nginx config file
3. ✅ Unique PM2 app name (if using Node.js)
4. ✅ Unique port (if using Node.js)
5. ✅ Unique domain/subdomain

## 📊 Your Lightsail Setup

### Website Inventory Template

Fill this out for your setup:

| Website | Directory | Nginx Config | PM2 Name | Port | Domain |
|---------|-----------|--------------|----------|------|--------|
| Website 1 | `/var/www/site1` | `site1` | `site1-app` | 3001 | site1.com |
| Website 2 | `/var/www/site2` | `site2` | `site2-app` | 3002 | site2.com |
| **Ashram** | `/var/www/ashram-website` | `ashram-website` | `ashram-website` | 3000 | ashram.yourdomain.com |

### Quick Audit Commands

Run these to see your current setup:

```bash
# 1. List all websites
echo "=== Websites ==="
ls -la /var/www/

# 2. List all Nginx configs
echo "=== Nginx Configs ==="
ls -la /etc/nginx/sites-enabled/

# 3. List all PM2 apps
echo "=== PM2 Apps ==="
pm2 list

# 4. List all ports in use
echo "=== Ports in Use ==="
sudo netstat -tulpn | grep LISTEN | grep -E ':(80|443|3000|3001|3002|3003|8080|8081)'

# 5. List all domains configured
echo "=== Domains Configured ==="
grep -h "server_name" /etc/nginx/sites-enabled/* | sort | uniq
```

## 🚀 Deployment Checklist for Ashram Website

Before deploying, verify:

- [ ] Directory `/var/www/ashram-website` doesn't exist or is empty
- [ ] Nginx config `ashram-website` doesn't exist
- [ ] PM2 app name `ashram-website` is not used
- [ ] Port 3000 is available (or choose 3001, 3002, etc.)
- [ ] Domain `ashram.yourdomain.com` is configured in DNS
- [ ] Domain doesn't conflict with existing sites

## 🔧 Safe Operations

### Managing Individual Websites

```bash
# Ashram Website
pm2 restart ashram-website
pm2 logs ashram-website --lines 50
pm2 stop ashram-website
pm2 start ashram-website

# Other websites (replace with actual names)
pm2 restart site1-app
pm2 restart site2-app
```

### Nginx Operations

```bash
# Test configuration (always do this first!)
sudo nginx -t

# Reload Nginx (safe - doesn't drop connections)
sudo systemctl reload nginx

# Check Nginx status
sudo systemctl status nginx

# View Nginx error logs
sudo tail -f /var/log/nginx/error.log
```

### View All PM2 Apps

```bash
# List all apps
pm2 list

# View logs for all apps
pm2 logs

# View logs for specific app
pm2 logs ashram-website

# Monitor all apps
pm2 monit
```

## ⚠️ Danger Zone - Commands to AVOID

These commands affect ALL websites:

```bash
# ❌ DON'T restart Nginx (drops all connections)
sudo systemctl restart nginx

# ❌ DON'T restart all PM2 apps
pm2 restart all

# ❌ DON'T stop all PM2 apps
pm2 stop all

# ❌ DON'T delete all PM2 apps
pm2 delete all

# ❌ DON'T flush all PM2 logs
pm2 flush

# ❌ DON'T modify /etc/nginx/nginx.conf (main config)
sudo nano /etc/nginx/nginx.conf
```

## 🔍 Troubleshooting Multi-Website Issues

### Issue: Port Conflict

```bash
# Check what's using a port
sudo lsof -i :3000

# Kill a specific process (if needed)
sudo kill -9 <PID>

# Use a different port for the new website
# Update next.config.ts and Nginx config
```

### Issue: Domain Not Working

```bash
# Check DNS
nslookup ashram.yourdomain.com

# Check Nginx config
sudo nginx -t
cat /etc/nginx/sites-available/ashram-website

# Check if domain is in the right config
grep -r "ashram.yourdomain.com" /etc/nginx/sites-available/
```

### Issue: Website Down, Others Working

```bash
# Check if PM2 app is running
pm2 list

# Check app logs
pm2 logs ashram-website --lines 100

# Restart just this app
pm2 restart ashram-website

# Check Nginx config for this site
sudo nginx -t
cat /etc/nginx/sites-enabled/ashram-website
```

### Issue: All Websites Down

```bash
# Check Nginx
sudo systemctl status nginx
sudo nginx -t

# Check PM2
pm2 status

# Check system resources
free -h
df -h
top
```

## 📝 Port Assignment Strategy

Recommended port allocation:

- **80**: Nginx (HTTP)
- **443**: Nginx (HTTPS)
- **3000**: Ashram website (Node.js)
- **3001**: Your website 1 (if Node.js)
- **3002**: Your website 2 (if Node.js)
- **3003**: Future website (if needed)

Document your actual ports:

```bash
# Create a port registry file
cat > ~/website-ports.txt << EOF
Port 3000: Ashram Website (ashram-website)
Port 3001: [Your Website 1 Name]
Port 3002: [Your Website 2 Name]
EOF
```

## 🔄 Deployment Workflow (Ashram Website Only)

1. **Push to GitHub**
   ```bash
   git push
   ```

2. **GitHub Actions runs automatically**
   - Builds the application
   - SSHs to Lightsail
   - Deploys to `/var/www/ashram-website`
   - Restarts only `ashram-website` PM2 app

3. **Verify deployment**
   ```bash
   ssh your-lightsail
   pm2 logs ashram-website --lines 20
   ```

## 🛡️ Safety Tips

1. **Always test Nginx config** before reloading:
   ```bash
   sudo nginx -t && sudo systemctl reload nginx
   ```

2. **Use PM2 app names**, not IDs:
   ```bash
   pm2 restart ashram-website  # Good
   pm2 restart 0                # Bad (might be wrong app)
   ```

3. **Check before deleting**:
   ```bash
   pm2 list  # Verify which app you want to delete
   pm2 delete ashram-website  # Delete specific app
   ```

4. **Backup before major changes**:
   ```bash
   # Backup Nginx configs
   sudo tar -czf ~/nginx-backup-$(date +%Y%m%d).tar.gz /etc/nginx/

   # Backup PM2 config
   pm2 save
   ```

5. **Monitor resource usage**:
   ```bash
   # Check if one website is using too much memory/CPU
   pm2 monit
   htop
   ```

## 📞 Emergency Recovery

If something goes wrong:

```bash
# 1. Check what's running
pm2 list
sudo systemctl status nginx

# 2. Restart individual services
pm2 restart ashram-website
sudo systemctl reload nginx

# 3. If Nginx is broken, restore default
sudo nginx -t  # See what's wrong
# Fix the specific config file causing issues

# 4. If PM2 app won't start
pm2 logs ashram-website --lines 100
cd /var/www/ashram-website
npm run build
pm2 restart ashram-website
```

## 📚 Quick Reference Commands

```bash
# View all websites
ls /var/www/

# View all PM2 apps
pm2 list

# View all Nginx sites
ls /etc/nginx/sites-enabled/

# Restart specific website
pm2 restart ashram-website

# View logs for specific website
pm2 logs ashram-website

# Reload Nginx safely
sudo nginx -t && sudo systemctl reload nginx

# Check ports
sudo netstat -tulpn | grep LISTEN
```

---

**राधेकृष्ण राधेकृष्ण कृष्णकृष्ण राधेराधे** 🙏

