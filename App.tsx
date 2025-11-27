
import React, { useState } from 'react';
import Layout from './components/Layout';
import { Hero } from './components/Hero';
import { MatchCenter } from './components/MatchCenter';
import { MatchListTable } from './components/MatchListTable';
import { Roster } from './components/Roster';
import { StatsHub } from './components/StatsHub';
import { NewsSection } from './components/NewsSection';
import { NewsDetail } from './components/NewsDetail';
import { GetInvolved } from './components/GetInvolved';
import { SocialMedia } from './components/SocialMedia';
import { Partners } from './components/Partners';
import { ProjectsCarousel } from './components/ProjectsCarousel';
import { MATCHES, NEWS } from './constants';
import { MatchCard } from './components/MatchCard';
import { MapPin, Calendar, Trophy, ChevronRight, PlayCircle, Star, Clock } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  // Handler to open article details
  const handleArticleClick = (id: string) => {
    setSelectedArticleId(id);
    setCurrentView('news-detail');
    window.scrollTo(0, 0);
  };

  // 1. Filter ONLY National Team Matches
  const nationalMatches = MATCHES.filter(m => 
    m.homeTeam.id === 'svk' || m.awayTeam.id === 'svk'
  );

  // 2. Find Last Result (Status FINAL)
  const lastNationalResult = nationalMatches.find(m => m.status === 'FINAL') || nationalMatches[0];

  // 3. Find Next Upcoming National Match
  const nextNationalMatch = nationalMatches.find(m => m.status === 'UPCOMING');

  // General upcoming matches for the table list
  const upcomingMatchesTable = MATCHES.filter(m => m.status === 'UPCOMING').slice(0, 10);

  const renderContent = () => {
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
      return <NewsSection onArticleClick={handleArticleClick} />;
    }
    if (currentView === 'news-detail' && selectedArticleId) {
      const article = NEWS.find(n => n.id === selectedArticleId);
      if (article) {
        return <NewsDetail article={article} onBack={() => setCurrentView('home')} />;
      }
    }
    
    // Default Home View
    return (
      <div className="pb-0">
        <Hero onArticleClick={handleArticleClick} />
        
        {/* Widgets Section - Moved down (mt-8) to sit below hero */}
        <div className="container mx-auto px-4 md:px-8 relative z-20 mt-8 mb-12">
           <div className="grid grid-cols-1 lg:grid-cols-[2fr_2fr_1.2fr] gap-6">
              
              {/* 1. Last National Result Card */}
              {lastNationalResult && (
                <div 
                  onClick={() => setCurrentView('matches')}
                  className="bg-white rounded-3xl p-6 border border-gray-100 shadow-none hover:shadow-md border-t-4 border-t-slovak-blue flex flex-col justify-between h-full group cursor-pointer transition-all duration-300 relative overflow-hidden min-h-[240px]"
                >
                   {/* Header - Explicit Context */}
                   <div className="flex flex-col md:flex-row md:justify-between items-start border-b border-gray-100 pb-3 mb-2 gap-2 md:gap-0">
                      <div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">
                          Posledný Výsledok
                        </span>
                        <h3 className="text-[16px] md:text-[18px] font-black text-slovak-blue uppercase tracking-tight flex items-center gap-2">
                           Reprezentácia <span className="text-slovak-red">•</span> {lastNationalResult.category}
                        </h3>
                      </div>
                      <div className="flex md:flex-col items-center md:items-end gap-2 md:gap-0 w-full md:w-auto justify-between md:justify-start">
                         <div className="flex items-center gap-1.5 justify-end bg-blue-50 px-2 py-1 rounded-full border border-blue-100 mb-1">
                             <PlayCircle size={10} className="text-slovak-blue" />
                             <span className="text-[8px] md:text-[9px] font-bold text-slovak-blue uppercase tracking-wide whitespace-nowrap">Video záznam</span>
                         </div>
                         <span className="text-xs font-bold text-gray-400 block">{lastNationalResult.date}</span>
                      </div>
                   </div>
                   
                   {/* Competition Context */}
                   <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4 flex items-center gap-1.5">
                      <Trophy size={12} className="text-slovak-red" /> 
                      {lastNationalResult.competition}
                   </div>

                   {/* Scoreboard Content */}
                   <div className="flex justify-between items-center px-2 mb-2">
                      {/* Home */}
                      <div className="text-center flex-1 flex flex-col items-center">
                         <div className="h-16 h-16 flex items-center justify-center mb-2">
                            <img src={lastNationalResult.homeTeam.logo} className="h-14 w-auto object-contain" />
                         </div>
                         <span className="font-bold text-sm leading-tight text-gray-900">{lastNationalResult.homeTeam.name}</span>
                      </div>

                      {/* Score */}
                      <div className="text-center px-4">
                         <div className="text-5xl font-black text-slovak-blue tracking-tighter mb-1">
                            {lastNationalResult.scoreHome}:{lastNationalResult.scoreAway}
                         </div>
                         <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-100 px-2 py-0.5 rounded">
                            Koniec
                         </span>
                      </div>

                      {/* Away */}
                      <div className="text-center flex-1 flex flex-col items-center">
                         <div className="h-16 h-16 flex items-center justify-center mb-2">
                             <img src={lastNationalResult.awayTeam.logo} className="h-14 w-auto object-contain" />
                         </div>
                         <span className="font-bold text-sm leading-tight text-gray-900">{lastNationalResult.awayTeam.name}</span>
                      </div>
                   </div>

                   {/* Action Footer */}
                   <div className="mt-auto pt-2 flex justify-end">
                      <button className="text-[10px] font-bold uppercase text-gray-500 tracking-widest flex items-center gap-1 bg-gray-50 hover:bg-slovak-blue hover:text-white px-3 py-1.5 rounded-full transition-colors">
                        Zobraziť detaily <ChevronRight size={12} />
                      </button>
                   </div>
                </div>
              )}

              {/* 2. Next National Match Teaser */}
              <div 
                onClick={() => setCurrentView('matches')}
                className="bg-slovak-red rounded-3xl p-6 border border-red-600 shadow-none hover:shadow-md text-white relative overflow-hidden flex flex-col min-h-[240px] group cursor-pointer transition-all duration-300"
              >
                 {/* Background Effects */}
                 <div className="absolute right-0 top-0 w-64 h-64 bg-white opacity-5 rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl"></div>
                 <div className="absolute left-0 bottom-0 w-48 h-48 bg-black opacity-10 rounded-full -translate-x-1/3 translate-y-1/3 blur-2xl"></div>
                 
                 {nextNationalMatch ? (
                   <div className="relative z-10 h-full flex flex-col">
                      
                      {/* Header - Explicit Context */}
                      <div className="flex flex-col md:flex-row justify-between items-start border-b border-white/10 pb-3 mb-4 gap-2 md:gap-0">
                         <div>
                            <span className="text-[10px] font-bold text-red-100 uppercase tracking-widest block mb-1">
                               Najbližší Zápas
                            </span>
                            <h3 className="text-[16px] md:text-[18px] font-black text-white uppercase tracking-tight flex items-center gap-2">
                               Reprezentácia <span className="opacity-50">•</span> {nextNationalMatch.category}
                            </h3>
                         </div>
                         
                         {/* Live Badge */}
                         <div className="flex items-center gap-1.5 bg-black/20 px-2 py-1 rounded-full border border-white/10 backdrop-blur-sm self-start md:self-auto">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]"></div>
                            <span className="text-[8px] md:text-[9px] font-bold text-white uppercase tracking-wide whitespace-nowrap">Vysielané naživo</span>
                         </div>
                      </div>
                      
                      {/* Competition */}
                      <div className="flex items-center gap-1 text-[11px] font-bold text-red-100 uppercase tracking-wide mb-4">
                         <Trophy size={12} /> {nextNationalMatch.competition}
                      </div>

                      {/* Main Matchup */}
                      <div className="flex items-center gap-4 mb-6">
                         <div className="flex -space-x-3 shrink-0">
                            <div className="w-14 h-14 bg-white rounded-full p-2 flex items-center justify-center shadow-lg border-2 border-red-500 z-10">
                               <img src={nextNationalMatch.homeTeam.logo} className="w-full h-full object-contain" />
                            </div>
                            <div className="w-14 h-14 bg-white rounded-full p-2 flex items-center justify-center shadow-lg border-2 border-red-500">
                               <img src={nextNationalMatch.awayTeam.logo} className="w-full h-full object-contain" />
                            </div>
                         </div>
                         <div>
                            <div className="text-2xl font-black leading-none text-white mb-1">
                               {nextNationalMatch.homeTeam.shortName} <span className="opacity-50 text-lg mx-1">vs</span> {nextNationalMatch.awayTeam.shortName}
                            </div>
                            <span className="text-xs font-medium text-red-100 opacity-80">Oficiálny medzinárodný zápas</span>
                         </div>
                      </div>

                      {/* Info Box (Date/Time/Venue) - Explicit Clarity */}
                      <div className="mt-auto bg-black/20 rounded-xl p-3 flex items-center justify-between border border-white/5 backdrop-blur-sm">
                          <div className="flex items-center gap-3 pr-4 border-r border-white/10">
                             <div className="text-center">
                                <span className="block text-[9px] font-bold text-red-200 uppercase">Dátum</span>
                                <div className="flex items-center gap-1.5 font-bold text-sm">
                                   <Calendar size={14} /> {nextNationalMatch.date}
                                </div>
                             </div>
                          </div>
                          
                          <div className="flex items-center gap-3 px-4 border-r border-white/10">
                             <div className="text-center">
                                <span className="block text-[9px] font-bold text-red-200 uppercase">Čas</span>
                                <div className="flex items-center gap-1.5 font-bold text-sm">
                                   <Clock size={14} /> {nextNationalMatch.time}
                                </div>
                             </div>
                          </div>

                          <div className="pl-2 flex-1 overflow-hidden">
                             <span className="block text-[9px] font-bold text-red-200 uppercase">Miesto</span>
                             <div className="flex items-center gap-1.5 font-bold text-xs truncate">
                                <MapPin size={12} className="shrink-0" /> {nextNationalMatch.venue}
                             </div>
                          </div>
                      </div>
                      
                      {/* Small Detail Link */}
                      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                         <div className="bg-white text-slovak-red p-1 rounded-full shadow-lg">
                            <ChevronRight size={14} />
                         </div>
                      </div>

                   </div>
                 ) : (
                   <div className="flex flex-col items-center justify-center text-center h-full">
                      <p className="font-bold text-lg mb-2">Žiadne naplánované zápasy</p>
                      <p className="text-red-100 text-sm">Momentálne nie sú potvrdené žiadne reprezentačné stretnutia.</p>
                   </div>
                 )}
              </div>

              {/* 3. Player of the Week Card */}
              <div 
                onClick={() => setCurrentView('reprezentacia')}
                className="bg-transparent rounded-3xl p-0 border-0 flex flex-col justify-between h-full group cursor-pointer transition-all duration-300 relative overflow-visible min-h-[240px]"
              >
                  {/* Background (Clipped) */}
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-white z-0 rounded-3xl overflow-hidden border-t-4 border-white shadow-sm"></div>

                  {/* Header */}
                  <div className="relative z-10 px-5 pt-5 pb-0">
                     <div className="flex justify-between items-start mb-1">
                         <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mt-[3px]">
                            Hráč Týždňa
                         </span>
                         <div className="flex items-start">
                            <img src="https://flagcdn.com/w40/sk.png" alt="Slovakia" className="w-6 rounded-[2px] shadow-sm" />
                         </div>
                     </div>
                     <div className="flex flex-col items-start gap-1">
                        <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                           ŽENY
                        </span>
                     </div>
                  </div>

                  {/* Body with Image - OVERFLOWING (Adjusted Scale) */}
                  <div className="relative z-20 flex-1 flex flex-col items-center justify-end mt-0 pointer-events-none">
                      <div className="absolute bottom-14 w-[115%] h-[120%] flex items-end justify-center">
                          <img 
                            src="https://szph.sk/wp-content/uploads/2025/11/32324.png" 
                            className="w-full h-full object-contain object-bottom transform group-hover:scale-105 transition-transform duration-500 drop-shadow-xl"
                            alt="Šarlota Medvíková"
                          />
                      </div>
                      
                      {/* Name Plate */}
                      <div className="w-full bg-[#0B2144] p-4 pt-6 text-white text-center relative z-20 rounded-b-3xl mt-auto pointer-events-auto">
                         {/* Number Badge */}
                         <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-slovak-red rounded-full flex items-center justify-center font-black text-white border-4 border-white shadow-sm z-20">
                            7
                         </div>
                         <h3 className="font-black text-lg uppercase leading-none mt-1">Šarlota<br/>Medvíková</h3>
                      </div>
                  </div>
              </div>

           </div>
        </div>

        {/* 1. Get Involved Section */}
        <div className="bg-gray-50 border-b border-gray-200">
           <GetInvolved />
        </div>

        {/* 2. News */}
        <div className="py-4">
           <NewsSection onArticleClick={handleArticleClick} />
        </div>

        {/* 3. 10 Match List Table */}
        <div className="container mx-auto px-4 md:px-8 mb-20 -mt-2">
           <MatchListTable matches={upcomingMatchesTable} />
        </div>

        {/* 4. Projects Carousel */}
        <ProjectsCarousel />
        
        {/* 5. Partners */}
        <Partners />

        {/* 6. Social Media */}
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
