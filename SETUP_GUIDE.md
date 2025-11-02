# 🚀 Setup Guide for Sri Harivyas Nikunja Mandir Website

## Quick Start

### Prerequisites

- Node.js >= 20.9.0 (Required for Next.js 16)
- npm or yarn

### Installation Steps

1. **Navigate to the project directory:**
   ```bash
   cd ashram-website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000)

## 📹 Adding YouTube Videos

### Step 1: Get Video IDs from @muraridasg Channel

1. Visit: https://www.youtube.com/@muraridasg
2. Click on any video
3. Copy the video ID from the URL
   - Example: `https://youtube.com/watch?v=ABC123XYZ`
   - Video ID is: `ABC123XYZ`

### Step 2: Update Video Arrays

**For Homepage (Featured Videos):**

Edit `app/page.tsx` around line 13:

```typescript
const featuredVideos = [
  {
    id: 'ABC123XYZ',  // Replace with actual video ID
    title: 'Divine Bhajan - Radhe Krishna',
    description: 'Beautiful devotional bhajan dedicated to Radha Krishna',
  },
  // Add more videos...
];
```

**For Videos Page (All Videos):**

Edit `app/videos/page.tsx` around line 12:

```typescript
const videos = [
  {
    id: 'ABC123XYZ',  // Replace with actual video ID
    title: 'Divine Bhajan - Radhe Krishna',
    description: 'Beautiful devotional bhajan dedicated to Radha Krishna',
  },
  // Add more videos...
];
```

## 🌍 Language Switching

The website supports 3 languages:
- English (en)
- Hindi (hi) - हिन्दी
- Nepali (ne) - नेपाली

Users can switch languages using the globe icon in the header.

### Editing Translations

Translation files are in `public/locales/`:

- `en/common.json` - English translations
- `hi/common.json` - Hindi translations
- `ne/common.json` - Nepali translations

Example structure:
```json
{
  "nav": {
    "home": "Home",
    "about": "About Us"
  },
  "hero": {
    "title": "Sri Harivyas Nikunja Mandir"
  }
}
```

## 🎨 Customizing Content

### Update Contact Information

Edit `components/Footer.tsx` and `app/contact/page.tsx`:

```typescript
// Update phone number
<span className="text-sm text-gray-600">+91 XXX XXX XXXX</span>

// Update email
<span className="text-sm text-gray-600">info@sriharivyas.org</span>

// Update address
<span className="text-sm text-gray-600">
  Sri Harivyas Nikunja Mandir<br />
  Vrindavan, India
</span>
```

### Update Social Media Links

Edit `components/Footer.tsx` and `app/contact/page.tsx`:

```typescript
// YouTube
<a href="https://www.youtube.com/@muraridasg" ...>

// Facebook
<a href="https://facebook.com/yourpage" ...>

// Instagram
<a href="https://instagram.com/yourpage" ...>
```

### Update Events

Edit `app/events/page.tsx` around line 12:

```typescript
const upcomingEvents: Event[] = [
  {
    id: '1',
    title: 'Janmashtami Celebration',
    description: 'Grand celebration of Lord Krishna\'s birth',
    date: 'August 26, 2025',
    time: '6:00 AM - 10:00 PM',
    location: 'Sri Harivyas Nikunja Mandir',
    image: '/sri_thakurji.jpg',
  },
  // Add more events...
];
```

## 🖼️ Replacing Images

Images are in the `public` directory:

1. **Logo**: Replace `public/Ashram_logo.png`
2. **Hero Images**: Replace `public/sri_maharajji.jpg`, `public/sri_thakurji.jpg`, `public/sri_thakurji2.jpg`
3. **Address Image**: Replace `public/ashram_address.png`

Keep the same filenames or update references in the code.

## 🌐 Deployment to AWS Lightsail

### Method 1: Static Site (Recommended)

1. **Update `next.config.ts`:**
   ```typescript
   const nextConfig = {
     output: 'export',
     images: {
       unoptimized: true,
     },
   };
   export default nextConfig;
   ```

2. **Build the site:**
   ```bash
   npm run build
   ```

3. **Upload to Lightsail:**
   - The static files will be in the `out` directory
   - Upload all files from `out` to your web server directory
   - Configure your web server (Apache/Nginx) to serve these files

### Method 2: Node.js Server

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Upload entire project to Lightsail**

3. **On your Lightsail instance:**
   ```bash
   # Install Node.js 20+ if not already installed
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs

   # Navigate to project directory
   cd /path/to/ashram-website

   # Install dependencies
   npm install --production

   # Install PM2 for process management
   sudo npm install -g pm2

   # Start the application
   pm2 start npm --name "ashram-website" -- start

   # Save PM2 configuration
   pm2 save

   # Set PM2 to start on boot
   pm2 startup
   ```

4. **Configure Nginx as reverse proxy:**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## 🔧 Troubleshooting

### Node Version Error

If you see "Node.js version >=20.9.0 is required":

```bash
# Install Node Version Manager (nvm)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install Node.js 20
nvm install 20
nvm use 20

# Verify version
node --version  # Should show v20.x.x
```

### Build Errors

```bash
# Clear cache and rebuild
rm -rf node_modules .next
npm install
npm run build
```

### Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm run dev
```

## 📝 Next Steps

1. ✅ Update YouTube video IDs with real videos from @muraridasg
2. ✅ Replace placeholder images with actual ashram photos
3. ✅ Update contact information (phone, email, address)
4. ✅ Add real event information
5. ✅ Update social media links
6. ✅ Test all language translations
7. ✅ Deploy to AWS Lightsail
8. ✅ Set up SSL certificate (Let's Encrypt)
9. ✅ Configure domain name

## 🆘 Need Help?

- Check the main README.md for detailed documentation
- Review Next.js documentation: https://nextjs.org/docs
- Contact: info@sriharivyas.org

---

**राधेकृष्ण राधेकृष्ण कृष्णकृष्ण राधेराधे** 🙏

