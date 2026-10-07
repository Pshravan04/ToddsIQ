import React, { useRef, useState } from 'react';
import { VolumeX, Volume2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

import video1 from '../assets/videos/00af685865a04247bcf22a272a7fb5d8.SD-480p-1.5Mbps-77121162.mp4';
import video2 from '../assets/videos/0f6e2b56b6cd45c49aae89589def1942.SD-480p-1.5Mbps-77121299.mp4';
import video3 from '../assets/videos/5ec74577602944d7a30cf5142d27ee55.SD-480p-1.5Mbps-77121182.mp4';
import video4 from '../assets/videos/70f39499660b477f95767a852cb05b59.SD-480p-0.9Mbps-86101065.mp4';
import video5 from '../assets/videos/965ecd72df7f40398c9010940d27d44e.SD-480p-0.9Mbps-86099266.mp4';
import video6 from '../assets/videos/983b7b91eca542dfa27a2789e86b9faa.SD-480p-1.5Mbps-77121026.mp4';// Placeholder vertical videos (royalty-free from Pexels) to simulate the TikTok/Reels style
const VIDEOS = [
  {
    id: 1,
    url: video1,
    text: 'GUARANTEED to leave your speechless... 😲😲',
  },
  {
    id: 2,
    url: video2,
    text: "Every child's dream gift... 😍🎁",
  },
  {
    id: 3,
    url: video3,
    text: 'The perfect gift for kids 😍',
  },
  {
    id: 4,
    url: video4,
    text: 'Great for tattoo tracing haha',
  },
  {
    id: 5,
    url: video5,
    text: 'Children will not believe their eyes... 😲😲',
  },
  {
    id: 6,
    url: video6,
    text: "GUARANTEED to blow your children's minds... 🤯🤯",
  }
];

export default function VideoCarousel() {
  const scrollContainerRef = useRef(null);
  
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 1.5 : scrollLeft + clientWidth / 1.5;
      scrollContainerRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full overflow-hidden py-4">
      {/* Scroll Controls (Desktop only) */}
      <div className="absolute top-1/2 left-4 -translate-y-1/2 z-10 hidden md:block">
        <button 
          onClick={() => scroll('left')}
          className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
        >
          <ChevronLeft className="w-6 h-6 text-ink" />
        </button>
      </div>
      
      <div className="absolute top-1/2 right-4 -translate-y-1/2 z-10 hidden md:block">
        <button 
          onClick={() => scroll('right')}
          className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
        >
          <ChevronRight className="w-6 h-6 text-ink" />
        </button>
      </div>

      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 px-4 md:px-12 hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {VIDEOS.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}

function VideoCard({ video }) {
  const { formatPrice } = useCurrency();
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const toggleMute = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  
  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.log('Autoplay prevented', e));
      setIsPlaying(true);
    }
  };
  
  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div 
      className="relative flex flex-col shrink-0 w-[240px] md:w-[280px] snap-center rounded-xl overflow-hidden bg-white shadow-md border border-ink/10 transition-transform hover:-translate-y-1 group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Video Container (Vertical 9:16 approx) */}
      <div className="relative w-full aspect-[9/16] bg-ink/5 overflow-hidden cursor-pointer">
        <video 
          ref={videoRef}
          src={video.url} 
          loop 
          playsInline
          muted={isMuted}
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Overlay Text */}
        <div className="absolute top-4 left-0 w-full text-center px-4 z-10 drop-shadow-md">
          <p className="text-white font-bold text-sm leading-snug drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {video.text}
          </p>
        </div>

        {/* Mute Button */}
        <button 
          onClick={toggleMute}
          className="absolute bottom-4 right-4 z-20 w-8 h-8 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-white" />
          ) : (
            <Volume2 className="w-4 h-4 text-white" />
          )}
        </button>
      </div>

      {/* Product Strip Footer */}
      <div className="flex p-3 gap-3 items-center border-t border-ink/5 bg-white cursor-pointer hover:bg-canvas transition-colors">
        <div className="w-12 h-12 shrink-0 bg-canvas rounded overflow-hidden border border-ink/5">
          <img 
            src="https://cdn.shopify.com/s/files/1/0916/9852/8593/files/1d67404e-bcf6-477f-89f0-cc61486c88f4.png" 
            alt="ToddsIQ Bot" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col flex-1 min-w-0">
          <p className="font-bold text-xs text-ink truncate">ToddsIQ™ Drawing Robot - Interactive</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="font-bold text-ink text-sm">{formatPrice(89.99)}</span>
            <span className="text-ink-variant text-xs line-through">{formatPrice(150.00)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
