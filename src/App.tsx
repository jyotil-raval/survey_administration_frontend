import React from 'react';
import './App.css';
import Header from './components/header';
import Footer from './components/footer';
import Body from './containers/body';

const App = () => {
  return (
    <div className='App'>
      <Header></Header>
      <Body></Body>
      <Footer></Footer>
    </div>
  );
};

export default App;
