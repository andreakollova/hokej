import React, { useState, useEffect } from 'react';
import { NEWS } from '../constants';
import { Calendar, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = NEWS.slice(0, 3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full h-[500px] md:h-[650px] text-white overflow-hidden rounded-b-[40px] md:rounded-b-[60px] shadow-2xl mx-auto max-w-[1920px] group bg-slovak-blue">
      
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
            {/* Image Layer */}
            <div 
              className="absolute inset-0 bg-cover bg-center transform transition-transform duration-[10s] scale-105 origin-top"
              style={{ backgroundImage: `url("${slide.imageUrl}")` }}
            ></div>
            
            {/* Identity Typography Layer (LIGA) - Behind content but over image */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
                 <span className="text-[25vw] font-black text-white/10 tracking-tighter select-none mix-blend-overlay blur-sm scale-150 transform -rotate-6">
                    LIGA
                 </span>
            </div>
            
            {/* Blue Overlay Layer */}
            <div className="absolute inset-0 bg-slovak-blue/80 mix-blend-multiply"></div>
            
            {/* Gradients for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-slovak-blue via-transparent to-transparent opacity-90"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-slovak-blue/60 to-transparent"></div>
        </div>
      ))}

      {/* Content Layer */}
      <div className="relative z-20 container mx-auto px-6 md:px-12 h-full flex flex-col justify-end pb-20 md:pb-28">
         {slides.map((slide, index) => (
           <div 
             key={slide.id} 
             className={`${index === currentSlide ? 'block' : 'hidden'} max-w-5xl space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700`}
           >
              <div className="flex items-center gap-3 mb-4">
                 <span className="bg-slovak-red text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-red-900/20">
                    {slide.category}
                 </span>
                 <span className="flex items-center gap-2 text-gray-300 font-medium text-sm bg-white/10 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">
                    <Calendar size={14} /> {slide.date}
                 </span>
              </div>

              <h1 className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none text-white drop-shadow-xl">
                {slide.title}
              </h1>

              <p className="text-lg md:text-2xl text-blue-100 font-medium leading-relaxed max-w-3xl line-clamp-2 border-l-4 border-slovak-red pl-6">
                {slide.snippet}
              </p>

              <div className="pt-8 flex flex-wrap gap-4">
                 <button className="bg-white text-slovak-blue hover:bg-slovak-red hover:text-white px-10 py-5 rounded-full font-black text-lg transition-all shadow-xl flex items-center gap-3 group/btn transform hover:-translate-y-1">
                    Čítať článok 
                    <ArrowRight size={22} className="group-hover/btn:translate-x-1 transition-transform" />
                 </button>
              </div>
           </div>
         ))}
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-10 right-6 md:right-12 z-30 flex items-center gap-8">
          <div className="flex gap-2.5">
             {slides.map((_, idx) => (
               <button 
                 key={idx}
                 onClick={() => setCurrentSlide(idx)}
                 className={`h-2.5 rounded-full transition-all duration-500 ease-out ${idx === currentSlide ? 'w-16 bg-slovak-red' : 'w-3 bg-white/30 hover:bg-white'}`}
                 aria-label={`Go to slide ${idx + 1}`}
               />
             ))}
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={prevSlide} 
              className="w-14 h-14 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur text-white transition-all hover:scale-105 active:scale-95"
              aria-label="Previous slide"
            >
              <ChevronLeft size={28} />
            </button>
            <button 
              onClick={nextSlide} 
              className="w-14 h-14 rounded-full flex items-center justify-center bg-white text-slovak-blue hover:bg-slovak-red hover:text-white border border-transparent shadow-lg transition-all hover:scale-105 active:scale-95"
              aria-label="Next slide"
            >
              <ChevronRight size={28} />
            </button>
          </div>
      </div>
    </div>
  );
};