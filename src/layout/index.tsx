import React, {  } from 'react';
import Header from './Header/Header';
import Body from './Body';
import Footer from './Footer';
import './layout.scss';

export default function Layout({ headerName = '', children }) {

  return (
      <>
        <Header/>
        <Body>
          {children}
        </Body>
        <Footer />
      </>
  );
}
