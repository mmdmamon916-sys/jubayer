import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Generator from './components/Generator';
import ImageCard from './components/ImageCard';
import { GeneratedImage, ImageSize, ImageCategory } from './types';
import { generateImage } from './services/geminiService';
import { AlertCircle, X } from 'lucide-react';

const App: React.FC = () => {
  const [history, setHistory] = useState<GeneratedImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(null);

  // Load history from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('jubayer-ai-history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  // Save history whenever it changes
  useEffect(() => {
    localStorage.setItem('jubayer-ai-history', JSON.stringify(history));
  }, [history]);

  const handleGenerate = async (prompt: string, size: ImageSize, category: ImageCategory) => {
    setLoading(true);
    setError(null);
    
    try {
      // Construct prompt with category if it's not General
      const finalPrompt = category === 'General' 
        ? prompt 
        : `${category} style: ${prompt}, high quality, detailed`;

      const base64Url = await generateImage(finalPrompt, size);
      
      const newImage: GeneratedImage = {
        id: Date.now().toString(),
        url: base64Url,
        prompt: prompt, // Save original prompt for display
        size: size,
        category: category,
        timestamp: Date.now(),
      };

      setHistory(prev => [newImage, ...prev]);

    } catch (err: any) {
      setError(err.message || "Something went wrong while generating.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (image: GeneratedImage) => {
    const link = document.createElement('a');
    link.href = image.url;
    link.download = `jubayer-ai-${image.id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex flex-col bg-darkBg text-white pb-20">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 pt-8 flex flex-col gap-12">
        
        {/* Top Section: Generator */}
        <section className="flex flex-col items-center justify-center min-h-[60vh] md:min-h-[50vh]">
          <div className="text-center mb-8 space-y-4">
             <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 brand-font">
               Turn Words into <br /> 
               <span className="text-neonBlue drop-shadow-[0_0_15px_rgba(0,243,255,0.5)]">Visual Reality</span>
             </h2>
             <p className="text-gray-400 max-w-lg mx-auto">
               Create YouTube banners, fantasy art, and more with Google's Imagen AI.
             </p>
          </div>

          {error && (
            <div className="w-full max-w-3xl mb-6 bg-red-900/20 border border-red-500 text-red-200 p-4 rounded-xl flex items-center gap-3">
              <AlertCircle size={20} />
              <span>{error}</span>
              <button onClick={() => setError(null)} className="ml-auto hover:text-white">
                <X size={18} />
              </button>
            </div>
          )}

          <Generator onGenerate={handleGenerate} isGenerating={loading} />
        </section>

        {/* Gallery Section */}
        {history.length > 0 && (
          <section>
             <div className="flex items-center justify-between mb-6 px-2">
               <h3 className="text-2xl font-bold brand-font flex items-center gap-2">
                 <span className="w-2 h-8 bg-neonPurple rounded-full"></span>
                 Recent Creations
               </h3>
               <span className="text-gray-500 text-sm">{history.length} images</span>
             </div>
             
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
               {history.map((img) => (
                 <ImageCard 
                    key={img.id} 
                    image={img} 
                    onDownload={handleDownload} 
                    onView={setSelectedImage}
                  />
               ))}
             </div>
          </section>
        )}
      </main>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 p-2 bg-gray-800 rounded-full text-white hover:bg-red-500 transition-colors"
          >
            <X size={24} />
          </button>
          
          <div className="max-w-6xl max-h-[90vh] w-full flex flex-col gap-4">
            <img 
              src={selectedImage.url} 
              alt={selectedImage.prompt} 
              className="w-full h-full object-contain max-h-[80vh] rounded-lg shadow-2xl shadow-neonBlue/20"
            />
            <div className="bg-panelBg p-4 rounded-lg border border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
               <div className="flex flex-col">
                 <p className="text-gray-300 text-sm sm:text-base font-medium">{selectedImage.prompt}</p>
                 <span className="text-gray-500 text-xs mt-1">{selectedImage.size} • {selectedImage.category || 'General'}</span>
               </div>
               <button 
                onClick={() => handleDownload(selectedImage)}
                className="px-6 py-2 bg-neonBlue text-black font-bold rounded hover:bg-white transition-colors whitespace-nowrap"
               >
                 Download Image
               </button>
            </div>
          </div>
        </div>
      )}

      <footer className="text-center py-8 text-gray-600 text-sm mt-auto border-t border-gray-900">
        <p>© {new Date().getFullYear()} Jubayer Image Generator AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;