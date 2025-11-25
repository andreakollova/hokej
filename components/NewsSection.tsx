import React, { useState, useRef } from 'react';
import { NEWS } from '../constants';
import { ArrowRight, Clock, TrendingUp, Share2, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';

export const NewsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Všetky' | 'Reprezentácia' | 'Liga'>('Všetky');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Scroll Handler for Trending Strip
  const scrollTrending = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = 320; // Approx one card width + gap
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  // Filter Logic
  const filteredNews = NEWS.filter((item) => {
    if (activeTab === 'Všetky') return true;
    if (activeTab === 'Reprezentácia') return item.category === 'Reprezentácia';
    if (activeTab === 'Liga') return ['Súťaž', 'Kluby', 'Pohár', 'Halový hokej'].includes(item.category);
    return true;
  });

  const featuredNews = filteredNews[0];
  const trendingNews = filteredNews.slice(1, 6);
  const recentNews = filteredNews.slice(6, 12);

  return (
    <div className="container mx-auto px-4 md:px-8 py-6 md:py-10">
      {/* Header with Toggles */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-4 gap-6">
         <div>
            <span className="text-slovak-red font-bold text-xs uppercase tracking-widest mb-2 block">ZO SVETA POZEMNÉHO HOKEJA</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slovak-blue mb-4">Aktuality</h2>
            
            {/* Toggles */}
            <div className="flex flex-wrap gap-2">
               {(['Všetky', 'Reprezentácia', 'Liga'] as const).map((tab) => (
                 <button
                   key={tab}
                   onClick={() => setActiveTab(tab)}
                   className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border ${
                     activeTab === tab 
                       ? 'bg-slovak-blue text-white border-slovak-blue shadow-lg shadow-blue-900/20' 
                       : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                   }`}
                 >
                   {tab}
                 </button>
               ))}
            </div>
         </div>

         <button className="hidden md:flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-slovak-blue transition-colors bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
           Archív správ <ArrowRight size={16} />
         </button>
      </div>

      {filteredNews.length > 0 ? (
        <div className="flex flex-col gap-12 animate-in fade-in duration-500">
          
          {/* ROW 1: Featured (Left) & Recent (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-8">
            
            {/* Left: Featured Hero Card */}
            <div className="lg:col-span-8 flex flex-col">
              {featuredNews && (
                <div className="relative h-full min-h-[500px] md:min-h-[600px] w-full rounded-xl overflow-hidden group cursor-pointer shadow-2xl shadow-blue-900/20 ring-1 ring-black/5">
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
                    
                    <h3 className="text-2xl md:text-4xl font-black leading-none mb-6 group-hover:text-blue-200 transition-colors animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
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
              )}
            </div>

            {/* Right: Recent News List */}
            <div className="lg:col-span-4 flex flex-col h-full">
              <div className="bg-white rounded-xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-black text-xl text-slovak-blue flex items-center gap-2">
                      Najnovšie
                      <div className="w-2 h-2 bg-slovak-red rounded-full animate-pulse"></div>
                    </h3>
                    <button className="p-2 hover:bg-gray-50 rounded-full transition-colors"><Share2 size={16} className="text-gray-400" /></button>
                  </div>
                  
                  <div className="flex flex-col gap-4 relative flex-1">
                    {/* Timeline Line */}
                    <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-gray-100"></div>

                    {recentNews.map((item) => (
                      <div 
                        key={item.id} 
                        className="flex gap-4 group cursor-pointer relative z-10 hover:bg-gray-50 p-2 rounded-lg transition-colors -mx-2"
                      >
                          <div className="w-6 h-6 shrink-0 rounded-full border-4 border-white bg-slovak-blue/20 mt-0.5 shadow-sm group-hover:bg-slovak-red transition-colors"></div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-[10px] font-black text-slovak-blue uppercase bg-blue-50 px-2 py-0.5 rounded">{item.category}</span>
                                <span className="text-[10px] text-gray-400 font-medium">{item.date}</span>
                            </div>
                            <h4 className="font-bold text-xs text-gray-800 leading-snug line-clamp-2 group-hover:text-slovak-blue transition-colors">
                              {item.title}
                            </h4>
                          </div>
                          
                          <div className="w-14 h-14 shrink-0 rounded-lg overflow-hidden shadow-sm">
                            <img src={item.imageUrl} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                          </div>
                      </div>
                    ))}
                  </div>
                  
                  <button className="w-full mt-6 py-3 rounded-lg bg-gray-50 text-gray-600 text-xs font-black uppercase tracking-widest hover:bg-slovak-blue hover:text-white transition-all border border-gray-100 shadow-sm hover:shadow-lg">
                    Zobraziť viac správ
                  </button>
              </div>
            </div>
          </div>

          {/* ROW 2: Trending (Left) & E-shop Banner (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
             
             {/* Left: Horizontal "Stories" Strip */}
             <div className="lg:col-span-8">
                <div className="flex items-center justify-between mb-6 px-2">
                  <div className="flex items-center gap-2">
                      <div className="bg-red-50 p-2 rounded-full">
                        <TrendingUp size={18} className="text-slovak-red" />
                      </div>
                      <h4 className="text-lg font-black text-gray-800 uppercase tracking-tight">Neprehliadnite</h4>
                  </div>
                  <div className="flex gap-2">
                      <button 
                        onClick={() => scrollTrending('left')}
                        className="p-2 rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 transition-colors"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button 
                        onClick={() => scrollTrending('right')}
                        className="p-2 rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 transition-colors"
                      >
                        <ArrowRight size={16} />
                      </button>
                  </div>
                </div>
                
                <div 
                  ref={scrollContainerRef}
                  className="flex overflow-x-auto pb-8 -mx-4 px-4 md:mx-0 md:px-0 gap-5 snap-x hide-scrollbar scroll-smooth"
                >
                  {trendingNews.map((item, index) => (
                    <div 
                      key={item.id} 
                      className="snap-center shrink-0 w-[260px] md:w-[300px] h-[360px] relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:-translate-y-2"
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
                          <h4 className="font-bold text-white text-lg leading-tight line-clamp-3 group-hover:text-blue-200 transition-colors">
                            {item.title}
                          </h4>
                        </div>
                    </div>
                  ))}
                </div>
             </div>

             {/* Right: E-SHOP BANNER (Aligned with Trending Strip) */}
             <div className="lg:col-span-4">
                {/* Header for Alignment */}
                <div className="flex items-center justify-between mb-6 px-2">
                  <div className="flex items-center gap-2">
                      <div className="bg-blue-50 p-2 rounded-full">
                        <ShoppingBag size={18} className="text-slovak-blue" />
                      </div>
                      <h4 className="text-lg font-black text-gray-800 uppercase tracking-tight">E-Shop</h4>
                  </div>
                </div>

                <div className="relative rounded-xl overflow-hidden shadow-2xl group cursor-pointer h-[360px] ring-1 ring-black/5">
                  <div className="absolute inset-0 bg-slovak-blue"></div>
                  {/* Background Image */}
                  <img 
                    src="https://images.unsplash.com/photo-1544978809-b69573883737?q=80&w=800&auto=format&fit=crop" 
                    alt="Slovak Hockey Merch" 
                    className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-slovak-blue/20 to-transparent"></div>
                  
                  <div className="absolute inset-0 p-8 flex flex-col justify-center items-center text-center text-white">
                      <div className="bg-slovak-red p-4 rounded-full mb-6 shadow-lg group-hover:scale-110 transition-transform">
                        <ShoppingBag size={28} className="text-white" />
                      </div>
                      <h3 className="text-3xl font-black uppercase leading-none mb-4">Oficiálny E-Shop</h3>
                      <p className="text-blue-100 font-medium text-sm mb-8 leading-relaxed max-w-[240px]">
                        Obleč sa do farieb reprezentácie. Nová kolekcia dresov práve v predaji.
                      </p>
                      <button className="bg-white text-slovak-blue px-8 py-3 rounded-lg font-black text-xs uppercase tracking-widest hover:bg-slovak-red hover:text-white transition-colors flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        Nakupovať <ArrowRight size={14} />
                      </button>
                  </div>
                </div>
             </div>

          </div>

        </div>
      ) : (
        <div className="bg-white rounded-xl p-12 text-center border border-gray-100 shadow-sm">
          <p className="text-gray-500 font-medium text-lg">Pre túto kategóriu sa nenašli žiadne články.</p>
          <button onClick={() => setActiveTab('Všetky')} className="mt-4 text-slovak-red font-bold hover:underline">Zobraziť všetky správy</button>
        </div>
      )}
    </div>
  );
};