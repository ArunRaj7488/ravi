import React from 'react';
import logo from './logo.svg';
import './App.css';
import FileUploader from './components/fileUploader';

function App() {
  return (
    <div style={{ display: 'flex', justifyContent:'center', alignItems:'center', height: '50vh' }}>
     < FileUploader />
    </div>
  );
}

export default App;
