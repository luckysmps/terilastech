import React, { useState,useEffect,useRef } from 'react';
import PropTypes from 'prop-types';
import '../assets/styles/trls_control.css';

const SelectStar = ({
  cid,
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
  options,
  isRequired,
  value, 
  onChange, 
  reset,
  onValidityChange,
  
}) => {

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
    width: '100%',
  };

  const [selectedOption, setSelectedOption] = useState('');
  const [isValid, setIsValid] = useState(true);
  const optionArray =  (options || '').split(';').map((option, index) => ({
    label: option,
    value: `${index + 1}`,
  }));

  const handleStarClick  = (value) => {
    setSelectedOption(value === selectedOption ? '' : value);

  };

  const newIsValid = isRequired && selectedOption ==='' ? false : true;

  const valueRef = useRef(value);
  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  useEffect(() => {
    if (onChange && selectedOption !== valueRef.current) {
      onChange(selectedOption);
    }
  }, [selectedOption, onChange]);
  

  useEffect(() => {
    if (isValid !== newIsValid) {
      setIsValid(newIsValid);
      
        onValidityChange?.(cid, newIsValid);
      }    
  }, [ newIsValid, isValid, cid, onValidityChange]);

  useEffect(() => {
    if (reset) {
      setSelectedOption('');
    }
  }, [reset]); // This will trigger when `reset` changes

  return (
    <div className="input-container">
        <div className='displyname'>
      <div className='displynamelable'>
      <label style={labelStyles}>
        {disName_lb}
      </label>
      </div>
        {isRequired && selectedOption ==='' && <div className="asterisk">*</div>}

    </div>
      <div className="valueclassss">
       
        {optionArray.map((option) => (
            <div key={option.value}>  
                <label className='starselect' style={textboxStyles}>
                      <input
                      type="radio"
                      value={option.label}
                      onClick={() => handleStarClick(option.label)}
                      style={{display:"none"}}
                    />
                <span
                className={`startlabel ${selectedOption >= (option.label) ? 'selected' : ''}`}
                >
                &#9733;
              </span>
              </label>
            </div>
        ))}
   
        
      </div>
      </div>
  );
};

SelectStar.propTypes = {
  cid: PropTypes.number,
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

export default SelectStar;
