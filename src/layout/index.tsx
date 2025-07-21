import React from 'react';
import Menu from './Menu';
import Header from './Header';
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
      <Menu />
      <Header />
      <Body>{children}</Body>
      <Footer />
    </>
  );
}
