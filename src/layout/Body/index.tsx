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
    'content-container': true
  });

  return (
    <div id="viewport" className={viewportClass}>
      <div id="kpi-portal" />
      <div id="viewport-content">
        {"Menu"}
        <div id="content">
          <Container className={containerClass} disableGutters>
            {/* {"Body"} */}
            {children}
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Body;
