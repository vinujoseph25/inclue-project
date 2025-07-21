import React from 'react';
import Header from './Header/Header';
import Body from './Body';
import Footer from './Footer';
import './layout.scss';

interface LayoutProps {
  headerName?: string;
  children: React.ReactNode;
}

export default function Layout({ headerName = '', children }: LayoutProps) {
  return (
    <>
      <Header />
      <Body>{children}</Body>
      <Footer />
    </>
  );
}
