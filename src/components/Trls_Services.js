import React, { useState, useEffect } from "react";
import servicesData from '../json/services.json';
import '../assets/styles/trls_services.css';

const Trls_Service = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div>
      <div className="textheading">
      <h1>We Are Expertized In ...</h1>
      </div>
    <div className="services_services-container">
      
      {servicesData.map(({ title, color, image, details }, index) => (
        <div 
          key={index} 
          className={`services_service-card ${isLoaded ? 'animate-shake' : ''}`}
          style={{ backgroundColor: color }}
        >
          <div className="services_service-header">
          <img 
            src={image.startsWith("http") ? image : require(`../assets/images/${image}`)} 
            alt={title} 
            className="services_service-image" 
          />
            <h3 className="services_service-title">{title}</h3>
          </div>
          <div className="services_service-body">
            <ul className="services_service-description">
                    {details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
            </ul>
          </div>
          <div className="services_service-footer">
            <button className="services_contact-button">Contact</button>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Trls_Service;
