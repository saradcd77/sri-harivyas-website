'use client';

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles, Heart, Flower2 } from 'lucide-react';

export default function TeachingsPage() {
  const { t } = useTranslation();

  const teachings = [
    {
      icon: Heart,
      title: 'Dvaitadvaita Philosophy',
      description: 'The unique philosophy of dualistic non-dualism, where the soul and God are both different and non-different.',
      color: 'orange',
    },
    {
      icon: Flower2,
      title: 'Radha-Krishna Bhakti',
      description: 'The path of pure devotional love towards the divine couple Radha and Krishna.',
      color: 'pink',
    },
    {
      icon: Sparkles,
      title: 'Yugala Upasana',
      description: 'Worship of the divine couple as the supreme form of the absolute truth.',
      color: 'purple',
    },
    {
      icon: BookOpen,
      title: 'Vedanta Parijata Saurabha',
      description: 'The principal philosophical text of Nimbarka Sampradaya explaining the nature of reality.',
      color: 'blue',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-purple-600 to-purple-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
              <BookOpen className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('nav.teachings')}
            </h1>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Explore the profound philosophy of Nimbarka Sampradaya
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {teachings.map((teaching, index) => {
              const Icon = teaching.icon;
              const colorClasses = {
                orange: 'bg-orange-100 text-orange-600',
                pink: 'bg-pink-100 text-pink-600',
                purple: 'bg-purple-100 text-purple-600',
                blue: 'bg-blue-100 text-blue-600',
              };

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all"
                >
                  <div className={`w-16 h-16 ${colorClasses[teaching.color as keyof typeof colorClasses]} rounded-full flex items-center justify-center mb-6`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {teaching.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {teaching.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Quote Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-orange-100 to-pink-100 p-12 rounded-2xl text-center"
          >
            <p className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 font-devanagari">
              &ldquo;राधेकृष्ण राधेकृष्ण कृष्णकृष्ण राधेराधे&rdquo;
            </p>
            <p className="text-lg text-gray-700">
              The divine names that purify the heart and awaken love
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

