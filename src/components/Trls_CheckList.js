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
  bgColor,
  textColor,
  fontFamily,
  fontSize,
  isBold,
  isItalic,
  isUnderlined,
  options,
  isRequired,
  
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

  const handleCheckboxChange = (e) => {
    const value = e.target.value;

    setSelectedOption((prevSelectedOptions) => {
      // Check if the value is already in the array
      if (prevSelectedOptions.includes(value)) {
        // Remove the value if it's already selected
        return prevSelectedOptions.filter((option) => option !== value);
      } else {
        // Add the value if it's not selected
        return [...prevSelectedOptions, value];
      }
    });
  };

  const optionArray =  (options || '').split(';').map((option, index) => ({
    label: option,
    value: `${index + 1}`, // Using the index + 1 as the value for each option
  }));

  return (
    <div className="input-container">
        <div className='displyname'>
      <div className='displynamelable'>
      <label style={labelStyles}>
        {disName_lb}
      </label>
      </div>
        {isRequired && selectedOption === '' && <div className="asterisk">*</div>}

    </div>
      <div className="valueclassrb">
       
        {optionArray.map((option) => (
            <div key={option.value}>  
                <label className='radiocheck' style={textboxStyles}>
                      <input
                      type="checkbox"
                      value={option.value}
                      checked={selectedOption.includes(option.value)} 
                      onChange={handleCheckboxChange}
                      
                    />
                  {option.label}
              </label>
            </div>
        ))}
   
        
      </div>
      </div>
  );
};

CheckList.propTypes = {
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
};
export default CheckList;
