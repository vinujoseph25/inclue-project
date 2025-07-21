import React from 'react';
import classNames from 'classnames';
import { Container } from '@mui/material';
interface BodyProps {
  children: React.ReactNode;
}

const Body: React.FC<BodyProps> = ({ children }) => {
  const contentClass = classNames({
    content: true,
  });

  const containerClass = classNames({
    'content-container': true,
  });

  return (
    <div id="content" className={contentClass}>
      <Container className={containerClass} disableGutters>
        {children}
      </Container>
    </div>
  );
};

export default Body;
