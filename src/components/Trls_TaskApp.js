import React,{useState} from 'react';
import '../assets/styles/trls_taskapp.css';
import SideBar from '../components/Trls_SideBar';
import PageCreation from '../components/Trls_PageCreationNew'
const Trls_TaskApp = () => {
 
  const [selectedItem, setSelectedItem] = useState('');

  const handleItemSelect = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="task-container"> 
    <div className='taskappleftnave'>
    <SideBar onItemSelect={handleItemSelect} />
    </div>
    <div className='taskappbody'>
    {selectedItem === 'createproject' && <PageCreation />}
    </div>
    </div>
  )
};

export default Trls_TaskApp;