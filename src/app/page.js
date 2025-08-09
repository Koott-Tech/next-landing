'use client';

import Image from 'next/image';
import HeroSection from '../components/HeroSection';
import Text from '../components/Text';
import TypesOfTherapy from '../components/TypesOfTherapy';
import HumanChatSection from '../components/HumanChatSection';
import NeverAloneSection from '../components/NeverAloneSection';
import PickYourGuide from '../components/PickYourGuide';
import HowItWorks from '../components/HowItWorks';
import ClientReview from '../components/ClientReview';
import FormalFAQ from '../components/FormalFAQ';

export default function Home() {
  return (
    <>
      <HeroSection />
      <Text />
      <TypesOfTherapy />
      <HumanChatSection />
      <NeverAloneSection />
      <PickYourGuide />
      <HowItWorks />
      <ClientReview />
      <FormalFAQ />
      
      {/* Clouds Image */}
      <div style={{ width: '100%', height: '250px', overflow: 'hidden', marginTop: '60px', marginBottom: '0', position: 'relative' }}>
        <Image 
          src="/clouds.jpg" 
          alt="Clouds" 
          fill
          style={{ 
            objectFit: 'cover',
            objectPosition: 'center'
          }} 
        />
      </div>
      
      {/* Footer is now rendered globally in RootLayout */}
    </>
  );
}
