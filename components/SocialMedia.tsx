
import React from 'react';
import { INSTAGRAM_POSTS, VIDEOS } from '../constants';
import { Instagram, Heart, Play } from 'lucide-react';

export const SocialMedia: React.FC = () => {
  return (
    <div className="bg-gray-50 py-16 border-t border-gray-200">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* YouTube Section (Moved Up) */}
        <div className="mb-16">
           <div className="flex justify-between items-end mb-8">
              <h2 className="text-3xl font-black uppercase text-slovak-blue">FIELD HOCKEY TV</h2>
              <button className="text-slovak-red font-bold text-sm hover:underline">Všetky videá</button>
           </div>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {VIDEOS.map(video => (
                <div key={video.id} className="relative rounded-2xl overflow-hidden shadow-lg aspect-[16/9] bg-black group cursor-pointer border border-gray-100">
                   {/* Thumbnail Image */}
                   <img 
                     src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`} 
                     alt="Video Thumbnail"
                     className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                   />
                   
                   {/* Clean Play Button Overlay */}
                   <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                      <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white group-hover:scale-110 transition-transform shadow-xl">
                         <Play fill="white" className="text-white ml-1" size={24} />
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Instagram Section (Moved Down) */}
        <div className="flex flex-col items-center">
           <div className="flex flex-col md:flex-row items-center justify-center gap-3 mb-10">
              <Instagram className="text-slovak-blue" size={28} />
              <h2 className="text-2xl font-black uppercase text-slovak-blue text-center md:text-left">
                SLEDUJ NÁS NA INSTAGRAME
              </h2>
           </div>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
              {INSTAGRAM_POSTS.map(post => (
                <div key={post.id} className="relative group aspect-square overflow-hidden rounded-xl bg-gray-200 cursor-pointer">
                   <img src={post.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                   <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-bold">
                      <Heart fill="white" size={20} /> {post.likes}
                   </div>
                </div>
              ))}
           </div>

           {/* New Handle Button */}
           <div className="mt-8">
               <button className="text-white font-bold text-xs uppercase tracking-widest bg-slovak-blue px-5 py-2.5 rounded-full hover:bg-blue-900 transition-all shadow-sm">
                   @fieldhockey_slovakia
               </button>
           </div>
        </div>

      </div>
    </div>
  );
};
