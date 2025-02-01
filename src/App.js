import React,{useState} from "react";
import './App.css'; 
import Header from "./components/Trls_Header";
import Home from "./components/Trls_Services"
import About from "./components/Trls_About"
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
        return <Home />;
      case 'ai_hub':
        return <Home />;
      case 'apps':
        return <Home />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      default:
        return <Home />;
    }
  };
 /* const hasSideContent = selectedPage === 'about' || selectedPage === 'home'; */
  
  const hasSideContent = selectedPage === 'about';

  return (
    <div>
      <Header handleNavigation={handleNavigation} />
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
