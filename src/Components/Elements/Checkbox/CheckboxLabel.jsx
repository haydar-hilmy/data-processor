import React from 'react';
import styled from 'styled-components';

const CheckboxLabel = (props) => {
  const {
    text = "",
    name,
    onchange,
    value,
    checked,
  } = props


  return (
    <StyledWrapper>
      <label className="material-checkbox">
        <input checked={checked} name={name} id={name} type="checkbox" value={value} onChange={onchange} />
        <span className="checkmark" />
        {text}
      </label>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .material-checkbox {
    display: flex;
    align-items: center;
    font-size: inherit;
    color: inherit;
    cursor: pointer;
    width: fit-content;
  }

  .material-checkbox input[type="checkbox"] {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  .checkmark {
    position: relative;
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 12px;
    border: 2px solid #1d4ed8;
    border-radius: 4px;
    transition: all 0.3s;
  }

  .material-checkbox input[type="checkbox"]:checked ~ .checkmark {
    background-color: #192b5c;
    border-color: #1d4ed8;
  }

  .material-checkbox input[type="checkbox"]:checked ~ .checkmark:after {
    content: "";
    position: absolute;
    top: 2px;
    left: 6px;
    width: 4px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }

  .material-checkbox input[type="checkbox"]:focus ~ .checkmark {
    box-shadow: 0 0 0 2px #3366ff;
  }

  .material-checkbox:hover input[type="checkbox"] ~ .checkmark {
    border-color: #9966ff;
  }

  .material-checkbox input[type="checkbox"]:disabled ~ .checkmark {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .material-checkbox input[type="checkbox"]:disabled ~ .checkmark:hover {
    border-color: #4d4d4d;
  }`;

export default CheckboxLabel;
