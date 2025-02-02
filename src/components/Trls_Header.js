import React, { useState } from 'react';
import '../assets/styles/trls_Header.css'
import logo from '../assets/images/trlslogo.png'

const Trls_Header = ({handleNavigation}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('home');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClick  = (e, page) => {
    e.preventDefault(); 
    handleNavigation(page);
    setSelectedItem(page);
    setIsMenuOpen(!isMenuOpen);
  }


  return (
    <header className="header">
      <div className="logo">
       <img src={logo} alt='TeRiLaS Tech' />
            {/* <div className="text-container">
            <h1>TeRiLaS Tech</h1>
            <h2 className="slogan">- Work Smarter, Not Harder -</h2>
            </div> */}
      </div>
      <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
        <ul>
          <li><a href="#home" onClick={(e) => handleClick (e, 'home')} className={selectedItem === 'home' ? 'selected' : ''}>Home</a></li>
          <li><a href="#ai_hub" onClick={(e) => handleClick (e, 'ai_hub')} className={selectedItem === 'ai_hub' ? 'selected' : ''}>AI Hub</a></li>
          <li><a href="#myapps" onClick={(e) => handleClick (e, 'myapps')} className={selectedItem === 'myapps' ? 'selected' : ''}>My Apps</a></li>
          <li><a href="#about" onClick={(e) => handleClick (e, 'about')} className={selectedItem === 'about' ? 'selected' : ''}> About</a></li>
          <li><a href="#contact" onClick={(e) => handleClick (e, 'contact')} className={selectedItem === 'contact' ? 'selected' : ''}>Contact</a></li>
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
