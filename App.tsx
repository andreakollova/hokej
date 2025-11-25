
import React, { useState } from 'react';
import Layout from './components/Layout';
import { Hero } from './components/Hero';
import { MatchCenter } from './components/MatchCenter';
import { MatchListTable } from './components/MatchListTable';
import { Roster } from './components/Roster';
import { StatsHub } from './components/StatsHub';
import { NewsSection } from './components/NewsSection';
import { GetInvolved } from './components/GetInvolved';
import { SocialMedia } from './components/SocialMedia';
import { Partners } from './components/Partners';
import { MATCHES, TEAM_SVK } from './constants';
import { MatchCard } from './components/MatchCard';
import { MapPin, Calendar, Trophy, ChevronRight, PlayCircle } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('home');

  // 1. Filter ONLY National Team Matches
  // Strictly filter for matches involving 'svk' team ID, to avoid showing Club matches that might have category='ŽENY'
  const nationalMatches = MATCHES.filter(m => 
    m.homeTeam.id === 'svk' || m.awayTeam.id === 'svk'
  );

  // 2. Find Last Result (Status FINAL)
  // We look for one specifically marked as final, or default to the first found for safety
  const lastNationalResult = nationalMatches.find(m => m.status === 'FINAL') || nationalMatches[0];

  // 3. Find Next Upcoming National Match
  const nextNationalMatch = nationalMatches.find(m => m.status === 'UPCOMING');

  // General upcoming matches for the table list (can remain mixed or be national only based on preference, keeping mixed for the table)
  const upcomingMatchesTable = MATCHES.filter(m => m.status === 'UPCOMING').slice(0, 10);

  const renderContent = () => {
    // Simple routing for now - mostly handles the main sections
    if (currentView === 'matches' || currentView === 'matches-field' || currentView === 'matches-indoor') {
      return <MatchCenter />;
    }
    if (currentView === 'team' || currentView === 'reprezentacia' || currentView.startsWith('repre-')) {
      return <Roster />;
    }
    if (currentView === 'stats') {
      return <StatsHub />;
    }
    if (currentView === 'news') {
      return <NewsSection />;
    }
    
    // Default Home View
    return (
      <div className="pb-0">
        <Hero />
        
        {/* Overlapping Section: Last Result & Next Match Widget (NATIONAL TEAM ONLY) */}
        <div className="container mx-auto px-4 md:px-8 relative z-20 -mt-7 mb-8">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Last National Result Card */}
              {lastNationalResult && (
                <div 
                  onClick={() => setCurrentView('matches')}
                  className="bg-white rounded-3xl p-6 shadow-xl border-t-4 border-slovak-blue flex flex-col justify-between h-full group cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                >
                   {/* Header */}
                   <div className="flex justify-between items-start mb-1 border-b border-gray-100 pb-2">
                      <div>
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Posledný Výsledok</span>
                        <div className="flex items-center gap-2">
                           {/* Category Badges */}
                           <span className="text-[10px] font-black bg-slovak-blue text-white px-2 py-0.5 rounded uppercase tracking-wide">
                             Reprezentácia
                           </span>
                           <span className="text-[10px] font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded uppercase">
                             {lastNationalResult.category}
                           </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-gray-400 block">{lastNationalResult.date}</span>
                        {/* Live Replay/Broadcast Indicator */}
                        <div className="flex items-center justify-end gap-1 mt-1">
                             <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                             <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wide">Vysielané naživo</span>
                        </div>
                      </div>
                   </div>
                   
                   {/* Competition Name (Small below header) */}
                   <div className="text-[10px] font-bold text-gray-400 flex items-center gap-1 mb-2">
                      <Trophy size={10} /> {lastNationalResult.competition}
                   </div>

                   {/* Content */}
                   <div className="flex justify-between items-center px-2 py-2">
                      <div className="text-center w-1/3">
                         <img src={lastNationalResult.homeTeam.logo} className="w-16 h-16 object-contain mx-auto mb-2" />
                         <span className="font-bold block text-sm leading-tight">{lastNationalResult.homeTeam.name}</span>
                      </div>
                      <div className="text-center w-1/3">
                         <div className="text-4xl font-black text-slovak-blue bg-blue-50 px-4 py-2 rounded-xl mb-1 shadow-sm border border-blue-100">
                            {lastNationalResult.scoreHome} : {lastNationalResult.scoreAway}
                         </div>
                         <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Koniec</span>
                      </div>
                      <div className="text-center w-1/3">
                         <img src={lastNationalResult.awayTeam.logo} className="w-16 h-16 object-contain mx-auto mb-2" />
                         <span className="font-bold block text-sm leading-tight">{lastNationalResult.awayTeam.name}</span>
                      </div>
                   </div>

                   {/* Action Footer */}
                   <div className="mt-4 flex justify-end">
                      <button className="text-[9px] font-bold uppercase text-slovak-blue tracking-widest flex items-center gap-1 bg-blue-50 hover:bg-slovak-blue hover:text-white px-2.5 py-1 rounded-full transition-colors group-hover:bg-slovak-blue group-hover:text-white">
                        Zobraziť detaily <ChevronRight size={10} />
                      </button>
                   </div>
                </div>
              )}

              {/* Next National Match Teaser */}
              <div 
                onClick={() => setCurrentView('matches')}
                className="bg-slovak-red rounded-3xl p-6 shadow-xl text-white relative overflow-hidden flex flex-col justify-center min-h-[220px] group cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                 <div className="absolute right-0 top-0 w-48 h-48 bg-white opacity-5 rounded-full translate-x-1/4 -translate-y-1/4 blur-3xl"></div>
                 <div className="absolute left-0 bottom-0 w-32 h-32 bg-black opacity-10 rounded-full -translate-x-1/4 translate-y-1/4 blur-2xl"></div>
                 
                 {nextNationalMatch ? (
                   <div className="relative z-10 h-full flex flex-col justify-between">
                      <div className="flex justify-between items-start border-b border-white/20 pb-2 mb-1">
                         <div>
                            <span className="text-[10px] font-bold text-red-100 uppercase tracking-widest block mb-1">Najbližší Zápas</span>
                            <div className="flex items-center gap-2">
                               {/* Category Badges */}
                               <span className="bg-white text-slovak-red text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wide">
                                  Reprezentácia
                               </span>
                               <span className="bg-black/20 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                                  {nextNationalMatch.category}
                               </span>
                            </div>
                         </div>
                         <div className="text-right">
                             {/* LIVE Indicator for Upcoming Match */}
                            <div className="flex items-center justify-end gap-1.5 mb-1 bg-black/20 px-2 py-0.5 rounded-full w-fit ml-auto">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="text-[9px] font-bold text-white uppercase tracking-wide">Plánované vysielanie naživo</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs font-bold text-white mb-0 justify-end">
                               <Calendar size={12} /> {nextNationalMatch.date}
                            </div>
                         </div>
                      </div>

                      {/* Competition Name (Small below header) */}
                      <div className="text-[10px] font-medium text-red-100 flex items-center gap-1 mb-2">
                         <Trophy size={10} /> {nextNationalMatch.competition}
                      </div>
                      
                      <div className="flex items-center gap-4 py-2">
                         <div className="flex -space-x-4 shrink-0">
                            <div className="w-16 h-16 bg-white rounded-full p-2 flex items-center justify-center shadow-lg border-2 border-red-500 z-10">
                               <img src={nextNationalMatch.homeTeam.logo} className="w-full h-full object-contain" />
                            </div>
                            <div className="w-16 h-16 bg-white rounded-full p-2 flex items-center justify-center shadow-lg border-2 border-red-500">
                               <img src={nextNationalMatch.awayTeam.logo} className="w-full h-full object-contain" />
                            </div>
                         </div>
                         <div className="flex flex-col">
                            {/* Removed 'Zápas' label as requested, just showing matchup */}
                            <div className="font-black text-xl leading-tight text-white mb-1">
                               {nextNationalMatch.homeTeam.shortName} vs. {nextNationalMatch.awayTeam.shortName}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-red-100 font-medium bg-black/20 px-2 py-1 rounded w-fit">
                               <MapPin size={12} /> {nextNationalMatch.venue.split(',')[0]}
                            </div>
                         </div>
                         <div className="ml-auto text-xl font-black">
                            {nextNationalMatch.time}
                         </div>
                      </div>

                      {/* Action Footer */}
                      <div className="mt-2 flex justify-end">
                          <span className="text-[9px] font-bold uppercase text-white tracking-widest flex items-center gap-1 bg-black/20 px-2.5 py-1 rounded-full backdrop-blur-sm group-hover:bg-white group-hover:text-slovak-red transition-colors">
                           Zobraziť detaily <ChevronRight size={10} />
                         </span>
                      </div>
                   </div>
                 ) : (
                   <div className="flex flex-col items-center justify-center text-center h-full">
                      <p className="font-bold text-lg mb-2">Žiadne naplánované zápasy</p>
                      <p className="text-red-100 text-sm">Momentálne nie sú potvrdené žiadne reprezentačné stretnutia.</p>
                   </div>
                 )}
              </div>

           </div>
        </div>

        {/* 1. Get Involved Section */}
        <div className="bg-gray-50 border-b border-gray-200">
           <GetInvolved />
        </div>

        {/* 2. News */}
        <div className="py-4">
           <NewsSection />
        </div>

        {/* 3. 10 Match List Table */}
        <div className="container mx-auto px-4 md:px-8 mb-20 -mt-2">
           <MatchListTable matches={upcomingMatchesTable} />
        </div>
        
        {/* 4. Partners (Moved UP) */}
        <Partners />

        {/* 5. Social Media (Moved DOWN - Includes Instagram) */}
        <SocialMedia />

      </div>
    );
  };

  return (
    <Layout currentView={currentView} onChangeView={setCurrentView}>
      {renderContent()}
    </Layout>
  );
};

export default App;
