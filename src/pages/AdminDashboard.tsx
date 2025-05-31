import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Edit, Trash2, Users, Building } from 'lucide-react';
const AdminDashboard = () => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<any[]>([]);
  const [influencers, setInfluencers] = useState<any[]>([]);
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('influencers');
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      // Fetch all profiles
      const {
        data: profilesData,
        error: profilesError
      } = await supabase.from('profiles').select('*').order('created_at', {
        ascending: false
      });
      if (profilesError) throw profilesError;

      // Fetch influencers with profile data
      const {
        data: influencersData,
        error: influencersError
      } = await supabase.from('influencers').select(`
          *,
          profiles (*)
        `).order('created_at', {
        ascending: false
      });
      if (influencersError) throw influencersError;

      // Fetch businesses with profile data
      const {
        data: businessesData,
        error: businessesError
      } = await supabase.from('businesses').select(`
          *,
          profiles (*)
        `).order('created_at', {
        ascending: false
      });
      if (businessesError) throw businessesError;
      setProfiles(profilesData || []);
      setInfluencers(influencersData || []);
      setBusinesses(businessesData || []);
    } catch (error: any) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };
  const updateApprovalStatus = async (profileId: string, status: 'approved' | 'rejected') => {
    try {
      const {
        error
      } = await supabase.from('profiles').update({
        approval_status: status
      }).eq('id', profileId);
      if (error) throw error;
      toast.success(`Profile ${status} successfully`);
      fetchData();
    } catch (error: any) {
      toast.error('Failed to update approval status');
    }
  };
  const updateInfluencerTier = async (influencerId: string, tier: 'mega' | 'macro' | 'micro') => {
    try {
      const {
        error
      } = await supabase.from('influencers').update({
        tier
      }).eq('id', influencerId);
      if (error) throw error;
      toast.success(`Influencer moved to ${tier} tier`);
      fetchData();
    } catch (error: any) {
      toast.error('Failed to update tier');
    }
  };
  const deleteProfile = async (profileId: string) => {
    if (!confirm('Are you sure you want to delete this profile?')) return;
    try {
      const {
        error
      } = await supabase.from('profiles').delete().eq('id', profileId);
      if (error) throw error;
      toast.success('Profile deleted successfully');
      fetchData();
    } catch (error: any) {
      toast.error('Failed to delete profile');
    }
  };
  if (loading) {
    return <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>;
  }
  return <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-7xl mx-auto pt-20">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <Button onClick={() => navigate('/')} variant="outline">
            Back to Home
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Users className="w-8 h-8 text-pink-400" />
                <div>
                  <p className="text-white/60">Total Influencers</p>
                  <p className="text-2xl font-bold text-white">{influencers.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Building className="w-8 h-8 text-blue-400" />
                <div>
                  <p className="text-white/60">Total Businesses</p>
                  <p className="text-2xl font-bold text-white">{businesses.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <CheckCircle className="w-8 h-8 text-green-400" />
                <div>
                  <p className="text-white/60">Pending Approvals</p>
                  <p className="text-2xl font-bold text-white">
                    {profiles.filter(p => p.approval_status === 'pending').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-6">
          <div className="flex space-x-4">
            <Button onClick={() => setActiveTab('influencers')} variant={activeTab === 'influencers' ? 'default' : 'outline'} className="text-base bg-pink-500 hover:bg-pink-400 text-slate-50">
              Influencers
            </Button>
            <Button onClick={() => setActiveTab('businesses')} variant={activeTab === 'businesses' ? 'default' : 'outline'} className="text-white bg-blue-700 hover:bg-blue-600">
              Businesses
            </Button>
          </div>
        </div>

        {activeTab === 'influencers' && <div className="grid gap-6">
            {influencers.map(influencer => <Card key={influencer.id} className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white font-semibold text-lg">
                          {influencer.profiles.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white">{influencer.profiles.name}</h3>
                          <p className="text-gray-300">{influencer.profiles.email}</p>
                          <div className="flex space-x-2 mt-2">
                            <Badge variant={influencer.profiles.approval_status === 'approved' ? 'default' : influencer.profiles.approval_status === 'pending' ? 'secondary' : 'destructive'}>
                              {influencer.profiles.approval_status}
                            </Badge>
                            {influencer.tier && <Badge variant="outline" className="text-white border-white/20">
                                {influencer.tier}
                              </Badge>}
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 text-white">
                        <div>
                          <p><strong>Followers:</strong> {influencer.instagram_followers?.toLocaleString()}</p>
                          <p><strong>Category:</strong> {influencer.promotion_category}</p>
                          <p><strong>Price:</strong> ${influencer.price_per_promotion}</p>
                        </div>
                        <div>
                          <p><strong>Instagram:</strong> <a href={influencer.instagram_url} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">View Profile</a></p>
                          <p><strong>Contact:</strong> {influencer.public_contact}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2 ml-6">
                      {influencer.profiles.approval_status === 'pending' && <>
                          <Button onClick={() => updateApprovalStatus(influencer.profiles.id, 'approved')} size="sm" className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Approve
                          </Button>
                          <Button onClick={() => updateApprovalStatus(influencer.profiles.id, 'rejected')} size="sm" variant="destructive">
                            <XCircle className="w-4 h-4 mr-2" />
                            Reject
                          </Button>
                        </>}

                      {influencer.profiles.approval_status === 'approved' && <div className="space-y-2">
                          <select value={influencer.tier || ''} onChange={e => updateInfluencerTier(influencer.id, e.target.value as any)} className="p-2 rounded bg-white/10 border border-white/20 text-white text-sm">
                            <option value="">Select Tier</option>
                            <option value="micro">Micro</option>
                            <option value="macro">Macro</option>
                            <option value="mega">Mega</option>
                          </select>
                        </div>}

                      <Button onClick={() => deleteProfile(influencer.profiles.id)} size="sm" variant="destructive">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>)}
          </div>}

        {activeTab === 'businesses' && <div className="grid gap-6">
            {businesses.map(business => <Card key={business.id} className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-semibold text-lg">
                          {business.profiles.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white">{business.profiles.name}</h3>
                          <p className="text-gray-300">{business.profiles.email}</p>
                          <Badge variant={business.profiles.approval_status === 'approved' ? 'default' : business.profiles.approval_status === 'pending' ? 'secondary' : 'destructive'} className="mt-2">
                            {business.profiles.approval_status}
                          </Badge>
                        </div>
                      </div>

                      <div className="text-white space-y-2">
                        <p><strong>Organization:</strong> {business.organization_name}</p>
                        <p><strong>Business Type:</strong> {business.business_type}</p>
                        <p><strong>Contact:</strong> {business.public_contact}</p>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2 ml-6">
                      {business.profiles.approval_status === 'pending' && <>
                          <Button onClick={() => updateApprovalStatus(business.profiles.id, 'approved')} size="sm" className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Approve
                          </Button>
                          <Button onClick={() => updateApprovalStatus(business.profiles.id, 'rejected')} size="sm" variant="destructive">
                            <XCircle className="w-4 h-4 mr-2" />
                            Reject
                          </Button>
                        </>}

                      <Button onClick={() => deleteProfile(business.profiles.id)} size="sm" variant="destructive">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>)}
          </div>}
      </div>
    </div>;
};
export default AdminDashboard;