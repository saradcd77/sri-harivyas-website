'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/about', label: t('nav.about') },
    { href: '/teachings', label: t('nav.teachings') },
    { href: '/videos', label: t('nav.videos') },
    { href: '/events', label: t('nav.events') },
    { href: '/contact', label: t('nav.contact') },
  ];

  return (
    <>
      {/* Marquee */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-orange-50 to-yellow-50 border-b border-orange-200">
        <div className="overflow-hidden whitespace-nowrap">
          <div className="inline-block animate-marquee">
            <span className="text-orange-600 font-semibold text-sm md:text-base px-4 py-2 inline-block">
              🕉️ राधेकृष्ण राधेकृष्ण कृष्णकृष्ण राधेराधे राधेश्याम राधेश्याम श्यामश्याम राधेराधे 🕉️
            </span>
            <span className="text-orange-600 font-semibold text-sm md:text-base px-4 py-2 inline-block">
              🕉️ राधेकृष्ण राधेकृष्ण कृष्णकृष्ण राधेराधे राधेश्याम राधेश्याम श्यामश्याम राधेराधे 🕉️
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav
        className={`fixed top-10 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-orange-500 group-hover:border-orange-600 transition-colors">
                <Image
                  src="/Ashram_logo.png"
                  alt="Sri Harivyas Nikunja Mandir"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="hidden md:block">
                <h1 className="text-lg font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
                  Sri Harivyas Nikunja Mandir
                </h1>
                <p className="text-xs text-gray-600">Nimbarka Sampradaya</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-orange-50 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-gray-700" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-700" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

