import React, { useState,useEffect} from 'react';
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

const PreviewPage = ({ rows }) => {
  // Initialize state for form data
 
  const [formData, setFormData] = useState({});
  const [resetFlag, setResetFlag] = useState(false);
  const [validFields, setValidFields] = useState({});

  // Handle change for each component type
  const handleChange = (displayName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [displayName]: value,
    }));

    
  };

  const handleSubmit = () => {
    const resetFormData = {};

    rows.forEach((row) => {
      const displayName = row.properties.disName_lb; 
      const value = formData[displayName] || [];
      resetFormData[displayName] = value; 
    });

    alert(JSON.stringify(resetFormData, null, 2));

   setFormData({});
   setResetFlag(true);
  };

  const handleValidityChange = (displayName, isValid) => {
    setValidFields((prevValidFields) => ({
      ...prevValidFields,
      [displayName]: isValid,
    }));
  };

  useEffect(() => {
    if (resetFlag) {
      // Reset flag back to false after reset logic
      setTimeout(() => {
          setResetFlag(false);
      }, 0); // Ensures it resets only after one render cycle
    }
  }, [resetFlag]);

  // Check if all required fields are valid
  const isSubmitDisabled = Object.values(validFields).includes(false);

   return (
    <div className="preview-page">
      <div className="preview-container">
        {rows.map((row) => {
          const Component = getComponentForType(row.dropdownValue);  // Get the right component dynamically
          return (
            <div key={row.id} style={{ marginBottom: '20px' }}>
              {row.properties && Component ? (
                <Component
                  {...row.properties}
                  value={formData[row.properties.disName_lb] || ''}
                  onChange={(value) => handleChange(row.properties.disName_lb, value)}
                  reset={(resetFlag)}  // Reset logic for individual components
                  onValidityChange={handleValidityChange}
                />
              ) : (
                <div>The next control action is initiated.</div>
              )}
            </div>
          );
        })}
        <div className="submitpreview"></div>
        <button onClick={handleSubmit} disabled={isSubmitDisabled}>Submit</button>
      </div>
    </div>
  );
};

// Function to map dropdownValue to the correct component
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

export default PreviewPage;