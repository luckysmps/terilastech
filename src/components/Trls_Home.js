import React, { useState } from "react";
import { useSprings, animated } from "react-spring";
import '../assets/styles/trls_home.css';
import { useScreenSize } from "./ScreenSizeProvider";

const Trls_Home = () => {
  const screenWidth = useScreenSize()
  const [hovered, setHovered] = useState(null);
  const corevalues=[{"cv":"Innovation"},
    {
      "cv":"Passion"
    },
    {
      "cv":"Accountability"
    },
    {
      "cv":"Integrity"
    }
  ]

  
  
  const springs = useSprings(
    corevalues.length,
    corevalues.map((_, index) => {
      const commonProps = {
        opacity: hovered === index ? 1 : 0.3,
        from: { opacity: 0, transform: 'scale(0.5) translateY(10px)' },
        to: { opacity: 1, transform: 'scale(1) translateY(0px)' },
        delay: index * 1500,
        config: { tension: 170, friction: 26 },
      };

      // Adjust for screen width
      if (screenWidth < 1200) {
        return {
          ...commonProps,
          from: { ...commonProps.from, transform: 'scale(0.5) translateY(50px)', marginTop: `${10 + index * 0}%` },
          to: { ...commonProps.to, transform: 'scale(1) translateY(0px)', marginTop: `${5 + index * 1}%` },
        };
      } else {
        return {
          ...commonProps,
          from: { ...commonProps.from, transform: 'scale(0.5) translateY(50px)', marginTop: `${10 + index * 0}%` },
          to: { ...commonProps.to, transform: 'scale(1) translateY(0px)', marginTop: `${5 + index * 1}%` },
        };
      }
    })
  );

  return (
    <div>
  
    <div className="home_service-cards-container">
    <div className="corevalues">
      <h1> Our Core Values</h1>
    </div>
      {corevalues.map(({ cv }, index) => (
        <animated.div
          key={index}
          style={springs[index]} 
          className="home_service-card"
        >
          <div className="home_card-content" 
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            
          >
            
            <div className="home_card-title">
              <h4>{cv}</h4>
            </div>
            </div>
         
        </animated.div>
      ))}
    </div>




    </div>
  );
};

export default Trls_Home;
