
import React, { useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, GraduationCap, Heart, Users, Shield, Trophy, Activity, Accessibility, Building2 } from 'lucide-react';

const PROJECTS = [
  {
    id: 1,
    title: 'Hokej na školy',
    description: 'Prinášame radosť z pohybu a pozemného hokeja priamo do telocviční základných škôl po celom Slovensku.',
    image: 'https://szph.sk/wp-content/uploads/2025/11/2X6C6917.JPG_compressed-1.jpeg',
    icon: <GraduationCap size={20} />
  },
  {
    id: 2,
    title: 'Equally Amazing',
    description: 'Kampaň Európskej federácie na podporu rodovej rovnosti a inklúzie v športe. Hokej je pre všetkých.',
    image: 'https://szph.sk/wp-content/uploads/2025/05/321234231.png',
    icon: <Heart size={20} />
  },
  {
    id: 3,
    title: 'Rozhodcovská akadémia',
    description: 'Pravidelné semináre a workshopy pre výchovu novej generácie medzinárodných rozhodcov.',
    image: 'https://szph.sk/wp-content/uploads/2025/03/7e588f6e-08cb-11ec-9709-523cb3b2546e.jpg',
    icon: <Shield size={20} />
  },
  {
    id: 4,
    title: 'Walking Hockey pre seniorov',
    description: 'Pohybová aktivita prispôsobená pre seniorov. Hokej v kráčajúcom tempe pre zdravie a komunitu.',
    image: 'https://d1ssu070pg2v9i.cloudfront.net/pex/scottish_hockey/2023/04/26093343/51860674361_49896f36a9_c.jpg',
    icon: <Activity size={20} />
  },
  {
    id: 5,
    title: 'Para Hokej',
    description: 'Integrovaný športový program pre športovcov so zdravotným znevýhodnením. Búrame bariéry.',
    image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=600&auto=format&fit=crop',
    icon: <Accessibility size={20} />
  },
  {
    id: 6,
    title: 'Talentovaná Mládež',
    description: 'Regionálne výbery a kempy pre najlepších mladých hráčov v kategóriách U12 a U14.',
    image: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=600&auto=format&fit=crop',
    icon: <Trophy size={20} />
  },
  {
    id: 7,
    title: 'Vzdelávanie trénerov',
    description: 'Licenčný systém a spolupráca so zahraničnými lektormi pre zvyšovanie odbornosti.',
    image: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?q=80&w=600&auto=format&fit=crop',
    icon: <Users size={20} />
  },
  {
    id: 8,
    title: 'Modernizácia ihrísk',
    description: 'Investičný program na budovanie nových plôch s umelou trávou v Bratislave a okolí.',
    image: 'https://images.unsplash.com/photo-1555862124-a56778465053?q=80&w=600&auto=format&fit=crop',
    icon: <Building2 size={20} />
  }
];

export const ProjectsCarousel: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 370; // Card width + gap
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="bg-[#0B2144] py-20 md:py-32 relative overflow-hidden border-t border-white/5">
      
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
      
      {/* Glow Effects */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-slovak-blue rounded-full mix-blend-color-dodge filter blur-[120px] opacity-20 translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-slovak-red rounded-full mix-blend-color-dodge filter blur-[100px] opacity-10 -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
           <div className="relative">
             <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-slovak-red to-transparent hidden md:block"></div>
             <span className="text-blue-300 font-bold text-xs uppercase tracking-[0.2em] mb-3 block flex items-center gap-2">
                <span className="w-8 h-[1px] bg-blue-300/50 inline-block"></span> Rozvoj a Komunita
             </span>
             <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none drop-shadow-xl">
               Projekty <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">a Iniciatívy</span>
             </h2>
           </div>
           
           {/* Custom Navigation */}
           <div className="flex gap-4">
              <button 
                onClick={() => scroll('left')}
                className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-slovak-blue transition-all active:scale-95 bg-white/5 backdrop-blur-sm group"
              >
                <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <button 
                onClick={() => scroll('right')}
                className="w-14 h-14 rounded-full bg-slovak-red text-white flex items-center justify-center hover:bg-white hover:text-slovak-red transition-all shadow-lg shadow-red-900/30 active:scale-95 group border border-transparent hover:border-slovak-red"
              >
                <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
           </div>
        </div>

        {/* Professional Carousel */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-8 pb-12 -mx-4 px-4 md:mx-0 md:px-0 snap-x hide-scrollbar scroll-smooth"
        >
           {PROJECTS.map((project, index) => (
             <div 
               key={project.id}
               className="min-w-[320px] md:min-w-[350px] snap-center group cursor-pointer relative"
             >
                {/* Unified Card Container */}
                <div className="bg-[#0f2a55] border border-white/5 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-blue-900/20 h-full flex flex-col group-hover:-translate-y-2">
                   
                   {/* Image Section (Top 55%) */}
                   <div className="h-[200px] relative overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0f2a55] via-transparent to-transparent opacity-90"></div>
                      
                      {/* Icon Badge */}
                      <div className="absolute top-4 left-4 w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/20 shadow-lg group-hover:bg-slovak-red group-hover:border-slovak-red transition-colors duration-300">
                         {project.icon}
                      </div>
                   </div>

                   {/* Content Section (Bottom 45%) */}
                   <div className="p-8 pt-2 flex flex-col flex-1 relative">
                      <h3 className="text-xl md:text-2xl font-black text-white mb-3 uppercase leading-tight group-hover:text-blue-200 transition-colors">
                        {project.title}
                      </h3>
                      
                      <div className="w-10 h-1 bg-slovak-red/50 mb-4 rounded-full group-hover:w-16 transition-all duration-300"></div>
                      
                      <p className="text-gray-400 text-sm leading-relaxed font-medium line-clamp-3 mb-6">
                        {project.description}
                      </p>

                      <div className="mt-auto flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/70 group-hover:text-white transition-colors">
                         Viac informácií 
                         <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-slovak-red group-hover:text-white transition-all ml-1">
                            <ArrowRight size={12} />
                         </div>
                      </div>
                   </div>
                </div>
             </div>
           ))}
        </div>

      </div>
    </div>
  );
};
