import React from 'react';
import './App.css';
import MicrofinancePlatform from './MicrofinancePlatform';
import Chatbot from "./Chatbot"; // Import chatbot component

function App() {
  return (
    <div className="App">
      <main>
        <MicrofinancePlatform />
        <Chatbot />
      </main>
    </div>
  );
}

export default App;
