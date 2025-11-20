import React from 'react';
import { Download, Clock, Maximize2 } from 'lucide-react';
import { GeneratedImage } from '../types';

interface ImageCardProps {
  image: GeneratedImage;
  onDownload: (image: GeneratedImage) => void;
  onView: (image: GeneratedImage) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onDownload, onView }) => {
  return (
    <div className="group relative bg-panelBg rounded-xl overflow-hidden border border-gray-800 hover:border-neonBlue transition-all duration-300 hover:shadow-neon">
      {/* Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-900">
        <img 
          src={image.url} 
          alt={image.prompt} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
            <div className="self-end">
                <button 
                    onClick={() => onView(image)}
                    className="p-2 bg-gray-800/80 rounded-full text-white hover:bg-neonBlue hover:text-black transition-colors"
                    title="View Fullscreen"
                >
                    <Maximize2 size={18} />
                </button>
            </div>
            <button 
                onClick={() => onDownload(image)}
                className="w-full py-2 bg-neonBlue text-black font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-white transition-colors shadow-neon"
            >
                <Download size={18} />
                Download
            </button>
        </div>
      </div>

      {/* Metadata */}
      <div className="p-4">
        <p className="text-sm text-gray-300 line-clamp-2 mb-2 font-medium" title={image.prompt}>
          {image.prompt}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {new Date(image.timestamp).toLocaleDateString()}
          </span>
          <span className="px-2 py-0.5 rounded bg-gray-800 border border-gray-700">
            {image.size}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
