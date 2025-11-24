import React from 'react';
import { UserPlus, Flag, UserCog, Users, ArrowRight, Mail } from 'lucide-react';

export const GetInvolved: React.FC = () => {
  const roles = [
    {
      id: 'hrac',
      title: 'Chcem sa stať hráčom',
      icon: <UserPlus className="w-6 h-6 text-white" />,
      image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=800&auto=format&fit=crop', // Stick and Ball - Definitive Field Hockey
      description: 'Nájdi si klub v tvojom okolí a začni s tréningom.'
    },
    {
      id: 'rozhodca',
      title: 'Chcem sa stať rozhodcom',
      icon: <Flag className="w-6 h-6 text-white" />,
      image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=800&auto=format&fit=crop', // Whistle/Referee context
      description: 'Získaj licenciu a buď dôležitou súčasťou hry.'
    },
    {
      id: 'trener',
      title: 'Chcem sa stať trénerom',
      icon: <UserCog className="w-6 h-6 text-white" />,
      image: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=800&auto=format&fit=crop', // Coaching/Tactics
      description: 'Vzdelávaj sa a vychovaj nové talenty.'
    },
    {
      id: 'klub',
      title: 'Chcem si založiť klub',
      icon: <Users className="w-6 h-6 text-white" />,
      image: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=800&auto=format&fit=crop', // Team Huddle - Unity
      description: 'Všetko čo potrebuješ vedieť pre založenie klubu.'
    }
  ];

  return (
    <div className="container mx-auto px-4 md:px-8 py-20">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
         <div>
            <span className="text-slovak-red font-bold text-xs uppercase tracking-widest mb-2 block">Komunita</span>
            <h2 className="text-4xl md:text-5xl font-black uppercase text-slovak-blue tracking-tighter">Zapoj sa do hry</h2>
            <p className="text-gray-500 mt-4 max-w-xl text-lg font-medium">
              Pozemný hokej je šport pre každého. Či už na ihrisku alebo mimo neho, miesto u nás máš isté.
            </p>
         </div>
         <button className="bg-white border-2 border-gray-100 text-gray-900 font-bold px-8 py-4 rounded-full hover:bg-black hover:text-white hover:border-black transition-all shadow-sm">
            Viac o štruktúre zväzu
         </button>
      </div>

      {/* Grid of Roles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
        {roles.map((role, index) => (
          <div 
            key={role.id} 
            className="rounded-[40px] relative group cursor-pointer overflow-hidden shadow-sm h-[420px] transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ring-1 ring-black/5"
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img 
                src={role.image} 
                alt={role.title} 
                className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
              />
            </div>
            
            {/* Gradient Overlay - Softer */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent group-hover:via-slovak-blue/60 group-hover:to-slovak-blue/80 transition-all duration-500"></div>

            {/* Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-between text-white z-10">
               <div className="self-end bg-white/20 w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md border border-white/30 transition-all duration-500 group-hover:rotate-12 group-hover:bg-white group-hover:text-slovak-blue shadow-lg">
                  {React.cloneElement(role.icon as React.ReactElement, { className: "w-6 h-6 text-white group-hover:text-slovak-blue transition-colors" })}
               </div>
               
               <div>
                 <h3 className="text-3xl font-black leading-none mb-3 group-hover:translate-y-[-4px] transition-transform duration-300">
                   {role.title.replace('Chcem sa stať', '').replace('Chcem si založiť', '')}
                   <span className="block text-lg font-medium opacity-70 mt-1">Chcem sa stať...</span>
                 </h3>
                 
                 <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-500">
                    <p className="text-sm text-gray-200 mb-6 font-medium leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                      {role.description}
                    </p>
                    
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest bg-white text-slovak-blue px-5 py-3 rounded-full w-fit hover:bg-slovak-red hover:text-white transition-colors shadow-lg">
                        Viac info <ArrowRight size={12} />
                    </div>
                 </div>
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* Banner */}
      <div className="relative rounded-[48px] p-10 md:p-20 overflow-hidden shadow-2xl group">
         <div className="absolute inset-0 bg-slovak-blue group-hover:scale-105 transition-transform duration-[2s]"></div>
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
         
         {/* Animated blobs */}
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-slovak-red opacity-30 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 animate-pulse duration-3000"></div>
         <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-400 opacity-20 rounded-full blur-[80px] -translate-x-1/3 translate-y-1/3"></div>
         
         <div className="flex flex-col lg:flex-row items-center justify-between gap-10 relative z-10">
            <div className="text-center lg:text-left max-w-3xl">
              <h3 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter leading-tight">Máš otázky? <br/>Napíš nám.</h3>
              <p className="text-blue-100 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
                Hľadáme nové talenty do všetkých kategórií. Napíš nám a my ťa prepojíme s najbližším klubom.
              </p>
            </div>
            <a 
              href="mailto:szph@szph.sk"
              className="bg-white text-slovak-blue px-12 py-6 rounded-full font-black text-xl hover:bg-slovak-red hover:text-white hover:scale-105 transition-all flex items-center gap-4 shadow-xl shadow-black/20 shrink-0 group/btn"
            >
              <Mail size={24} className="text-slovak-red group-hover/btn:text-white transition-colors" />
              szph@szph.sk
            </a>
         </div>
      </div>
    </div>
  );
};