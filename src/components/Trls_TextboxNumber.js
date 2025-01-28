import React, { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import '../assets/styles/trls_control.css'
const TextboxNumber = ({
  disName_lb,
  bgColor_lb,
  textColor_lb,
  fontFamily_lb,
  fontSize_lb,
  isBold_lb,
  isItalic_lb,
  isUnderlined_lb,
  bgColor,
  textColor,
  fontFamily,
  fontSize,
  isBold,
  isItalic,
  isUnderlined,
  isRequired,
  value, 
  onChange, 
  reset,
  onValidityChange,
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

  const textboxStyles = {
    color: textColor,
    backgroundColor: bgColor,
    fontFamily: fontFamily,
    fontSize: fontSize,
    fontWeight: isBold ? 'bold' : 'normal',
    fontStyle: isItalic ? 'italic' : 'normal',
    textDecoration: isUnderlined ? 'underline' : 'none',
  };

  const [ipLen, setIpLen]=useState('')
  const [isValid, setIsValid] = useState(true);
  const lengthvalidation =(e)=>{
    let  v=e.target.value
    v = v.replace(/[^0-9]/g, '');
     setIpLen(v)
     e.target.value=v
     if (onChange) {
      onChange(e.target.value); 
    }
  }
  
  useEffect(() => {
    setIpLen('');
  }, [reset]);

  const newIsValid = isRequired && ipLen.length < 1 ? false : true;

  useEffect(() => {
    if (isValid !== newIsValid) {
      setIsValid(newIsValid);
      if (onValidityChange) {
        onValidityChange(disName_lb, newIsValid);
      }
    }
  }, [ipLen, newIsValid, isValid, disName_lb, onValidityChange]);

  return (
    <div className='input-container'>

<div className='displyname'>
      <div className='displynamelable'>
      <label style={labelStyles}>
        {disName_lb}
      </label>
      </div>
            {isRequired && ipLen.length < 1 && <div className='asterisk'>*</div>}

    </div>
      <div className='valueclass'>
      <input
        type="tel"
        style={textboxStyles}
        value={value}
        onChange={lengthvalidation}
     />
       
        </div>
      
    </div>
  );
};

TextboxNumber.propTypes = {
  disName_lb: PropTypes.string,
  bgColor_lb: PropTypes.string,
  textColor_lb: PropTypes.string,
  fontFamily_lb: PropTypes.string,
  fontSize_lb: PropTypes.string,
  isBold_lb: PropTypes.bool,
  isItalic_lb: PropTypes.bool,
  isUnderlined_lb: PropTypes.bool,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  fontFamily: PropTypes.string,
  fontSize: PropTypes.string,
  isBold: PropTypes.bool,
  isItalic: PropTypes.bool,
  isUnderlined: PropTypes.bool,
  options: PropTypes.string, 
  isRequired: PropTypes.bool, 
  value: PropTypes.string, 
  onChange: PropTypes.func, 
  reset: PropTypes.bool,
  onValidityChange: PropTypes.func,
};

export default TextboxNumber;
