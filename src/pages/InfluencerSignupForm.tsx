
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const InfluencerSignupForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    instagramUrl: '',
    instagramFollowers: '',
    promotionCategory: '',
    pricePerPromotion: '',
    publicContact: '',
    gender: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Starting influencer signup process...');
      
      // First create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      console.log('Auth signup result:', { authData, authError });

      if (authError) throw authError;

      if (!authData.user) {
        throw new Error('User creation failed - no user returned');
      }

      // Wait a moment for auth to process
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Insert profile using the authenticated user's ID
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          email: formData.email,
          name: formData.name,
          role: 'influencer'
        })
        .select()
        .single();

      console.log('Profile creation result:', { profile, profileError });

      if (profileError) throw profileError;

      // Insert influencer data
      const { error: influencerError } = await supabase
        .from('influencers')
        .insert({
          profile_id: profile.id,
          instagram_url: formData.instagramUrl,
          instagram_followers: parseInt(formData.instagramFollowers),
          promotion_category: formData.promotionCategory as any,
          price_per_promotion: parseFloat(formData.pricePerPromotion),
          public_contact: formData.publicContact,
          gender: formData.gender as any
        });

      console.log('Influencer creation result:', { influencerError });

      if (influencerError) throw influencerError;

      toast.success('Your account was successfully created. Please check your email to verify your account.');
      navigate('/signin/influencer');
    } catch (error: any) {
      console.error('Signup error:', error);
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
                <label className="text-white block mb-2">Password *</label>
                <Input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>

              <div>
                <label className="text-white block mb-2">Instagram URL *</label>
                <Input
                  required
                  value={formData.instagramUrl}
                  onChange={(e) => setFormData({...formData, instagramUrl: e.target.value})}
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
                <label className="text-white block mb-2">Public Contact Info *</label>
                <Textarea
                  required
                  value={formData.publicContact}
                  onChange={(e) => setFormData({...formData, publicContact: e.target.value})}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/signin/influencer')}
                  className="flex-1"
                >
                  Back to Login
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InfluencerSignupForm;
