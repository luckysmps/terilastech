import React, { useState } from 'react';
import "../assets/styles/trls_pageCreation.css";
import PropertiesComponent from './Trls_Properties';
import TextboxText from './Trls_TextboxText'
import PreviewPage from './Trls_PreviewPage';
import TextboxNumber from './Trls_TextboxNumber';
import TextboxMultiline from './Trls_TextboxMultiline';
import CheckList from './Trls_CheckList'
import SelectOption from './Trls_SelectOption';

const PageCreation = () => {
  const [rows, setRows] = useState([{ id: 1, dropdownValue: 'Select', properties: {} }]);
  const [nextId, setNextId] = useState(2);
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



  return (
    <div className="gallery-mainpage">
    
    <div className="main-container">
     
              <div className="gallery-container">
                {rows.map((row) => (
                  <div key={row.id} className="gallery-row">
                        <label>Select Control:</label>
                        <select
                          value={row.dropdownValue}
                          onChange={(e) => handleDropdownChange(row.id, e.target.value)}
                        >
                          <option value="0">Select</option>
                          <option value="1">SingleLine Text</option>
                          <option value="2">Number</option>
                          <option value="3">Multiline Text</option>
                          <option value="4">Check Box</option>
                          <option value="5">Select Choice</option>
                        </select>
          
                        <div className="pgcactprops">Set Properties
                          {(row.dropdownValue === '1' || row.dropdownValue === '2' || row.dropdownValue === '3') && (
                            <PropertiesComponent
                              label={row.dropdownValue}
                              onChange={(properties) => handlePropertiesChange(row.id, properties)}
                            />
                          )}
                          {row.dropdownValue === '4' && (
                            <PropertiesComponent
                              label={row.dropdownValue}
                              onChange={(properties) => handlePropertiesChange(row.id, properties)}
                            />
                          )}
                           {row.dropdownValue === '5' && (
                            <PropertiesComponent
                              label={row.dropdownValue}
                              onChange={(properties) => handlePropertiesChange(row.id, properties)}
                            />
                          )}
                        </div>
          
                        <div className="pgcactpreview">Control Preview
                          {row.dropdownValue === '1' && row.properties && (
                            <TextboxText {...row.properties} />
                          )}
                          {row.dropdownValue === '2' && row.properties && (
                            <TextboxNumber {...row.properties} />
                          )}
                          {row.dropdownValue === '3' && row.properties && (
                            <TextboxMultiline {...row.properties} />
                          )}
                          {row.dropdownValue === '4' && row.properties && (
                            <CheckList {...row.properties} />
                          )}
                          {row.dropdownValue === '5' && row.properties && (
                            <SelectOption {...row.properties} />
                          )}
                        </div>
          
                        <div className="pgcactcheck">Required?

                        </div>
                        <div className="pgcactdelete">
                          <button onClick={() => handleRemoveRow(row.id)}>Remove</button>
                        </div>
                  </div>
                ))}
              </div>
        {/* Add Row Button below gallery container */}
        <div className="add-row-button">
          <button onClick={handleAddRow}>Add New Parameter</button>
        </div>
      </div>
  
      {/* Preview Section */}
      <div className="previewpage-container">
        <div className="previewpage">
         <PreviewPage rows={rows} />
        </div>
      </div>
    </div>

  
  );
};

export default PageCreation;
