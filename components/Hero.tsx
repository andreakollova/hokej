import React from 'react';
import { MATCHES } from '../constants';
import { Calendar, MapPin, Ticket, PlayCircle } from 'lucide-react';

export const Hero: React.FC = () => {
  // Find a featureable match (e.g. upcoming Men's game or Live)
  const featuredMatch = MATCHES.find(m => 
    (m.status === 'UPCOMING' || m.status === 'LIVE') && 
    (m.category === 'MUŽI')
  ) || MATCHES[0];

  return (
    <div className="relative w-full h-[600px] md:h-[700px] text-white overflow-hidden rounded-b-[40px] md:rounded-b-[60px] shadow-2xl mx-auto max-w-[1920px]">
      
      {/* Background Image - Field Hockey Theme */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] hover:scale-105"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2000&auto=format&fit=crop")' }}
      ></div>
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-slovak-blue via-slovak-blue/60 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-slovak-blue/80 to-transparent opacity-80"></div>
      
      <div className="relative container mx-auto px-6 h-full flex flex-col justify-end pb-20 md:pb-32">
        
        {/* Match Badge */}
        <div className="self-start mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
           <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg">
             {featuredMatch.status === 'LIVE' && <span className="w-2 h-2 bg-slovak-red rounded-full animate-pulse"></span>}
             <span>{featuredMatch.competition}</span>
           </div>
        </div>

        {/* Title Section */}
        <div className="max-w-4xl space-y-4 mb-8 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
           <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
              {/* Home */}
              <div className="flex items-center gap-4">
                 <img src={featuredMatch.homeTeam.logo} alt={featuredMatch.homeTeam.name} className="w-20 h-20 md:w-24 md:h-24 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] bg-white/10 rounded-full p-2" />
                 <span className="text-4xl md:text-6xl font-black tracking-tight leading-none">{featuredMatch.homeTeam.shortName}</span>
              </div>
              
              <span className="text-4xl md:text-6xl font-black text-slovak-red italic hidden md:block">vs</span>
              <span className="text-2xl font-black text-slovak-red italic md:hidden">VS</span>

              {/* Away */}
               <div className="flex items-center gap-4">
                 <span className="text-4xl md:text-6xl font-black tracking-tight leading-none text-right md:text-left">{featuredMatch.awayTeam.shortName}</span>
                 <img src={featuredMatch.awayTeam.logo} alt={featuredMatch.awayTeam.name} className="w-20 h-20 md:w-24 md:h-24 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] bg-white/10 rounded-full p-2" />
              </div>
           </div>

           <div className="flex flex-wrap items-center gap-6 text-gray-200 font-medium text-lg mt-6">
             <div className="flex items-center gap-2">
                <Calendar className="text-slovak-red" size={20} />
                <span>{featuredMatch.date === 'Dnes' ? 'Dnes' : featuredMatch.date}, {featuredMatch.time}</span>
             </div>
             <div className="flex items-center gap-2">
                <MapPin className="text-slovak-red" size={20} />
                <span>{featuredMatch.venue}</span>
             </div>
           </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          <button className="group relative bg-slovak-red hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg shadow-red-900/30 hover:shadow-red-900/50 flex items-center gap-3 overflow-hidden">
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <Ticket size={20} />
            <span className="relative">Informácie o zápase</span>
          </button>
          
          <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center gap-3">
             <PlayCircle size={20} />
             <span>Sledovať LIVE</span>
          </button>
        </div>

      </div>
    </div>
  );
};