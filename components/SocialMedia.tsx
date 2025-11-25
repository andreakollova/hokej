import React from 'react';
import { INSTAGRAM_POSTS, VIDEOS } from '../constants';
import { Instagram, Heart, Play } from 'lucide-react';

export const SocialMedia: React.FC = () => {
  return (
    <div className="bg-gray-50 py-16 border-t border-gray-200">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Instagram Section (Moved Up) */}
        <div className="mb-16">
           <div className="flex items-center justify-center gap-2 mb-8">
              <Instagram className="text-slovak-blue" size={28} />
              <h2 className="text-2xl font-black uppercase text-slovak-blue">Sleduj nás na Instagrame</h2>
           </div>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {INSTAGRAM_POSTS.map(post => (
                <div key={post.id} className="relative group aspect-square overflow-hidden rounded-xl bg-gray-200 cursor-pointer">
                   <img src={post.imageUrl} className="w-full h-full object-cover" />
                   <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-bold">
                      <Heart fill="white" size={20} /> {post.likes}
                   </div>
                </div>
              ))}
           </div>
           <div className="text-center mt-8">
              <button className="bg-white border border-gray-300 px-6 py-2 rounded-full font-bold text-sm hover:bg-gray-50 transition-colors">
                @fieldhockey_slovakia
              </button>
           </div>
        </div>

        {/* YouTube Shorts Section (Moved Down) */}
        <div>
           <div className="flex justify-between items-end mb-8">
              <h2 className="text-3xl font-black uppercase text-slovak-blue">Videá</h2>
              <button className="text-slovak-red font-bold text-sm hover:underline">Všetky videá</button>
           </div>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {VIDEOS.map(video => (
                <div key={video.id} className="relative rounded-2xl overflow-hidden shadow-lg aspect-[9/16] bg-black group cursor-pointer">
                   {/* Thumbnail Image */}
                   <img 
                     src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`} 
                     alt={video.title}
                     className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                   />
                   
                   {/* Play Button Overlay */}
                   <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 group-hover:scale-110 transition-transform shadow-lg">
                         <Play fill="white" className="text-white ml-1" size={20} />
                      </div>
                   </div>
                   
                   {/* Shorts Badge */}
                   <div className="absolute bottom-3 right-3">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/f/fc/Youtube_shorts_icon.svg" className="w-6 h-6 drop-shadow-md" alt="Shorts" />
                   </div>
                </div>
              ))}
           </div>
        </div>

      </div>
    </div>
  );
};