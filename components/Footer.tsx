'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Youtube, Facebook, Instagram } from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gradient-to-b from-orange-50 to-orange-100 border-t border-orange-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-orange-500">
                <Image
                  src="/images/logo.png"
                  alt="Logo"
                  fill
                  className="object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/Ashram_logo.png';
                  }}
                />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Sri Harivyas</h3>
                <p className="text-xs text-gray-600">Nikunja Mandir</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              {t('about.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-gray-800 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-orange-600 transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link href="/teachings" className="text-sm text-gray-600 hover:text-orange-600 transition-colors">
                  {t('nav.teachings')}
                </Link>
              </li>
              <li>
                <Link href="/videos" className="text-sm text-gray-600 hover:text-orange-600 transition-colors">
                  {t('nav.videos')}
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-sm text-gray-600 hover:text-orange-600 transition-colors">
                  {t('nav.events')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-gray-800 mb-4">{t('contact.title')}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-600 mt-1 flex-shrink-0" />
                <span className="text-sm text-gray-600">
                  Sri Harivyas Nikunja Mandir<br />
                  Vrindavan, India
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-600 flex-shrink-0" />
                <span className="text-sm text-gray-600">+91 XXX XXX XXXX</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-600 flex-shrink-0" />
                <span className="text-sm text-gray-600">info@sriharivyas.org</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-bold text-gray-800 mb-4">{t('contact.followUs')}</h4>
            <div className="flex gap-3">
              <a
                href="https://www.youtube.com/@muraridasg"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all shadow-md"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all shadow-md"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all shadow-md"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
            <div className="mt-6">
              <p className="text-xs text-orange-600 font-semibold">
                {t('footer.tagline')}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-orange-200 text-center">
          <p className="text-sm text-gray-600">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}

