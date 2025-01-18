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
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      default:
        return <Home />;
    }
  };

  return (
<div>
      <Header handleNavigation={handleNavigation} />
      <div className="body-content">
        <div className="main-content">
          {renderPageContent()}  
        </div>
        <div className="side-content">
          <Projects />  
        </div>
      </div>
    </div>
  );
};


export default App;
