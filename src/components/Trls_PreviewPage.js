// components/PreviewPage.js
import React from 'react';
import TextboxText from './Trls_TextboxText'
import TextboxNumber from './Trls_TextboxNumber';
import TextboxMultiline from './Trls_TextboxMultiline';
import CheckList from './Trls_CheckList'
import SelectOption from './Trls_SelectOption';
import '../assets/styles/trls_previewPage.css'
const PreviewPage = ({ rows }) => {

  
  return (
    <div className="preview-page">
      <div className="preview-container">
        {rows.map((row) => (
          <div key={row.id} style={{marginBottom:"20px"}}>
           
            {row.dropdownValue === '1' && row.properties ? (
              <TextboxText {...row.properties} /> 
            ) : row.dropdownValue === '2' && row.properties ? (
              <TextboxNumber {...row.properties} /> 
            ):row.dropdownValue === '3' && row.properties ? (
              <TextboxMultiline {...row.properties} /> 
            ):row.dropdownValue === '4' && row.properties ? (
              <CheckList {...row.properties} /> 
            ):row.dropdownValue === '5' && row.properties ? (
              <SelectOption {...row.properties} /> 
            ):
            
            (
              <div>The next control action is initiated.</div> 
            )}
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviewPage;
