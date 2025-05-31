
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const InfluencerSignup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    instagramFollowers: '',
    instagramUrl: '',
    facebookUrl: '',
    publicContact: '',
    gender: '',
    promotionCategory: '',
    pricePerPromotion: '',
    profileImage: null as File | null
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Check for admin credentials
      if (formData.email === 'kovvuchingchang@gmail.com') {
        navigate('/admin-dashboard');
        return;
      }

      // Insert profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .insert({
          email: formData.email,
          name: formData.name,
          role: 'influencer'
        })
        .select()
        .single();

      if (profileError) throw profileError;

      // Upload profile image if provided
      let profileImageUrl = null;
      if (formData.profileImage) {
        const fileExt = formData.profileImage.name.split('.').pop();
        const fileName = `${profile.id}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('profile-images')
          .upload(fileName, formData.profileImage);

        if (!uploadError) {
          const { data } = supabase.storage
            .from('profile-images')
            .getPublicUrl(fileName);
          profileImageUrl = data.publicUrl;
        }
      }

      // Insert influencer data
      const { error: influencerError } = await supabase
        .from('influencers')
        .insert({
          profile_id: profile.id,
          instagram_followers: parseInt(formData.instagramFollowers),
          instagram_url: formData.instagramUrl,
          facebook_url: formData.facebookUrl,
          public_contact: formData.publicContact,
          gender: formData.gender,
          promotion_category: formData.promotionCategory,
          price_per_promotion: parseFloat(formData.pricePerPromotion),
          profile_image_url: profileImageUrl
        });

      if (influencerError) throw influencerError;

      toast.success('Your request was successfully sent. Please wait for admin approval.');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-2xl mx-auto pt-20">
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-center text-white text-2xl">Influencer Registration</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-white block mb-2">Name *</label>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>

              <div>
                <label className="text-white block mb-2">Email *</label>
                <Input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>

              <div>
                <label className="text-white block mb-2">Instagram Followers *</label>
                <Input
                  type="number"
                  required
                  value={formData.instagramFollowers}
                  onChange={(e) => setFormData({...formData, instagramFollowers: e.target.value})}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>

              <div>
                <label className="text-white block mb-2">Instagram URL *</label>
                <Input
                  type="url"
                  required
                  value={formData.instagramUrl}
                  onChange={(e) => setFormData({...formData, instagramUrl: e.target.value})}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>

              <div>
                <label className="text-white block mb-2">Facebook URL</label>
                <Input
                  type="url"
                  value={formData.facebookUrl}
                  onChange={(e) => setFormData({...formData, facebookUrl: e.target.value})}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>

              <div>
                <label className="text-white block mb-2">Public Contact Info *</label>
                <Textarea
                  required
                  value={formData.publicContact}
                  onChange={(e) => setFormData({...formData, publicContact: e.target.value})}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>

              <div>
                <label className="text-white block mb-2">Gender *</label>
                <select
                  required
                  value={formData.gender}
                  onChange={(e) => setFormData({...formData, gender: e.target.value})}
                  className="w-full p-2 rounded bg-white/10 border border-white/20 text-white"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="text-white block mb-2">Promotion Category *</label>
                <select
                  required
                  value={formData.promotionCategory}
                  onChange={(e) => setFormData({...formData, promotionCategory: e.target.value})}
                  className="w-full p-2 rounded bg-white/10 border border-white/20 text-white"
                >
                  <option value="">Select Category</option>
                  <option value="fashion">Fashion</option>
                  <option value="food">Food</option>
                  <option value="sports">Sports</option>
                  <option value="beauty">Beauty</option>
                  <option value="tech">Tech</option>
                  <option value="lifestyle">Lifestyle</option>
                  <option value="travel">Travel</option>
                  <option value="fitness">Fitness</option>
                </select>
              </div>

              <div>
                <label className="text-white block mb-2">Price per Promotion ($) *</label>
                <Input
                  type="number"
                  step="0.01"
                  required
                  value={formData.pricePerPromotion}
                  onChange={(e) => setFormData({...formData, pricePerPromotion: e.target.value})}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>

              <div>
                <label className="text-white block mb-2">Profile Image</label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFormData({...formData, profileImage: e.target.files?.[0] || null})}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/signin')}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                >
                  {loading ? 'Submitting...' : 'Submit'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InfluencerSignup;
