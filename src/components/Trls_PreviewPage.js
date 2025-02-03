import React, { useState, useEffect } from 'react';
import TextboxText from './Trls_TextboxText';
import TextboxNumber from './Trls_TextboxNumber';
import TextboxMultiline from './Trls_TextboxMultiline';
import CheckList from './Trls_CheckList';
import SelectOption from './Trls_SelectOption';
import SelectChoice from './Trls_SelectChoice';
import SelectStar from './Trls_SelectStar';
import SearchSelect from './Trls_SearchSelect';
import MultiSelect from './Trls_MultiSelect';
import '../assets/styles/trls_previewPage.css';

const PreviewPage = ({ rows, selectedColumnValues }) => {
  const [formData, setFormData] = useState({});
  const [resetFlag, setResetFlag] = useState(false);
  const [validFields, setValidFields] = useState({});


  const handleChange = (displayName, value) => {
    console.log(displayName)
    setFormData((prevData) => ({
      ...prevData,
      [displayName]: value,
    }));
  };

  const handleValidityChange = (cid, isValid) => {
    setValidFields((prevValidFields) => ({
      ...prevValidFields,
      [cid]: isValid,
    }));
  };





  const handleSubmit = () => {
    const dataToExport = rows.map((row) => {
      const rowData = {};
      Object.keys(row.properties).forEach((columnIndex) => {
        const columnProperties = row.properties[columnIndex];
     
        const displayName = columnProperties.disName_lb || `Row ${row.id}, Column ${parseInt(columnIndex) + 1}`;
        rowData[displayName] = formData[columnProperties.disName_lb] || '';
        
      });
      return rowData;
    });

    alert(JSON.stringify(dataToExport, null, 2));

    // Reset form data and validity states
    setFormData({});
    setValidFields({});
    setResetFlag(true);
  };
  useEffect(() => {
    if (resetFlag) {
      // Set formData and validFields to empty only once.
      setFormData({});
      setValidFields({});
      
      // Use setTimeout to reset the flag after a short delay.
      const timer = setTimeout(() => {
        setResetFlag(false);
      }, 0);
  
      // Cleanup timeout to avoid memory leaks
      return () => clearTimeout(timer);
    }
  }, [resetFlag]);


  const isSubmitDisabled =rows.some(row =>
    Object.keys(row.properties).some((columnIndex) => {
      const columnProperties = row.properties[columnIndex];
      const displayName = columnProperties.disName_lb;
      
      if (!displayName) {
        return true;
      }
  
      const isRequired = columnProperties.isRequired;
      const value = formData[displayName];

      // If required and field is empty or invalid, disable submit button
      return (isRequired && (!value || validFields[row.id * 10 + parseInt(columnIndex)] === false));
    })
  );
  

  const getComponentForType = (type) => {
    const componentMap = {
      '1': TextboxText,
      '2': TextboxNumber,
      '3': TextboxMultiline,
      '4': CheckList,
      '5': SelectOption,
      '6': SelectChoice,
      '7': SelectStar,
      '8': SearchSelect,
      '9': MultiSelect,
    };
    return componentMap[type] || null;
  };

  return (
    <div className="preview-page">
      <div className="preview-container">
        {rows.map((row) => {
          const columnCount = parseInt(row.dropdownValue, 10) || 0;
          return (
            <div key={row.id} style={{ marginBottom: '20px' }}>
              <div style={{
                     display: window.innerWidth < 768 ? 'flex' : 'grid',
                     flexDirection: window.innerWidth < 768 ? 'column' : 'unset',
                     gridTemplateColumns: window.innerWidth >= 768 ? `repeat(${columnCount}, 1fr)` : 'unset',
                     gap: '20px',
                     width: '100%',
              }}>
                {[...Array(columnCount)].map((_, index) => {
                  const selectedValue = selectedColumnValues[row.id]?.[index] || '0';
                  const Component = getComponentForType(selectedValue);
                  const columnProperties = row.properties[index] || {};

                  return (
                    <div key={index}>
                      {Component ? (
                        <>
                        <Component
                          cid={row.id * 10 + index}
                          {...columnProperties}
                          value={resetFlag ? '' : formData[columnProperties.disName_lb] || ''}
                          onChange={(value) => handleChange(columnProperties.disName_lb, value)}
                          reset={resetFlag}
                          onValidityChange={(isValid) => handleValidityChange(row.id * 10 + index, isValid)}
                        />
                        </>
                      ) : (
                        <div>Select a valid component</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        <div className="submitpreview">
          <button onClick={handleSubmit} disabled={isSubmitDisabled}>
            Export to Excel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;