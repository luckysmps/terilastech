import React from 'react';
import '../assets/styles/trls_about.css';
import skills from '../json/skills.json'
import Terilasteahlog from '../assets/images/logo.png'
const Trls_About = () => {
 

  return (
    <div>
    <div className="about-us-container">
    <div className='leftiintro'>
    <section className="about-us-introduction">
      <div className='introheading'><h1>Welcome to</h1> <h1 className='c_naame'> TeRiLaS Tech!</h1></div>
      <p>
        I'm Sravani, the founder, and I am passionate about helping businesses thrive through cutting-edge, scalable software solutions.
        With over 10 years of experience in modern technologies such as React.js, Node.js, Python, and AWS, as well as expertise in low-code platforms like Power Apps, Retool, and Zoho, my team and I are dedicated to delivering impactful, data-driven solutions that streamline operations and drive success.
      </p>
    
      <p>
        At TeRiLaS Tech, we believe in providing customized services that cater to your unique business needs, boosting operational efficiency, and enhancing productivity. Whether it’s creating innovative software, automating workflows, or leveraging data analytics to make smarter decisions, we ensure that each solution we offer is both innovative and practical.
      </p>

    </section>

    <section className="about-us-approach">
      <h2>Our Approach</h2>
      <p>
        With a proven track record of successfully leading teams and delivering scalable solutions, I am proud to have contributed to over 200+ dashboards and 400+ workflows that have revolutionized businesses. From automating reporting processes using VBA and Power BI to streamlining workflows across various platforms, we focus on providing innovative and efficient solutions that drive measurable results.
      </p>
      <p>
        At TeRiLaS Tech, we don’t just deliver technical solutions—we build long-term partnerships. I am eager to explore opportunities to collaborate with your organization and help achieve your business goals.
      </p>
    </section>

    <section className="about-us-contact">
      <h2>Let's Connect</h2>
      <p>
        I would love to discuss how we can work together to make your business more efficient, scalable, and data-driven. Please feel free to reach out to me directly at: <a href="mailto:sravani@terilastech.com">sravani@terilastech.com</a>
      </p>
       

    </section>
    <section className="about-us-skills">
    <div className='teamskills'>
    <h1>Our Team Skills</h1>
      <i><p>{skills.join(', ')}</p> </i>
    </div>
    </section>



    </div>
    <div className='intrologo'>
      <img src={Terilasteahlog} alt='TeRiLaS Logo'/>
    </div>
    </div>

  

    
    </div>
);

};

export default Trls_About;