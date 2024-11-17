import React from 'react';
import styled from 'styled-components';

const ToggleSwitch = (props) => {

  const { sizeBtn = 2.25 } = props

  const ratio = 6.25 / 2.25
  const topPosition = 0.438 * sizeBtn / 3.25;
  const leftPosition = 0.438 * sizeBtn / 3.25;
  const offset = 0.438 * sizeBtn / 3.25;


  const StyledWrapper = styled.div`
    .theme-checkbox {
      --toggle-size: 16px;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      width: ${sizeBtn}em;
      aspect-ratio: 6.25/3.125;
      height: auto;
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
      aspect-ratio: 2.25/2.25;
      height: auto;
      position: absolute;
      top: ${topPosition}em;
      left: ${leftPosition}em;
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
      left: calc(100% - ${sizeBtn / ratio}rem - ${offset}rem);
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
