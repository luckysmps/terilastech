import React, { useState,useEffect  } from 'react';
import TextboxText from './Trls_TextboxText';
import TextboxNumber from './Trls_TextboxNumber';
import TextboxMultiline from './Trls_TextboxMultiline';
import CheckList from './Trls_CheckList';
import SelectOption from './Trls_SelectOption';
import SelectChoice from './Trls_SelectChoice';
import SelectStar from './Trls_SelectStar';
import SearchSelect from './Trls_SearchSelect';
import MultiSelect from './Trls_MultiSelect';
import TextboxEmail from './Trls_TextboxEmail'
import '../assets/styles/trls_previewPage.css';
import axios from "axios";

const PreviewPage = ({ rows, selectedColumnValues,textboxValue }) => {
  const [formData, setFormData] = useState({});
  const [resetFlag, setResetFlag] = useState(false);
  const [validFields, setValidFields] = useState({});
  
  const handleChange = (displayName, value) => {
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




  const handleSubmit = async () => {
    const dataToExport = rows.map((row) => {
      const rowData = {};
      Object.keys(row.properties).forEach((columnIndex) => {
        const columnProperties = row.properties[columnIndex];
        const displayName = columnProperties.disName_lb || `Row ${row.id}, Column ${parseInt(columnIndex) + 1}`;
        rowData[displayName] = formData[columnProperties.disName_lb] || '';
      });
      return rowData;
    });

    // Include projectName in the export data
    const exportData = {
      projectName: textboxValue,  // Adding the project name from the parent component
      rows: dataToExport,  // Including the rows to be exported
    };

    try {
      const response = await axios.post("http://127.0.0.1:5000/export", exportData, {
        headers: {
          'Content-Type': 'application/json',  
        },
        responseType: 'blob', 
      });

      const contentDisposition = response.headers['content-disposition'];
      let filename = textboxValue +'.xlsx';
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="(.+)"/);
        if (match) {
          filename = match[1];
        }
      }

      const fileBlob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      const url = window.URL.createObjectURL(fileBlob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error exporting to Excel:", error);
    }

    // Reset form data and validity states
    setFormData({});
    setValidFields({});
    setResetFlag(true);
  };

  useEffect(() => {
    if (resetFlag) {
      setFormData({});
      setValidFields({});
      
    const timer = setTimeout(() => {
        setResetFlag(false);
      }, 0);
  
      // Cleanup timeout to avoid memory leaks
      return () => clearTimeout(timer);
    }
  }, [resetFlag]);
  

  const row = rows[0];
const formLength = Object.keys(row.properties).length; 

const isSubmitDisabled = formLength > 0
  ? rows.some(row =>
      Object.keys(row.properties).some(columnIndex => {
        const columnProperties = row.properties[columnIndex];
        const displayName = columnProperties.disName_lb;
        const minLength = columnProperties.minLength;
        const isRequired = columnProperties.isRequired;
        const value = formData[displayName];

        if (!displayName || (isRequired && (!value || value.trim() === ''))) {
          return true; 
        }

        const isEmailField = columnProperties.type === 'email'; 

        const validateEmail = (email) => {
          const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          return emailPattern.test(email);
        };

        const isFieldInvalidir = 
          (isRequired && isEmailField && value && !validateEmail(value)) ||  
          validFields[row.id * 10 + parseInt(columnIndex)] === false;

        const isFieldInvalidinr = 
          (isEmailField && value && !validateEmail(value)) ||  
          validFields[row.id * 10 + parseInt(columnIndex)] === false;

        const isMinLengthValid = (isRequired && minLength && typeof value !== 'undefined')
          ? value.length >= minLength
          : true;

        return isFieldInvalidir || isFieldInvalidinr || !isMinLengthValid;
      })
    )
  : true;





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
      '10':TextboxEmail
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
                        <div className='previewecontrolmsg'>Select a valid component</div>
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