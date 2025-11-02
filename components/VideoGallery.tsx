'use client';

import { useState } from 'react';
import { Play, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
}

interface VideoGalleryProps {
  videos: Video[];
  featured?: boolean;
}

export default function VideoGallery({ videos, featured = false }: VideoGalleryProps) {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const getThumbnail = (id: string) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

  const handleThumbnailError = (e: React.SyntheticEvent<HTMLImageElement, Event>, videoId: string) => {
    // Fallback to standard definition thumbnail if high quality fails
    e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/sddefault.jpg`;
  };

  return (
    <>
      <div className={`grid gap-6 ${
        featured 
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
          : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      }`}>
        {videos.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group cursor-pointer"
            onClick={() => setSelectedVideo(video.id)}
          >
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
              {/* Thumbnail */}
              <img
                src={video.thumbnail || getThumbnail(video.id)}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                onError={(e) => handleThumbnailError(e, video.id)}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-orange-600 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-white ml-1" fill="white" />
                  </div>
                </div>
              </div>

              {/* Duration Badge (optional) */}
              <div className="absolute top-3 right-3 bg-black/80 text-white text-xs px-2 py-1 rounded">
                Video
              </div>
            </div>

            {/* Video Info */}
            <div className="mt-3 space-y-1">
              <h3 className="font-semibold text-gray-800 line-clamp-2 group-hover:text-orange-600 transition-colors">
                {video.title}
              </h3>
              {video.description && (
                <p className="text-sm text-gray-600 line-clamp-2">
                  {video.description}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-5xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Video Player */}
              <div className="w-full h-full rounded-lg overflow-hidden shadow-2xl bg-black">
                {selectedVideo && (
                  <iframe
                    key={selectedVideo}
                    src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0&modestbranding=1`}
                    width="100%"
                    height="100%"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

