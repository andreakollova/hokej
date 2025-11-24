import React from 'react';
import { INSTAGRAM_POSTS, VIDEOS } from '../constants';
import { Instagram, Play, Heart } from 'lucide-react';

export const SocialMedia: React.FC = () => {
  return (
    <div className="bg-gray-50 py-16 border-t border-gray-200">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Videos Section */}
        <div className="mb-16">
           <div className="flex justify-between items-end mb-8">
              <h2 className="text-3xl font-black uppercase text-slovak-blue">Videá</h2>
              <button className="text-slovak-red font-bold text-sm hover:underline">Všetky videá</button>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {VIDEOS.map(video => (
                <div key={video.id} className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-lg aspect-video">
                   <img src={video.thumbnail} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                   <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 group-hover:scale-110 transition-transform">
                         <Play fill="white" className="text-white ml-1" size={24} />
                      </div>
                   </div>
                   <div className="absolute bottom-0 left-0 p-6 text-white w-full bg-gradient-to-t from-black/80 to-transparent">
                      <h3 className="font-bold text-xl">{video.title}</h3>
                      <span className="text-xs font-mono bg-black/50 px-2 py-1 rounded mt-2 inline-block">{video.duration}</span>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Instagram Section */}
        <div>
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
                @slovakhockey
              </button>
           </div>
        </div>

      </div>
    </div>
  );
};