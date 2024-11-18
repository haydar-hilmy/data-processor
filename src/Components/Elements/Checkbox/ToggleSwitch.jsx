import React from 'react';
import styled from 'styled-components';

const ToggleSwitch = (props) => {

  const { sizeBtn = 2.5 } = props

  const ratio = 6.25 / 2.25; // ratio ukuran utama dengan elemen ::before
  const offset = 0.438 * sizeBtn / 6.25; // offset proporsional berdasarkan sizeBtn

  const StyledWrapper = styled.div`
  height: ${sizeBtn/2}em;
    .theme-checkbox {
      --toggle-size: 16px;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      width: ${sizeBtn}em;
      height: ${sizeBtn / 2}em;
      background: -webkit-gradient(linear, left top, right top, color-stop(50%, #efefef), color-stop(50%, #2a2a2a)) no-repeat;
      background: -o-linear-gradient(left, #efefef 50%, #2a2a2a 50%) no-repeat;
      background: linear-gradient(to right, #efefef 50%, #2a2a2a 50%) no-repeat;
      background-size: 205%;
      background-position: 0;
      -webkit-transition: 0.4s;
      -o-transition: 0.4s;
      transition: 0.4s;
      border-radius: 99em;
      position: relative;
      cursor: pointer;
      font-size: var(--toggle-size);
    }
  
    .theme-checkbox::before {
      content: "";
      width: ${sizeBtn / ratio}em;
      height: ${sizeBtn / ratio}em;
      position: absolute;
      top: ${offset}em;
      left: ${offset}em;
      background: -webkit-gradient(linear, left top, right top, color-stop(50%, #efefef), color-stop(50%, #2a2a2a)) no-repeat;
      background: -o-linear-gradient(left, #efefef 50%, #2a2a2a 50%) no-repeat;
      background: linear-gradient(to right, #efefef 50%, #2a2a2a 50%) no-repeat;
      background-size: 205%;
      background-position: 100%;
      border-radius: 50%;
      -webkit-transition: 0.4s;
      -o-transition: 0.4s;
      transition: 0.4s;
    }
  
    .theme-checkbox:checked::before {
      left: calc(100% - ${sizeBtn / ratio}em - ${offset}em);
      background-position: 0;
    }
  
    .theme-checkbox:checked {
      background-position: 100%;
    }`;

  return (
    <StyledWrapper>
      <input type="checkbox" className="theme-checkbox" />
    </StyledWrapper>
  );
}

export default ToggleSwitch;
