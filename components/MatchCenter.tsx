import React, { useState } from 'react';
import { MATCHES } from '../constants';
import { MatchCard } from './MatchCard';
import { Match, MatchStatus, MatchCategory } from '../types';
import { Filter, RotateCcw, Sparkles } from 'lucide-react';
import { generateMatchRecap } from '../services/geminiService';

export const MatchCenter: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<'VŠETKY' | 'NADCHÁDZAJÚCE' | 'VÝSLEDKY'>('VŠETKY');
  const [filterCategory, setFilterCategory] = useState<MatchCategory | 'VŠETKY'>('VŠETKY');
  
  const [selectedMatchForRecap, setSelectedMatchForRecap] = useState<Match | null>(null);
  const [recapText, setRecapText] = useState<string>('');
  const [isLoadingRecap, setIsLoadingRecap] = useState(false);

  const categories: (MatchCategory | 'VŠETKY')[] = ['VŠETKY', 'MUŽI', 'ŽENY', 'U18', 'U14', 'U12', 'U10'];

  const filteredMatches = MATCHES.filter(m => {
    // 1. Status Filter
    let statusMatch = true;
    if (filterStatus === 'NADCHÁDZAJÚCE') statusMatch = m.status === MatchStatus.UPCOMING;
    if (filterStatus === 'VÝSLEDKY') statusMatch = m.status === MatchStatus.FINAL || m.status === MatchStatus.LIVE;
    
    // 2. Category Filter
    let categoryMatch = true;
    if (filterCategory !== 'VŠETKY') categoryMatch = m.category === filterCategory;

    return statusMatch && categoryMatch;
  });

  const handleGenerateRecap = async (match: Match) => {
    if (match.status === MatchStatus.UPCOMING) return;
    
    setSelectedMatchForRecap(match);
    setIsLoadingRecap(true);
    setRecapText('');

    try {
      const text = await generateMatchRecap(match);
      setRecapText(text);
    } catch (e) {
      setRecapText("Chyba pri načítaní súhrnu.");
    } finally {
      setIsLoadingRecap(false);
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black uppercase text-slovak-blue mb-2">Zápasové Centrum</h2>
          <p className="text-gray-500">Ligové súťaže, mládež a reprezentácia.</p>
        </div>

        <div className="flex flex-col gap-3">
            {/* Status Toggles */}
            <div className="flex space-x-1 bg-white p-1 rounded-lg border border-gray-200 shadow-sm self-start md:self-end">
              {(['VŠETKY', 'VÝSLEDKY', 'NADCHÁDZAJÚCE'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilterStatus(f)}
                  className={`px-4 py-2 rounded font-bold text-xs md:text-sm transition-colors ${
                    filterStatus === f ? 'bg-slovak-blue text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-8 pb-4 border-b border-gray-100">
        {categories.map((cat) => (
           <button
             key={cat}
             onClick={() => setFilterCategory(cat)}
             className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                filterCategory === cat 
                 ? 'bg-slovak-red text-white border-slovak-red shadow-md shadow-red-200' 
                 : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
             }`}
           >
             {cat}
           </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Match List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredMatches.length > 0 ? (
            filteredMatches.map(match => (
              <div key={match.id} className="relative group">
                <MatchCard match={match} />
                {(match.status === MatchStatus.FINAL || match.status === MatchStatus.LIVE) && (
                   <button 
                    onClick={() => handleGenerateRecap(match)}
                    className="absolute top-2 right-2 bg-white/90 backdrop-blur text-xs font-bold text-slovak-blue px-2 py-1 rounded shadow border border-blue-100 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 hover:bg-blue-50"
                   >
                     <Sparkles size={12} className="text-slovak-red" /> AI Súhrn
                   </button>
                )}
              </div>
            ))
          ) : (
            <div className="p-12 text-center bg-white rounded-3xl border border-gray-200 text-gray-500">
              <p className="font-medium">Pre zvolený filter sa nenašli žiadne zápasy.</p>
              <button 
                onClick={() => {setFilterStatus('VŠETKY'); setFilterCategory('VŠETKY');}}
                className="mt-4 text-slovak-red font-bold text-sm hover:underline"
              >
                Resetovať filtre
              </button>
            </div>
          )}
        </div>

        {/* Sidebar / Detail View for AI Recap */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200 sticky top-24">
            <h3 className="font-bold text-xl mb-4 flex items-center gap-2 text-slovak-blue">
               <Sparkles size={20} className="text-slovak-red" />
               AI Analýza Zápasu
            </h3>
            
            {!selectedMatchForRecap ? (
              <div className="text-center py-10 text-gray-400 text-sm">
                <p>Vyberte odohraný alebo živý zápas a kliknite na "AI Súhrn" pre vygenerovanie detailného reportu.</p>
              </div>
            ) : (
              <div className="animate-in fade-in duration-500">
                <div className="flex items-center justify-between mb-4 border-b pb-4">
                   <div className="font-bold text-sm">
                     {selectedMatchForRecap.homeTeam.shortName} vs {selectedMatchForRecap.awayTeam.shortName}
                   </div>
                   <div className="text-xs bg-gray-100 px-2 py-1 rounded">
                     {selectedMatchForRecap.category}
                   </div>
                </div>
                
                {isLoadingRecap ? (
                   <div className="space-y-3">
                     <div className="h-4 bg-gray-100 rounded animate-pulse w-3/4"></div>
                     <div className="h-4 bg-gray-100 rounded animate-pulse"></div>
                     <div className="h-4 bg-gray-100 rounded animate-pulse w-5/6"></div>
                   </div>
                ) : (
                  <div className="prose prose-sm prose-blue text-gray-600 leading-relaxed">
                    <p>{recapText}</p>
                  </div>
                )}
              </div>
            )}
            
            <div className="mt-6 pt-6 border-t border-gray-100">
               <div className="p-4 bg-blue-50 rounded-2xl text-center">
                  <span className="text-xs font-bold text-slovak-blue uppercase tracking-wide">Aktuálna Tabuľka {selectedMatchForRecap?.category || 'Súťaže'}</span>
                  <p className="text-gray-500 text-xs mt-1">Tabuľky sa aktualizujú po schválení zápisu.</p>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};