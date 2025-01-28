import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import '../assets/styles/trls_control.css';

const MultiSelect = ({
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

  const [searchText, setSearchText] = useState('');
  const [selectedOption, setSelectedOption] = useState([]);
  const [isValid, setIsValid] = useState(true);

  const optionArray = (options || '').split(';').map((option, index) => ({
    label: option,
    value: `${index + 1}`,
  }));

  const filteredOptions = optionArray.filter(
    (option) =>
      option.label.toLowerCase().includes(searchText.toLowerCase()) &&
      !selectedOption.includes(option.value)
  );

  const handleDropdownChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption((prevSelectedOptions) => {
      if (prevSelectedOptions.includes(selectedValue)) {
        return prevSelectedOptions.filter((option) => option !== selectedValue);
      } else {
        return [...prevSelectedOptions, selectedValue];
      }
    });
    setSearchText('');
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleRemoveSelectedItem = (value) => {
    setSelectedOption((prevSelectedOption) =>
      prevSelectedOption.filter((option) => option !== value)
    );
  };

  const [ipLen, setIpLen] = useState('');

  const prevSelectedLabelRef = useRef([]);  // Track previous value of selected labels

useEffect(() => {
  const selectedLabel = optionArray
    .filter((option) => selectedOption.includes(option.value))
    .map((option) => option.label);

  const newIpLen = selectedLabel.join(', ');

  // Only update ipLen if it changes
  if (newIpLen !== ipLen) {
    setIpLen(newIpLen);
  }

  // Update onChange if selectedLabel is different from the previous value
  if (onChange && selectedLabel.join(';') !== prevSelectedLabelRef.current.join(';')) {
    onChange(selectedLabel.join(';'));
  }

  // Update the reference to the latest selectedLabel
  prevSelectedLabelRef.current = selectedLabel; // store the array of labels
}, [selectedOption, optionArray, onChange,ipLen]);  // Removed ipLen from dependencies



  const newIsValid = isRequired && ipLen.length < 3 ? false : true;

  useEffect(() => {
    if (isValid !== newIsValid) {
      setIsValid(newIsValid);
      if (onValidityChange) {
        onValidityChange(disName_lb, newIsValid);
      }
    }
  }, [newIsValid, isValid, disName_lb, onValidityChange]);

  useEffect(() => {
    if (reset) {
      setSelectedOption([]); // Reset to '0', not an empty array
    }
  }, [reset]);

  return (
    <div className="input-container">
      <div className="displyname">
        <div className="displynamelable">
          <label style={labelStyles}>{disName_lb}</label>
        </div>
        {isRequired && ipLen.length < 3 && <div className="asterisk">*</div>}
      </div>

      <div className="search-select-wrapper">
        <div className="selecteditems">
          {optionArray
            .filter((option) => selectedOption.includes(option.value))
            .map((option, index) => (
              <div key={index} className="selected-item">
                <label style={textboxStyles}>
                  {option.label}
                  <span
                    className="remove-item"
                    onClick={() => handleRemoveSelectedItem(option.value)}
                  >
                    &times;
                  </span>
                </label>
              </div>
            ))}
        </div>

        <div className="searchitems">
          <input
            type="text"
            value={searchText}
            style={textboxStyles}
            placeholder="Search Here..."
            onChange={handleSearchChange}
          />
        </div>
        <div className="multiselectoptions">
          {filteredOptions.length === 0 && searchText ? (
            <div>No results found</div>
          ) : (
            <>
              {filteredOptions.map((option, index) => (
                <div className="items" key={index}>
                  <label className="multicheck" style={textboxStyles}>
                    <input
                      type="checkbox"
                      value={option.value}
                      checked={selectedOption.includes(option.value)}
                      onChange={handleDropdownChange}
                      hidden
                    />
                    {option.label}
                  </label>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

MultiSelect.propTypes = {
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

export default MultiSelect;
