import React, { useState } from 'react';
import myapps from '../json/myapps.json';
import '../assets/styles/trls_myapps.css';
import TaskApp from '../components/Trls_TaskApp';
import TimeApp from '../components/Trls_TimeApp';
import DataApp from '../components/Trls_DataApp';
import FormApp from '../components/Trls_FormApp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';  

const Trls_myapps = () => {
  const [selectedPage, setSelectedPage] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false); // Track fullscreen state

  const handleNavigation = (page) => {
    setSelectedPage(page);
    setIsFullscreen(true); // Set fullscreen when navigating to a subapp
  };

  const handleGoBack = () => {
    setSelectedPage(''); 
    setIsFullscreen(false); 
  };

  const renderPageContent = () => {
    switch (selectedPage) {
      case 'task_app':
        return <TaskApp />;
      case 'time_app':
        return <TimeApp />;
      case 'data_app':
        return <DataApp />;
      case 'form_app':
        return <FormApp />;
      default:
        return "";
    }
  };

  return (
    
    <div > 
      <div className={`myapps-container ${isFullscreen ? 'fullscreen' : ''}`}>
        {selectedPage ? (
          <div className="myapps-component-container">
            <button onClick={handleGoBack}  > <FontAwesomeIcon icon={faHome} /> </button> 
            {renderPageContent()}
          </div>
        ) : (
          <>
            <div className="myapps-header">
              <h2>My Apps</h2>
            </div>
            <div className="myapps-cardcontainer">
              {myapps.map(({ title, image, component }, index) => (
                <div key={index} className="myapps-card">
                  <div className="myapps-title">
                    <h3>{title}</h3>
                  </div>
                  <div className="myapps-image">
                    <img src={require(`../assets/images/${image}`)} alt={title} />
                  </div>
                  <div className="myapps-footer">
                    <button
                      className="myapps_start_button"
                      onClick={() => handleNavigation(component)} 
                    >
                      Start
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Trls_myapps;
