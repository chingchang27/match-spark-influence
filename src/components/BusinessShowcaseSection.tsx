
import React from 'react';
import { Building, Users, TrendingUp, Target } from 'lucide-react';

const BusinessShowcaseSection = () => {
  const businessFeatures = [
    {
      icon: <Target className="w-8 h-8 text-blue-400" />,
      title: "Targeted Marketing",
      description: "Reach your ideal customers through carefully selected influencers in your niche."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-green-400" />,
      title: "Measurable ROI",
      description: "Track campaign performance and see real results from your influencer partnerships."
    },
    {
      icon: <Users className="w-8 h-8 text-purple-400" />,
      title: "Audience Engagement",
      description: "Connect with engaged audiences through authentic influencer recommendations."
    },
    {
      icon: <Building className="w-8 h-8 text-orange-400" />,
      title: "Brand Growth",
      description: "Expand your brand reach and build trust through influencer collaborations."
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why Businesses Choose Our Platform
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Join hundreds of businesses that have successfully grown their brand through 
            strategic influencer partnerships on our platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {businessFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 text-center"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h3>
            <p className="text-gray-300 mb-6">
              Create your business account today and start connecting with top influencers.
            </p>
            <button
              onClick={() => window.location.href = '/signin/business'}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Join as Business
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessShowcaseSection;
