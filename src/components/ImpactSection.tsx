
import React from 'react';

const ImpactSection = () => {
  const impacts = [
    {
      icon: '📈',
      title: 'Increased Brand Awareness',
      description: 'Reach millions of potential customers through authentic influencer content'
    },
    {
      icon: '🎯',
      title: 'Targeted Marketing',
      description: 'Connect with your exact audience through niche-specific influencers'
    },
    {
      icon: '💰',
      title: 'Higher ROI',
      description: 'Get better returns on investment compared to traditional advertising'
    },
    {
      icon: '🤝',
      title: 'Authentic Partnerships',
      description: 'Build genuine relationships that resonate with real audiences'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            How Influencers Help Your Business Grow
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover the powerful impact of influencer marketing on your business success
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {impacts.map((impact, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 text-center group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {impact.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">{impact.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{impact.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
