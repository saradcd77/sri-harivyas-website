'use client';

import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../lib/i18n';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-32">
          {children}
        </main>
        <Footer />
      </div>
    </I18nextProvider>
  );
}

