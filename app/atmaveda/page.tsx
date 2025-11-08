'use client';

export default function AtmavedaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      <div className="pt-32 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
            Atmaveda
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Explore spiritual wisdom and knowledge
          </p>
          
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-orange-100">
            <iframe
              src="https://atma-veda.vercel.app/"
              className="w-full h-[calc(100vh-250px)] min-h-[600px]"
              title="Atmaveda"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
