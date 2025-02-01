import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import '../assets/styles/trls_control.css';

const SelectOption = ({
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

  const [selectedOption, setSelectedOption] = useState(value || "0");
  const [isValid, setIsValid] = useState(true);

  // Use ref to store the previous selected label
  const prevSelectedLabelRef = useRef('');

  const handleDropdownChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
  };

  const optionArray = (options || '')
    .split(';')
    .map((option, index) => ({
      label: option,
      value: `${index + 1}`, // Using the index + 1 as the value for each option
    }));

  useEffect(() => {
    const selectedLabel = optionArray.find(option => option.value === selectedOption)?.label || '';

    // Only trigger onChange if the label has changed
    if (onChange && selectedLabel && selectedLabel !== prevSelectedLabelRef.current) {
      onChange(selectedLabel);
    }

    // Update the ref with the new selected label
    prevSelectedLabelRef.current = selectedLabel;
  }, [selectedOption, onChange, optionArray]);

  const newIsValid = isRequired && selectedOption === "0"? false : true;

  useEffect(() => {
    if (isValid !== newIsValid) {
      setIsValid(newIsValid);
      if (onValidityChange) {
        onValidityChange(cid, newIsValid);
      }
    }
  }, [newIsValid, isValid, cid, onValidityChange]);

  useEffect(() => {
    if (reset) {
      setSelectedOption("0"); // Reset to '0', not an empty array
    }
  }, [reset]); // This will trigger when `reset` changes
  return (
    <div className="input-container">
      <div className="displyname">
        <div className="displynamelable">
          <label style={labelStyles}>{disName_lb}</label>
        </div>
        {isRequired && selectedOption ==="0" && <div className="asterisk">*</div>}
      </div>
      <div className="valueclass">
        <select
          value={selectedOption}
          onChange={handleDropdownChange}
          style={textboxStyles}
        >
          {isRequired && <option value="0">Select</option>}
          {optionArray.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

SelectOption.propTypes = {
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
  reset: PropTypes.bool,
  onValidityChange: PropTypes.func,

};

export default SelectOption;
