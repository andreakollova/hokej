
import React, { useRef } from 'react';
import { VIDEOS } from '../constants';
import { Play, Tv, ChevronLeft, ChevronRight } from 'lucide-react';

export const SocialMedia: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      // Scroll roughly one screen width / 3 to move one card, or full width
      const scrollAmount = current.clientWidth / 3;
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="bg-gray-50 pt-16 pb-0 border-t border-gray-200">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Header with Nav */}
        <div className="flex flex-col justify-start items-start mb-8 gap-4">
           <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-slovak-blue rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20 text-white">
                <Tv size={24} />
              </div>
              <div>
                <span className="text-slovak-red font-bold text-xs uppercase tracking-widest block mb-1">Galéria</span>
                <h2 className="text-5xl md:text-3xl font-black uppercase text-slovak-blue leading-none">FIELD HOCKEY TV</h2>
              </div>
           </div>
           
           {/* Navigation Arrows */}
           <div className="flex gap-2 self-start pl-[60px]">
              <button 
                onClick={() => scroll('left')}
                className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-slovak-blue hover:text-white hover:border-slovak-blue transition-all active:scale-95 shadow-sm"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={() => scroll('right')}
                className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-slovak-blue hover:text-white hover:border-slovak-blue transition-all active:scale-95 shadow-sm"
              >
                <ChevronRight size={20} />
              </button>
           </div>
        </div>
           
        {/* 3-Column Carousel */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 md:gap-6 pb-8 -mx-4 px-4 md:mx-0 md:px-0 snap-x hide-scrollbar scroll-smooth"
        >
          {VIDEOS.map(video => (
            <div 
                key={video.id} 
                className="min-w-full md:min-w-[calc(33.333%-1rem)] snap-center relative rounded-2xl overflow-hidden shadow-lg aspect-[16/9] bg-black group cursor-pointer border border-gray-100 shrink-0"
            >
                {/* Thumbnail Image */}
                <img 
                  src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`} 
                  alt="Video Thumbnail"
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                
                {/* Clean Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white group-hover:scale-110 transition-transform shadow-xl">
                      <Play fill="white" className="text-white ml-1" size={28} />
                  </div>
                </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};