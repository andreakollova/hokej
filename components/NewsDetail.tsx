
import React, { useEffect } from 'react';
import { NewsItem } from '../types';
import { ArrowLeft, Calendar, Clock, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';

interface NewsDetailProps {
  article: NewsItem;
  onBack: () => void;
}

export const NewsDetail: React.FC<NewsDetailProps> = ({ article, onBack }) => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [article]);

  return (
    <div className="bg-white animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header Image */}
      <div className="relative h-[40vh] md:h-[60vh] w-full overflow-hidden">
        <img 
          src={article.imageUrl} 
          alt={article.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slovak-blue via-slovak-blue/50 to-transparent opacity-90"></div>
        <div className="absolute top-0 left-0 w-full p-6 md:p-8">
           <button 
             onClick={onBack}
             className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full backdrop-blur-md flex items-center gap-2 transition-all text-sm font-bold uppercase tracking-wide border border-white/20"
           >
             <ArrowLeft size={16} /> Späť na novinky
           </button>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-20 text-white">
           <div className="container mx-auto max-w-4xl">
              <span className="bg-slovak-red text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg mb-4 inline-block">
                 {article.category}
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight mb-4 shadow-black drop-shadow-lg">
                {article.title}
              </h1>
              <div className="flex items-center gap-6 text-sm md:text-base font-medium text-blue-100">
                 <span className="flex items-center gap-2"><Calendar size={16} /> {article.date}</span>
                 <span className="flex items-center gap-2"><Clock size={16} /> 3 min čítania</span>
              </div>
           </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
         <div className="flex flex-col md:flex-row gap-12">
            
            {/* Main Text */}
            <div className="flex-1">
               <div className="prose prose-lg prose-blue max-w-none text-gray-700 leading-relaxed">
                  <p className="text-xl md:text-2xl font-bold text-slovak-blue mb-8 leading-relaxed border-l-4 border-slovak-red pl-6">
                    {article.snippet}
                  </p>
                  
                  {article.content ? (
                    <div dangerouslySetInnerHTML={{ __html: article.content }} />
                  ) : (
                    <>
                      {/* Fallback dummy content if no specific content provided */}
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      </p>
                      <h3>Kľúčové momenty</h3>
                      <p>
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                      </p>
                      <p>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                      </p>
                      <ul>
                         <li>Dôležitý bod zlomu v zápase</li>
                         <li>Vynikajúci výkon brankára</li>
                         <li>Taktické pokyny trénera</li>
                      </ul>
                      <p>
                        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.
                      </p>
                    </>
                  )}
               </div>
            </div>

            {/* Sidebar / Share */}
            <div className="md:w-64 shrink-0">
               <div className="sticky top-32">
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Zdieľať článok</h3>
                  <div className="flex flex-row md:flex-col gap-3">
                     <button className="w-10 h-10 md:w-full md:h-auto md:py-3 rounded-full md:rounded-xl bg-[#1877F2] text-white flex items-center justify-center md:gap-3 hover:opacity-90 transition-opacity shadow-sm">
                        <Facebook size={18} /> <span className="hidden md:inline font-bold text-sm">Facebook</span>
                     </button>
                     <button className="w-10 h-10 md:w-full md:h-auto md:py-3 rounded-full md:rounded-xl bg-[#1DA1F2] text-white flex items-center justify-center md:gap-3 hover:opacity-90 transition-opacity shadow-sm">
                        <Twitter size={18} /> <span className="hidden md:inline font-bold text-sm">Twitter</span>
                     </button>
                     <button className="w-10 h-10 md:w-full md:h-auto md:py-3 rounded-full md:rounded-xl bg-[#0A66C2] text-white flex items-center justify-center md:gap-3 hover:opacity-90 transition-opacity shadow-sm">
                        <Linkedin size={18} /> <span className="hidden md:inline font-bold text-sm">LinkedIn</span>
                     </button>
                     <button className="w-10 h-10 md:w-full md:h-auto md:py-3 rounded-full md:rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center md:gap-3 hover:bg-gray-200 transition-colors shadow-sm">
                        <Share2 size={18} /> <span className="hidden md:inline font-bold text-sm">Kopírovať</span>
                     </button>
                  </div>
               </div>
            </div>

         </div>
      </div>
    </div>
  );
};
