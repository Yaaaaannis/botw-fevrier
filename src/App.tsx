import { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loader from './components/Loader/Loader';
import LayoutTransition from './components/LayoutTransition/LayoutTransition';
import HomePage from './components/HomePage/HomePage';
import InscriptionPage from './components/InscriptionPage/InscriptionPage';
import { type LayoutType } from './context/ThemeContext';
import './App.css';

function App() {
  const [currentLayout, setCurrentLayout] = useState<LayoutType>('modern');

  const switchLayout = useCallback(() => {
    setCurrentLayout(prev => prev === 'hiphop' ? 'modern' : 'hiphop');
  }, []);

  return (
    <BrowserRouter>
      <Loader />
      <LayoutTransition
        currentLayout={currentLayout}
        onSwitch={switchLayout}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/inscription" element={<InscriptionPage />} />
        </Routes>
      </LayoutTransition>
    </BrowserRouter>
  );
}

export default App;
