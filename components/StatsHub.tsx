import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { PLAYERS } from '../constants';

const data = PLAYERS.map(p => ({
  name: p.name.split(' ').pop(), // Last name only for chart
  goals: p.goals,
  caps: p.caps
})).sort((a, b) => b.goals - a.goals);

export const StatsHub: React.FC = () => {
  return (
    <div className="bg-gray-50 py-12">
       <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-end justify-between mb-8">
             <div>
               <h2 className="text-3xl font-black uppercase text-slovak-blue">Štatistiky Sezóny</h2>
               <p className="text-gray-500 mt-2">Lídri tímu a metriky výkonnosti pre aktuálnu sezónu.</p>
             </div>
             <button className="text-slovak-red font-bold uppercase text-sm border-b-2 border-slovak-red hover:text-red-800 transition-colors mt-4 md:mt-0">
               Zobraziť Celý Report
             </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {/* Chart */}
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-96">
                <h3 className="text-sm font-bold uppercase text-gray-400 mb-6">Najlepší Strelci</h3>
                <ResponsiveContainer width="100%" height="85%">
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}
                      cursor={{fill: '#f3f4f6'}}
                    />
                    <Bar dataKey="goals" fill="#0B2144" radius={[4, 4, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
             </div>

             {/* League Table / Standings Snippet */}
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-sm font-bold uppercase text-gray-400 mb-4">Tabuľka Skupiny B</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead>
                      <tr className="text-gray-400 border-b border-gray-100">
                        <th className="font-semibold py-3 pl-2">Poz</th>
                        <th className="font-semibold py-3">Tím</th>
                        <th className="font-semibold py-3 text-center">Z</th>
                        <th className="font-semibold py-3 text-center">V</th>
                        <th className="font-semibold py-3 text-center">P</th>
                        <th className="font-semibold py-3 text-center">Body</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                       <tr className="bg-blue-50/50">
                         <td className="py-3 pl-2 font-bold text-slovak-blue">1</td>
                         <td className="py-3 font-bold flex items-center gap-2">
                           <img src="https://flagcdn.com/w20/at.png" className="w-5" /> Rakúsko
                         </td>
                         <td className="py-3 text-center">5</td>
                         <td className="py-3 text-center">5</td>
                         <td className="py-3 text-center">0</td>
                         <td className="py-3 text-center font-bold">15</td>
                       </tr>
                       <tr>
                         <td className="py-3 pl-2 text-gray-500">2</td>
                         <td className="py-3 font-medium flex items-center gap-2">
                           <img src="https://flagcdn.com/w20/pl.png" className="w-5" /> Poľsko
                         </td>
                         <td className="py-3 text-center">5</td>
                         <td className="py-3 text-center">3</td>
                         <td className="py-3 text-center">2</td>
                         <td className="py-3 text-center font-bold">10</td>
                       </tr>
                       <tr className="bg-white border-l-4 border-slovak-red">
                         <td className="py-3 pl-2 text-gray-500">3</td>
                         <td className="py-3 font-bold flex items-center gap-2 text-slovak-blue">
                            <img src="https://flagcdn.com/w20/sk.png" className="w-5" /> Slovensko
                         </td>
                         <td className="py-3 text-center">5</td>
                         <td className="py-3 text-center">3</td>
                         <td className="py-3 text-center">2</td>
                         <td className="py-3 text-center font-bold">9</td>
                       </tr>
                       <tr>
                         <td className="py-3 pl-2 text-gray-500">4</td>
                         <td className="py-3 font-medium flex items-center gap-2">
                           <img src="https://flagcdn.com/w20/cz.png" className="w-5" /> Česko
                         </td>
                         <td className="py-3 text-center">5</td>
                         <td className="py-3 text-center">2</td>
                         <td className="py-3 text-center">3</td>
                         <td className="py-3 text-center font-bold">6</td>
                       </tr>
                    </tbody>
                  </table>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};