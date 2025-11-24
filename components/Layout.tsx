import React, { useRef, useState } from 'react';
import { Globe, Menu, X, ChevronDown, User, ShoppingBag, ChevronRight, Search, Mic, Tv, Instagram, Facebook, LogIn, Users, Award, Shield, LayoutGrid, CalendarDays, BarChart3, Newspaper, ArrowRight } from 'lucide-react';
import { MATCHES } from '../constants';
import { MatchCard } from './MatchCard';
import { NavItem } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: string;
  onChangeView: (view: string) => void;
}

// 1. Corporate / Admin Menu (Top Bar)
const TOP_NAV_ITEMS: NavItem[] = [
  {
    id: 'szph',
    label: 'SZPH',
    children: [
      { id: 'predsednictvo', label: 'Predsedníctvo' },
      { id: 'konferencia', label: 'Konferencia' },
      { id: 'kontrolor', label: 'Kontrolór' },
      { id: 'dotacie', label: 'Čerpanie dotácií' },
      { id: 'stanovy', label: 'Stanovy a predpisy' },
      { id: 'doping', label: 'Doping v športe' },
      { id: 'hospodarenie', label: 'Výsledky hospodárenia' },
    ]
  },
  {
    id: 'dokumenty',
    label: 'Dokumenty',
    children: [
      { id: 'ekonomicke-tlaciva', label: 'Ekonomické tlačivá' },
      { id: 'registracia', label: 'Registrácia' },
      { id: 'zapisy', label: 'Zápisy' },
      { id: 'pravidla', label: 'Pravidlá pozemného hokeja' },
    ]
  },
  {
    id: 'ostatne',
    label: 'Ostatné',
    children: [
      { id: 'dk', label: 'Disciplinárna komisia' },
      { id: 'dobrovolnictvo', label: 'Dobrovoľnícka činnosť' },
      { id: 'zmluvy', label: 'Zmluvy' },
      { id: 'zoznamy', label: 'Zoznamy' },
    ]
  },
  {
    id: 'vzdelavanie',
    label: 'Vzdelávanie',
  },
  {
    id: 'kalendar',
    label: 'Kalendár akcií',
  }
];

// 2. Main Functional Menu (White Bar)
const MAIN_NAV_ITEMS: NavItem[] = [
  {
    id: 'pozemny-hokej',
    label: 'Pozemný hokej',
    children: [
      { id: 'o-sporte', label: 'O športe' },
      { id: 'historia', label: 'História' },
      { id: 'ihriska', label: 'Ihriská' },
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
    ]
  },
  {
    id: 'matches',
    label: 'Súťaže',
  },
  {
    id: 'mladez',
    label: 'Mládež',
    children: [
        { id: 'turnaje-u12', label: 'Turnaje U12' },
        { id: 'turnaje-u10', label: 'Turnaje U10' },
        { id: 'rozvoj', label: 'Rozvoj talentov' }
    ]
  },
  {
    id: 'media',
    label: 'Médiá',
    children: [
      { id: 'news', label: 'Novinky' },
      { id: 'podcast', label: 'Podcast' },
      { id: 'tv', label: 'Pozemný hokej v TV' },
      { id: 'instagram', label: 'Instagram' },
      { id: 'facebook', label: 'Facebook' },
    ]
  }
];

const ALL_NAV_ITEMS = [...MAIN_NAV_ITEMS, ...TOP_NAV_ITEMS];

const Layout: React.FC<LayoutProps> = ({ children, currentView, onChangeView }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
      
      {/* 1. ULTRA MODERN TOP BAR */}
      <div className="bg-[#0B2144] text-white relative z-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center h-auto md:h-10 text-[9px] md:text-[10px] font-normal tracking-wider">
            
            {/* Left: Admin / Info Links */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-8 py-2 md:py-0 w-full md:w-auto border-b md:border-b-0 border-white/10">
               {TOP_NAV_ITEMS.map((item) => (
                  <div 
                    key={item.id}
                    className="relative group h-full flex items-center"
                    onMouseEnter={() => setHoveredNav(item.id)}
                    onMouseLeave={() => setHoveredNav(null)}
                  >
                    <button
                      onClick={() => !item.children && onChangeView(item.id)}
                      className={`hover:text-white transition-colors flex items-center gap-1 opacity-70 hover:opacity-100 uppercase py-1 ${currentView === item.id ? 'text-slovak-red opacity-100' : ''}`}
                    >
                      {item.label}
                      {item.children && <ChevronDown size={10} />}
                    </button>

                    {/* Dropdown */}
                    {item.children && hoveredNav === item.id && (
                      <div className="absolute top-full left-0 mt-0 w-56 bg-white rounded-lg shadow-xl shadow-black/20 border border-gray-100 p-1.5 animate-in fade-in slide-in-from-top-1 duration-200 z-50">
                         {item.children.map(subItem => (
                          <button
                            key={subItem.id}
                            onClick={() => {
                              onChangeView(subItem.id);
                              setHoveredNav(null);
                            }}
                            className="w-full text-left px-3 py-2.5 rounded-md text-[11px] font-bold text-gray-600 hover:bg-gray-50 hover:text-slovak-blue transition-colors block uppercase"
                          >
                            {subItem.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
               ))}
            </div>

            {/* Right: Zone / Login */}
            <div className="flex items-center gap-6 py-2 md:py-0 opacity-90">
                <div className="hidden md:flex items-center gap-4 text-[10px]">
                    <button className="hover:text-white hover:underline decoration-slovak-red underline-offset-4 decoration-2">Hráči</button>
                    <button className="hover:text-white hover:underline decoration-slovak-red underline-offset-4 decoration-2">Tréneri</button>
                    <button className="hover:text-white hover:underline decoration-slovak-red underline-offset-4 decoration-2">Kluby</button>
                </div>
                <div className="w-[1px] h-3 bg-white/20 hidden md:block"></div>
                <button className="flex items-center gap-2 hover:text-white transition-colors">
                    <User size={12} /> 
                    <span>Prihlásiť sa</span>
                </button>
                <div className="flex items-center gap-2 md:ml-2">
                    <button className="opacity-50 hover:opacity-100 font-bold">SK</button>
                    <span className="opacity-30">/</span>
                    <button className="opacity-50 hover:opacity-100 font-bold">EN</button>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION (Redesigned) */}
      <nav className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-100 h-[80px] md:h-[90px] flex items-center transition-all">
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer shrink-0" 
            onClick={() => onChangeView('home')}
          >
            <div className="w-10 h-10 md:w-14 md:h-14 relative flex items-center justify-center">
               <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
                  <path d="M20,20 L40,80 L80,20" fill="none" stroke="#0B2144" strokeWidth="8" strokeLinecap="round" />
                  <path d="M40,50 L60,50" fill="none" stroke="#EF1C26" strokeWidth="8" strokeLinecap="round" />
                  <circle cx="60" cy="20" r="8" fill="#EF1C26" />
               </svg>
            </div>
            <div className="hidden md:flex flex-col -space-y-1">
              <span className="text-2xl font-black tracking-tighter text-slovak-blue">
                SZPH
              </span>
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-[0.2em]">
                Slovak Hockey
              </span>
            </div>
          </div>

          {/* Desktop Links (Centered) */}
          <div className="hidden xl:flex items-center gap-8">
            {MAIN_NAV_ITEMS.map((item) => (
              <div 
                key={item.id}
                className="relative group h-[90px] flex items-center"
                onMouseEnter={() => setHoveredNav(item.id)}
                onMouseLeave={() => setHoveredNav(null)}
              >
                <button
                  onClick={() => !item.children && onChangeView(item.id)}
                  className={`text-sm font-black uppercase tracking-wide transition-colors relative py-2
                    ${currentView === item.id ? 'text-slovak-blue' : 'text-gray-600 hover:text-slovak-blue'}
                  `}
                >
                  {item.label}
                  <span className={`absolute bottom-0 left-0 w-full h-[3px] bg-slovak-red transform origin-left transition-transform duration-300 ${currentView === item.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                </button>
                
                {/* Mega Menu / Dropdown */}
                {item.children && hoveredNav === item.id && (
                  <div className="absolute top-[80px] left-1/2 transform -translate-x-1/2 w-64 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 p-2 animate-in fade-in slide-in-from-top-4 duration-200 z-50">
                     <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white transform rotate-45 border-t border-l border-gray-100"></div>
                     <div className="relative bg-white rounded-lg overflow-hidden">
                        {item.children.map(subItem => (
                          <button
                            key={subItem.id}
                            onClick={() => {
                              onChangeView(subItem.id);
                              setHoveredNav(null);
                            }}
                            className="w-full text-left px-5 py-3 text-sm font-bold text-gray-600 hover:bg-gray-50 hover:text-slovak-blue hover:pl-7 transition-all flex items-center gap-2 uppercase border-b border-gray-50 last:border-0"
                          >
                            {subItem.label}
                          </button>
                        ))}
                     </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Utilities */}
          <div className="flex items-center gap-3">
             <div className="hidden lg:flex items-center bg-gray-100 rounded-full px-4 py-2 transition-all focus-within:ring-2 focus-within:ring-slovak-blue/20 focus-within:bg-white border border-transparent focus-within:border-gray-200">
                <input 
                  type="text" 
                  placeholder="Hľadať..." 
                  className="bg-transparent border-none outline-none text-sm font-medium text-gray-800 placeholder-gray-400 w-24 focus:w-40 transition-all"
                />
                <Search size={16} className="text-gray-400" />
             </div>
             
             <button className="hidden md:flex items-center gap-2 bg-slovak-blue text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-blue-900/10 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                <ShoppingBag size={16} />
                <span>E-Shop</span>
             </button>

             <button 
               className="xl:hidden p-2 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
               onClick={() => setIsMenuOpen(!isMenuOpen)}
             >
               {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
             </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
          <div className="fixed inset-0 top-[130px] bg-white z-30 overflow-y-auto xl:hidden animate-in fade-in duration-200">
             <div className="container mx-auto px-4 py-6">
                <div className="mb-6 relative">
                   <input type="text" placeholder="Hľadať..." className="w-full bg-gray-50 p-4 pl-12 rounded-xl text-base font-medium outline-none" />
                   <Search size={20} className="absolute left-4 top-4 text-gray-400" />
                </div>

                <div className="space-y-2">
                   {ALL_NAV_ITEMS.map((item) => (
                     <div key={item.id} className="border-b border-gray-50 pb-2">
                       <button
                        onClick={() => handleMobileNavClick(item)}
                        className={`flex items-center justify-between w-full p-4 rounded-xl text-left font-black text-lg uppercase ${
                          currentView === item.id ? 'text-slovak-red' : 'text-slovak-blue'
                        }`}
                       >
                         {item.label}
                         {item.children && (
                           <ChevronDown 
                             size={20} 
                             className={`transition-transform duration-300 ${mobileExpanded === item.id ? 'rotate-180' : ''}`} 
                           />
                         )}
                       </button>
                       {item.children && mobileExpanded === item.id && (
                         <div className="bg-gray-50 rounded-xl p-2 ml-4 mb-2">
                            {item.children.map(subItem => (
                              <button
                                key={subItem.id}
                                onClick={() => {
                                  onChangeView(subItem.id);
                                  setIsMenuOpen(false);
                                }}
                                className="w-full text-left p-3 text-sm font-bold text-gray-500 hover:text-slovak-blue block uppercase border-b border-gray-200/50 last:border-0"
                              >
                                {subItem.label}
                              </button>
                            ))}
                         </div>
                       )}
                     </div>
                   ))}
                </div>
                
                <div className="mt-8">
                   <button className="w-full bg-slovak-red text-white py-4 rounded-xl font-black text-lg shadow-lg">E-Shop</button>
                </div>
             </div>
          </div>
      )}

      {/* 3. MATCH STRIP (Ticker Style) */}
      <div className="w-full bg-gray-50 border-b border-gray-200 relative z-30">
          <div className="container mx-auto">
             <div className="flex items-center">
                 <div className="hidden md:flex items-center gap-2 pr-6 py-4 border-r border-gray-200 mr-2 shrink-0">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-black text-gray-900 uppercase tracking-widest">Match Center</span>
                 </div>
                 
                 <div className="overflow-x-auto hide-scrollbar flex gap-3 py-3 px-4 md:px-0 w-full">
                   {MATCHES.map(match => (
                     <div key={match.id} className="shrink-0">
                        <MatchCard match={match} variant="strip" />
                     </div>
                   ))}
                 </div>
                 
                 <div className="hidden md:flex pl-4 shrink-0 bg-gradient-to-l from-gray-50 to-transparent w-12 h-full absolute right-0 pointer-events-none"></div>
             </div>
          </div>
      </div>

      {/* 4. MAIN CONTENT */}
      <main className="flex-grow flex flex-col animate-in fade-in duration-500">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="container mx-auto px-6 py-12">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div className="col-span-1 md:col-span-2">
                 <div className="flex items-center gap-2 mb-4">
                    <div className="w-10 h-10 bg-slovak-blue rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm font-bold">SK</span>
                    </div>
                    <div>
                        <span className="block font-black text-gray-900 leading-none">SZPH</span>
                        <span className="text-[10px] uppercase font-bold text-gray-400">Slovak Hockey</span>
                    </div>
                 </div>
                 <p className="text-gray-500 text-sm max-w-sm leading-relaxed">
                   Oficiálna stránka slovenského pozemného hokeja. Sledujte zápasy, výsledky a novinky z domácej scény aj reprezentácie.
                 </p>
                 <a href="mailto:szph@szph.sk" className="block mt-4 text-slovak-red font-bold hover:underline">szph@szph.sk</a>
              </div>
              
              <div>
                <h4 className="font-bold text-gray-900 mb-4 uppercase text-xs tracking-wider">Rýchle odkazy</h4>
                <ul className="space-y-3 text-sm text-gray-500 font-medium">
                   <li><a href="#" className="hover:text-slovak-blue transition-colors">Reprezentácia</a></li>
                   <li><a href="#" className="hover:text-slovak-blue transition-colors">Súťaže</a></li>
                   <li><a href="#" className="hover:text-slovak-blue transition-colors">Mládež</a></li>
                   <li><a href="#" className="hover:text-slovak-blue transition-colors">Dokumenty</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-4 uppercase text-xs tracking-wider">Kontakt</h4>
                <ul className="space-y-3 text-sm text-gray-500 font-medium">
                   <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slovak-red mt-1.5"></div> Junácka 6, 832 80 Bratislava</li>
                   <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slovak-red mt-1.5"></div> +421 900 123 456</li>
                </ul>
              </div>
           </div>
           
           <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-400 font-medium">
                © 2024 SZPH. Všetky práva vyhradené.
              </div>
              <div className="flex gap-6 text-sm text-gray-500 font-bold">
                 <a href="#" className="hover:text-slovak-red transition-colors">Ochrana súkromia</a>
                 <a href="#" className="hover:text-slovak-red transition-colors">Cookies</a>
              </div>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;