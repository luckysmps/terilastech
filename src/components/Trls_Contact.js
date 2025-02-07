import React from 'react';
import '../assets/styles/trls_contact.css';
import TextboxEmail from '../components/Trls_TextboxEmail'
const Trls_Contact = () => {
 

  return (
    <div className="contact-container"> 
        <div className="contact-heading">
          <h2>Contact TeRiLaS Tech – We’re Here to Help!</h2>
        </div>
        <div className='contact-fields'>
        <TextboxEmail />

        </div>
    </div>
  )
};

export default Trls_Contact;