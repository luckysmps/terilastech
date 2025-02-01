import React, { useState, useEffect, useRef } from 'react';
import "../assets/styles/trls_controlProps.css";

const PropertiesComponent = ({ onChange, label, dspname, onClose, initialProperties }) => {
  const previousValuesRef = useRef({});
  const [disName_lb, setDisName_lb] = useState(initialProperties.disName_lb || dspname);
  const [bgColor_lb, setBgColor_lb] = useState(initialProperties.bgColor_lb || '');
  const [textColor_lb, setTextColor_lb] = useState(initialProperties.textColor_lb || '#000000');
  const [fontFamily_lb, setFontFamily_lb] = useState(initialProperties.fontFamily_lb || 'Arial');
  const [fontSize_lb, setFontSize_lb] = useState(initialProperties.fontSize_lb || '14px');
  const [isBold_lb, setIsBold_lb] = useState(initialProperties.isBold_lb || true);
  const [isItalic_lb, setIsItalic_lb] = useState(initialProperties.isItalic_lb || false);
  const [isUnderlined_lb, setIsUnderlined_lb] = useState(initialProperties.isUnderlined_lb || false);

  const [bgColor, setBgColor] = useState(initialProperties.bgColor || '');
  const [textColor, setTextColor] = useState(initialProperties.textColor || '#000000');
  const [fontFamily, setFontFamily] = useState(initialProperties.fontFamily || 'Times New Roman');
  const [fontSize, setFontSize] = useState(initialProperties.fontSize || '14px');
  const [isBold, setIsBold] = useState(initialProperties.isBold || false);
  const [isItalic, setIsItalic] = useState(initialProperties.isItalic || false);
  const [isUnderlined, setIsUnderlined] = useState(initialProperties.isUnderlined || false);

  const [isRequired, setIsRequired] = useState(initialProperties.isRequired || true);

  const controlLabels = {
    '1': 'SingleLine Text',
    '2': 'Number',
    '3': 'Multiline Text',
    '4': 'Check Box',
    '5': 'Option',
    '6': 'Choice',
    '7': 'Star',
    '8': 'Search Select',
    '9': 'Multi Select',
  };

  const [options, setOptions] = useState(() => {
    if (controlLabels[label] === 'Star') {
      return initialProperties.options || '1;2;3;4;5';
    } else {
      return initialProperties.options || 'Option1;Option2;Option3;Option4';
    }
  });

  useEffect(() => {
    if (typeof onChange === 'function') {
      const newValues = {
        disName_lb,
        bgColor_lb,
        textColor_lb,
        fontFamily_lb,
        fontSize_lb,
        isBold_lb,
        isItalic_lb,
        isUnderlined_lb,

        bgColor,
        textColor,
        fontFamily,
        fontSize,
        isBold,
        isItalic,
        isUnderlined,
        options,
        isRequired,
      };

      if (JSON.stringify(newValues) !== JSON.stringify(previousValuesRef.current)) {
        onChange(newValues);
        previousValuesRef.current = newValues;
      }
    }
  }, [
    bgColor, textColor, fontFamily, fontSize, isBold, isItalic, isUnderlined,
    bgColor_lb, disName_lb, fontFamily_lb, isBold_lb, isItalic_lb, fontSize_lb,
    isUnderlined_lb, textColor_lb, options, isRequired, onChange,
  ]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let updatedValue = type === 'checkbox' ? checked : value;

    switch (name) {
      case 'bgColor':
        setBgColor(updatedValue);
        break;
      case 'textColor':
        setTextColor(updatedValue);
        break;
      case 'fontFamily':
        setFontFamily(updatedValue);
        break;
      case 'fontSize':
        setFontSize(updatedValue);
        break;
      case 'isBold':
        setIsBold(updatedValue);
        break;
      case 'isItalic':
        setIsItalic(updatedValue);
        break;
      case 'isUnderlined':
        setIsUnderlined(updatedValue);
        break;
      case 'disName_lb':
        setDisName_lb(updatedValue);
        break;
      case 'bgColor_lb':
        setBgColor_lb(updatedValue);
        break;
      case 'textColor_lb':
        setTextColor_lb(updatedValue);
        break;
      case 'fontFamily_lb':
        setFontFamily_lb(updatedValue);
        break;
      case 'fontSize_lb':
        setFontSize_lb(updatedValue);
        break;
      case 'isBold_lb':
        setIsBold_lb(updatedValue);
        break;
      case 'isItalic_lb':
        setIsItalic_lb(updatedValue);
        break;
      case 'isUnderlined_lb':
        setIsUnderlined_lb(updatedValue);
        break;
      case 'options':
        setOptions(updatedValue);
        break;
      case 'isRequired':
        setIsRequired(updatedValue);
        break;
      default:
        break;
    }
  };

  return (
    <div className='properties-main-content'>
      <div className='properties-close-button'>
        <button onClick={onClose}> X </button>
      </div>
      <div className="properties-panel">
        <div className="proptype">
          <label>Property Type</label>
          <label>Label</label>
          <label>{controlLabels[label] || 'Unknown Control'}</label>
        </div>

        <div className="proptype">
          <label>Display Name:</label>
          <input type="text" name="disName_lb" value={disName_lb} onChange={handleChange} autoComplete='off' />
          <input type="text" name="disName_lb" value='NA' onChange={handleChange} autoComplete='off' disabled />
        </div>

        {(controlLabels[label] === 'Option' || controlLabels[label] === 'Choice' || controlLabels[label] === 'Check Box' ||
          controlLabels[label] === 'Star' || controlLabels[label] === 'Search Select' || controlLabels[label] === 'Multi Select') && (
            <div className="proptype">
              <label>Options List:</label>
              <input type="text" name="disName_lb" value='Separate with a semicolumn (;)' onChange={handleChange} autoComplete='off' disabled />
               <textarea name="options" value={options} onChange={handleChange} autoComplete='off'/>
             </div>
        )}

        <div className="proptype">
          <label>Background Color:</label>
          <input type="text" name="bgColor_lb" value={bgColor_lb} onChange={handleChange} />
          <input type="text" name="bgColor" value={bgColor} onChange={handleChange} />
        </div>

        <div className="proptype">
          <label>Text Color:</label>
          <input type="text" name="textColor_lb" value={textColor_lb} onChange={handleChange} />
          <input type="text" name="textColor" value={textColor} onChange={handleChange} />
        </div>

        <div className="proptype">
          <label>Font Family:</label>
          <input type="text" name="fontFamily_lb" value={fontFamily_lb} onChange={handleChange} />
          <input type="text" name="fontFamily" value={fontFamily} onChange={handleChange} />
        </div>

        <div className="proptype">
          <label>Font Size:</label>
          <input type="text" name="fontSize_lb" value={fontSize_lb} onChange={handleChange} />
          <input type="text" name="fontSize" value={fontSize} onChange={handleChange} />
        </div>

        <div className="proptype">
          <label>Bold:</label>
          <input type="checkbox" name="isBold_lb" checked={isBold_lb} onChange={(e) => setIsBold_lb(e.target.checked)} />
          <input type="checkbox" name="isBold" checked={isBold} onChange={(e) => setIsBold(e.target.checked)} />
        </div>

        <div className="proptype">
          <label>Italic:</label>
          <input type="checkbox" name="isItalic_lb" checked={isItalic_lb} onChange={(e) => setIsItalic_lb(e.target.checked)} />
          <input type="checkbox" name="isItalic" checked={isItalic} onChange={(e) => setIsItalic(e.target.checked)} />
        </div>

        <div className="proptype">
          <label>Underline:</label>
          <input type="checkbox" name="isUnderlined_lb" checked={isUnderlined_lb} onChange={(e) => setIsUnderlined_lb(e.target.checked)} />
          <input type="checkbox" name="isUnderlined" checked={isUnderlined} onChange={(e) => setIsUnderlined(e.target.checked)} />
        </div>

        <div className="proptype">
          <label>Required?:</label>
          <input type="text" name="disName_lb" value='NA' onChange={handleChange} autoComplete='off' disabled />
          <input type="checkbox" name="isRequired" checked={isRequired} onChange={(e) => setIsRequired(e.target.checked)} />
        </div>
      </div>
    </div>
  );
};

export default PropertiesComponent;