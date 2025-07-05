import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SongList from './pages/SongList';
import SongDetail from './pages/SongDetail';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SongList />} />
        <Route path="/song/:id" element={<SongDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;