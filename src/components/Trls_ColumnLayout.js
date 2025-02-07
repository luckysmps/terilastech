import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../assets/styles/trls_control.css';

const ColumnLayout = ({
  ddsev,
  columnIndex,
  onSelectChange,
  handleOpenPropertiesModal,
}) => {
  const [selectedOption, setSelectedOption] = useState(Array(ddsev).fill(0));

  useEffect(() => {
    setSelectedOption(Array(parseInt(ddsev, 10) || 1).fill(0));
  }, [ddsev]);

  const handleDropdownChange = (index, e) => {
    const newSelectedOptions = [...selectedOption];
    newSelectedOptions[index] = e.target.value;
    setSelectedOption(newSelectedOptions);
    onSelectChange(index, e.target.value); // Pass the selected value
  };

  const options = [
    { value: "0", label: "Select" },
    { value: "1", label: "SingleLine Text" },
    { value: "2", label: "Number" },
    { value: "3", label: "Multiline Text" },
    { value: "4", label: "Check Box" },
    { value: "5", label: "Select Option" },
    { value: "6", label: "Select Choice" },
    { value: "7", label: "Star Rating" },
    { value: "8", label: "Search Select" },
    { value: "9", label: "Multi Select" },
    { value: "10", label: "Email" }
  ];

  const columnCount = parseInt(ddsev, 10) || 0;

  return (
    <div className="column-layout-main">
      <div
        className="column-layout"
      >
        {[...Array(columnCount)].map((_, index) => (
          <div key={index} style={{ paddingRight: '15px', gap: '10px' }}>
            <select
              value={selectedOption[index]}
              onChange={(e) => handleDropdownChange(index, e)}
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {selectedOption[index] > 0 && (
              <div className="column-layout-button">
                <button onClick={() => handleOpenPropertiesModal(index)}>
                  Change Properties
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

ColumnLayout.propTypes = {
  ddsev: PropTypes.string,
  columnIndex: PropTypes.number,
  onSelectChange: PropTypes.func,
  handleOpenPropertiesModal: PropTypes.func,
};

export default ColumnLayout;