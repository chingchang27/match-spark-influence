
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Heart, Search } from 'lucide-react';

const BusinessDashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [influencers, setInfluencers] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [searchCategory, setSearchCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
    fetchInfluencers();
    fetchFavorites();
  }, []);

  const fetchProfile = async () => {
    try {
      const userEmail = localStorage.getItem('currentUserEmail') || 'demo@example.com';
      
      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', userEmail)
        .eq('role', 'business')
        .single();

      if (error) throw error;
      setProfile(profileData);
    } catch (error: any) {
      toast.error('Failed to load profile');
      navigate('/signin');
    } finally {
      setLoading(false);
    }
  };

  const fetchInfluencers = async () => {
    try {
      let query = supabase
        .from('influencers')
        .select(`
          *,
          profiles!inner (*, approval_status)
        `)
        .eq('profiles.approval_status', 'approved');

      if (searchCategory) {
        query = query.eq('promotion_category', searchCategory);
      }

      const { data, error } = await query;

      if (error) throw error;
      setInfluencers(data || []);
    } catch (error: any) {
      toast.error('Failed to load influencers');
    }
  };

  const fetchFavorites = async () => {
    if (!profile) return;

    try {
      const { data, error } = await supabase
        .from('favorites')
        .select(`
          *,
          profiles!influencer_profile_id (
            *,
            influencers (*)
          )
        `)
        .eq('business_profile_id', profile.id);

      if (error) throw error;
      setFavorites(data || []);
    } catch (error: any) {
      console.error('Failed to load favorites:', error);
    }
  };

  const toggleFavorite = async (influencerProfileId: string) => {
    if (!profile) return;

    try {
      const existingFavorite = favorites.find(
        f => f.influencer_profile_id === influencerProfileId
      );

      if (existingFavorite) {
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('id', existingFavorite.id);

        if (error) throw error;
        toast.success('Removed from favorites');
      } else {
        const { error } = await supabase
          .from('favorites')
          .insert({
            business_profile_id: profile.id,
            influencer_profile_id: influencerProfileId
          });

        if (error) throw error;
        toast.success('Added to favorites');
      }

      fetchFavorites();
    } catch (error: any) {
      toast.error('Failed to update favorites');
    }
  };

  useEffect(() => {
    fetchInfluencers();
  }, [searchCategory]);

  useEffect(() => {
    if (profile) {
      fetchFavorites();
    }
  }, [profile]);

  const isFavorite = (influencerProfileId: string) => {
    return favorites.some(f => f.influencer_profile_id === influencerProfileId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-6xl mx-auto pt-20">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Business Dashboard</h1>
          <Button onClick={() => navigate('/')} variant="outline">
            Back to Home
          </Button>
        </div>

        <div className="mb-6">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Search Influencers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <select
                  value={searchCategory}
                  onChange={(e) => setSearchCategory(e.target.value)}
                  className="flex-1 p-2 rounded bg-white/10 border border-white/20 text-white"
                >
                  <option value="">All Categories</option>
                  <option value="fashion">Fashion</option>
                  <option value="food">Food</option>
                  <option value="sports">Sports</option>
                  <option value="beauty">Beauty</option>
                  <option value="tech">Tech</option>
                  <option value="lifestyle">Lifestyle</option>
                  <option value="travel">Travel</option>
                  <option value="fitness">Fitness</option>
                </select>
                <Button onClick={fetchInfluencers} className="bg-gradient-to-r from-blue-500 to-indigo-500">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {influencers.map((influencer) => (
            <Card key={influencer.id} className="bg-white/10 backdrop-blur-lg border-white/20 hover:border-white/40 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                      {influencer.profiles.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{influencer.profiles.name}</h3>
                      <p className="text-gray-300 text-sm">{influencer.promotion_category}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFavorite(influencer.profiles.id)}
                    className={`p-2 ${isFavorite(influencer.profiles.id) ? 'text-red-500' : 'text-gray-400'}`}
                  >
                    <Heart className={`w-5 h-5 ${isFavorite(influencer.profiles.id) ? 'fill-current' : ''}`} />
                  </Button>
                </div>

                <div className="text-white space-y-2">
                  <p><strong>Followers:</strong> {influencer.instagram_followers?.toLocaleString()}</p>
                  <p><strong>Price:</strong> ${influencer.price_per_promotion}</p>
                  <p><strong>Contact:</strong> {influencer.public_contact}</p>
                </div>

                <div className="mt-4">
                  <Button
                    onClick={() => window.open(influencer.instagram_url, '_blank')}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                  >
                    Connect on Instagram
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {influencers.length === 0 && (
          <div className="text-center text-white/60 mt-12">
            <p>No influencers found for the selected category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessDashboard;
