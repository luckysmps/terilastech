import React, { useState,useEffect } from 'react';
import '../assets/styles/trls_taskapp.css';
import SideBar from '../components/Trls_SideBar';
import PageCreation from '../components/Trls_PageCreationNew';
import ProjectCreation from '../components/Trls_PojectCreation';

const Trls_TaskApp = () => {
  const [selectedItem, setSelectedItem] = useState('');
  const [countOfRecords, setCountOfRecords] = useState(0); 
  const [textboxValue, setTextboxValue] = useState(''); 

  const handleProjectCreation = (recordsCount, textValue) => {
    setCountOfRecords(recordsCount);
    setTextboxValue(textValue);
  };

  const handleItemSelect = (item) => {
    setCountOfRecords(0)
    setTextboxValue('')
    setSelectedItem('')
    setSelectedItem(item);
  };

  useEffect(() => {
  }, [countOfRecords,textboxValue])


  return (
    <div className="task-container"> 
      <div className='taskappleftnave'>
        <SideBar onItemSelect={handleItemSelect} />
      </div>
      <div className='taskappbody'>
        {/* Conditionally render components based on selectedItem */}
        {selectedItem === 'createproject' && (
          <ProjectCreation onProjectCreate={handleProjectCreation} />
        )}
        {selectedItem === 'createproject' && (textboxValue.length)>=5 && countOfRecords ===0 && (
          <PageCreation countOfRecords={countOfRecords} textboxValue={textboxValue} />
        )}
      </div>
    </div>
  );
};

export default Trls_TaskApp;
