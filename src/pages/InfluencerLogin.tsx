
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const InfluencerLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Check for admin credentials
      if (formData.email === 'kovvuchingchang@gmail.com' && formData.password === 'admin@123?') {
        localStorage.setItem('currentUserEmail', formData.email);
        navigate('/admin-dashboard');
        return;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      // Check if user is an influencer
      const { data: profile } = await supabase
        .from('profiles')
        .select('role, approval_status')
        .eq('email', formData.email)
        .single();

      if (profile?.role === 'influencer') {
        // Store email for dashboard access
        localStorage.setItem('currentUserEmail', formData.email);
        toast.success('Login successful!');
        navigate('/influencer-dashboard');
      } else {
        toast.error('Invalid credentials for influencer account');
        await supabase.auth.signOut();
      }
    } catch (error: any) {
      toast.error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-md mx-auto pt-20">
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-center text-white text-2xl">Influencer Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-white block mb-2">Email</label>
                <Input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>

              <div>
                <label className="text-white block mb-2">Password</label>
                <Input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
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
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-300 mb-3">New user? Create an account</p>
              <Button
                onClick={() => navigate('/signup/influencer')}
                variant="outline"
                className="w-full"
              >
                Sign Up as Influencer
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InfluencerLogin;
