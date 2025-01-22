import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../assets/styles/trls_control.css'
const CheckList = ({
  disName_lb,
  bgColor_lb,
  textColor_lb,
  fontFamily_lb,
  fontSize_lb,
  isBold_lb,
  isItalic_lb,
  isUnderlined_lb,

  
}) => {
  // Combine the label styles and the textbox styles
  const labelStyles = {
    color: textColor_lb,
    backgroundColor: bgColor_lb,
    fontFamily: fontFamily_lb,
    fontSize: fontSize_lb,
    fontWeight: isBold_lb ? 'bold' : 'normal',
    fontStyle: isItalic_lb ? 'italic' : 'normal',
    textDecoration: isUnderlined_lb ? 'underline' : 'none',
  };

  const [ckStatus, setCkStatus]=useState(false)

 
  const checkStatus =(e)=>{
    setCkStatus(e.target.checked)
    
  }
  
  const chkstyle={
    height:"30px",
    width:"30px",
    marginLeft:"20px"
  }
  return (
    <div className='input-container-cb'>

      <label style={{...labelStyles, padding:"10px"}} >{disName_lb}</label>
      <div className='valueclass-cb'>
      <input type="checkbox" 
       style={chkstyle}
       checked={ckStatus}
       onChange= {checkStatus} />
       </div>
      
    </div>
  );
};

CheckList.propTypes = {
  disName_lb: PropTypes.string.isRequired,
  bgColor_lb: PropTypes.string.isRequired,
  textColor_lb: PropTypes.string.isRequired,
  fontFamily_lb: PropTypes.string.isRequired,
  fontSize_lb: PropTypes.string.isRequired,
  isBold_lb: PropTypes.bool.isRequired,
  isItalic_lb: PropTypes.bool.isRequired,
  isUnderlined_lb: PropTypes.bool.isRequired,
  bgColor: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  fontFamily: PropTypes.string.isRequired,
  fontSize: PropTypes.string.isRequired,
  isBold: PropTypes.bool.isRequired,
  isItalic: PropTypes.bool.isRequired,
  isUnderlined: PropTypes.bool.isRequired,
};

export default CheckList;
