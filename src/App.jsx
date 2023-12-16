import { useEffect } from 'react';
import './App.css'
import Root from './components/Root';
import StockListContextProvider from './contexts/StockListContext';

function App() {
  console.log(process.env.NODE_ENV, import.meta.env.VITE_SECRET);

  return (
    <StockListContextProvider>
      <Root />
    </StockListContextProvider>
  );
}

export default App
