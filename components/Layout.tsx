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
      { id: 'dk', label: 'Disciplinárna komisia' },
      { id: 'dobrovolnictvo', label: 'Dobrovoľnícka činnosť' },
      { id: 'zmluvy', label: 'Zmluvy' },
      { id: 'zoznamy', label: 'Zoznamy' },
      { id: 'ostatne-items', label: 'Ostatné' }
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
    id: 'vzdelavanie',
    label: 'Vzdelávanie',
  },
  {
    id: 'kalendar',
    label: 'Kalendár',
  }
];

// 2. Main Functional Menu
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
      
      {/* 1. TOP BAR (Admin) */}
      <div className="bg-[#0B2144] text-white relative z-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center h-auto md:h-9 text-[8px] md:text-[9px] font-normal tracking-wider">
            
            {/* Left: Admin Links */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-6 py-2 md:py-0 w-full md:w-auto">
               {TOP_NAV_ITEMS.map((item) => (
                  <div 
                    key={item.id}
                    className="relative group h-full flex items-center"
                    onMouseEnter={() => setHoveredNav(item.id)}
                    onMouseLeave={() => setHoveredNav(null)}
                  >
                    <button
                      onClick={() => !item.children && onChangeView(item.id)}
                      className={`hover:text-white transition-colors flex items-center gap-1 opacity-60 hover:opacity-100 uppercase py-1 ${currentView === item.id ? 'text-slovak-red opacity-100' : ''}`}
                    >
                      {item.label}
                      {item.children && <ChevronDown size={10} />}
                    </button>

                    {/* Dropdown */}
                    {item.children && hoveredNav === item.id && (
                      <div className="absolute top-full left-0 mt-0 w-56 bg-white rounded-lg shadow-xl shadow-black/20 border border-gray-100 p-1.5 z-50">
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

            {/* Right: Language / Small Utils */}
            <div className="hidden md:flex items-center gap-4 opacity-80">
                <div className="flex items-center gap-2">
                    <button className="opacity-50 hover:opacity-100 font-bold">SK</button>
                    <span className="opacity-30">/</span>
                    <button className="opacity-50 hover:opacity-100 font-bold">EN</button>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER AREA */}
      <header className="bg-white shadow-sm border-b border-gray-100 relative z-40">
        <div className="container mx-auto px-4 md:px-8">
          
          {/* Top Row: Login - Logo - Utilities */}
          <div className="h-[100px] md:h-[130px] flex items-center justify-between relative">
            
            {/* Left: Login Button */}
            <div className="flex-1 flex justify-start">
               <button className="flex items-center gap-2 md:gap-3 text-slovak-blue hover:bg-blue-50 px-3 py-2 md:px-5 md:py-2.5 rounded-full transition-all group">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-slovak-blue group-hover:text-white transition-colors">
                    <User size={16} className="md:w-5 md:h-5" />
                  </div>
                  <span className="hidden md:block text-xs font-bold uppercase tracking-widest">Prihlásiť sa</span>
               </button>
            </div>

            {/* Center: Logo */}
            <div 
              className="flex-1 flex justify-center cursor-pointer" 
              onClick={() => onChangeView('home')}
            >
               <img 
                 src="https://szph.sk/wp-content/uploads/2025/11/logo-field-hockey.png" 
                 alt="SZPH Logo" 
                 className="h-20 md:h-28 w-auto object-contain"
               />
            </div>

            {/* Right: Utilities */}
            <div className="flex-1 flex justify-end items-center gap-2 md:gap-4">
               <div className="hidden lg:flex items-center bg-gray-100 rounded-full px-4 py-2.5">
                  <input 
                    type="text" 
                    placeholder="Hľadať..." 
                    className="bg-transparent border-none outline-none text-sm font-medium text-gray-800 placeholder-gray-400 w-24 focus:w-40 transition-all"
                  />
                  <Search size={18} className="text-gray-400" />
               </div>
               
               <button className="hidden md:flex items-center gap-2 bg-slovak-blue text-white px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-900/10 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                  <ShoppingBag size={16} />
                  <span>E-Shop</span>
               </button>

               <button 
                 className="xl:hidden p-3 text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
                 onClick={() => setIsMenuOpen(!isMenuOpen)}
               >
                 {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
               </button>
            </div>
          </div>

          {/* Bottom Row: Navigation Links (Desktop Only) */}
          <div className="hidden xl:flex justify-center items-center border-t border-gray-50">
            <div className="flex items-center gap-10">
              {MAIN_NAV_ITEMS.map((item) => (
                <div 
                  key={item.id}
                  className="relative group"
                  onMouseEnter={() => setHoveredNav(item.id)}
                  onMouseLeave={() => setHoveredNav(null)}
                >
                  <button
                    onClick={() => !item.children && onChangeView(item.id)}
                    className={`text-sm font-bold uppercase tracking-widest py-5 flex items-center gap-1 transition-colors
                      ${currentView === item.id ? 'text-slovak-red' : 'text-gray-600 hover:text-slovak-blue'}
                    `}
                  >
                    {item.label}
                    {item.children && <ChevronDown size={12} strokeWidth={3} className="mt-[-2px] opacity-50" />}
                  </button>
                  
                  {/* Mega Menu */}
                  {item.children && hoveredNav === item.id && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-56 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 p-2 z-50">
                       <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white transform rotate-45 border-t border-l border-gray-100"></div>
                       <div className="relative bg-white rounded-lg overflow-hidden">
                          {item.children.map(subItem => (
                            <button
                              key={subItem.id}
                              onClick={() => {
                                onChangeView(subItem.id);
                                setHoveredNav(null);
                              }}
                              className="w-full text-left px-5 py-3 text-xs font-bold text-gray-600 hover:bg-gray-50 hover:text-slovak-blue hover:pl-7 transition-all flex items-center gap-2 uppercase border-b border-gray-50 last:border-0"
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
          </div>

        </div>
      </header>
      
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
          <div className="fixed inset-0 top-[140px] bg-white z-30 overflow-y-auto xl:hidden animate-in fade-in duration-200 border-t border-gray-100">
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
                
                <div className="mt-8 grid grid-cols-2 gap-4">
                   <button className="w-full bg-slovak-blue/5 text-slovak-blue py-4 rounded-xl font-bold uppercase flex items-center justify-center gap-2">
                      <User size={18} /> Prihlásiť sa
                   </button>
                   <button className="w-full bg-slovak-red text-white py-4 rounded-xl font-black uppercase shadow-lg flex items-center justify-center gap-2">
                      <ShoppingBag size={18} /> E-Shop
                   </button>
                </div>
             </div>
          </div>
      )}

      {/* 3. MATCH STRIP */}
      <div className="w-full bg-gray-50 border-b border-gray-200 relative z-30">
          <div className="container mx-auto">
             <div className="flex items-center">
                 <div className="hidden md:flex items-center gap-2 pr-6 py-4 border-r border-gray-200 mr-2 shrink-0">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-black text-gray-900 uppercase tracking-widest">Zóna zápasov</span>
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
      <footer className="bg-[#0B2144] border-t border-white/10 mt-20 text-white rounded-t-xl relative z-40 overflow-hidden">
        <div className="container mx-auto px-6 py-16">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              
              {/* Column 1 */}
              <div className="col-span-1">
                 <div className="flex items-center gap-2 mb-6">
                    <img 
                      src="https://szph.sk/wp-content/uploads/2025/11/logo-field-hockey.png" 
                      alt="SZPH Logo" 
                      className="w-40 h-auto object-contain brightness-0 invert"
                    />
                 </div>
                 <p className="text-white text-sm max-w-sm leading-relaxed mb-8 font-medium opacity-80">
                   Oficiálna stránka slovenského pozemného hokeja. Sledujte zápasy, výsledky a novinky z domácej scény aj reprezentácie.
                 </p>
                 
                 <div className="space-y-4 text-sm text-white font-medium">
                   <a href="mailto:szph@szph.sk" className="flex items-center gap-3 hover:text-white hover:opacity-100 opacity-80 transition-all group">
                     <div className="w-2 h-2 rounded-full bg-slovak-red group-hover:scale-125 transition-transform"></div> szph@szph.sk
                   </a>
                   <a href="tel:+421918555519" className="flex items-center gap-3 hover:text-white hover:opacity-100 opacity-80 transition-all group">
                      <div className="w-2 h-2 rounded-full bg-slovak-red group-hover:scale-125 transition-transform"></div> +421 918 555 519
                   </a>
                 </div>
              </div>
              
              {/* Column 2 */}
              <div className="col-span-1 md:pl-8">
                <h4 className="font-black text-white mb-8 uppercase text-sm tracking-widest border-b border-white/10 pb-4 inline-block">DÔLEŽITÉ ODKAZY</h4>
                <ul className="space-y-4 text-sm text-white font-bold opacity-80">
                   <li><a href="#" className="hover:text-white hover:opacity-100 hover:pl-2 transition-all block">Konferencia</a></li>
                   <li><a href="#" className="hover:text-white hover:opacity-100 hover:pl-2 transition-all block">Kontrolór</a></li>
                   <li><a href="#" className="hover:text-white hover:opacity-100 hover:pl-2 transition-all block">Čerpanie dotácií MŠVVaŠ</a></li>
                   <li><a href="#" className="hover:text-white hover:opacity-100 hover:pl-2 transition-all block">Stanovy a predpisy</a></li>
                   <li><a href="#" className="hover:text-white hover:opacity-100 hover:pl-2 transition-all block">Doping v športe</a></li>
                   <li><a href="#" className="hover:text-white hover:opacity-100 hover:pl-2 transition-all block">Výsledky hospodárenia</a></li>
                </ul>
              </div>

              {/* Column 3 */}
              <div className="col-span-1 flex flex-col items-start md:items-start">
                <h4 className="font-black text-white mb-8 uppercase text-sm tracking-widest border-b border-white/10 pb-4 inline-block">Príspevok uznanému športu</h4>
                <div className="flex flex-col gap-6 w-full">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-[340px] flex items-center justify-center">
                       <img src="https://szph.sk/wp-content/uploads/2025/03/rozpocet-2025-logo.jpg" className="w-full h-auto object-contain h-24" alt="Rozpočet 2025" />
                    </div>
                    <div className="bg-white rounded-xl p-4 w-full max-w-[340px] flex items-center justify-center">
                        <img src="https://szph.sk/wp-content/uploads/2024/08/Screenshot-2024-05-24-133021-470x189-1.png" className="h-24 w-full object-contain" alt="Ministerstvo" />
                    </div>
                    <div className="bg-white rounded-xl p-4 w-full max-w-[340px] flex items-center justify-center">
                         <img src="https://szph.sk/wp-content/uploads/2024/08/federacia.png" className="h-24 w-full object-contain" alt="Federácia" />
                    </div>
                </div>
              </div>
           </div>
           
           <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-sm text-white font-medium opacity-60">
                © 2025 SZPH. Všetky práva vyhradené.
              </div>
              <div className="flex gap-8 text-sm text-white font-bold opacity-80">
                 <a href="#" className="hover:opacity-100 transition-opacity">Ochrana súkromia</a>
                 <a href="#" className="hover:opacity-100 transition-opacity">Cookies</a>
              </div>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;