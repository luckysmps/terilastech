import React, { useState, useEffect , useRef} from 'react';
import PropTypes from 'prop-types';
import '../assets/styles/trls_control.css';

const SearchSelect = ({
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

  const [searchText, setSearchText] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [showDropdown, setShowDropdown] = useState(0);
  const [timer, setTimer] = useState(null);
  const [isValid, setIsValid] = useState(true);

  // Use ref to store the previous selected label
  const prevSelectedLabelRef = useRef('');

  const handleDropdownChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    setSearchText('')
  };

  const handleSearchChange = (e) => {
    const text = e.target.value;
    setSearchText(text);

  };

  const handleFocus = () => {
    if (timer) {
      clearTimeout(timer);
    }
    setShowDropdown(1); 
    const newTimer = setTimeout(() => {
    setShowDropdown(0); 
  }, 15000);

  setTimer(newTimer);
  };


  const optionArray = (options || '').split(';').map((option, index) => ({
    label: option,
    value: `${index + 1}`,
  }));

  const filteredOptions = optionArray.filter(
    (option) =>
      option.label.toLowerCase().includes(searchText.toLowerCase()) 
  );

  const selectedLabel = optionArray.find(
    (option) => option.value === selectedOption
  )?.label || '';

  const [ipLen, setIpLen] = useState('');

        useEffect(() => {
        const selectedLabel = optionArray.find(option => option.value === selectedOption)?.label || '';
        setIpLen(selectedLabel);
        if (onChange && selectedLabel && selectedLabel !== prevSelectedLabelRef.current) {
          onChange(selectedLabel);
        }
        prevSelectedLabelRef.current = selectedLabel;
      },[selectedLabel,selectedOption, onChange,optionArray]);

      const newIsValid = isRequired && selectedOption === '' ? false : true;

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
      setSelectedOption(''); // Reset to '0', not an empty array
    }
  }, [reset]); // This will trigger when `reset` changes

  return (
    <div 
    
    className="input-container">
      <div className="displyname">
        <div className="displynamelable">
          <label style={labelStyles}>{disName_lb}</label>
        </div>
        {isRequired && ipLen.length < 3 && <div className="asterisk">*</div>}
      </div>

      <div className="search-select-wrapper">
      
      {showDropdown===1 && ( <input
          type="text"
          value={searchText}
          style={textboxStyles}
          placeholder="Search Here..."
          onChange={handleSearchChange}
         />)}
        
        <select
              value={selectedOption}
              onChange={handleDropdownChange}
              onFocus={handleFocus} 
              style={textboxStyles}
             >
                          
              {filteredOptions.length === 0 && searchText ? (
                <option value=""> No results found</option>
              ) : (<>
              {filteredOptions.length !== 0  && (<option value=""> Select </option>) }
              {
                filteredOptions.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </>
              )}
            </select>
            
      </div>
    </div>
  );
};

SearchSelect.propTypes = {
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

export default SearchSelect;
