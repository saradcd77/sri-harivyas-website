"use client";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { BookOpen, Download, FileText } from "lucide-react";

interface Book {
  id: string;
  file: string;
  title: string;
  description: string;
  language: string;
}

const books: Book[] = [
  {
    id: "gita-tattva-prakashika",
    file: "/books/GITA - तत्त्व-प्रकाशिका.pdf",
    title: "Gita – Tattva-Prakashika",
    description:
      "Commentary on the Bhagavad Gita presenting the teachings of Nimbarka Sampradaya.",
    language: "Sanskrit / Hindi",
  },
  {
    id: "anushthan-prakash",
    file: "/books/anushthan prakash.pdf",
    title: "Anushthan Prakash",
    description:
      "Practical guide for daily spiritual practices and devotional observances.",
    language: "Hindi",
  },
  {
    id: "kramdeepika",
    file: "/books/kramdeepika.pdf",
    title: "Kramdeepika",
    description:
      "Step-by-step manual for traditional worship and spiritual discipline.",
    language: "Hindi",
  },
  {
    id: "mahawani",
    file: "/books/mahawani.pdf",
    title: "Mahawani",
    description:
      "Collection of divine sayings and instructions from the Acharyas.",
    language: "Hindi",
  },
  {
    id: "sandhya",
    file: "/books/sandhya.pdf",
    title: "Sandhya",
    description:
      "Text for daily Sandhya worship and remembrance of the Lord.",
    language: "Sanskrit / Hindi",
  },
  {
    id: "vedastuti",
    file: "/books/वेदस्तुती.pdf",
    title: "वेद स्तुति",
    description:
      "Hymns from the Vedas glorifying the Supreme Lord in the Nimbarka tradition.",
    language: "Sanskrit",
  },
  {
    id: "sandhyopasana",
    file: "/books/संध्योपासन.pdf",
    title: "संध्योपासन",
    description:
      "Traditional Sandhya worship text used in daily practices.",
    language: "Sanskrit / Hindi",
  },
  {
    id: "hitopadesh",
    file: "/books/हितोपदेश.pdf",
    title: "हितोपदेश",
    description:
      "Moral and spiritual instructions presented in story form.",
    language: "Sanskrit / Hindi",
  },
];

export default function PublicationsPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-orange-600 to-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
              <BookOpen className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t("publications.title")}
            </h1>
            <p className="text-xl text-orange-100 mb-4">
              {t("publications.subtitle")}
            </p>
            <p className="text-orange-50 text-base md:text-lg">
              {t("publications.description")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Books Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {books.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">
                {t("publications.noBooks")}
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {books.map((book, index) => (
                <motion.article
                  key={book.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex flex-col bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden border border-orange-100"
                >
                  {/* Cover-style header */}
                  <div className="relative h-40 bg-gradient-to-br from-orange-500 via-amber-400 to-yellow-400">
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,_white,_transparent_60%)]" />
                    <div className="relative h-full flex items-center justify-center">
                      <div className="w-16 h-16 rounded-xl bg-white/10 border border-white/30 flex items-center justify-center backdrop-blur-sm">
                        <FileText className="w-9 h-9 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-6 space-y-4">
                    <header>
                      <h2 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                        {book.title}
                      </h2>
                      <p className="text-sm text-gray-500 flex items-center gap-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-orange-50 text-orange-700 text-xs font-medium">
                          {t("publications.typeBook")}
                        </span>
                        <span aria-hidden="true">•</span>
                        <span>{t("publications.language")}: {book.language}</span>
                      </p>
                    </header>

                    <p className="text-sm text-gray-600 line-clamp-3">
                      {book.description}
                    </p>

                    <div className="mt-auto flex flex-col gap-3 pt-2">
                      <a
                        href={book.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                      >
                        <Download className="w-4 h-4" />
                        <span>{t("publications.download")}</span>
                      </a>

                      <a
                        href={book.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-orange-200 text-orange-700 hover:bg-orange-50 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                      >
                        <BookOpen className="w-4 h-4" />
                        <span>{t("publications.viewOnline")}</span>
                      </a>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

