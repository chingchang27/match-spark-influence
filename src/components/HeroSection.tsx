
import React from 'react';

const HeroSection = () => {
  return (
    <section id="home" className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
              Connect with
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                {" "}Top Influencers
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed animate-fade-in">
              Bridge the gap between businesses and influencers. Whether you're looking for mega, macro, or micro influencers, 
              we help you find the perfect match to grow your brand and reach your target audience.
            </p>
            <button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-pink-500/25">
              Get Started Today
            </button>
          </div>

          {/* Animated Image */}
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-white/10 backdrop-blur-lg rounded-lg p-8 hover:scale-105 transition-transform duration-300">
                <div className="w-64 h-64 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white text-lg font-semibold shadow-2xl">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📱</div>
                    <div>Influencer</div>
                    <div>Promoting</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
