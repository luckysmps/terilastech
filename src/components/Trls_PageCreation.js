import React, { useState } from 'react';
import "../assets/styles/trls_pageCreation.css";
import PropertiesComponent from './Trls_Properties';
import TextboxText from './Trls_TextboxText'
import PreviewPage from './Trls_PreviewPage';
import TextboxNumber from './Trls_TextboxNumber';
import TextboxMultiline from './Trls_TextboxMultiline';
import CheckList from './Trls_CheckList'
import SelectOption from './Trls_SelectOption';
import SelectChoice from './Trls_SelectChoice';
import SelectStar from './Trls_SelectStar';
import SearchSelect from './Trls_SearchSelect';
import MultiSelect from './Trls_MultiSelect';

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

  const handleCreate = () => {
    // Prepare the data in JSON format
    const dataToSave = rows.map(row => ({
      id: row.id,
      controlType: row.dropdownValue,
      properties: row.properties,
    }));

    console.log(JSON.stringify(dataToSave, null, 2));
  };


  return (
    <div className="gallery-mainpage">
    
    <div className="main-container">
     <div className='pcpheader'>Project Creation Page</div>
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
                          <option value="5">Select Option</option>
                          <option value="6">Select Choice</option>
                          <option value="7">Star Rating</option>
                          <option value="8">Search Select</option>
                          <option value="9">Multi Select</option>
                        </select>
          
                        <div className="pgcactprops">Set Properties
                          {row.dropdownValue === '1'  && (
                            <PropertiesComponent
                              label={row.dropdownValue}
                              onChange={(properties) => handlePropertiesChange(row.id, properties)}
                            />
                          )}
                           {row.dropdownValue === '2' && (
                            <PropertiesComponent
                              label={row.dropdownValue}
                              onChange={(properties) => handlePropertiesChange(row.id, properties)}
                            />
                          )}
                           {row.dropdownValue === '3' && (
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
                          {row.dropdownValue === '6' && (
                            <PropertiesComponent
                              label={row.dropdownValue}
                              onChange={(properties) => handlePropertiesChange(row.id, properties)}
                            />
                          )}
                           {row.dropdownValue === '7' && (
                            <PropertiesComponent
                              label={row.dropdownValue}
                              onChange={(properties) => handlePropertiesChange(row.id, properties)}
                            />
                          )}
                           {row.dropdownValue === '8' && (
                            <PropertiesComponent
                              label={row.dropdownValue}
                              onChange={(properties) => handlePropertiesChange(row.id, properties)}
                            />
                          )}
                          {row.dropdownValue === '9' && (
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
                           {row.dropdownValue === '6' && row.properties && (
                            <SelectChoice {...row.properties} />
                          )}
                          {row.dropdownValue === '7' && row.properties && (
                            <SelectStar {...row.properties} />
                          )}
                          {row.dropdownValue === '8' && row.properties && (
                            <SearchSelect {...row.properties} />
                          )}
                           {row.dropdownValue === '9' && row.properties && (
                            <MultiSelect {...row.properties} />
                          )}
                        </div>
          
                      
                        <div className="pgcactdelete">
                          <button onClick={() => handleRemoveRow(row.id)}></button>
                        </div>
                  </div>
                ))}
              </div>
        {/* Add Row Button below gallery container */}
        <div className='buttonsdiv'>
        <div className="add-row-button">
          <button onClick={handleAddRow}>Add New Parameter</button>
        </div>

          {/* Create Button */}
          <div className="create-button">
          <button onClick={handleCreate}>Create Project</button>
        </div>
        </div>
      </div>
  

      {/* Preview Section */}
      <div className="previewpage-container">
      <div className='pcppheader'>Preview</div>
      <div className="previewpage">
         <PreviewPage rows={rows} />
        </div>
      </div>
    </div>

  
  );
};

export default PageCreation;
