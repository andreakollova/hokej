import React from 'react';
import { Match } from '../types';
import { MatchCard } from './MatchCard';
import { ArrowRight } from 'lucide-react';

interface MatchListTableProps {
  matches: Match[];
}

export const MatchListTable: React.FC<MatchListTableProps> = ({ matches }) => {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-[32px] shadow-2xl shadow-blue-900/5 border border-white/50 overflow-hidden">
      <div className="p-8 md:p-10 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-end bg-gradient-to-r from-gray-50/50 to-white gap-4">
        <div>
          <h3 className="font-black text-3xl text-slovak-blue uppercase tracking-tight">Najbližšie Zápasy</h3>
          <p className="text-gray-400 font-medium mt-2">Program nasledujúcich dní a kôl.</p>
        </div>
        <button className="group bg-white border border-gray-200 text-xs font-bold text-gray-600 hover:text-slovak-red hover:border-red-100 px-6 py-3 rounded-full uppercase flex items-center gap-2 transition-all shadow-sm hover:shadow-md">
          Celý Kalendár
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
      
      <div className="p-4 md:p-6 space-y-3">
        {matches.map((match) => (
          <MatchCard key={match.id} match={match} variant="widget" />
        ))}
      </div>
      
      <div className="bg-gray-50/50 p-6 text-center border-t border-gray-100">
         <button className="text-sm font-black text-gray-400 hover:text-slovak-blue transition-colors uppercase tracking-widest hover:scale-105 transform duration-200">
            Načítať ďalšie zápasy
         </button>
      </div>
    </div>
  );
};