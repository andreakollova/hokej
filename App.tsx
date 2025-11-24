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

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('home');

  // Logic to find Last Result and Next Match for the Widget
  const lastResult = MATCHES.find(m => m.id === 'm_last_res') || MATCHES[2]; // Fallback
  const upcomingMatches = MATCHES.filter(m => m.status === 'UPCOMING').slice(0, 10);

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
        
        {/* Overlapping Section: Last Result & Next Match Widget */}
        <div className="container mx-auto px-4 md:px-8 relative z-20 -mt-20 mb-8">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Last Result Card */}
              <div className="bg-white rounded-3xl p-6 shadow-xl border-t-4 border-slovak-blue">
                 <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Posledný Výsledok</span>
                    <span className="text-xs font-bold bg-gray-100 px-2 py-1 rounded text-gray-600">{lastResult.category}</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <div className="text-center">
                       <img src={lastResult.homeTeam.logo} className="w-16 h-16 object-contain mx-auto mb-2" />
                       <span className="font-bold block text-sm">{lastResult.homeTeam.shortName}</span>
                    </div>
                    <div className="text-center px-4">
                       <div className="text-3xl font-black text-slovak-blue bg-blue-50 px-4 py-2 rounded-xl mb-1">
                          {lastResult.scoreHome} : {lastResult.scoreAway}
                       </div>
                       <span className="text-xs text-gray-400 font-medium">Koniec</span>
                    </div>
                    <div className="text-center">
                       <img src={lastResult.awayTeam.logo} className="w-16 h-16 object-contain mx-auto mb-2" />
                       <span className="font-bold block text-sm">{lastResult.awayTeam.shortName}</span>
                    </div>
                 </div>
              </div>

              {/* Next Match Teaser */}
              <div className="bg-slovak-red rounded-3xl p-6 shadow-xl text-white relative overflow-hidden flex flex-col justify-center">
                 <div className="absolute right-0 top-0 w-32 h-32 bg-white opacity-10 rounded-full translate-x-1/3 -translate-y-1/3"></div>
                 <span className="text-xs font-bold text-red-100 uppercase tracking-widest mb-4 block relative z-10">Najbližší Zápas</span>
                 
                 {upcomingMatches.length > 0 ? (
                   <div className="flex items-center gap-4 relative z-10">
                      <div className="flex -space-x-4">
                         <div className="w-14 h-14 bg-white rounded-full p-2 flex items-center justify-center shadow-md z-10">
                            <img src={upcomingMatches[0].homeTeam.logo} className="w-full h-full object-contain" />
                         </div>
                         <div className="w-14 h-14 bg-white rounded-full p-2 flex items-center justify-center shadow-md">
                            <img src={upcomingMatches[0].awayTeam.logo} className="w-full h-full object-contain" />
                         </div>
                      </div>
                      <div>
                         <div className="font-bold text-lg leading-tight">
                            {upcomingMatches[0].homeTeam.shortName} vs {upcomingMatches[0].awayTeam.shortName}
                         </div>
                         <div className="text-red-100 text-sm mt-1">
                            {upcomingMatches[0].date} o {upcomingMatches[0].time} • {upcomingMatches[0].venue.split(',')[0]}
                         </div>
                      </div>
                   </div>
                 ) : (
                   <p>Žiadne naplánované zápasy.</p>
                 )}
              </div>

           </div>
        </div>

        {/* 1. Get Involved Section */}
        <div className="bg-gray-50 border-b border-gray-200">
           <GetInvolved />
        </div>

        {/* 2. News */}
        <div className="py-8">
           <NewsSection />
        </div>

        {/* 3. 10 Match List Table */}
        <div className="container mx-auto px-4 md:px-8 mb-20">
           <MatchListTable matches={upcomingMatches} />
        </div>
        
        {/* 4. Social Media (Instagram/Video) */}
        <SocialMedia />

        {/* 5. Partners */}
        <Partners />
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