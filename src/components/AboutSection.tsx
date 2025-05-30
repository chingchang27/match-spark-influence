
import React from 'react';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
          About Me
        </h2>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
          <div className="mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full mx-auto flex items-center justify-center text-white text-2xl font-bold mb-4">
              👨‍🎓
            </div>
          </div>
          
          <h3 className="text-2xl font-semibold text-white mb-4">
            Passionate Student Developer
          </h3>
          
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            Hi! I'm a dedicated student with a vision to revolutionize how businesses and influencers connect. 
            This platform was born from my passion for technology and my belief that authentic partnerships 
            can drive incredible business growth.
          </p>
          
          <p className="text-lg text-gray-300 leading-relaxed mb-8">
            My goal is to create meaningful connections that benefit both businesses looking to expand their reach 
            and influencers seeking genuine brand partnerships. Together, we can build a stronger, more connected 
            marketing ecosystem.
          </p>
          
          <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-lg p-6 border border-pink-500/30">
            <h4 className="text-xl font-semibold text-white mb-3">Mission Statement</h4>
            <p className="text-gray-300">
              "To bridge the gap between businesses and influencers, creating authentic partnerships 
              that drive growth, engagement, and success for everyone involved."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
