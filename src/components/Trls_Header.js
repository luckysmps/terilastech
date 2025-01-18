import React, { useState } from 'react';
import '../assets/styles/trls_Header.css'
import logo from '../assets/images/logo_symbol.png'

const Trls_Header = ({handleNavigation}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClick  = (e, page) => {
    e.preventDefault(); 
    handleNavigation(page); 
  }


  return (
    <header className="header">
      <div className="logo">
       <img src={logo} alt='TeRiLaS Tech' />
       <div className="text-container">
    <h1>TeRiLaS Tech</h1>
    <h2 className="slogan">- Work Smarter, Not Harder -</h2>
  </div>
      </div>
      <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
        <ul>
          <li><a href="#home" onClick={(e) => handleClick (e, 'home')}>Home</a></li>
          <li><a href="#ai_hub" onClick={(e) => handleClick (e, 'ai_hub')}>AI Hub</a></li>
          <li><a href="#about" onClick={(e) => handleClick (e, 'about')}>About</a></li>
          <li><a href="#contact" onClick={(e) => handleClick (e, 'contact')}>Contact</a></li>
        </ul>
      </nav>
      <div className="hamburger" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  );
};

export default Trls_Header;
