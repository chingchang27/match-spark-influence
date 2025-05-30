
import React from 'react';

interface Influencer {
  id: number;
  name: string;
  image: string;
  followers: string;
  category: string;
  instagramUrl: string;
  collaboratedBrands: string[];
  contact: string;
  price: string;
}

interface InfluencerCardProps {
  influencer: Influencer;
  onClick: () => void;
}

const InfluencerCard: React.FC<InfluencerCardProps> = ({ influencer, onClick }) => {
  const handleConnectClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(influencer.instagramUrl, '_blank');
  };

  return (
    <div
      onClick={onClick}
      className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 cursor-pointer group"
    >
      <div className="text-center">
        <div className="relative mb-4">
          <img
            src={influencer.image}
            alt={influencer.name}
            className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-white/20 group-hover:border-white/40 transition-all duration-300"
          />
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs px-2 py-1 rounded-full">
            {influencer.followers}
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-white mb-2">{influencer.name}</h3>
        <p className="text-gray-300 text-sm mb-4">{influencer.category}</p>
        
        <button
          onClick={handleConnectClick}
          className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
        >
          Connect Now
        </button>
      </div>
    </div>
  );
};

export default InfluencerCard;
