'use client';

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import VideoGallery from '../../components/VideoGallery';
import { Youtube } from 'lucide-react';

export default function VideosPage() {
  const { t } = useTranslation();

  // Add actual video IDs from the YouTube channel @muraridasg
  // Replace these with real video IDs from the channel
  const videos = [
    {
      id: 'VI7vPd9_g1g', // Sri Radha Kripa katakshya Stotra
      title: 'Sri Radha Kripa katakshya Stotra',
      description: 'Beautiful devotional prayer dedicated to Radha Rani',
    },
    {
      id: '-nzinRwRfSs', // Holi Mahotsav at Ashram
      title: 'Holi Mahotsav at Ashram',
      description: 'Kunj Bihari Holi Mahotsav',
    },
    {
      id: 'D85dKP2PjBg', // Latest stream from @muraridasg
      title: 'Latest Spiritual Discourse',
      description: 'Recent teachings and devotional session',
    },
    {
      id: 'pRZKRGH5Hr8', // From @muraridasg
      title: 'Devotional Bhajan Session',
      description: 'Beautiful devotional singing and prayers',
    },
    {
      id: 'IyLRMgOF0VM', // Sri Murari Dasji Sankirtan
      title: 'Sri Murari Dasji Sankirtan',
      description: 'Sacred kirtan session with Sri Murari Dasji',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-orange-600 to-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
              <Youtube className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('videos.title')}
            </h1>
            <p className="text-xl text-orange-100 max-w-2xl mx-auto">
              {t('videos.subtitle')}
            </p>
            <a
              href="https://www.youtube.com/@muraridasg"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-white text-orange-600 rounded-lg font-semibold hover:bg-orange-50 transition-all"
            >
              <Youtube className="w-5 h-5" />
              Visit Our YouTube Channel
            </a>
          </motion.div>
        </div>
      </section>

      {/* Videos Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <VideoGallery videos={videos} />
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-orange-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Subscribe for More Content
          </h2>
          <p className="text-gray-600 mb-8">
            Stay updated with our latest bhajans, discourses, and spiritual teachings
          </p>
          <a
            href="https://www.youtube.com/@muraridasg?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
          >
            <Youtube className="w-6 h-6" />
            Subscribe on YouTube
          </a>
        </div>
      </section>
    </div>
  );
}

