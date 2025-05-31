
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const InfluencerDashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [influencer, setInfluencer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      // In a real app, you'd get the current user's email from authentication
      // For demo purposes, we'll use a placeholder
      const userEmail = localStorage.getItem('currentUserEmail') || 'demo@example.com';
      
      const { data: profileData, error } = await supabase
        .from('profiles')
        .select(`
          *,
          influencers (*)
        `)
        .eq('email', userEmail)
        .eq('role', 'influencer')
        .single();

      if (error) throw error;
      
      setProfile(profileData);
      setInfluencer(profileData.influencers[0]);
    } catch (error: any) {
      toast.error('Failed to load profile');
      navigate('/signin');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${profile.id}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('profile-images')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('profile-images')
        .getPublicUrl(fileName);

      const { error: updateError } = await supabase
        .from('influencers')
        .update({ profile_image_url: data.publicUrl })
        .eq('profile_id', profile.id);

      if (updateError) throw updateError;

      fetchProfile();
      toast.success('Profile image updated successfully');
    } catch (error: any) {
      toast.error('Failed to update profile image');
    }
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
      <div className="max-w-4xl mx-auto pt-20">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Influencer Dashboard</h1>
          <Button onClick={() => navigate('/')} variant="outline">
            Back to Home
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={influencer?.profile_image_url} />
                  <AvatarFallback className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
                    {profile?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-white font-semibold">{profile?.name}</h3>
                  <p className="text-gray-300">{profile?.email}</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
                    className="mt-2 text-sm text-gray-300"
                  />
                </div>
              </div>

              <div className="text-white space-y-2">
                <p><strong>Followers:</strong> {influencer?.instagram_followers?.toLocaleString()}</p>
                <p><strong>Category:</strong> {influencer?.promotion_category}</p>
                <p><strong>Price:</strong> ${influencer?.price_per_promotion}</p>
                <p><strong>Status:</strong> 
                  <span className={`ml-2 px-2 py-1 rounded text-sm ${
                    profile?.approval_status === 'approved' ? 'bg-green-500' : 
                    profile?.approval_status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}>
                    {profile?.approval_status}
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-white">{influencer?.instagram_followers || 0}</div>
                  <div className="text-white/80">Followers</div>
                </div>
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-white">${influencer?.price_per_promotion || 0}</div>
                  <div className="text-white/80">Per Post</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white/10 backdrop-blur-lg border-white/20 mt-6">
          <CardHeader>
            <CardTitle className="text-white">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="text-white space-y-2">
            <p><strong>Instagram:</strong> <a href={influencer?.instagram_url} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">{influencer?.instagram_url}</a></p>
            {influencer?.facebook_url && (
              <p><strong>Facebook:</strong> <a href={influencer?.facebook_url} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">{influencer?.facebook_url}</a></p>
            )}
            <p><strong>Contact:</strong> {influencer?.public_contact}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InfluencerDashboard;
