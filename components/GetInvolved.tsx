
import React from 'react';
import { UserPlus, Flag, UserCog, Users, ArrowRight, Mail, Smartphone } from 'lucide-react';

export const GetInvolved: React.FC = () => {
  const roles = [
    {
      id: 'hrac',
      title: 'Chcem sa stať hráčom',
      mainWord: 'Hráčom',
      prefix: 'Chcem sa stať',
      icon: <UserPlus className="w-5 h-5 text-white" />,
      image: 'https://szph.sk/wp-content/uploads/2025/11/9.png',
      description: 'Nájdi si klub v tvojom okolí a začni s tréningom.'
    },
    {
      id: 'rozhodca',
      title: 'Chcem sa stať rozhodcom',
      mainWord: 'Rozhodcom',
      prefix: 'Chcem sa stať',
      icon: <Flag className="w-5 h-5 text-white" />,
      image: 'https://szph.sk/wp-content/uploads/2025/11/8.png',
      description: 'Získaj licenciu a buď dôležitou súčasťou hry.'
    },
    {
      id: 'trener',
      title: 'Chcem sa stať trénerom',
      mainWord: 'Trénerom',
      prefix: 'Chcem sa stať',
      icon: <UserCog className="w-5 h-5 text-white" />,
      image: 'https://szph.sk/wp-content/uploads/2025/11/10.png',
      description: 'Vzdelávaj sa a vychovaj nové talenty.'
    },
    {
      id: 'klub',
      title: 'Chcem si založiť klub',
      mainWord: 'Klub',
      prefix: 'Chcem si založiť',
      icon: <Users className="w-5 h-5 text-white" />,
      image: 'https://szph.sk/wp-content/uploads/2025/11/11.png',
      description: 'Všetko čo potrebuješ vedieť pre založenie klubu.'
    }
  ];

  return (
    <div className="container mx-auto px-4 md:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6">
         <div>
            <span className="text-slovak-red font-bold text-xs uppercase tracking-widest mb-2 block">Komunita</span>
            <h2 className="text-4xl md:text-5xl font-black uppercase text-slovak-blue tracking-tighter">Zapoj sa do hry</h2>
            <p className="text-gray-500 mt-4 max-w-xl text-lg font-medium">
              Pozemný hokej je šport pre každého. Či už na ihrisku alebo mimo neho, miesto u nás máš isté.
            </p>
         </div>
         <button className="bg-white border-2 border-gray-100 text-gray-900 font-bold px-6 py-4 rounded-full hover:bg-black hover:text-white hover:border-black transition-all shadow-sm flex items-center gap-3">
            <img src="https://szph.sk/wp-content/uploads/2024/11/SZPH-logo-znak-1.png" className="w-8 h-8 object-contain" alt="SZPH" />
            Ako sa hrá pozemný hokej?
         </button>
      </div>

      {/* Grid of Roles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {roles.map((role, index) => (
          <div 
            key={role.id} 
            className="rounded-[32px] relative overflow-hidden shadow-sm h-[340px] ring-1 ring-black/5 bg-gray-100"
          >
            {/* Background Image - Static */}
            <div className="absolute inset-0">
              <img 
                src={role.image} 
                alt={role.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Gradient Overlay - Stronger Blue */}
            <div className="absolute inset-0 bg-gradient-to-t from-slovak-blue via-slovak-blue/90 to-transparent mix-blend-multiply opacity-100"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slovak-blue via-transparent to-transparent opacity-60"></div>

            {/* Content */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between text-white z-10">
               <div className="self-end bg-white/10 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 shadow-lg">
                  {role.icon}
               </div>
               
               <div>
                 {/* Titles: Prefix first, then Main Word */}
                 <span className="block text-sm font-medium opacity-90 mb-0.5 text-blue-100">{role.prefix}</span>
                 <h3 className="text-2xl font-black leading-none mb-3 uppercase tracking-tight">
                   {role.mainWord}
                 </h3>
                 
                 <div>
                    <p className="text-xs text-blue-100 mb-5 font-medium leading-relaxed line-clamp-2 opacity-90">
                      {role.description}
                    </p>
                    
                    <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-white text-slovak-blue px-4 py-2.5 rounded-full w-fit hover:bg-slovak-red hover:text-white transition-colors shadow-lg">
                        Viac info <ArrowRight size={12} />
                    </button>
                 </div>
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Grid: Contact (70%) + App (30%) */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
         
         {/* Contact Banner (70%) */}
         <div className="lg:col-span-7 relative rounded-[32px] p-8 md:p-12 overflow-hidden shadow-2xl group border border-blue-900/10 h-full min-h-[300px] flex flex-col justify-center">
            <div className="absolute inset-0 bg-slovak-blue group-hover:scale-105 transition-transform duration-[2s]"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            
            {/* Animated blobs */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-sky-400 opacity-20 rounded-full blur-[80px] translate-x-1/2 -translate-y-1/2 animate-pulse duration-3000 group-hover:opacity-30 transition-opacity"></div>
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-400 opacity-20 rounded-full blur-[60px] -translate-x-1/3 translate-y-1/3 group-hover:opacity-30 transition-opacity"></div>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                <div className="text-center md:text-left max-w-2xl">
                  <h3 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tighter leading-tight">Máš otázky? <br/>Napíš nám.</h3>
                  <p className="text-blue-100 text-base md:text-lg font-medium leading-relaxed max-w-lg">
                    Hľadáme nové talenty do všetkých kategórií. Napíš nám a my ťa prepojíme s najbližším klubom.
                  </p>
                </div>
                <a 
                  href="mailto:szph@szph.sk"
                  className="bg-white text-slovak-blue px-10 py-5 rounded-full font-black text-lg hover:bg-blue-50 hover:scale-105 transition-all flex items-center gap-3 shadow-xl shadow-black/20 shrink-0 group/btn"
                >
                  <Mail size={22} className="text-slovak-blue transition-colors" />
                  szph@szph.sk
                </a>
            </div>
         </div>

         {/* App Download (30%) */}
         <div className="lg:col-span-3 relative rounded-[32px] p-8 overflow-hidden shadow-2xl bg-slovak-blue border border-blue-900/10 min-h-[300px] flex flex-col justify-between group">
             <div className="absolute inset-0 bg-gradient-to-b from-slovak-blue to-[#081a36]"></div>
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
             
             {/* Content Top - Higher Z-index */}
             <div className="relative z-20">
                <div className="bg-slovak-red w-10 h-10 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-red-900/30">
                   <Smartphone size={20} className="text-white" />
                </div>
                <h3 className="text-2xl font-black text-white uppercase leading-none mb-2">Stiahni si<br/>Aplikáciu</h3>
                <p className="text-blue-200 text-xs font-medium leading-relaxed">
                   Výsledky, novinky a notifikácie o zápasoch vždy po ruke vo vašom mobile.
                </p>
             </div>

             {/* Mockup Image - Better Positioning */}
             <div className="absolute bottom-[-20px] right-[-20px] w-64 rotate-[-10deg] group-hover:rotate-0 group-hover:scale-105 transition-all duration-500 z-0 opacity-80 lg:opacity-100">
                <img 
                  src="https://images.unsplash.com/photo-1622782914767-404fb9ab3f57?q=80&w=400&auto=format&fit=crop" 
                  alt="App Mockup" 
                  className="w-full h-auto drop-shadow-2xl rounded-[30px] border-[6px] border-black"
                />
             </div>

             {/* Store Buttons - Top Z-index */}
             <div className="relative z-30 flex flex-col items-start gap-3 mt-auto pt-20">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" 
                  alt="Download on App Store"
                  className="h-10 w-auto cursor-pointer hover:scale-105 transition-transform" 
                />
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/360px-Google_Play_Store_badge_EN.svg.png" 
                  alt="Get it on Google Play"
                  className="h-10 w-auto cursor-pointer hover:scale-105 transition-transform" 
                />
             </div>
         </div>

      </div>
    </div>
  );
};
