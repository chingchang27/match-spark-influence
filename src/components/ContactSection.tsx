
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ContactSection = () => {
  const navigate = useNavigate();

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
          Contact Us
        </h2>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Ready to start your influencer marketing journey? We're here to help you connect 
            with the right influencers for your brand. Get in touch with us today!
          </p>
          
          <div className="space-y-6 mb-8">
            <div className="flex items-center justify-center space-x-4">
              <div className="text-2xl">📧</div>
              <div>
                <p className="text-white font-semibold">Email Us</p>
                <p className="text-gray-300">kovvuchingchang@gmail.com</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-4">
              <div className="text-2xl">⏰</div>
              <div>
                <p className="text-white font-semibold">Response Time</p>
                <p className="text-gray-300">Within 24 hours</p>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => navigate('/contact')}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-pink-500/25"
          >
            Contact Us Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
