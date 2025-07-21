import React from 'react';

const menuItems = [
  { label: 'Dashboard', key: 'dashboard' },
  { label: 'Profile', key: 'profile' },
  { label: 'Settings', key: 'settings' },
  { label: 'Logout', key: 'logout' },
];

const Menu: React.FC = () => {
  return (
    <aside
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 32,
        boxSizing: 'border-box',
      }}
    >
      {menuItems.map((item) => (
        <button
          key={item.key}
          style={{
            background: 'none',
            border: 'none',
            padding: '16px 24px',
            textAlign: 'left',
            fontSize: 16,
            color: '#333',
            cursor: 'pointer',
            width: '100%',
            outline: 'none',
          }}
        >
          {item.label}
        </button>
      ))}
    </aside>
  );
};

export default Menu;
