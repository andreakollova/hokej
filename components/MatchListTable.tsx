
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

  // Helper to group matches by date
  const groupedMatches = paginatedMatches.reduce((acc, match) => {
    const fullDate = formatDate(match.date);
    if (!acc[fullDate]) acc[fullDate] = [];
    acc[fullDate].push(match);
    return acc;
  }, {} as Record<string, Match[]>);

  // Reset page when tab changes
  const handleTabChange = (tab: 'VŠETKY' | 'REPREZENTÁCIA' | 'LIGA') => {
    setActiveTab(tab);
    setPage(1);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden font-sans flex flex-col">
      {/* Header Section */}
      <div className="px-8 py-10 md:px-12 md:py-12 border-b border-gray-100 flex flex-col xl:flex-row justify-between items-start xl:items-end bg-white gap-6">
        <div>
           <span className="text-slovak-red font-bold text-xs uppercase tracking-widest mb-2 block">SLOVENSKÁ LIGA A REPREZENTÁCIA</span>
           <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-slovak-blue mb-6 uppercase">NAJBLIŽŠIE ZÁPASY</h3>
           
           {/* Tabs */}
           <div className="flex flex-wrap gap-2">
             {(['VŠETKY', 'REPREZENTÁCIA', 'LIGA'] as const).map((tab) => (
               <button
                 key={tab}
                 onClick={() => handleTabChange(tab)}
                 className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border uppercase tracking-wide flex items-center gap-2 ${
                   activeTab === tab 
                     ? 'bg-slovak-blue text-white border-slovak-blue shadow-lg shadow-blue-900/20' 
                     : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                 }`}
               >
                 {tab === 'REPREZENTÁCIA' && <img src="https://flagcdn.com/w20/sk.png" alt="SK" className="w-5 h-auto" />}
                 {tab === 'LIGA' && <Trophy size={14} />}
                 {tab === 'VŠETKY' ? 'VŠETKY' : tab === 'LIGA' ? 'LIGA' : 'REPREZENTÁCIA'}
               </button>
             ))}
           </div>
        </div>
         <button className="hidden md:flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-slovak-red transition-colors bg-gray-50 px-5 py-3 rounded-full hover:bg-gray-100 border border-gray-100 shrink-0">
            <CalendarDays size={18} /> Celý Kalendár <ArrowRight size={16} />
         </button>
      </div>
      
      {/* Table Section */}
      <div className="overflow-x-auto flex-1 min-h-[400px]">
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
                const hasStream = match.id === 'm_next_6'; // Specifically for the England match per request
                
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
      
      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="border-t border-gray-100 p-6 bg-gray-50/50 flex justify-end items-center gap-4">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mr-2">Strana {page} z {totalPages}</span>
            
            <button 
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all ${
                page === 1 
                  ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                  : 'bg-white border-gray-200 text-slovak-blue hover:bg-slovak-blue hover:text-white hover:border-slovak-blue shadow-sm'
              }`}
            >
               <ChevronLeft size={20} />
            </button>
            
            <button 
               onClick={() => setPage(Math.min(totalPages, page + 1))}
               disabled={page === totalPages}
               className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all ${
                page === totalPages
                  ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                  : 'bg-white border-gray-200 text-slovak-blue hover:bg-slovak-blue hover:text-white hover:border-slovak-blue shadow-sm'
               }`}
            >
               <ChevronRight size={20} />
            </button>
        </div>
      )}

      {/* Mobile Hint */}
      <div className="p-4 md:hidden text-center border-t border-gray-100 bg-gray-50">
         <div className="flex items-center justify-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
            <ArrowRight size={14} /> Posuňte pre zobrazenie
         </div>
      </div>
    </div>
  );
};
