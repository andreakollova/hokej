
import React, { useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, GraduationCap, Heart, Users, Shield, Trophy, Activity } from 'lucide-react';

const PROJECTS = [
  {
    id: 1,
    title: 'Hokej na školy',
    description: 'Prinášame radosť z pohybu a pozemného hokeja priamo do telocviční základných škôl po celom Slovensku.',
    image: 'https://szph.sk/wp-content/uploads/2025/11/2X6C6917.JPG_compressed-1.jpeg'
  },
  {
    id: 2,
    title: 'Equally Amazing',
    description: 'Kampaň Európskej federácie na podporu rodovej rovnosti a inklúzie v športe. Hokej je pre všetkých.',
    image: 'https://szph.sk/wp-content/uploads/2025/05/321234231.png'
  },
  {
    id: 3,
    title: 'Rozhodcovská akadémia',
    description: 'Pravidelné semináre a workshopy pre výchovu novej generácie medzinárodných rozhodcov.',
    image: 'https://szph.sk/wp-content/uploads/2025/03/7e588f6e-08cb-11ec-9709-523cb3b2546e.jpg'
  },
  {
    id: 4,
    title: 'Walking Hockey pre seniorov',
    description: 'Pohybová aktivita prispôsobená pre seniorov. Hokej v kráčajúcom tempe pre zdravie a komunitu.',
    image: 'https://d1ssu070pg2v9i.cloudfront.net/pex/scottish_hockey/2023/04/26093343/51860674361_49896f36a9_c.jpg'
  },
  {
    id: 5,
    title: 'Para Hokej',
    description: 'Integrovaný športový program pre športovcov so zdravotným znevýhodnením. Búrame bariéry.',
    image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 6,
    title: 'Talentovaná Mládež',
    description: 'Regionálne výbery a kempy pre najlepších mladých hráčov v kategóriách U12 a U14.',
    image: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 7,
    title: 'Vzdelávanie trénerov',
    description: 'Licenčný systém a spolupráca so zahraničnými lektormi pre zvyšovanie odbornosti.',
    image: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 8,
    title: 'Modernizácia ihrísk',
    description: 'Investičný program na budovanie nových plôch s umelou trávou v Bratislave a okolí.',
    image: 'https://images.unsplash.com/photo-1555862124-a56778465053?q=80&w=600&auto=format&fit=crop'
  }
];

export const ProjectsCarousel: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 340; // Card width + gap
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="bg-[#0B2144] py-16 md:py-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-slovak-blue rounded-full mix-blend-multiply filter blur-[100px] opacity-50 translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-slovak-red rounded-full mix-blend-multiply filter blur-[80px] opacity-20 -translate-x-1/3 translate-y-1/3"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
           <div>
             <span className="text-slovak-red font-bold text-xs uppercase tracking-widest mb-2 block">Rozvoj a Komunita</span>
             <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase">PROJEKTY A INICIATÍVY</h2>
           </div>
           
           {/* Navigation Buttons */}
           <div className="flex gap-3">
              <button 
                onClick={() => scroll('left')}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-slovak-blue transition-all active:scale-95"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={() => scroll('right')}
                className="w-12 h-12 rounded-full bg-white text-slovak-blue flex items-center justify-center hover:bg-slovak-red hover:text-white transition-all shadow-lg active:scale-95"
              >
                <ChevronRight size={24} />
              </button>
           </div>
        </div>

        {/* Carousel */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 pb-8 -mx-4 px-4 md:mx-0 md:px-0 snap-x hide-scrollbar scroll-smooth"
        >
           {PROJECTS.map((project, index) => (
             <div 
               key={project.id}
               className="min-w-[300px] md:min-w-[340px] snap-center group cursor-pointer"
             >
                {/* Image Card */}
                <div className="h-[220px] md:h-[240px] rounded-2xl overflow-hidden mb-6 relative shadow-lg">
                   <img 
                     src={project.image} 
                     alt={project.title}
                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#0B2144] via-transparent to-transparent opacity-60"></div>
                   
                   {/* Icon Overlay */}
                   <div className="absolute bottom-4 right-4 w-10 h-10 bg-white/10 backdrop-blur rounded-full flex items-center justify-center border border-white/20 group-hover:bg-slovak-red group-hover:border-slovak-red transition-colors">
                      <ArrowRight size={18} className="text-white" />
                   </div>
                </div>

                {/* Text Content */}
                <div>
                   <h3 className="text-xl font-bold text-white mb-3 group-hover:text-slovak-red transition-colors leading-tight">
                     {project.title}
                   </h3>
                   <p className="text-blue-200 text-sm leading-relaxed opacity-80">
                     {project.description}
                   </p>
                </div>
             </div>
           ))}
        </div>

      </div>
    </div>
  );
};
