'use client';

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import EventCard, { Event } from '../../components/EventCard';
import { Calendar as CalendarIcon } from 'lucide-react';

export default function EventsPage() {
  const { t } = useTranslation();

  // Sample events - replace with actual data
  const upcomingEvents: Event[] = [
    {
      id: '1',
      title: 'Janmashtami Celebration',
      description: 'Grand celebration of Lord Krishna\'s birth with special bhajans, aarti, and prasad distribution',
      date: 'August 26, 2025',
      time: '6:00 AM - 10:00 PM',
      location: 'Sri Harivyas Nikunja Mandir',
      image: '/sri_thakurji.jpg',
    },
    {
      id: '2',
      title: 'Radha Ashtami',
      description: 'Celebrating the appearance day of Srimati Radharani with devotional programs',
      date: 'September 13, 2025',
      time: '5:00 AM - 9:00 PM',
      location: 'Sri Harivyas Nikunja Mandir',
      image: '/sri_thakurji2.jpg',
    },
    {
      id: '3',
      title: 'Weekly Bhajan Sandhya',
      description: 'Join us every Saturday evening for devotional singing and spiritual discourse',
      date: 'Every Saturday',
      time: '6:00 PM - 8:00 PM',
      location: 'Sri Harivyas Nikunja Mandir',
      image: '/sri_maharajji.jpg',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-green-600 to-green-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
              <CalendarIcon className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('events.title')}
            </h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              {t('events.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>

          {upcomingEvents.length === 0 && (
            <div className="text-center py-16">
              <CalendarIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">{t('events.noEvents')}</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-green-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Stay Connected
          </h2>
          <p className="text-gray-600 mb-8">
            Follow us on social media to stay updated about upcoming events and programs
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://www.youtube.com/@muraridasg"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all"
            >
              YouTube
            </a>
            <a
              href="#"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all"
            >
              Facebook
            </a>
            <a
              href="#"
              className="px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-semibold transition-all"
            >
              Instagram
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

