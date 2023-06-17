import React from 'react';
import { Routes,Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Watchlist from './pages/watchlist/Watchlist';

function Main() {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/Watchlist" element={<Watchlist/>}/>

        </Routes>
      
    </div>
  )
}

export default Main

