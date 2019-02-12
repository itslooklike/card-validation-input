import React, { Component } from 'react';
import styled from 'styled-components';
import Card from './Card';
import './App.css';

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

class App extends Component {
  render() {
    return (
      <Content>
        <Card />
      </Content>
    );
  }
}

export default App;
