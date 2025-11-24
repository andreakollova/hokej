import React from 'react';
import { NEWS } from '../constants';
import { ArrowRight, Clock, TrendingUp, ChevronRight, Share2 } from 'lucide-react';

export const NewsSection: React.FC = () => {
  const featuredNews = NEWS[0];
  const trendingNews = NEWS.slice(1, 6); // More trending items
  const recentNews = NEWS.slice(6, 12);

  return (
    <div className="container mx-auto px-4 md:px-8 py-12 md:py-20">
      {/* Header */}
      <div className="flex justify-between items-end mb-10">
         <div>
            <span className="text-slovak-red font-bold text-xs uppercase tracking-widest mb-2 block">Aktuálne dianie</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slovak-blue">Magazín</h2>
         </div>
         <button className="hidden md:flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-slovak-blue transition-colors bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
           Archív správ <ArrowRight size={16} />
         </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
        
        {/* Left Column: Content Area */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* Featured Hero Card - Ultra Modern */}
          <div className="relative h-[500px] md:h-[600px] w-full rounded-[40px] overflow-hidden group cursor-pointer shadow-2xl shadow-blue-900/20 ring-1 ring-black/5">
            <img 
              src={featuredNews.imageUrl} 
              alt={featuredNews.title}
              className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
            />
            {/* Dynamic Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90"></div>
            
            <div className="absolute bottom-0 left-0 p-8 md:p-14 text-white w-full">
               <div className="flex items-center gap-3 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                 <span className="bg-slovak-red text-white px-5 py-2 text-xs font-black uppercase rounded-full tracking-widest shadow-lg shadow-red-900/20">
                    {featuredNews.category}
                 </span>
                 <span className="text-gray-300 text-xs font-bold flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
                   <Clock size={12} /> {featuredNews.date}
                 </span>
               </div>
               
               <h3 className="text-3xl md:text-6xl font-black leading-none mb-6 group-hover:text-blue-200 transition-colors animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                 {featuredNews.title}
               </h3>
               
               <p className="text-gray-200 text-lg md:text-xl line-clamp-2 max-w-3xl font-medium leading-relaxed opacity-90 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                 {featuredNews.snippet}
               </p>

               <div className="mt-8 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                  <span className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                    Čítať viac <ArrowRight size={16} />
                  </span>
               </div>
            </div>
          </div>

          {/* Horizontal "Stories" Strip - Mobile Optimized */}
          <div>
            <div className="flex items-center justify-between mb-6 px-2">
               <div className="flex items-center gap-2">
                  <div className="bg-red-50 p-2 rounded-full">
                    <TrendingUp size={18} className="text-slovak-red" />
                  </div>
                  <h4 className="text-lg font-black text-gray-800 uppercase tracking-tight">Neprehliadnite</h4>
               </div>
               <div className="flex gap-2">
                  <button className="p-2 rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200"><ArrowRight size={16} /></button>
               </div>
            </div>
            
            <div className="flex overflow-x-auto pb-8 -mx-4 px-4 md:mx-0 md:px-0 gap-5 snap-x hide-scrollbar">
               {trendingNews.map((item, index) => (
                 <div 
                  key={item.id} 
                  className="snap-center shrink-0 w-[260px] md:w-[300px] h-[360px] relative rounded-[32px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:-translate-y-2"
                  style={{ transitionDelay: `${index * 50}ms` }}
                 >
                    <img src={item.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                    
                    <div className="absolute top-4 left-4">
                       <span className="bg-white/20 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase px-3 py-1.5 rounded-lg">
                          {item.category}
                       </span>
                    </div>

                    <div className="absolute bottom-0 left-0 p-6 w-full">
                      <div className="text-[10px] text-gray-300 font-bold mb-2 flex items-center gap-1 opacity-80">
                        <Clock size={10} /> {item.date}
                      </div>
                      <h4 className="font-bold text-white text-xl leading-tight line-clamp-3 group-hover:text-blue-200 transition-colors">
                        {item.title}
                      </h4>
                    </div>
                 </div>
               ))}
            </div>
          </div>

        </div>

        {/* Right Column: Vertical Feed */}
        <div className="lg:col-span-4">
           <div className="bg-white rounded-[40px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 h-full sticky top-24">
               <div className="flex items-center justify-between mb-8">
                 <h3 className="font-black text-2xl text-slovak-blue flex items-center gap-2">
                   Najnovšie
                   <div className="w-2 h-2 bg-slovak-red rounded-full animate-pulse"></div>
                 </h3>
                 <button className="p-2 hover:bg-gray-50 rounded-full transition-colors"><Share2 size={18} className="text-gray-400" /></button>
               </div>
               
               <div className="flex flex-col gap-6 relative">
                 {/* Timeline Line */}
                 <div className="absolute left-[11px] top-4 bottom-4 w-[2px] bg-gray-100"></div>

                 {recentNews.map((item) => (
                   <div key={item.id} className="flex gap-5 group cursor-pointer relative z-10 bg-white p-2 rounded-2xl hover:bg-gray-50 transition-colors">
                      <div className="w-6 h-6 shrink-0 rounded-full border-4 border-white bg-slovak-blue/20 mt-1 shadow-sm group-hover:bg-slovak-red transition-colors"></div>
                      
                      <div className="flex-1">
                         <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-black text-slovak-blue uppercase bg-blue-50 px-2 py-0.5 rounded">{item.category}</span>
                            <span className="text-[10px] text-gray-400 font-medium">{item.date}</span>
                         </div>
                         <h4 className="font-bold text-sm md:text-base text-gray-800 leading-snug line-clamp-2 group-hover:text-slovak-blue transition-colors">
                           {item.title}
                         </h4>
                      </div>
                      
                      <div className="w-16 h-16 shrink-0 rounded-xl overflow-hidden shadow-sm">
                        <img src={item.imageUrl} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                      </div>
                   </div>
                 ))}
               </div>
               
               <button className="w-full mt-10 py-4 rounded-2xl bg-gray-50 text-gray-600 text-xs font-black uppercase tracking-widest hover:bg-slovak-blue hover:text-white transition-all border border-gray-100 shadow-sm hover:shadow-lg">
                 Zobraziť viac správ
               </button>
           </div>
        </div>

      </div>
    </div>
  );
};