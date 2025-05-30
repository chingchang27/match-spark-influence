
import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import InfluencerSection from '../components/InfluencerSection';
import ImpactSection from '../components/ImpactSection';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <InfluencerSection type="mega" />
      <InfluencerSection type="macro" />
      <InfluencerSection type="micro" />
      <ImpactSection />
      <AboutSection />
      <ContactSection />
    </div>
  );
};

export default Index;
