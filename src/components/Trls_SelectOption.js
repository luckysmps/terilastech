import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../assets/styles/trls_control.css';

const SelectOption = ({
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
  options, // Semicolon-separated options
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

  };

  const [selectedOption, setSelectedOption] = useState('0');

  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value);
  };

  console.log('Received options in SelectOption:', options);

  // Split the semicolon-separated options string into an array
  const optionArray =  (options || '').split(';').map((option, index) => ({
    label: option,
    value: `${index + 1}`, // Using the index + 1 as the value for each option
  }));

  return (
    <div className="input-container">
      <label style={labelStyles}>{disName_lb}</label>
      <div className="valueclass">
        <select
          value={selectedOption}
          onChange={handleDropdownChange}
          style={textboxStyles} 
        >
          <option value="0">Select</option>
          {optionArray.map((option, index) => (

            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {/* Optional: Show an asterisk if the selected option is empty (invalid) */}
        {selectedOption === '0' && <div className="asterisk">*</div>}
      </div>

    </div>
  );
};

SelectOption.propTypes = {
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
  options: PropTypes.string.isRequired, // Semicolon-separated options
  layout: PropTypes.oneOf(['vertical', 'horizontal']).isRequired, // Layout style ('vertical' or 'horizontal')
};

export default SelectOption;
