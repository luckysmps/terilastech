import React,{useState} from "react";
import './App.css'; 
/*
import Header from "./components/Trls_Header";

import Home from "./components/Trls_Services"
import About from "./components/Trls_About"*/
import HeaderTest from "./components/Trls_Header-test";
import Contact from "./components/Trls_Contact"
import Projects from "./components/Trls_Home"

function App() {
  const [selectedPage, setSelectedPage] = useState('home');

  const handleNavigation = (page) => {
    setSelectedPage(page);
  };

  const renderPageContent = () => {
    switch (selectedPage) {
      case 'home':
        return <Contact />;
      case 'about':
        return <Contact />;
      case 'TaskApp':
        return <Contact />;
      default:
        return <Contact />;
    }
  };
 /* const hasSideContent = selectedPage === 'about' || selectedPage === 'home'; */
  
  const hasSideContent = selectedPage === 'about';

  return (
    <div>
      <HeaderTest handleNavigation={handleNavigation} />
      <div className={`body-content ${hasSideContent ? 'with-side' : ''}`}>
        <div className="main-content">
          {renderPageContent()}  
        </div>
        {hasSideContent && (
          <div className="side-content">
            <Projects />
          </div>
        )}
      </div>
    </div>
  );
};


export default App;
