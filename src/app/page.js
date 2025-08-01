'use client';

import HeroSection from '../components/HeroSection';
import Text from '../components/Text';
import TypesOfTherapy from '../components/TypesOfTherapy';
import HumanChatSection from '../components/HumanChatSection';
import NeverAloneSection from '../components/NeverAloneSection';
import PickYourGuide from '../components/PickYourGuide';
import HowItWorks from '../components/HowItWorks';
import ClientReview from '../components/ClientReview';
import FormalFAQ from '../components/FormalFAQ';
import Footer from '../components/Footer';

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
      <Footer />
    </>
  );
}
