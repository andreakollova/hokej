import React from 'react';
import { Match, MatchStatus } from '../types';
import { ArrowRight, MapPin } from 'lucide-react';

interface MatchListTableProps {
  matches: Match[];
}

export const MatchListTable: React.FC<MatchListTableProps> = ({ matches }) => {
  return (
    <div className="bg-white rounded-[30px] shadow-lg border border-gray-100 overflow-hidden font-sans">
      {/* Header Section */}
      <div className="p-8 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center bg-white">
        <h3 className="font-black text-2xl md:text-3xl text-gray-900 uppercase tracking-tight">Najbližšie Zápasy</h3>
         <button className="hidden md:flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-slovak-red transition-colors bg-gray-50 px-5 py-2 rounded-full hover:bg-gray-100">
            Celý Kalendár <ArrowRight size={16} />
         </button>
      </div>
      
      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] text-sm text-gray-900">
          <thead>
            <tr className="border-b border-gray-100 bg-white text-gray-400 text-xs font-bold tracking-wider uppercase">
              <th className="py-6 pl-8 text-left w-[120px]">Dátum</th>
              <th className="py-6 px-4 text-right w-[25%]">Domáci</th>
              <th className="py-6 px-4 text-center w-[100px]">Výsledky</th>
              <th className="py-6 px-4 text-left w-[25%]">Hostia</th>
              <th className="py-6 px-4 text-center">Čas</th>
              <th className="py-6 px-4 text-left">Liga</th>
              <th className="py-6 pr-8 text-right">Miesto Zápasu</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 bg-white">
            {matches.map((match) => {
              const isFinal = match.status === MatchStatus.FINAL;
              const isLive = match.status === MatchStatus.LIVE;
              
              return (
                <tr key={match.id} className="group hover:bg-gray-50 transition-colors h-20">
                  {/* DÁTUM */}
                  <td className="py-4 pl-8 whitespace-nowrap font-medium text-gray-900">
                    {match.date}
                  </td>
                  
                  {/* DOMÁCI (Right align text, Logo next to separator) */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="flex items-center justify-end gap-3">
                      <span className="font-bold text-gray-900 text-base">{match.homeTeam.name}</span>
                      <img src={match.homeTeam.logo} alt={match.homeTeam.shortName} className="w-10 h-10 object-contain drop-shadow-sm" />
                    </div>
                  </td>
                  
                  {/* VÝSLEDKY / SEPARATOR */}
                  <td className="py-4 px-4 text-center whitespace-nowrap">
                      {isFinal || isLive ? (
                        <span className="font-black text-xl text-slovak-blue tracking-tighter">
                          {match.scoreHome}:{match.scoreAway}
                        </span>
                      ) : (
                        <span className="font-medium text-gray-300 text-xl">-</span>
                      )}
                  </td>
                  
                  {/* HOSTIA (Logo next to separator, Left align text) */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="flex items-center justify-start gap-3">
                      <img src={match.awayTeam.logo} alt={match.awayTeam.shortName} className="w-10 h-10 object-contain drop-shadow-sm" />
                      <span className="font-bold text-gray-900 text-base">{match.awayTeam.name}</span>
                    </div>
                  </td>
                  
                  {/* ČAS */}
                  <td className="py-4 px-4 text-center whitespace-nowrap font-bold text-gray-900">
                    {match.time}
                  </td>
                  
                  {/* LIGA */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wide bg-gray-100 px-2 py-1 rounded">
                      {match.competition}
                    </span>
                  </td>
                  
                  {/* MIESTO ZÁPASU */}
                  <td className="py-4 pr-8 text-right whitespace-nowrap font-medium text-gray-500">
                    {match.venue.split(',')[0]}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {/* Mobile Hint */}
      <div className="p-4 md:hidden text-center border-t border-gray-100 bg-gray-50">
         <div className="flex items-center justify-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
            <ArrowRight size={14} /> Posuňte pre zobrazenie
         </div>
      </div>
    </div>
  );
};