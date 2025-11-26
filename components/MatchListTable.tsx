
import React, { useState } from 'react';
import { Match, MatchStatus } from '../types';
import { ArrowRight, MapPin, CalendarDays, ChevronLeft, ChevronRight, Video, Trophy } from 'lucide-react';

interface MatchListTableProps {
  matches: Match[];
}

export const MatchListTable: React.FC<MatchListTableProps> = ({ matches }) => {
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState<'VŠETKY' | 'REPREZENTÁCIA' | 'LIGA'>('VŠETKY');
  const itemsPerPage = 5;
  
  const formatDate = (dateStr: string) => {
     if (/\d{4}/.test(dateStr)) return dateStr;
     const clean = dateStr.endsWith('.') ? dateStr.slice(0, -1) : dateStr;
     return `${clean}.2025`;
  };

  // 1. Filter Logic
  const filteredMatches = matches.filter(match => {
    const isNational = match.homeTeam.id === 'svk' || match.awayTeam.id === 'svk';
    
    if (activeTab === 'REPREZENTÁCIA') return isNational;
    if (activeTab === 'LIGA') return !isNational;
    return true;
  });

  // 2. Pagination Logic
  const totalPages = Math.ceil(filteredMatches.length / itemsPerPage);
  const paginatedMatches = filteredMatches.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  // Reset page when tab changes
  const handleTabChange = (tab: 'VŠETKY' | 'REPREZENTÁCIA' | 'LIGA') => {
    setActiveTab(tab);
    setPage(1);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden font-sans flex flex-col">
      {/* Header Section */}
      <div className="px-4 py-8 md:px-12 md:py-12 border-b border-gray-100 flex flex-col xl:flex-row justify-between items-start xl:items-end bg-white gap-6">
        <div className="w-full">
           <span className="text-slovak-red font-bold text-xs uppercase tracking-widest mb-2 block">SLOVENSKÁ LIGA A REPREZENTÁCIA</span>
           <h3 className="text-5xl md:text-5xl font-black tracking-tighter text-slovak-blue mb-6 uppercase leading-none">NAJBLIŽŠIE ZÁPASY</h3>
           
           {/* Tabs */}
           <div className="flex flex-nowrap gap-2 overflow-x-auto hide-scrollbar pb-2 md:pb-0 w-full">
             {(['VŠETKY', 'REPREZENTÁCIA', 'LIGA'] as const).map((tab) => (
               <button
                 key={tab}
                 onClick={() => handleTabChange(tab)}
                 className={`px-3 py-2 md:px-6 md:py-2.5 rounded-full text-[10px] md:text-sm font-bold transition-all duration-300 border uppercase tracking-wide flex items-center gap-1.5 md:gap-2 whitespace-nowrap ${
                   activeTab === tab 
                     ? 'bg-slovak-blue text-white border-slovak-blue' 
                     : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                 }`}
               >
                 {tab === 'REPREZENTÁCIA' && <img src="https://flagcdn.com/w20/sk.png" alt="SK" className="w-4 h-auto md:w-5" />}
                 {tab === 'LIGA' && <Trophy size={12} className="md:w-[14px] md:h-[14px]" />}
                 {tab === 'VŠETKY' ? 'VŠETKY' : tab === 'LIGA' ? 'LIGA' : 'REPREZENTÁCIA'}
               </button>
             ))}
           </div>
        </div>
         <button className="hidden md:flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-slovak-red transition-colors bg-gray-50 px-5 py-3 rounded-full hover:bg-gray-100 border border-gray-100 shrink-0">
            <CalendarDays size={18} /> Celý Kalendár <ArrowRight size={16} />
         </button>
      </div>
      
      {/* Table Section - Desktop */}
      <div className="hidden md:block overflow-x-auto flex-1 min-h-[400px]">
        {paginatedMatches.length > 0 ? (
          <table className="w-full min-w-[1000px] text-sm text-gray-900">
            <thead>
              <tr className="border-b border-gray-100 bg-white text-gray-400 text-xs font-bold tracking-wider uppercase">
                <th className="py-6 pl-8 md:pl-12 text-left w-[120px]">Dátum</th>
                <th className="py-6 px-4 text-right w-[25%]">Domáci</th>
                <th className="py-6 px-4 text-center w-[100px]">Výsledky</th>
                <th className="py-6 px-4 text-left w-[25%]">Hostia</th>
                <th className="py-6 px-4 text-center">Čas</th>
                <th className="py-6 px-4 text-left">Liga</th>
                <th className="py-6 pr-8 md:pr-12 text-right">Miesto Zápasu</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 bg-white">
              {paginatedMatches.map((match) => {
                const isFinal = match.status === MatchStatus.FINAL;
                const isLive = match.status === MatchStatus.LIVE;
                const hasStream = match.id === 'm_next_6';
                
                return (
                  <tr key={match.id} className="group hover:bg-gray-50 transition-colors h-20">
                    {/* DÁTUM */}
                    <td className="py-4 pl-8 md:pl-12 whitespace-nowrap font-medium text-gray-900">
                      <div className="flex items-center gap-2">
                         <span>{formatDate(match.date)}</span>
                         {hasStream && <Video size={16} className="text-slovak-red animate-pulse" fill="currentColor" />}
                      </div>
                    </td>
                    
                    {/* DOMÁCI */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center justify-end gap-3">
                        <span className="font-medium text-gray-900 text-sm">{match.homeTeam.name}</span>
                        <img src={match.homeTeam.logo} alt={match.homeTeam.shortName} className="w-10 h-10 object-contain drop-shadow-sm" />
                      </div>
                    </td>
                    
                    {/* VÝSLEDKY */}
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                        {isFinal || isLive ? (
                          <span className="font-black text-xl text-slovak-blue tracking-tighter">
                            {match.scoreHome}:{match.scoreAway}
                          </span>
                        ) : (
                          <span className="font-medium text-gray-300 text-xl">-</span>
                        )}
                    </td>
                    
                    {/* HOSTIA */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center justify-start gap-3">
                        <img src={match.awayTeam.logo} alt={match.awayTeam.shortName} className="w-10 h-10 object-contain drop-shadow-sm" />
                        <span className="font-medium text-gray-900 text-sm">{match.awayTeam.name}</span>
                      </div>
                    </td>
                    
                    {/* ČAS */}
                    <td className="py-4 px-4 text-center whitespace-nowrap font-bold text-gray-900">
                      {match.time}
                    </td>
                    
                    {/* LIGA */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex flex-col items-start gap-1">
                          <span className="text-xs font-bold text-gray-500 uppercase tracking-wide bg-gray-100 px-2 py-1 rounded">
                            {match.competition}
                          </span>
                      </div>
                    </td>
                    
                    {/* MIESTO */}
                    <td className="py-4 pr-8 md:pr-12 text-right whitespace-nowrap font-medium text-gray-500">
                      {match.venue.split(',')[0]}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="flex flex-col items-center justify-center h-[300px] text-gray-400">
             <p className="text-lg font-bold">Žiadne zápasy pre zvolený filter</p>
          </div>
        )}
      </div>

      {/* Mobile List View - Compact Modern Design */}
      <div className="md:hidden flex flex-col divide-y divide-gray-50">
         {paginatedMatches.length > 0 ? (
            paginatedMatches.map(match => {
               const isFinal = match.status === MatchStatus.FINAL;
               const isLive = match.status === MatchStatus.LIVE;
               const hasStream = match.id === 'm_next_6';

               return (
                 <div key={match.id} className="p-3 flex flex-col gap-2">
                    {/* Row 1: Date and League */}
                    <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-wide">
                       <div className="flex items-center gap-2">
                          <span>{formatDate(match.date)}</span>
                          {hasStream && <Video size={12} className="text-slovak-red animate-pulse" fill="currentColor" />}
                       </div>
                       <span className="bg-gray-50 px-2 py-0.5 rounded text-gray-500">{match.competition}</span>
                    </div>
                    
                    {/* Row 2: Teams and Score */}
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-2 flex-1">
                          <div className="w-8 h-8 flex items-center justify-center">
                             <img src={match.homeTeam.logo} className="w-full h-full object-contain" />
                          </div>
                          <span className="text-xs font-bold text-gray-900 leading-tight">{match.homeTeam.shortName}</span>
                       </div>
                       
                       <div className="px-3 text-center">
                          {isFinal || isLive ? (
                             <span className="text-lg font-black text-slovak-blue">{match.scoreHome}:{match.scoreAway}</span>
                          ) : (
                             <span className="text-lg font-black text-slovak-blue">{match.time}</span>
                          )}
                       </div>

                       <div className="flex items-center gap-2 flex-1 justify-end text-right">
                          <span className="text-xs font-bold text-gray-900 leading-tight">{match.awayTeam.shortName}</span>
                          <div className="w-8 h-8 flex items-center justify-center">
                             <img src={match.awayTeam.logo} className="w-full h-full object-contain" />
                          </div>
                       </div>
                    </div>
                    
                    {/* Row 3: Venue */}
                    <div className="flex justify-center">
                       <span className="text-[9px] text-gray-400 flex items-center gap-1">
                          <MapPin size={9} /> {match.venue.split(',')[0]}
                       </span>
                    </div>
                 </div>
               )
            })
         ) : (
            <div className="p-8 text-center text-gray-400 text-sm font-medium">
               Žiadne zápasy
            </div>
         )}
      </div>
      
      {/* Pagination Footer - Compact */}
      {totalPages > 1 && (
        <div className="border-t border-gray-100 p-4 bg-gray-50/50 flex justify-center items-center gap-3">
            <button 
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                page === 1 
                  ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                  : 'bg-white border-gray-200 text-slovak-blue hover:bg-slovak-blue hover:text-white hover:border-slovak-blue shadow-sm'
              }`}
            >
               <ChevronLeft size={16} />
            </button>
            
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest bg-white px-3 py-1.5 rounded-full border border-gray-100">
               {page}/{totalPages}
            </span>
            
            <button 
               onClick={() => setPage(Math.min(totalPages, page + 1))}
               disabled={page === totalPages}
               className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                page === totalPages
                  ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                  : 'bg-white border-gray-200 text-slovak-blue hover:bg-slovak-blue hover:text-white hover:border-slovak-blue shadow-sm'
               }`}
            >
               <ChevronRight size={16} />
            </button>
        </div>
      )}
    </div>
  );
};