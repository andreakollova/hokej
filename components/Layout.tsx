import React, { useRef, useState } from 'react';
import { Globe, Menu, X, ChevronDown, User, ShoppingBag, ChevronRight } from 'lucide-react';
import { MATCHES } from '../constants';
import { MatchCard } from './MatchCard';
import { NavItem } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: string;
  onChangeView: (view: string) => void;
}

const NAV_STRUCTURE: NavItem[] = [
  {
    id: 'pozemny-hokej',
    label: 'Pozemný hokej',
    children: [
      { id: 'co-je-pozemny-hokej', label: 'Čo je pozemný hokej' },
      { id: 'pravidla', label: 'Pravidlá' },
      { id: 'historia', label: 'História' },
      { id: 'chcem-zacat', label: 'Chcem začať' },
    ]
  },
  {
    id: 'reprezentacia',
    label: 'Reprezentácia',
    children: [
      { id: 'repre-muzi', label: 'Muži' },
      { id: 'repre-zeny', label: 'Ženy' },
      { id: 'repre-u21', label: 'U21' },
      { id: 'repre-u18', label: 'U18' },
      { id: 'repre-u15', label: 'U15' },
    ]
  },
  {
    id: 'zapasy',
    label: 'Zápasy',
    children: [
      { id: 'matches-field', label: 'Pozemný hokej' },
      { id: 'matches-indoor', label: 'Halový hokej' },
    ]
  },
  {
    id: 'timy',
    label: 'Tímy',
  },
  {
    id: 'kontakt',
    label: 'Kontakt',
  }
];

const Layout: React.FC<LayoutProps> = ({ children, currentView, onChangeView }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  const handleMobileNavClick = (item: NavItem) => {
    if (item.children) {
      setMobileExpanded(mobileExpanded === item.id ? null : item.id);
    } else {
      onChangeView(item.id);
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FC] font-sans text-gray-900 selection:bg-slovak-red selection:text-white">
      
      {/* 1. MATCH STRIP (Top Layer) */}
      <div className="bg-white border-b border-gray-100 z-50 relative shadow-sm">
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto hide-scrollbar py-2 px-2 md:px-4 space-x-3 snap-x"
        >
          {MATCHES.slice(0, 10).map(match => (
            <div key={match.id} className="snap-start flex-shrink-0">
              <MatchCard match={match} variant="strip" />
            </div>
          ))}
        </div>
      </div>

      {/* 2. NAVIGATION BAR */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-200/50 transition-all duration-300">
        <div className="container mx-auto px-4 md:px-6 h-18 md:h-20 flex items-center justify-between">
          
          {/* Logo Area */}
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => onChangeView('home')}
          >
            <div className="w-12 h-12 relative flex items-center justify-center">
               <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                  <path d="M20,20 L40,80 L80,20" fill="none" stroke="#0B2144" strokeWidth="8" strokeLinecap="round" />
                  <path d="M40,50 L60,50" fill="none" stroke="#EF1C26" strokeWidth="8" strokeLinecap="round" />
                  <circle cx="60" cy="20" r="8" fill="#EF1C26" />
               </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter leading-none text-slovak-blue group-hover:text-slovak-red transition-colors">
                SZPH
              </span>
              <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                Slovak Hockey
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_STRUCTURE.map((item) => (
              <div 
                key={item.id}
                className="relative group"
                onMouseEnter={() => setHoveredNav(item.id)}
                onMouseLeave={() => setHoveredNav(null)}
              >
                <button
                  onClick={() => !item.children && onChangeView(item.id)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-1 ${
                    currentView === item.id 
                      ? 'bg-gray-100 text-slovak-blue' 
                      : 'text-gray-600 hover:text-slovak-blue hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                  {item.children && <ChevronDown size={14} />}
                </button>
                
                {/* Desktop Dropdown */}
                {item.children && hoveredNav === item.id && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 p-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    {item.children.map(subItem => (
                      <button
                        key={subItem.id}
                        onClick={() => {
                          onChangeView(subItem.id);
                          setHoveredNav(null);
                        }}
                        className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-slovak-blue transition-colors"
                      >
                        {subItem.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
             <button className="hidden md:flex p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
                <Globe size={20} />
             </button>
             <button className="hidden md:flex items-center gap-2 bg-slovak-blue text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg shadow-blue-900/20 hover:bg-black transition-all transform hover:-translate-y-0.5">
                <ShoppingBag size={16} />
                <span>E-Shop</span>
             </button>
             <button 
               className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
               onClick={() => setIsMenuOpen(!isMenuOpen)}
             >
               {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
             </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl max-h-[80vh] overflow-y-auto md:hidden animate-in slide-in-from-top-4 duration-200">
             <div className="p-4 flex flex-col gap-2">
               {NAV_STRUCTURE.map((item) => (
                 <div key={item.id} className="border-b border-gray-50 last:border-0 pb-2">
                   <button
                    onClick={() => handleMobileNavClick(item)}
                    className={`flex items-center justify-between w-full p-4 rounded-xl text-left font-bold ${
                      currentView === item.id 
                        ? 'text-slovak-red' 
                        : 'text-gray-800'
                    }`}
                   >
                     {item.label}
                     {item.children && (
                       <ChevronDown 
                         size={16} 
                         className={`transition-transform duration-300 ${mobileExpanded === item.id ? 'rotate-180' : ''}`} 
                       />
                     )}
                   </button>
                   
                   {/* Mobile Submenu */}
                   {item.children && mobileExpanded === item.id && (
                     <div className="pl-4 pr-2 pb-2 flex flex-col gap-1 bg-gray-50/50 rounded-lg mx-2">
                       {item.children.map(subItem => (
                         <button
                           key={subItem.id}
                           onClick={() => {
                             onChangeView(subItem.id);
                             setIsMenuOpen(false);
                           }}
                           className="w-full text-left p-3 text-sm font-medium text-gray-500 hover:text-slovak-blue rounded-md"
                         >
                           {subItem.label}
                         </button>
                       ))}
                     </div>
                   )}
                 </div>
               ))}
               <div className="mt-4 flex gap-4">
                 <button className="flex-1 bg-slovak-blue text-white py-3 rounded-xl font-bold text-center">E-Shop</button>
                 <button className="flex-1 bg-gray-100 text-gray-800 py-3 rounded-xl font-bold text-center">EN / SK</button>
               </div>
             </div>
          </div>
        )}
      </nav>

      {/* 3. MAIN CONTENT */}
      <main className="flex-grow flex flex-col animate-in fade-in duration-500">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="container mx-auto px-6 py-12">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div className="col-span-1 md:col-span-2">
                 <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-slovak-blue rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs font-bold">SK</span>
                    </div>
                    <span className="font-bold text-gray-900">Slovenský zväz pozemného hokeja</span>
                 </div>
                 <p className="text-gray-500 text-sm max-w-sm">
                   Oficiálna stránka slovenského pozemného hokeja. Sledujte zápasy, výsledky a novinky z domácej scény aj reprezentácie.
                 </p>
                 <a href="mailto:szph@szph.sk" className="block mt-4 text-slovak-red font-bold hover:underline">szph@szph.sk</a>
              </div>
              
              <div>
                <h4 className="font-bold text-gray-900 mb-4">Rýchle odkazy</h4>
                <ul className="space-y-2 text-sm text-gray-500">
                   <li><a href="#" className="hover:text-slovak-blue">Reprezentácia</a></li>
                   <li><a href="#" className="hover:text-slovak-blue">Súťaže</a></li>
                   <li><a href="#" className="hover:text-slovak-blue">Mládež</a></li>
                   <li><a href="#" className="hover:text-slovak-blue">Dokumenty</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-4">Kontakt</h4>
                <ul className="space-y-2 text-sm text-gray-500">
                   <li>Junácka 6, 832 80 Bratislava</li>
                   <li>+421 900 123 456</li>
                </ul>
              </div>
           </div>
           
           <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-400">
                © 2024 SZPH. Všetky práva vyhradené.
              </div>
              <div className="flex gap-6 text-sm text-gray-500 font-medium">
                 <a href="#" className="hover:text-slovak-red">Ochrana súkromia</a>
                 <a href="#" className="hover:text-slovak-red">Cookies</a>
              </div>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;