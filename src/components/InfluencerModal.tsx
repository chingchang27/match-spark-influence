
import React from 'react';
import { X } from 'lucide-react';

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

interface InfluencerModalProps {
  influencer: Influencer;
  onClose: () => void;
}

const InfluencerModal: React.FC<InfluencerModalProps> = ({ influencer, onClose }) => {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6 max-w-md w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Influencer Details</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-pink-300 transition-colors duration-300"
          >
            <X size={24} />
          </button>
        </div>

        <div className="text-center mb-6">
          <img
            src={influencer.image}
            alt={influencer.name}
            className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-white/20 mb-4"
          />
          <h3 className="text-xl font-semibold text-white mb-2">{influencer.name}</h3>
          <p className="text-gray-300">{influencer.category}</p>
        </div>

        <div className="space-y-4">
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-2">Followers</h4>
            <p className="text-gray-300">{influencer.followers}</p>
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-2">Price per Post</h4>
            <p className="text-gray-300">{influencer.price}</p>
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-2">Collaborated Brands</h4>
            <div className="flex flex-wrap gap-2">
              {influencer.collaboratedBrands.map((brand, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-2">Contact</h4>
            <p className="text-gray-300">{influencer.contact}</p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <button
            onClick={() => window.open(influencer.instagramUrl, '_blank')}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-300"
          >
            View Instagram Profile
          </button>
          <button
            onClick={onClose}
            className="w-full bg-white/10 text-white py-3 rounded-lg font-semibold hover:bg-white/20 transition-all duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfluencerModal;
