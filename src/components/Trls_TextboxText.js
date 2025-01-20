import React from 'react';
import PropTypes from 'prop-types';
import '../assets/styles/trls_control.css'
const TextboxText = ({
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
  spellcheck,
}) => {
  // Combine the label styles and the textbox styles
  const labelStyles = {
    color: textColor_lb,
    backgroundColor: bgColor_lb,
    fontFamily: fontFamily_lb,
    fontSize: fontSize_lb,
    fontWeight: isBold_lb ? 'bold' : 'normal',
    fontStyle: isItalic_lb ? 'italic' : 'normal',
    textDecoration: isUnderlined_lb ? 'underline' : 'none',
  };

  const textboxStyles = {
    color: textColor,
    backgroundColor: bgColor,
    fontFamily: fontFamily,
    fontSize: fontSize,
    fontWeight: isBold ? 'bold' : 'normal',
    fontStyle: isItalic ? 'italic' : 'normal',
    textDecoration: isUnderlined ? 'underline' : 'none',
  };

  return (
    <div className='input-container'>

      <label style={labelStyles}>{disName_lb}</label>
      <div className='valueclass'>
      <input
        type="text"
        style={textboxStyles}
        spellCheck={spellcheck}
      />
      </div>
    </div>
  );
};

TextboxText.propTypes = {
  disName_lb: PropTypes.string.isRequired,
  bgColor_lb: PropTypes.string.isRequired,
  textColor_lb: PropTypes.string.isRequired,
  fontFamily_lb: PropTypes.string.isRequired,
  fontSize_lb: PropTypes.string.isRequired,
  isBold_lb: PropTypes.bool.isRequired,
  isItalic_lb: PropTypes.bool.isRequired,
  isUnderlined_lb: PropTypes.bool.isRequired,
  bgColor: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  fontFamily: PropTypes.string.isRequired,
  fontSize: PropTypes.string.isRequired,
  isBold: PropTypes.bool.isRequired,
  isItalic: PropTypes.bool.isRequired,
  isUnderlined: PropTypes.bool.isRequired,
  spellcheck: PropTypes.bool.isRequired,
};

export default TextboxText;
