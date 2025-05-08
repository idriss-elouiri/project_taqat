import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from "./components/Dashboard"
import './App.css';
import Navbar from './components/Navbar';
import SectionPage from './components/SectionPage';
import DisplayData from './components/DisplayData';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={user ? <Dashboard user={user} /> : <Login setUser={setUser} />} />
          <Route path="/section/:mainSite/:subSite" element={user ? <SectionPage /> : <Login setUser={setUser} />} />
          <Route path="/display/:mainSite/:subSite" element={user ? <DisplayData /> : <Login setUser={setUser} />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;