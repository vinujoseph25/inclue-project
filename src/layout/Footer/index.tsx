import React from 'react';

const Footer: React.FC = () => (
  <footer style={{ padding: '1rem', textAlign: 'center', background: '#f5f5f5' }}>
    <span>© {new Date().getFullYear()} Inclue. All rights reserved.</span>
  </footer>
);

export default Footer;
