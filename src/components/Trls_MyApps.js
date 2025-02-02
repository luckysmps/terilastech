import React from 'react';
import myapps from '../json/myapps.json';
import '../assets/styles/trls_myapps.css';

const Trls_myapps = () => {
 

  return (

    <div className="myapps-container">
    <div className="myapps-header">
      <h2>My Apps</h2>
    </div>
       <div className="myapps-cardcontainer">
      {myapps.map(({ title, image }, index) => (
        <div key={index} className="myapps-card">
          <div className="myapps-title">
            <h3>{title}</h3>
          </div>
          <div className="myapps-image">
          <img src={ require(`../assets/images/${image}`)} alt={title} />    
          </div>
          <div className="myapps-footer">
            <button className="myapps_start_button">Start</button>
          </div>
        </div>
      ))}
    </div>
  </div>
  
);

};

export default Trls_myapps;