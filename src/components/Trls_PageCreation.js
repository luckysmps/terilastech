import React, { useState } from 'react';
import "../assets/styles/trls_pageCreation.css";
import PropertiesComponent from './Trls_Properties';
import TextboxText from './Trls_TextboxText'
import PreviewPage from './Trls_PreviewPage';

const PageCreation = () => {
  const [rows, setRows] = useState([{ id: 1, dropdownValue: 'Select', properties: {} }]);
  const [nextId, setNextId] = useState(2);
  const [isPreview, setIsPreview] = useState(false);
  const handleAddRow = () => {
    const newRow = { id: nextId, dropdownValue: 'Select', properties: {} };
    setRows([...rows, newRow]);
    setNextId(nextId + 1);
  };

  const handleDropdownChange = (id, value) => {
    setRows(rows.map((row) => (row.id === id ? { ...row, dropdownValue: value } : row)));
  };

  const handleRemoveRow = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handlePropertiesChange = (id, updatedProperties) => {
    setRows(rows.map((row) => 
      row.id === id ? { ...row, properties: updatedProperties } : row
    ));
  };

  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  return (
    <div className="gallery-mainpage">

      <h3>Project Creation:</h3>
      {isPreview ? (
        <PreviewPage rows={rows} />
      ) : (
      <div className="gallery-container">
        {rows.map((row) => (
          <div key={row.id} className="gallery-row">
            <label>Select Control:</label>
            <select
              value={row.dropdownValue}
              onChange={(e) => handleDropdownChange(row.id, e.target.value)}
            >
              <option value="0">Select</option>
              <option value="1">SingleLineText</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
            </select>

            <div className="pgcactprops">
              {row.dropdownValue === '1' && (
                <PropertiesComponent
                  onChange={(properties) => handlePropertiesChange(row.id, properties)}
                />
              )}
            </div>

            <div className="pgcactpreview">
              {row.dropdownValue === '1' && row.properties && (
                <TextboxText {...row.properties} />
              )}
            </div>

            <div className="pgcactcheck">Required?</div>
            <div className="pgcactdelete">
              <button onClick={() => handleRemoveRow(row.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      )}
      <div>
      <button onClick={handleAddRow}>Add Row</button>
      <button onClick={togglePreview}>{isPreview ? 'Back to Creation' : 'Go to Preview'}</button>
    </div>
  </div>
  );
};

export default PageCreation;
