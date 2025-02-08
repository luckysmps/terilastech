import React, { useState } from 'react';
import TextboxText from '../components/Trls_TextboxText';
import '../assets/styles/trls_pc.css';
import axios from 'axios';

const Trls_ProjectCreation = ({ onProjectCreate }) => {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [color, setColor] = useState('gary'); 
  const [countOfRecords, setCountOfRecords] = useState(0)
  const handleInputChange = (value) => {
    setText(value);
    setResult(null)
    setColor('')
  };

  const handleCheckText = async () => {
    if (!text.trim()) {
      setResult('Please enter a project name.');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:55050/check-text/${text}`);
      const count_of_records=Object.keys(response.data.p_name_exists).length
      setCountOfRecords(count_of_records)
      if (count_of_records) {
        setResult('Project Name is Already Available. Please Choose Another!');
        setColor('red')
        
      } else {
        setResult('Project name is available. Please begin creating the rubric.');
        setColor('green')
       
      }
      onProjectCreate(count_of_records, text);
    } catch (error) {
      if (error.response) {
        setResult(`Error: ${error.response.data.message || 'Server error'}`);
      } else if (error.request) {
        setResult('Error: Unable to connect to the server');
      } else {
        setResult('Error: An unexpected error occurred');
      }
      console.error('Error checking text:', error);
    }
  };

  return (
    <div className="pc_main_container">
        <div className="ProjectCreationHeading">
            <h2>Project Creation Page</h2>
        </div>
        <div className="pc_container">
                <div className="pc_tb">
                    <TextboxText
                    cid={1} 
                    value={text}
                    disName_lb="Enter Project Name"
                    isBold_lb={true}
                    isRequired={true}
                    fontSize_lb="20px"
                    minLength={5}
                    onChange={handleInputChange}
                    />
                </div>
                <div className="pc_btn">
                    <button type="button" onClick={handleCheckText} disabled={text.length < 5} >
                    Check Availability
                    </button>
                </div>
        </div>
    <div>
      {result && (<p  style={{color: color , display:'flex', justifyContent:'left', margin:'10px', fontWeight:'700'}} >{result} </p> )}
    </div>
  
    </div>
  );
};

export default Trls_ProjectCreation;