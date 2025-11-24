import { Match, MatchStatus, Player, NewsItem, Team, Partner, InstagramPost, VideoItem } from './types';

// National Team
export const TEAM_SVK: Team = { 
  id: 'svk', 
  name: 'Slovensko', 
  shortName: 'SVK', 
  logo: 'https://flagcdn.com/w320/sk.png', 
  record: '8-4' 
};

// Club Teams
export const TEAM_RACA: Team = { 
  id: 'raca', 
  name: 'KPH Rača Bratislava', 
  shortName: 'RAČA', 
  logo: 'https://ui-avatars.com/api/?name=Raca&background=0B2144&color=fff&size=256&bold=true&length=4&font-size=0.33', 
  record: '12-2' 
};

export const TEAM_HOKO: Team = { 
  id: 'hoko', 
  name: 'KPH HOKO Zlaté Moravce', 
  shortName: 'HOKO', 
  logo: 'https://ui-avatars.com/api/?name=Hoko&background=15803d&color=fff&size=256&bold=true&length=4&font-size=0.33', 
  record: '8-6' 
};

export const TEAM_HAS: Team = { 
  id: 'has', 
  name: 'HAŠ Akadémia Šenkvice', 
  shortName: 'HAŠ', 
  logo: 'https://ui-avatars.com/api/?name=HAS&background=f97316&color=fff&size=256&bold=true&length=3&font-size=0.33', 
  record: '5-9' 
};

export const TEAM_SEN: Team = { 
  id: 'sen', 
  name: 'ŠK 1952 Šenkvice', 
  shortName: 'ŠEN', 
  logo: 'https://ui-avatars.com/api/?name=Senk&background=EF1C26&color=fff&size=256&bold=true&length=4&font-size=0.33', 
  record: '10-4' 
};

// Matches - Expanded to have at least 10 upcoming + results
export const MATCHES: Match[] = [
  // LIVE
  {
    id: 'm_live_1',
    homeTeam: TEAM_RACA,
    awayTeam: TEAM_HAS,
    date: 'Dnes',
    time: '14:00',
    venue: 'Národný štadión, Bratislava',
    competition: 'Liga U18',
    category: 'U18',
    status: MatchStatus.LIVE,
    scoreHome: 2,
    scoreAway: 1,
    period: '3. štvrtina',
    timeRemaining: '08:45'
  },
  // LAST RESULT (For the widget)
  {
    id: 'm_last_res',
    homeTeam: TEAM_SVK,
    awayTeam: TEAM_RACA, // Dummy opponent
    date: '10.03.',
    time: '18:00',
    venue: 'Viedeň, Rakúsko',
    competition: 'Medzinárodný Priateľský',
    category: 'MUŽI',
    status: MatchStatus.FINAL,
    scoreHome: 3,
    scoreAway: 4,
    period: 'Koniec' 
  },
  // UPCOMING LIST (Need 10+)
  {
    id: 'm_next_1',
    homeTeam: TEAM_RACA,
    awayTeam: TEAM_HOKO,
    date: '15.03.',
    time: '16:00',
    venue: 'Rača, Bratislava',
    competition: 'Extraliga Muži',
    category: 'MUŽI',
    status: MatchStatus.UPCOMING,
    scoreHome: 0,
    scoreAway: 0
  },
  {
    id: 'm_next_2',
    homeTeam: TEAM_SEN,
    awayTeam: TEAM_HAS,
    date: '16.03.',
    time: '09:00',
    venue: 'Šenkvice',
    competition: 'Liga U14',
    category: 'U14',
    status: MatchStatus.UPCOMING
  },
  {
    id: 'm_next_3',
    homeTeam: TEAM_RACA,
    awayTeam: TEAM_SEN,
    date: '16.03.',
    time: '11:00',
    venue: 'Rača, Bratislava',
    competition: 'Turnaj U10',
    category: 'U10',
    status: MatchStatus.UPCOMING
  },
  {
    id: 'm_next_4',
    homeTeam: TEAM_HOKO,
    awayTeam: TEAM_SEN,
    date: '17.03.',
    time: '10:00',
    venue: 'Zlaté Moravce',
    competition: 'Liga U12',
    category: 'U12',
    status: MatchStatus.UPCOMING
  },
  {
    id: 'm_next_5',
    homeTeam: TEAM_HAS,
    awayTeam: TEAM_SEN,
    date: '17.03.',
    time: '14:00',
    venue: 'Šenkvice',
    competition: 'Extraliga Ženy',
    category: 'ŽENY',
    status: MatchStatus.UPCOMING
  },
  {
    id: 'm_next_6',
    homeTeam: TEAM_SVK,
    awayTeam: TEAM_HOKO, // Dummy
    date: '20.03.',
    time: '18:00',
    venue: 'Bratislava',
    competition: 'Prípravný Zápas',
    category: 'REPRE',
    status: MatchStatus.UPCOMING
  },
  {
    id: 'm_next_7',
    homeTeam: TEAM_RACA,
    awayTeam: TEAM_HAS,
    date: '23.03.',
    time: '10:00',
    venue: 'Rača',
    competition: 'Liga U18',
    category: 'U18',
    status: MatchStatus.UPCOMING
  },
  {
    id: 'm_next_8',
    homeTeam: TEAM_SEN,
    awayTeam: TEAM_HOKO,
    date: '23.03.',
    time: '13:00',
    venue: 'Šenkvice',
    competition: 'Extraliga Muži',
    category: 'MUŽI',
    status: MatchStatus.UPCOMING
  },
  {
    id: 'm_next_9',
    homeTeam: TEAM_HAS,
    awayTeam: TEAM_RACA,
    date: '24.03.',
    time: '11:00',
    venue: 'Šenkvice',
    competition: 'Extraliga Ženy',
    category: 'ŽENY',
    status: MatchStatus.UPCOMING
  },
  {
    id: 'm_next_10',
    homeTeam: TEAM_HOKO,
    awayTeam: TEAM_RACA,
    date: '24.03.',
    time: '15:00',
    venue: 'Zlaté Moravce',
    competition: 'Liga U21',
    category: 'U21',
    status: MatchStatus.UPCOMING
  }
];

// Players - Using reliable portraits
export const PLAYERS: Player[] = [
  { id: 'p1', name: 'Michal Petráš', position: 'Stredopoliar', number: 10, club: 'KPH Rača Bratislava', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=500&auto=format&fit=crop', caps: 85, goals: 18 },
  { id: 'p2', name: 'Tomáš Romanec', position: 'Útočník', number: 8, club: 'ŠK 1952 Šenkvice', photo: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=500&auto=format&fit=crop', caps: 102, goals: 45, isCaptain: true },
  { id: 'p3', name: 'Martin Hrubý', position: 'Obranca', number: 4, club: 'HAŠ Akadémia Šenkvice', photo: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=500&auto=format&fit=crop', caps: 60, goals: 5 },
  { id: 'p4', name: 'Jakub Bogár', position: 'Brankár', number: 1, club: 'KPH Rača Bratislava', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=500&auto=format&fit=crop', caps: 90, goals: 0 },
  { id: 'p5', name: 'Matej Jelačič', position: 'Stredopoliar', number: 12, club: 'KPH HOKO Zlaté Moravce', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500&auto=format&fit=crop', caps: 45, goals: 12 },
  { id: 'p6', name: 'Adam Krampl', position: 'Obranca', number: 27, club: 'KPH Rača Bratislava', photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=500&auto=format&fit=crop', caps: 35, goals: 3 },
];

// News - Using reliable field hockey / sport field images
export const NEWS: NewsItem[] = [
  { id: 'n1', title: 'Derby o Bratislavu: Rača vyzve Šenkvice', snippet: 'Už tento víkend nás čaká šláger kola Extraligy mužov. Oba tímy sú v skvelej forme a sľubujú napínavý súboj pred plnými tribúnami.', date: 'Pred 2 hodinami', category: 'Extraliga Muži', imageUrl: 'https://images.unsplash.com/photo-1589487391730-58f20eb2c308?q=80&w=800&auto=format&fit=crop' }, // Field/Ball
  { id: 'n2', title: 'Mládežnícky turnaj U10 v Zlatých Moravciach', snippet: 'Najmenšie nádeje slovenského pozemného hokeja predviedli skvelé výkony. Turnaja sa zúčastnilo 8 tímov.', date: 'Včera', category: 'Mládež', imageUrl: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?q=80&w=800&auto=format&fit=crop' }, // Kids/Running
  { id: 'n3', title: 'Reprezentácia začína prípravu na kvalifikáciu', snippet: 'Tréner oznámil širšiu nomináciu na nadchádzajúci cyklus. V tíme sa objavilo viacero nových tvárí.', date: '15. Máj 2024', category: 'Reprezentácia', imageUrl: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=800&auto=format&fit=crop' }, // Team Huddle
  { id: 'n4', title: 'Nové pravidlá pre sezónu 2024/2025', snippet: 'Svetová federácia FIH zaviedla zmeny, ktoré sa dotknú aj našich súťaží. Prečítajte si zhrnutie kľúčových zmien v posudzovaní.', date: '10. Máj 2024', category: 'Súťaž', imageUrl: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=800&auto=format&fit=crop' }, // Referee/Whistle
  { id: 'n5', title: 'Rozhovor s kapitánom reprezentácie', snippet: 'O cieľoch, motivácii a budúcnosti slovenského pozemného hokeja.', date: '05. Máj 2024', category: 'Rozhovor', imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&auto=format&fit=crop' }, // Athlete portrait
  { id: 'n6', title: 'Letný kemp mládeže v plnom prúde', snippet: 'Viac ako 50 detí sa zúčastnilo prvého turnusu letného kempu v Rači. Pozrite si fotogalériu.', date: '01. Máj 2024', category: 'Mládež', imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800&auto=format&fit=crop' }, // Running on grass
  { id: 'n7', title: 'ŠK 1952 Šenkvice oslavuje výročie', snippet: 'Klub s bohatou históriou si pripomína 70 rokov od svojho založenia slávnostným galavečerom.', date: '28. Apríl 2024', category: 'Kluby', imageUrl: 'https://images.unsplash.com/photo-1531415074984-6180260abddc?q=80&w=800&auto=format&fit=crop' }, // Celebration
  { id: 'n8', title: 'Nový tréner ženskej reprezentácie', snippet: 'Zväz oficiálne predstavil nového kormidelníka, ktorý povedie ženy v nadchádzajúcej halovej sezóne.', date: '25. Apríl 2024', category: 'Reprezentácia', imageUrl: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?q=80&w=800&auto=format&fit=crop' }, // Coach/Writing
  { id: 'n9', title: 'Halová sezóna sa blíži', snippet: 'Rozpis zápasov pre halovú ligu 2024/2025 je zverejnený. Prvé kolo začína už v novembri.', date: '20. Apríl 2024', category: 'Halový hokej', imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop' }, // Indoor/Sport Hall
  { id: 'n10', title: 'Talentovaná mládež HOKO', snippet: 'Pozrite si profil akadémie HOKO Zlaté Moravce, ktorá produkuje mladé talenty.', date: '18. Apríl 2024', category: 'Mládež', imageUrl: 'https://images.unsplash.com/photo-1566932769119-7a1fb6d7ce23?q=80&w=800&auto=format&fit=crop' }, // Kids/Group
  { id: 'n11', title: 'Výsledky víkendového kola', snippet: 'Prekvapenia v Extralige, Rača potvrdila dominanciu, Šenkvice s cenným bodom.', date: '15. Apríl 2024', category: 'Súťaž', imageUrl: 'https://images.unsplash.com/photo-1628891435252-c6507a216893?q=80&w=800&auto=format&fit=crop' }, // Action
  { id: 'n12', title: 'Ako vybrať správnu hokejku?', snippet: 'Praktický sprievodca pre rodičov a začínajúcich hráčov pri výbere výstroje.', date: '10. Apríl 2024', category: 'Tipy', imageUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=800&auto=format&fit=crop' }, // Stick closeup
  { id: 'n13', title: 'Finále Slovenského pohára', snippet: 'Dramatický záver pohárovej sezóny. Pozrite si, kto zdvihol trofej nad hlavu v napínavom finále.', date: '08. Apríl 2024', category: 'Pohár', imageUrl: 'https://images.unsplash.com/photo-1614632537190-23e4146777db?q=80&w=800&auto=format&fit=crop' }, // Trophy
  { id: 'n14', title: 'Rozvoj infraštruktúry', snippet: 'Plány na výstavbu nového ihriska s umelou trávou v Bratislave dostali zelenú.', date: '05. Apríl 2024', category: 'Rozvoj', imageUrl: 'https://images.unsplash.com/photo-1555862124-a56778465053?q=80&w=800&auto=format&fit=crop' }, // Green turf
  { id: 'n15', title: 'Charitatívny zápas hviezd', snippet: 'Výťažok z exhibičného zápasu poputuje na podporu mládežníckeho športu.', date: '01. Apríl 2024', category: 'Podujatie', imageUrl: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=800&auto=format&fit=crop' }, // Crowd/Stadium
  { id: 'n16', title: 'Školenie rozhodcov', snippet: 'Zväz organizuje školenie pre nových záujemcov o rozhodovanie. Prihláste sa ešte dnes.', date: '30. Marec 2024', category: 'Vzdelávanie', imageUrl: 'https://images.unsplash.com/photo-1588708453531-9f931d867c29?q=80&w=800&auto=format&fit=crop' }, // Notebook/Whistle context
  { id: 'n17', title: 'Úspech U16 v zahraničí', snippet: 'Naša reprezentácia do 16 rokov obsadila skvelé 3. miesto na turnaji v Rakúsku.', date: '28. Marec 2024', category: 'Reprezentácia', imageUrl: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=800&auto=format&fit=crop' }, // Celebration/Team
  { id: 'n18', title: 'Pozvánka na Valné zhromaždenie', snippet: 'Zasadnutie najvyššieho orgánu zväzu sa uskutoční koncom mesiaca.', date: '25. Marec 2024', category: 'Zväz', imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop' } // Meeting room
];

export const PARTNERS: Partner[] = [
  { id: 'p1', name: 'Slovenský Olympijský Tím', logo: 'https://ui-avatars.com/api/?name=SOV&background=fff&color=000&length=3&size=128' },
  { id: 'p2', name: 'Ministerstvo Školstva', logo: 'https://ui-avatars.com/api/?name=MIN&background=fff&color=000&length=3&size=128' },
  { id: 'p3', name: 'Generálny Partner', logo: 'https://ui-avatars.com/api/?name=GP&background=fff&color=000&length=2&size=128' },
  { id: 'p4', name: 'Partner Ligy', logo: 'https://ui-avatars.com/api/?name=LIGA&background=fff&color=000&length=4&size=128' },
  { id: 'p5', name: 'Mediálny Partner', logo: 'https://ui-avatars.com/api/?name=MEDIA&background=fff&color=000&length=5&size=128' },
];

export const INSTAGRAM_POSTS: InstagramPost[] = [
  { id: 'i1', imageUrl: 'https://images.unsplash.com/photo-1565158226065-27a44c921769?q=80&w=400&h=400&fit=crop', caption: 'Skvelý víkend v Rači! 🏑🔥 #hockeyfamily', likes: 245 },
  { id: 'i2', imageUrl: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=400&h=400&fit=crop', caption: 'Reprezentácia v plnom nasadení. 🇸🇰', likes: 512 },
  { id: 'i3', imageUrl: 'https://images.unsplash.com/photo-1589487391730-58f20eb2c308?q=80&w=400&h=400&fit=crop', caption: 'Nezabudnite na registráciu do ligy! 📝', likes: 120 },
  { id: 'i4', imageUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=400&h=400&fit=crop', caption: 'Ďakujeme fanúšikom za podporu. 🙌', likes: 330 },
];

export const VIDEOS: VideoItem[] = [
  { id: 'v1', title: 'Highlighty: Rača vs Šenkvice', duration: '3:45', thumbnail: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=600&fit=crop' },
  { id: 'v2', title: 'Tréningový kemp U18', duration: '2:20', thumbnail: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=600&fit=crop' },
];