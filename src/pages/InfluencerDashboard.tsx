
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Edit3, MessageCircle, Save, X } from 'lucide-react';

const InfluencerDashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [influencer, setInfluencer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    instagram_followers: '',
    price_per_promotion: '',
    public_contact: '',
    instagram_url: '',
    facebook_url: ''
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
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

      if (error) {
        console.error('Profile fetch error:', error);
        toast.error('Failed to load profile');
        navigate('/signin');
        return;
      }
      
      setProfile(profileData);
      if (profileData.influencers && profileData.influencers.length > 0) {
        const influencerData = profileData.influencers[0];
        setInfluencer(influencerData);
        setFormData({
          instagram_followers: influencerData.instagram_followers?.toString() || '',
          price_per_promotion: influencerData.price_per_promotion?.toString() || '',
          public_contact: influencerData.public_contact || '',
          instagram_url: influencerData.instagram_url || '',
          facebook_url: influencerData.facebook_url || ''
        });
      }
    } catch (error: any) {
      console.error('Fetch profile error:', error);
      toast.error('Failed to load profile');
      navigate('/signin');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    // Reset form data
    if (influencer) {
      setFormData({
        instagram_followers: influencer.instagram_followers?.toString() || '',
        price_per_promotion: influencer.price_per_promotion?.toString() || '',
        public_contact: influencer.public_contact || '',
        instagram_url: influencer.instagram_url || '',
        facebook_url: influencer.facebook_url || ''
      });
    }
  };

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from('influencers')
        .update({
          instagram_followers: parseInt(formData.instagram_followers),
          price_per_promotion: parseFloat(formData.price_per_promotion),
          public_contact: formData.public_contact,
          instagram_url: formData.instagram_url,
          facebook_url: formData.facebook_url
        })
        .eq('profile_id', profile.id);

      if (error) throw error;

      toast.success('Profile updated successfully');
      setEditing(false);
      fetchProfile();
    } catch (error: any) {
      toast.error('Failed to update profile');
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

  const openAdminChat = () => {
    toast.info('Admin chat feature will be available soon!');
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
          <div className="flex gap-4">
            <Button onClick={openAdminChat} className="bg-gradient-to-r from-green-500 to-emerald-500">
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat with Admin
            </Button>
            <Button onClick={() => navigate('/')} variant="outline">
              Back to Home
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-white">Profile Information</CardTitle>
                {!editing ? (
                  <Button onClick={handleEdit} size="sm" className="bg-gradient-to-r from-pink-500 to-purple-500">
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button onClick={handleSave} size="sm" className="bg-green-600 hover:bg-green-700">
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button onClick={handleCancel} size="sm" variant="outline">
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
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

              {editing ? (
                <div className="text-white space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Followers:</label>
                    <Input
                      type="number"
                      value={formData.instagram_followers}
                      onChange={(e) => setFormData({...formData, instagram_followers: e.target.value})}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Price per Promotion ($):</label>
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.price_per_promotion}
                      onChange={(e) => setFormData({...formData, price_per_promotion: e.target.value})}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Instagram URL:</label>
                    <Input
                      value={formData.instagram_url}
                      onChange={(e) => setFormData({...formData, instagram_url: e.target.value})}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Facebook URL:</label>
                    <Input
                      value={formData.facebook_url}
                      onChange={(e) => setFormData({...formData, facebook_url: e.target.value})}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Contact Info:</label>
                    <Textarea
                      value={formData.public_contact}
                      onChange={(e) => setFormData({...formData, public_contact: e.target.value})}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                </div>
              ) : (
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
              )}
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Card Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white/20 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <div className="text-center">
                  <div className="relative mb-4">
                    <Avatar className="w-16 h-16 mx-auto">
                      <AvatarImage src={influencer?.profile_image_url} />
                      <AvatarFallback className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
                        {profile?.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs px-2 py-1 rounded-full">
                      {influencer?.instagram_followers ? `${(influencer.instagram_followers / 1000).toFixed(0)}K` : '0K'}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white mb-2">{profile?.name}</h3>
                  <p className="text-gray-300 text-sm mb-4">{influencer?.promotion_category || 'Category'}</p>
                  
                  <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    ${influencer?.price_per_promotion || '0'}/post
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-gray-300 text-sm">
                  {profile?.approval_status === 'approved' 
                    ? 'Your card is live on the website!' 
                    : 'Waiting for admin approval to go live'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InfluencerDashboard;
