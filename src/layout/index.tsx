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
    <div style={{ display: 'flex' }}>
      <div className="side-menu">
        <Menu />
      </div>
      <div className="content" style={{ flex: 1 }}>
        <Header />
        <Body>{children}</Body>
        <Footer />
      </div>
    </div>
  );
}
