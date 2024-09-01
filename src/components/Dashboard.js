import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Home from '../pages/Home';
import About from '../pages/About';
import Questions from '../pages/Questions';
import Logo from './logo.png';
import Profile from '../pages/Profile';
import Money from '../pages/Money';
import { GiHamburgerMenu } from "react-icons/gi";
import './dashboard.css';

function Dashboard() {
  const [ showNav, setShowNav ] = useState(false)
  return (
    <>
        <header>
          <div className='menu-btn'>
            <GiHamburgerMenu onClick={() => setShowNav(!showNav)} />
            </div>
            <div className='logo'>
              <img src={Logo} alt="Logo" className='logo'/>
              </div>
              <div className='logout'>
                  <Link to="/login">Logout</Link>
              </div>
        </header>

        <Navbar show={showNav} />
        <div className='main'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/money" element={<Money />} />
          </Routes>
        </div>
    </>
  );
}

export default Dashboard;
