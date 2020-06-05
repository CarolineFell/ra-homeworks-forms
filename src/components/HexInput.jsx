import React from 'react';

const HexInput = props => {
  function onChange(event) {
    props.onChange(event.currentTarget.value);
  }

  return (
    <input
      value={props.value}
      onChange={onChange}
      maxLength={7}
      type="text"
      className="hex-input"
      placeholder="#000000"
    />
  );
};

export default HexInput;