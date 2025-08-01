'use client';

import HeroSection from '../components/HeroSection';
import Text from '../components/Text';
import TypesOfTherapy from '../components/TypesOfTherapy';
import PickYourGuide from '../components/PickYourGuide';
import FormalFAQ from '../components/FormalFAQ';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <HeroSection />
      <Text />
      <TypesOfTherapy />
      <PickYourGuide />
      <FormalFAQ />
      <Footer />
    </>
  );
}
