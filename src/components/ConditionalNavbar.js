'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

const ConditionalNavbar = () => {
  const pathname = usePathname();
  const isChatSession = pathname?.startsWith('/chat-session/');

  // Don't render navbar on chat session pages
  if (isChatSession) {
    return null;
  }

  return <Navbar />;
};

export default ConditionalNavbar; 