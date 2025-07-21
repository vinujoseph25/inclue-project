import React from 'react';
import classNames from 'classnames';
import { Container } from '@mui/material';

const isIPhone = /iPhone/.test(navigator.userAgent);

const ariaProps = !!isIPhone
  ? {}
  : {
      tabIndex: -1,
    };

interface BodyProps {
  children: React.ReactNode;
}

const Body: React.FC<BodyProps> = ({ children }) => {
  const viewportClass = classNames({
    viewport: true,
  });

  const containerClass = classNames({
    'content-container': true,
  });

  return (
    <div
      id="viewport"
      className={viewportClass}
      style={{
        display: 'flex',
        padding: '1rem',
        textAlign: 'center',
        background: '#ebe0e0ff',
        height: '100vh',
      }}
    >
      <Container className={containerClass} disableGutters>
        {children}
      </Container>
    </div>
  );
};

export default Body;
