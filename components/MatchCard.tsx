import React from 'react';
import { Match, MatchStatus } from '../types';
import { Calendar, MapPin, Clock } from 'lucide-react';

interface MatchCardProps {
  match: Match;
  variant?: 'hero' | 'strip' | 'row' | 'widget';
}

export const MatchCard: React.FC<MatchCardProps> = ({ match, variant = 'row' }) => {
  const isLive = match.status === MatchStatus.LIVE;
  const isFinal = match.status === MatchStatus.FINAL;

  // 1. STRIP VARIANT (Top Bar)
  if (variant === 'strip') {
    return (
      <div className="w-[280px] bg-white rounded-2xl p-4 border border-gray-100 hover:border-blue-100 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between h-[100px]">
        <div className="flex justify-between items-center mb-2">
           <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider truncate max-w-[100px]">{match.competition}</span>
           {isLive ? (
             <span className="flex items-center gap-1.5 bg-red-50 text-slovak-red px-2 py-0.5 rounded-full text-[10px] font-bold animate-pulse">
               <span className="w-1.5 h-1.5 rounded-full bg-slovak-red"></span>
               {match.period || 'LIVE'}
             </span>
           ) : isFinal ? (
             <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">KONIEC</span>
           ) : (
             <span className="text-[10px] font-bold text-slovak-blue bg-blue-50 px-2 py-0.5 rounded-full">{match.time}</span>
           )}
        </div>
        
        <div className="flex justify-between items-center px-1">
          <div className="flex items-center gap-3 w-1/3">
             <img src={match.homeTeam.logo} alt={match.homeTeam.shortName} className="h-8 w-8 object-contain" />
             <span className="font-bold text-xs text-gray-900 truncate">{match.homeTeam.shortName}</span>
          </div>
          <div className="font-mono font-bold text-sm text-gray-900 bg-gray-50 px-2 py-1 rounded-lg min-w-[50px] text-center shadow-inner">
            {isFinal || isLive ? `${match.scoreHome} - ${match.scoreAway}` : 'vs'}
          </div>
          <div className="flex items-center justify-end gap-3 w-1/3">
             <span className="font-bold text-xs text-gray-900 truncate">{match.awayTeam.shortName}</span>
             <img src={match.awayTeam.logo} alt={match.awayTeam.shortName} className="h-8 w-8 object-contain" />
          </div>
        </div>
      </div>
    );
  }
  
  // 2. WIDGET VARIANT (Simple Row for Lists)
  if (variant === 'widget') {
    return (
      <div className="flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors rounded-2xl border border-gray-100 shadow-sm mb-2 cursor-pointer group">
        <div className="flex flex-col items-center w-16 text-center border-r border-gray-100 pr-4 mr-4">
           <span className="text-lg font-black text-gray-900 leading-none">{match.date.split('.')[0]}</span>
           <span className="text-[10px] font-bold text-gray-400 uppercase">{match.time}</span>
        </div>
        
        <div className="flex-1 flex items-center justify-between gap-4">
           <div className="flex items-center gap-2 flex-1 justify-end">
              <span className="text-sm font-bold text-gray-900 hidden md:block">{match.homeTeam.shortName}</span>
              <img src={match.homeTeam.logo} className="w-8 h-8 object-contain" />
           </div>
           
           <div className="font-bold text-gray-900 bg-gray-100 px-3 py-1 rounded-lg text-xs">
              {isFinal || isLive ? `${match.scoreHome}:${match.scoreAway}` : 'VS'}
           </div>

           <div className="flex items-center gap-2 flex-1 justify-start">
              <img src={match.awayTeam.logo} className="w-8 h-8 object-contain" />
              <span className="text-sm font-bold text-gray-900 hidden md:block">{match.awayTeam.shortName}</span>
           </div>
        </div>
        
        <div className="hidden md:flex ml-4 pl-4 border-l border-gray-100 text-xs text-gray-400 font-medium w-24 justify-center">
           {match.category}
        </div>
      </div>
    )
  }

  // 3. ROW VARIANT (Match Center - Full Detail)
  return (
    <div className="bg-white rounded-[24px] p-2 shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-100 transition-all duration-300 group hover:-translate-y-1">
      <div className="flex flex-col md:flex-row items-stretch">
        
        {/* Date/Status Block */}
        <div className="md:w-44 p-4 flex flex-col justify-center items-center md:items-start bg-gray-50/80 rounded-[18px] backdrop-blur-sm">
           <div className="flex items-center gap-2 mb-2">
             <span className="text-[10px] font-bold text-slovak-blue bg-blue-100/50 px-2 py-0.5 rounded-full">{match.category}</span>
           </div>
           
           {isLive ? (
              <>
                <span className="inline-flex items-center gap-1.5 text-slovak-red font-black text-sm uppercase mb-1">
                   <span className="w-2 h-2 bg-slovak-red rounded-full animate-pulse"></span>
                   Naživo
                </span>
                <span className="text-2xl font-black text-gray-900 mb-1 tracking-tight">{match.timeRemaining}</span>
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{match.period}</span>
              </>
           ) : (
              <>
                 <span className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                   {match.date}
                 </span>
                 <span className="text-3xl font-black text-gray-900 mb-1">{isFinal ? 'FT' : match.time}</span>
                 <div className="flex items-center gap-1 text-xs font-medium text-gray-400 truncate w-full">
                    <MapPin size={10} />
                    <span className="truncate">{match.venue.split(',')[0]}</span>
                 </div>
              </>
           )}
        </div>

        {/* Teams Block */}
        <div className="flex-grow p-4 md:px-8 flex items-center justify-between relative">
           <div className="flex items-center gap-2 md:gap-8 w-full justify-between">
              
              {/* Home Team */}
              <div className="flex-1 flex flex-col md:flex-row items-center justify-end gap-3 md:gap-6 text-center md:text-right">
                 <span className="hidden md:block text-xl font-bold text-gray-900 tracking-tight">{match.homeTeam.name}</span>
                 <span className="md:hidden text-base font-bold text-gray-900">{match.homeTeam.shortName}</span>
                 <div className="w-16 h-16 md:w-20 md:h-20 p-2 bg-white rounded-2xl shadow-sm border border-gray-50 flex items-center justify-center">
                    <img src={match.homeTeam.logo} className="w-full h-full object-contain" alt={match.homeTeam.name} />
                 </div>
              </div>

              {/* Score */}
              <div className="shrink-0 px-4 py-3 bg-gray-900 text-white rounded-2xl shadow-lg min-w-[90px] text-center z-10 mx-2 transform group-hover:scale-110 transition-transform duration-300">
                 <span className="text-2xl md:text-3xl font-black tracking-tighter">
                    {isFinal || isLive ? `${match.scoreHome}:${match.scoreAway}` : 'vs'}
                 </span>
              </div>

              {/* Away Team */}
              <div className="flex-1 flex flex-col-reverse md:flex-row items-center justify-start gap-3 md:gap-6 text-center md:text-left">
                 <div className="w-16 h-16 md:w-20 md:h-20 p-2 bg-white rounded-2xl shadow-sm border border-gray-50 flex items-center justify-center">
                    <img src={match.awayTeam.logo} className="w-full h-full object-contain" alt={match.awayTeam.name} />
                 </div>
                 <span className="hidden md:block text-xl font-bold text-gray-900 tracking-tight">{match.awayTeam.name}</span>
                 <span className="md:hidden text-base font-bold text-gray-900">{match.awayTeam.shortName}</span>
              </div>
           </div>
        </div>

        {/* Actions Block */}
        <div className="md:w-auto p-4 flex items-center justify-center md:border-l border-gray-50">
           {isFinal ? (
              <button className="w-full md:w-auto bg-gray-100 text-gray-700 hover:bg-slovak-blue hover:text-white font-bold py-3 px-6 rounded-xl transition-all text-sm flex flex-col items-center gap-1 group-hover:bg-slovak-blue group-hover:text-white">
                 <span className="uppercase text-[10px]">Detail</span>
              </button>
           ) : isLive ? (
              <button className="w-full md:w-auto bg-slovak-red text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-red-200 hover:bg-red-700 transition-transform active:scale-95 text-sm flex items-center justify-center gap-2">
                 <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                 Sledovať
              </button>
           ) : (
              <button className="w-full md:w-auto bg-gray-100 text-gray-600 hover:bg-gray-200 font-bold py-3 px-6 rounded-xl transition-colors text-sm">
                 Info
              </button>
           )}
        </div>

      </div>
    </div>
  );
};