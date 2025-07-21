import React from 'react';
import classNames from 'classnames';
import './header.scss';

// useIsMicrosoftUser: updated Header component to match the usage from the rc1.5 branch
const Header = () => {
  const headerClass = classNames('header-main', {
    'header-root': true,
  });

  return (
    <>
      <header className={headerClass} style={{ padding: '1rem', textAlign: 'center', background: '#f5f5f5' }}>
        {'Header'}
      </header>
    </>
  );
};

export default Header;
