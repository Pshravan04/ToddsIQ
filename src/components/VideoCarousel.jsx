import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { VolumeX, Volume2, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

import video1 from '../assets/videos/00af685865a04247bcf22a272a7fb5d8.SD-480p-1.5Mbps-77121162.mp4';
import video2 from '../assets/videos/0f6e2b56b6cd45c49aae89589def1942.SD-480p-1.5Mbps-77121299.mp4';
import video3 from '../assets/videos/5ec74577602944d7a30cf5142d27ee55.SD-480p-1.5Mbps-77121182.mp4';
import video4 from '../assets/videos/70f39499660b477f95767a852cb05b59.SD-480p-0.9Mbps-86101065.mp4';
import video5 from '../assets/videos/965ecd72df7f40398c9010940d27d44e.SD-480p-0.9Mbps-86099266.mp4';
import video6 from '../assets/videos/983b7b91eca542dfa27a2789e86b9faa.SD-480p-1.5Mbps-77121026.mp4';

const VIDEOS = [
  {
    id: 1,
    url: video1,
    text: 'GUARANTEED to leave you speechless... 😲✨',
    product: {
      title: 'ToddsIQ™ Drawing Robot',
      price: 89.99,
      comparePrice: 129.00,
      image: 'https://cdn.shopify.com/s/files/1/0916/9852/8593/files/1d67404e-bcf6-477f-89f0-cc61486c88f4.png',
      handle: 'drawing-robot'
    }
  },
  {
    id: 2,
    url: video2,
    text: "Every child's dream screen-free gift... 😍🎁",
    product: {
      title: 'ToddsIQ™ Drawing Robot – Blue',
      price: 89.99,
      comparePrice: 129.00,
      image: 'https://cdn.shopify.com/s/files/1/0916/9852/8593/files/1d67404e-bcf6-477f-89f0-cc61486c88f4.png',
      handle: 'drawing-robot'
    }
  },
  {
    id: 3,
    url: video3,
    text: 'Multi-level track physics & train thrills! 🚂⚡',
    product: {
      title: 'ToddsIQ™ 3D Stem Magic Track',
      price: 39.99,
      comparePrice: 60.00,
      image: 'https://cdn.shopify.com/s/files/1/0916/9852/8593/files/1bfa1d9607ebc5ba45d4715da991f891.jpg',
      handle: '3dmagictracktrainset'
    }
  },
  {
    id: 4,
    url: video4,
    text: 'Step-by-step drawing with voice guidance 🤖✏️',
    product: {
      title: 'ToddsIQ™ Drawing Robot',
      price: 89.99,
      comparePrice: 129.00,
      image: 'https://cdn.shopify.com/s/files/1/0916/9852/8593/files/1d67404e-bcf6-477f-89f0-cc61486c88f4.png',
      handle: 'drawing-robot'
    }
  },
  {
    id: 5,
    url: video5,
    text: 'Zero screens, hours of pure focus! 🧠💡',
    product: {
      title: 'ToddsIQ™ MagTrack™ Kinetic Set',
      price: 49.99,
      comparePrice: 79.99,
      image: 'https://cdn.shopify.com/s/files/1/0916/9852/8593/files/67277884ffae9d67566115993a466c40.jpg',
      handle: 'toddsiq-magtrack'
    }
  },
  {
    id: 6,
    url: video6,
    text: "Inspires little artists from their very first mark! 🌈",
    product: {
      title: 'ToddsIQ™ NestWood™ Montessori Set',
      price: 44.99,
      comparePrice: 65.00,
      image: 'https://cdn.shopify.com/s/files/1/0916/9852/8593/files/94f72877a561e1b2eec07cbcf6e0ad52.jpg',
      handle: 'toddsiq-nestwood-full-pack'
    }
  }
];

export default function VideoCarousel() {
  const scrollContainerRef = useRef(null);
  
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({ 
        left: direction === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

  return (
    <div className="relative w-full group/carousel">
      {/* Scroll Controls */}
      <button 
        type="button"
        onClick={() => scroll('left')}
        className="absolute top-1/2 -left-3 md:-left-5 -translate-y-1/2 z-20 w-11 h-11 bg-white hover:bg-canvas text-ink rounded-full flex items-center justify-center border-2 border-ink shadow-[2px_2px_0px_#1E2A38] hover:-translate-y-0.5 active:translate-y-0 transition-all opacity-90 hover:opacity-100"
        aria-label="Previous videos"
      >
        <ChevronLeft className="w-5 h-5 text-ink stroke-[2.5]" />
      </button>
      
      <button 
        type="button"
        onClick={() => scroll('right')}
        className="absolute top-1/2 -right-3 md:-right-5 -translate-y-1/2 z-20 w-11 h-11 bg-white hover:bg-canvas text-ink rounded-full flex items-center justify-center border-2 border-ink shadow-[2px_2px_0px_#1E2A38] hover:-translate-y-0.5 active:translate-y-0 transition-all opacity-90 hover:opacity-100"
        aria-label="Next videos"
      >
        <ChevronRight className="w-5 h-5 text-ink stroke-[2.5]" />
      </button>

      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto snap-x snap-mandatory gap-4 py-2 px-1 scrollbar-hide scroll-smooth"
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
  
  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(e => console.log('Autoplay prevented', e));
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
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
      className="relative flex flex-col shrink-0 w-[240px] sm:w-[260px] md:w-[280px] snap-start rounded-2xl overflow-hidden bg-white border-2 border-ink shadow-[4px_4px_0px_#1E2A38] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_#1E2A38] group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Video Container (Vertical 9:16) */}
      <div 
        onClick={togglePlay}
        className="relative w-full aspect-[9/16] bg-ink/5 overflow-hidden cursor-pointer"
      >
        <video 
          ref={videoRef}
          src={video.url} 
          loop 
          playsInline
          muted={isMuted}
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Subtle Dark Gradient Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

        {/* Overlay Text */}
        <div className="absolute top-3.5 left-0 w-full text-center px-3 z-10">
          <span className="inline-block px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white font-bold text-xs leading-snug border border-white/20">
            {video.text}
          </span>
        </div>

        {/* Play Icon Indicator if paused */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="w-12 h-12 rounded-full bg-white/80 border-2 border-ink flex items-center justify-center shadow-md">
              <Play className="w-5 h-5 text-ink fill-ink ml-0.5" />
            </div>
          </div>
        )}

        {/* Mute Button */}
        <button 
          type="button"
          onClick={toggleMute}
          className="absolute bottom-3 right-3 z-20 w-8 h-8 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors border border-white/30"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-white" />
          ) : (
            <Volume2 className="w-4 h-4 text-white" />
          )}
        </button>
      </div>

      {/* Product Strip Footer */}
      <Link 
        to={`/products/${video.product.handle}`}
        className="flex p-3 gap-2.5 items-center border-t-2 border-ink bg-white hover:bg-canvas transition-colors"
      >
        <div className="w-11 h-11 shrink-0 rounded-lg overflow-hidden border border-ink/20 bg-canvas">
          <img 
            src={video.product.image} 
            alt={video.product.title} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col flex-1 min-w-0">
          <p className="font-bold text-xs text-ink truncate hover:text-coral transition-colors">{video.product.title}</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="font-bold text-ink text-xs sm:text-sm">{formatPrice(video.product.price)}</span>
            <span className="text-ink-variant text-[11px] line-through">{formatPrice(video.product.comparePrice)}</span>
          </div>
        </div>
        <span className="material-symbols-outlined text-coral text-base shrink-0">arrow_forward</span>
      </Link>
    </div>
  );
}

