# 🕉️ Sri Harivyas Nikunja Mandir Website

A modern, multilingual website for Sri Harivyas Nikunja Mandir built with Next.js, TypeScript, and Tailwind CSS.

## ✨ Features

- **🌍 Multi-language Support**: English, Hindi (हिन्दी), and Nepali (नेपाली)
- **📹 YouTube Video Integration**: Embedded videos from @muraridasg channel
- **📱 Fully Responsive**: Beautiful design on all devices
- **⚡ Modern Tech Stack**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **🎨 Spiritual Design**: Aesthetically pleasing design following Nimbarka Sampradaya principles
- **🎬 Smooth Animations**: Framer Motion for elegant transitions
- **♿ Accessible**: Built with accessibility in mind

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Internationalization**: react-i18next
- **Video Player**: React Player
- **Icons**: Lucide React

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🌐 Deployment to AWS Lightsail

### Option 1: Static Export (Recommended for Lightsail)

1. Update `next.config.ts` to enable static export:

```typescript
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};
```

2. Build the static site:

```bash
npm run build
```

3. The static files will be in the `out` directory. Upload these to your Lightsail instance.

### Option 2: Node.js Server

1. Build the application:

```bash
npm run build
```

2. Upload the entire project to your Lightsail instance

3. Install dependencies and start:

```bash
npm install --production
npm start
```

4. Use PM2 to keep the app running:

```bash
npm install -g pm2
pm2 start npm --name "ashram-website" -- start
pm2 save
pm2 startup
```

### Nginx Configuration (for both options)

For static export:

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /path/to/out;
    index index.html;

    location / {
        try_files $uri $uri.html $uri/ =404;
    }
}
```

For Node.js server:

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

## 📹 Adding YouTube Videos

To add videos from the @muraridasg channel:

1. Get the video ID from YouTube URL (e.g., `https://youtube.com/watch?v=VIDEO_ID`)
2. Update the video arrays in:
   - `app/page.tsx` (featured videos)
   - `app/videos/page.tsx` (all videos)

Example:

```typescript
const videos = [
  {
    id: "YOUR_VIDEO_ID",
    title: "Video Title",
    description: "Video description",
  },
];
```

## 🌍 Managing Translations

Translation files are located in `public/locales/`:

- `en/common.json` - English
- `hi/common.json` - Hindi
- `ne/common.json` - Nepali

To add or modify translations, edit these JSON files.

## 🎨 Customization

### Colors

The website uses an orange/saffron color scheme. To customize:

1. Edit `app/globals.css` for CSS variables
2. Tailwind colors can be customized in `tailwind.config.ts`

### Images

Replace images in the `public` directory:

- `Ashram_logo.png` - Logo
- `sri_maharajji.jpg` - Guru/Saint images
- `sri_thakurji.jpg` - Deity images
- `sri_thakurji2.jpg` - Additional deity images
- `ashram_address.png` - Location/address image

---

**राधेकृष्ण राधेकृष्ण कृष्णकृष्ण राधेराधे** 🙏
