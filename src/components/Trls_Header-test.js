import React, { useState } from 'react';
import '../assets/styles/trls_Header.css'

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
       {/*<img src={''} alt='TeRiLaS Tech' />*/}
       <div className="text-container">
    <h1>''</h1>
    <h2 className="slogan">''</h2>
  </div>
      </div>
      <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
        <ul>
          <li><a href="#Task App" onClick={(e) => handleClick (e, 'TaskApp')} className={selectedItem === 'TaskApp' ? 'selected' : ''}>Home</a></li>
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
