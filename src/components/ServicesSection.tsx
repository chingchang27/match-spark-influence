
import React from 'react';

const ServicesSection = () => {
  const services = [
    {
      title: 'Mega Influencers',
      description: 'Celebrity-level influencers with 1M+ followers for maximum brand exposure',
      icon: '🌟',
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      title: 'Macro Influencers',
      description: 'Established creators with 100K-1M followers for targeted campaigns',
      icon: '🚀',
      gradient: 'from-blue-400 to-purple-500'
    },
    {
      title: 'Micro Influencers',
      description: 'Niche experts with 10K-100K followers for authentic engagement',
      icon: '💎',
      gradient: 'from-green-400 to-blue-500'
    }
  ];

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Services
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose the perfect influencer category that matches your brand's needs and budget
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white/10 backdrop-blur-lg rounded-xl p-8 hover:scale-105 transition-all duration-300 border border-white/20 hover:border-white/40"
            >
              <div className="text-center">
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{service.description}</p>
                <button className={`bg-gradient-to-r ${service.gradient} text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-lg`}>
                  Get Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
