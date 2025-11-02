'use client';

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, BookOpen, Video, Calendar } from 'lucide-react';
import VideoGallery from '../components/VideoGallery';

export default function Home() {
  const { t } = useTranslation();

  // Sample videos from the YouTube channel
  const featuredVideos = [
    {
      id: 'VIDEO_ID_1',
      title: 'Divine Bhajan - Radhe Krishna',
      description: 'Beautiful devotional bhajan dedicated to Radha Krishna',
    },
    {
      id: 'VIDEO_ID_2',
      title: 'Nimbarka Sampradaya Teachings',
      description: 'Discourse on the philosophy of Dvaitadvaita',
    },
    {
      id: 'VIDEO_ID_3',
      title: 'Morning Aarti',
      description: 'Daily morning aarti at Sri Harivyas Nikunja Mandir',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Image Slider */}
      <section className="relative h-[600px] md:h-[700px] overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70 z-10" />
          <img
            src="/sri_maharajji.jpg"
            alt="Sri Harivyas Nikunja Mandir"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1604608672516-f1b9b1a4a0e5?w=1920';
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 h-full flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="inline-block">
                <span className="text-orange-400 text-lg md:text-xl font-semibold">
                  🕉️ {t('hero.welcome')} 🕉️
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight font-devanagari">
                {t('hero.title')}
              </h1>

              <p className="text-xl md:text-2xl text-orange-200 font-medium">
                {t('hero.subtitle')}
              </p>

              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                {t('hero.description')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link href="/about">
                  <button className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg flex items-center gap-2 justify-center">
                    {t('hero.cta')}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <Link href="/videos">
                  <button className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-lg font-semibold text-lg transition-all border-2 border-white/30 flex items-center gap-2 justify-center">
                    <Video className="w-5 h-5" />
                    {t('videos.title')}
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10" />
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                {t('about.title')}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {t('about.description')}
              </p>
              <div className="bg-orange-50 border-l-4 border-orange-600 p-6 rounded-r-lg">
                <h3 className="font-bold text-orange-800 mb-2">{t('about.mission')}</h3>
                <p className="text-gray-700">{t('about.missionText')}</p>
              </div>
              <Link href="/about">
                <button className="mt-6 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold transition-all flex items-center gap-2">
                  {t('common.learnMore')}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/sri_thakurji.jpg"
                  alt="Deity"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800';
                  }}
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-orange-200 rounded-full -z-10 blur-3xl opacity-50" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Videos Section */}
      <section className="py-20 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {t('videos.title')}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {t('videos.subtitle')}
            </p>
          </motion.div>

          <VideoGallery videos={featuredVideos} featured />

          <div className="text-center mt-12">
            <Link href="/videos">
              <button className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg inline-flex items-center gap-2">
                {t('videos.viewAll')}
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl hover:shadow-xl transition-all group"
            >
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{t('nav.teachings')}</h3>
              <p className="text-gray-600 mb-6">
                Explore the profound philosophy of Nimbarka Sampradaya and Dvaitadvaita
              </p>
              <Link href="/teachings">
                <button className="text-orange-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                  {t('common.learnMore')}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl hover:shadow-xl transition-all group"
            >
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Video className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{t('nav.videos')}</h3>
              <p className="text-gray-600 mb-6">
                Watch bhajans, discourses, and spiritual teachings from our ashram
              </p>
              <Link href="/videos">
                <button className="text-blue-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                  {t('common.watchNow')}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl hover:shadow-xl transition-all group"
            >
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{t('nav.events')}</h3>
              <p className="text-gray-600 mb-6">
                Join us for upcoming festivals, celebrations, and spiritual programs
              </p>
              <Link href="/events">
                <button className="text-green-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                  {t('common.learnMore')}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
