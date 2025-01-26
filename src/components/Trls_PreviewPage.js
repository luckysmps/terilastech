import React, { useState } from 'react';
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
      const value = formData[displayName] || '';
      resetFormData[displayName] = value; 
    });

    alert(JSON.stringify(resetFormData, null, 2));

    setFormData({});
  };
  return (
    <div className="preview-page">
      <div className="preview-container">
        {rows.map((row) => (
          <div key={row.id} style={{ marginBottom: '20px' }}>
            {row.dropdownValue === '1' && row.properties ? (
              <TextboxText
                {...row.properties}
                value={formData[row.properties.disName_lb] || ''}
                onChange={(value) => handleChange(row.properties.disName_lb, value)}
              />
            ) : row.dropdownValue === '2' && row.properties ? (
              <TextboxNumber
                {...row.properties}
                value={formData[row.properties.disName_lb] || ''}
                onChange={(value) => handleChange(row.properties.disName_lb, value)}
              />
            ) : row.dropdownValue === '3' && row.properties ? (
              <TextboxMultiline
                {...row.properties}
                value={formData[row.properties.disName_lb] || ''}
                onChange={(value) => handleChange(row.properties.disName_lb, value)}
              />
            ) : row.dropdownValue === '4' && row.properties ? (
              <CheckList
                {...row.properties}
                value={formData[row.id] || []}
                onChange={(value) => handleChange(row.id, value)}
              />
            ) : row.dropdownValue === '5' && row.properties ? (
              <SelectOption
                {...row.properties}
                value={formData[row.id] || ''}
                onChange={(e) => handleChange(row.id, e.target.value)}
              />
            ) : row.dropdownValue === '6' && row.properties ? (
              <SelectChoice
                {...row.properties}
                value={formData[row.id] || ''}
                onChange={(e) => handleChange(row.id, e.target.value)}
              />
            ) : row.dropdownValue === '7' && row.properties ? (
              <SelectStar
                {...row.properties}
                value={formData[row.id] || 0}
                onChange={(value) => handleChange(row.id, value)}
              />
            ) : row.dropdownValue === '8' && row.properties ? (
              <SearchSelect
                {...row.properties}
                value={formData[row.id] || ''}
                onChange={(e) => handleChange(row.id, e.target.value)}
              />
            ) : row.dropdownValue === '9' && row.properties ? (
              <MultiSelect
                {...row.properties}
                value={formData[row.id] || []}
                onChange={(value) => handleChange(row.id, value)}
              />
            ) : (
              <div>The next control action is initiated.</div>
            )}
          </div>
        ))}
        <div className="submitpreview"></div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default PreviewPage;
