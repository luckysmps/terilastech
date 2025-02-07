import React, { useState } from 'react';
import '../assets/styles/trls_sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChartLine, 
  faTachometerAlt, 
  faCogs, 
  faPlusCircle, 
  faUpload, 
  faUserTag, 
  faUserPlus,
  faChevronUp,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons';

const Trls_SideBar = ({ onItemSelect }) => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('dashboard');

  const handleClick = (e, item) => {
    e.preventDefault();
    setSelectedItem(item);
    onItemSelect(item);
    if (item === 'manageActivity') {
      setIsSubmenuOpen(!isSubmenuOpen);
    } else if (item !== 'createproject' && item !== 'createproject' && item !== 'fileupload'&& item !== 'addroles' && item !== 'adduser')  {
      setIsSubmenuOpen(false);
    }
  };
  return (
    <div className="sidebarcontainer">
      <div className="mainlist">
        <ul>
         <li><a href="#dashboard" onClick={(e) => handleClick (e, 'dashboard')} className={selectedItem === 'dashboard' ? 'navselected' : ''}><span className="navspans"><FontAwesomeIcon icon={faTachometerAlt} /></span>Dashboard</a></li>
          <li><a href="#analytics" onClick={(e) => handleClick (e, 'analytics')} className={selectedItem === 'analytics' ? 'navselected' : ''}><span className="navspans"><FontAwesomeIcon icon={faChartLine} /></span>Analytics</a></li>
          <li><a href="#manageActivity" onClick={(e) => handleClick (e, 'manageActivity')} className={selectedItem === 'manageActivity' ? 'navselected' : ''}><span className="navspans"><FontAwesomeIcon icon={faCogs} /></span>Manage Activity <span className="navspanleft"> <FontAwesomeIcon icon={isSubmenuOpen ? faChevronUp : faChevronDown} /></span> </a></li>
          <ul className={`submenu ${isSubmenuOpen ? 'open' : ''}`}>
            <li><a href="#"  onClick={(e) => handleClick (e, 'createproject')} className={selectedItem === 'createproject' ? 'subnavselected' : ''}><span className="navspans"><FontAwesomeIcon icon={faPlusCircle} /></span>Create Project</a></li>
            <li><a href="#" onClick={(e) => handleClick (e, 'fileupload')} className={selectedItem === 'fileupload' ? 'subnavselected' : ''}><span className="navspans"><FontAwesomeIcon icon={faUpload} /></span>File Upload</a></li>
            <li><a href="#" onClick={(e) => handleClick (e, 'addroles')} className={selectedItem === 'addroles' ? 'subnavselected' : ''}><span className="navspans"><FontAwesomeIcon icon={faUserTag} /></span>Add Roles</a></li>
            <li><a href="#" onClick={(e) => handleClick (e, 'adduser')} className={selectedItem === 'adduser' ? 'subnavselected' : ''}><span className="navspans"><FontAwesomeIcon icon={faUserPlus} /></span>Add User</a></li>
          </ul>
        </ul>
      </div>
    </div>
  );
};

export default Trls_SideBar;
