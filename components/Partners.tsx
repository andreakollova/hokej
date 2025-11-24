import React from 'react';
import { PARTNERS } from '../constants';

export const Partners: React.FC = () => {
  return (
    <div className="bg-white py-12 border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-8 text-center">
        <h3 className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-8">Partneri</h3>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
          {PARTNERS.map(partner => (
            <img 
              key={partner.id} 
              src={partner.logo} 
              alt={partner.name} 
              className="h-12 md:h-16 object-contain hover:scale-110 transition-transform cursor-pointer" 
            />
          ))}
        </div>
      </div>
    </div>
  );
};