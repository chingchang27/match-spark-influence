
import React, { useState } from 'react';
import InfluencerCard from './InfluencerCard';
import InfluencerModal from './InfluencerModal';

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

interface InfluencerSectionProps {
  type: 'mega' | 'macro' | 'micro';
}

const InfluencerSection: React.FC<InfluencerSectionProps> = ({ type }) => {
  const [selectedInfluencer, setSelectedInfluencer] = useState<Influencer | null>(null);

  const getSectionData = () => {
    switch (type) {
      case 'mega':
        return {
          title: 'Mega Influencers',
          subtitle: 'Celebrity-level reach with 1M+ followers',
          influencers: [
            {
              id: 1,
              name: 'Alex Rodriguez',
              image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
              followers: '2.5M',
              category: 'Lifestyle',
              instagramUrl: 'https://instagram.com/alexrodriguez',
              collaboratedBrands: ['Nike', 'Apple', 'Tesla'],
              contact: 'alex@influence.com',
              price: '$50,000/post'
            },
            {
              id: 2,
              name: 'Sarah Johnson',
              image: 'https://images.unsplash.com/photo-1494790108755-2616b332c0e3?w=300&h=300&fit=crop&crop=face',
              followers: '3.2M',
              category: 'Fashion',
              instagramUrl: 'https://instagram.com/sarahjohnson',
              collaboratedBrands: ['Gucci', 'Chanel', 'Louis Vuitton'],
              contact: 'sarah@fashioninfluence.com',
              price: '$75,000/post'
            },
            {
              id: 3,
              name: 'Mike Chen',
              image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
              followers: '1.8M',
              category: 'Tech',
              instagramUrl: 'https://instagram.com/mikechen',
              collaboratedBrands: ['Samsung', 'Microsoft', 'Google'],
              contact: 'mike@techinfluence.com',
              price: '$40,000/post'
            }
          ]
        };
      case 'macro':
        return {
          title: 'Macro Influencers',
          subtitle: 'Established creators with 100K-1M followers',
          influencers: [
            {
              id: 4,
              name: 'Emma Davis',
              image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
              followers: '450K',
              category: 'Beauty',
              instagramUrl: 'https://instagram.com/emmadavis',
              collaboratedBrands: ['Sephora', 'MAC', 'Urban Decay'],
              contact: 'emma@beautyinfluence.com',
              price: '$15,000/post'
            },
            {
              id: 5,
              name: 'James Wilson',
              image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
              followers: '320K',
              category: 'Fitness',
              instagramUrl: 'https://instagram.com/jameswilson',
              collaboratedBrands: ['Adidas', 'Under Armour', 'Protein World'],
              contact: 'james@fitinfluence.com',
              price: '$12,000/post'
            },
            {
              id: 6,
              name: 'Lisa Park',
              image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face',
              followers: '280K',
              category: 'Travel',
              instagramUrl: 'https://instagram.com/lisapark',
              collaboratedBrands: ['Airbnb', 'Booking.com', 'Emirates'],
              contact: 'lisa@travelinfluence.com',
              price: '$10,000/post'
            }
          ]
        };
      case 'micro':
        return {
          title: 'Micro Influencers',
          subtitle: 'Niche experts with 10K-100K followers',
          influencers: [
            {
              id: 7,
              name: 'Tom Garcia',
              image: 'https://images.unsplash.com/photo-1507592345855-de8e43068a37?w=300&h=300&fit=crop&crop=face',
              followers: '85K',
              category: 'Food',
              instagramUrl: 'https://instagram.com/tomgarcia',
              collaboratedBrands: ['HelloFresh', 'Blue Apron', 'Whole Foods'],
              contact: 'tom@foodinfluence.com',
              price: '$3,000/post'
            },
            {
              id: 8,
              name: 'Anna Martinez',
              image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop&crop=face',
              followers: '62K',
              category: 'Art',
              instagramUrl: 'https://instagram.com/annamartinez',
              collaboratedBrands: ['Adobe', 'Wacom', 'Skillshare'],
              contact: 'anna@artinfluence.com',
              price: '$2,500/post'
            },
            {
              id: 9,
              name: 'David Kim',
              image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=300&h=300&fit=crop&crop=face',
              followers: '45K',
              category: 'Gaming',
              instagramUrl: 'https://instagram.com/davidkim',
              collaboratedBrands: ['Razer', 'ASUS', 'Steam'],
              contact: 'david@gameinfluence.com',
              price: '$2,000/post'
            }
          ]
        };
      default:
        return { title: '', subtitle: '', influencers: [] };
    }
  };

  const { title, subtitle, influencers } = getSectionData();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>
          <p className="text-lg text-gray-300">{subtitle}</p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {influencers.map((influencer) => (
            <InfluencerCard
              key={influencer.id}
              influencer={influencer}
              onClick={() => setSelectedInfluencer(influencer)}
            />
          ))}
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="md:hidden overflow-x-auto pb-4">
          <div className="flex space-x-4" style={{ width: `${influencers.length * 280}px` }}>
            {influencers.map((influencer) => (
              <div key={influencer.id} className="w-64 flex-shrink-0">
                <InfluencerCard
                  influencer={influencer}
                  onClick={() => setSelectedInfluencer(influencer)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedInfluencer && (
        <InfluencerModal
          influencer={selectedInfluencer}
          onClose={() => setSelectedInfluencer(null)}
        />
      )}
    </section>
  );
};

export default InfluencerSection;
