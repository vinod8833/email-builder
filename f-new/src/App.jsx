import React from 'react';
import Navbar from './components/Navbar';
import EmailBuilder from './components/EmailBuilder';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <EmailBuilder />
    </div>
  );
};

export default App;
