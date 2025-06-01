
import React, { useState, useEffect } from 'react';
import InfluencerCard from './InfluencerCard';
import InfluencerModal from './InfluencerModal';
import { supabase } from '@/integrations/supabase/client';

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

interface DatabaseInfluencer {
  id: string;
  instagram_followers: number;
  promotion_category: string;
  price_per_promotion: number;
  instagram_url: string;
  public_contact: string;
  profile_image_url?: string;
  profiles: {
    name: string;
  };
}

interface InfluencerSectionProps {
  type: 'mega' | 'macro' | 'micro';
}

const InfluencerSection: React.FC<InfluencerSectionProps> = ({ type }) => {
  const [selectedInfluencer, setSelectedInfluencer] = useState<Influencer | null>(null);
  const [databaseInfluencers, setDatabaseInfluencers] = useState<DatabaseInfluencer[]>([]);

  useEffect(() => {
    fetchApprovedInfluencers();
  }, [type]);

  const fetchApprovedInfluencers = async () => {
    try {
      const { data, error } = await supabase
        .from('influencers')
        .select(`
          *,
          profiles!inner (name, approval_status)
        `)
        .eq('profiles.approval_status', 'approved')
        .eq('tier', type);

      if (error) throw error;
      setDatabaseInfluencers(data || []);
    } catch (error) {
      console.error('Error fetching influencers:', error);
    }
  };

  const getSectionData = () => {
    switch (type) {
      case 'mega':
        return {
          title: 'Mega Influencers',
          subtitle: 'Celebrity-level reach with 1M+ followers',
        };
      case 'macro':
        return {
          title: 'Macro Influencers',
          subtitle: 'Established creators with 100K-1M followers',
        };
      case 'micro':
        return {
          title: 'Micro Influencers',
          subtitle: 'Niche experts with 10K-100K followers',
        };
      default:
        return { title: '', subtitle: '' };
    }
  };

  const convertToInfluencerFormat = (dbInfluencer: DatabaseInfluencer): Influencer => {
    return {
      id: parseInt(dbInfluencer.id.slice(0, 8), 16), // Convert UUID to number
      name: dbInfluencer.profiles.name,
      image: dbInfluencer.profile_image_url || `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face`,
      followers: formatFollowers(dbInfluencer.instagram_followers),
      category: dbInfluencer.promotion_category,
      instagramUrl: dbInfluencer.instagram_url,
      collaboratedBrands: [], // This would need to be added to the database schema
      contact: dbInfluencer.public_contact,
      price: `$${dbInfluencer.price_per_promotion}/post`
    };
  };

  const formatFollowers = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(0)}K`;
    }
    return count.toString();
  };

  const { title, subtitle } = getSectionData();
  const influencers = databaseInfluencers.map(convertToInfluencerFormat);

  // If no approved influencers for this tier, don't render the section
  if (influencers.length === 0) {
    return null;
  }

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
