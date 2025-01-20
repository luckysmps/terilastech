// components/PreviewPage.js
import React from 'react';
import TextboxText from './Trls_TextboxText'
// Add other control components as needed

const PreviewPage = ({ rows }) => {
  return (
    <div className="preview-page">
      <h3>Preview Page</h3>
      <div className="preview-container">
        {rows.map((row) => (
          <div key={row.id} className="preview-row">
           
            {row.dropdownValue === '1' && row.properties ? (
              <TextboxText {...row.properties} /> 
            ) : (
              <div>Other control preview will go here</div> 
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviewPage;
