import React from 'react';
import { PLAYERS } from '../constants';
import { User, Shield } from 'lucide-react';

export const Roster: React.FC = () => {
  return (
    <div className="container mx-auto px-4 md:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-black uppercase text-slovak-blue mb-2">Seniorský Reprezentačný Tím</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Spoznajte atlétov reprezentujúcich Slovensko na medzinárodnej scéne.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {PLAYERS.map((player) => (
          <div key={player.id} className="bg-white rounded-lg shadow-sm hover:shadow-xl transition-shadow border border-gray-100 group cursor-pointer overflow-hidden">
             {/* Image container */}
             <div className="h-64 bg-gray-200 relative overflow-hidden">
                <img 
                  src={player.photo} 
                  alt={player.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-0 right-0 p-3">
                  <span className="bg-white/90 backdrop-blur text-slovak-blue font-black text-xl px-3 py-1 rounded shadow">
                    #{player.number}
                  </span>
                </div>
                {player.isCaptain && (
                  <div className="absolute top-0 left-0 p-3">
                     <span className="bg-yellow-400 text-slovak-blue font-bold text-xs px-2 py-1 rounded uppercase tracking-wider flex items-center gap-1">
                       <Shield size={10} fill="currentColor" /> Kapitán
                     </span>
                  </div>
                )}
             </div>

             {/* Content */}
             <div className="p-5">
               <div className="text-xs text-slovak-red font-bold uppercase tracking-widest mb-1">{player.position}</div>
               <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2">{player.name}</h3>
               <p className="text-sm text-gray-500 mb-4">{player.club}</p>
               
               <div className="grid grid-cols-2 gap-2 border-t border-gray-100 pt-3">
                  <div className="text-center">
                     <span className="block text-xl font-bold text-slovak-blue">{player.caps}</span>
                     <span className="text-[10px] uppercase text-gray-400">Štartov</span>
                  </div>
                   <div className="text-center border-l border-gray-100">
                     <span className="block text-xl font-bold text-slovak-blue">{player.goals}</span>
                     <span className="text-[10px] uppercase text-gray-400">Gólov</span>
                  </div>
               </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};