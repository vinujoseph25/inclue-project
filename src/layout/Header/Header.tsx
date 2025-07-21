import React, {  } from 'react';
import classNames from 'classnames';
import './header.scss';

// useIsMicrosoftUser: updated Header component to match the usage from the rc1.5 branch
const Header = () => {

  const headerClass = classNames('header-main', {
    'header-root': true,
  });

  return (
    <>
      <header className={headerClass}>
        {"Header"}
      </header>
    </>
  );
};

export default Header;
