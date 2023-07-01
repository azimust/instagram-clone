import { useContext, useState } from 'react';
import './App.css';
import Auth from './components/Auth/Auth';
import Feed from './components/Feed/Feed';
import { GlobalContext } from './state/context/GlobalContext';

function App() {
  const {isAuthenticated, isOnboarded} = useContext(GlobalContext)

  return (
    isAuthenticated && isOnboarded ? <Feed /> : <Auth />
  );
}

export default App;
