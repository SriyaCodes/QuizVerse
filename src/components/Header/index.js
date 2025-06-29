import React from 'react';
import { Menu, Container } from 'semantic-ui-react';
import './header.css'; // or App.css, whichever you’re using

const Header = () => {
  return (
    <Menu stackable className="quizverse-navbar">
      <Container textAlign="center" style={{ width: '100%' }}>
        <Menu.Item header style={{ margin: '0 auto' }}>
          <h1 style={{ margin: 0, fontSize: '1.8rem' }}>QUIZVERSE</h1>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default Header;
