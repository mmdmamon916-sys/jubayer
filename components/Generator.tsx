import React, { useState } from 'react';
import { Wand2, Loader2, Image as ImageIcon, Layers } from 'lucide-react';
import { ImageSize, ImageCategory } from '../types';

interface GeneratorProps {
  onGenerate: (prompt: string, size: ImageSize, category: ImageCategory) => Promise<void>;
  isGenerating: boolean;
}

const CATEGORIES: ImageCategory[] = ['General', 'Nature', 'Futuristic', 'Fantasy', 'Animals', 'Technology'];
const SIZES: ImageSize[] = ['512x512', '1024x1024', '1536x1536', '1920x1080 (Banner)'];

const Generator: React.FC<GeneratorProps> = ({ onGenerate, isGenerating }) => {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState<ImageSize>('1024x1024');
  const [category, setCategory] = useState<ImageCategory>('General');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;
    onGenerate(prompt, size, category);
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-panelBg border border-gray-800 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-neonPurple/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-neonBlue/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

      <h2 className="text-xl font-bold mb-6 flex items-center gap-2 brand-font">
        <Wand2 className="text-neonPurple" />
        Create New Image
      </h2>

      <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
        {/* Prompt Input */}
        <div className="space-y-2">
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-400">
            Enter your prompt
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your imagination... (e.g. A cyberpunk city with neon lights)"
            className="w-full h-28 bg-black/50 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-600 focus:border-neonBlue focus:ring-1 focus:ring-neonBlue outline-none resize-none transition-all"
            disabled={isGenerating}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {/* Category Selection */}
           <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-400 flex items-center gap-2">
              <Layers size={14} /> Category
            </label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ImageCategory)}
                disabled={isGenerating}
                className="w-full appearance-none bg-black/50 border border-gray-700 rounded-lg py-3 px-4 text-white focus:border-neonBlue focus:outline-none cursor-pointer"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Size Selection */}
          <div className="space-y-2">
             <label className="block text-sm font-medium text-gray-400">Image Size</label>
             <div className="relative">
               <select 
                  value={size}
                  onChange={(e) => setSize(e.target.value as ImageSize)}
                  disabled={isGenerating}
                  className="w-full appearance-none bg-black/50 border border-gray-700 rounded-lg py-3 px-4 text-white focus:border-neonBlue focus:outline-none cursor-pointer"
               >
                 {SIZES.map((s) => (
                   <option key={s} value={s}>{s}</option>
                 ))}
               </select>
               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
             </div>
          </div>
        </div>

        {/* Generate Button */}
        <button
          type="submit"
          disabled={!prompt.trim() || isGenerating}
          className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
            !prompt.trim() || isGenerating
              ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-neonBlue to-neonPurple text-white hover:shadow-neonPurple hover:scale-[1.02]'
          }`}
        >
          {isGenerating ? (
            <>
              <Loader2 className="animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <ImageIcon size={20} />
              Generate Image
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default Generator;