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

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests for CI
npm run test:ci
```

See [TESTING_GUIDE.md](./TESTING_GUIDE.md) for detailed testing documentation.

## 🚀 Deployment

The website uses automated deployment with GitHub Actions. Every push to the `main` branch will:

1. ✅ Run linter
2. ✅ Run tests
3. ✅ Build the static site
4. ✅ Deploy to production server

**Tests must pass before deployment!**

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
