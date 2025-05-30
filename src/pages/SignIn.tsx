
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Sign In</h1>
          <p className="text-gray-300">Choose your account type to get started</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => navigate('/signin/influencer')}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 rounded-xl text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
          >
            <div className="flex items-center justify-center space-x-3">
              <span className="text-2xl">⭐</span>
              <span>Login as Influencer</span>
            </div>
          </button>

          <button
            onClick={() => navigate('/signin/business')}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-4 rounded-xl text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
          >
            <div className="flex items-center justify-center space-x-3">
              <span className="text-2xl">💼</span>
              <span>Login as Businessman</span>
            </div>
          </button>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-gray-300 hover:text-white transition-colors duration-300 underline"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
