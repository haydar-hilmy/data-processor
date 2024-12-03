import { elements } from 'chart.js';
import React from 'react';
import styled from "styled-components";
import { isArrayContainObj } from "../../../Function/ArrObjFunction"
import { list } from 'postcss';
import Label from '../LabeledInput/Label';

const CheckboxLabelList = (props) => {
  const {
    listData = [],
    recommend = [], // [{}, {}]
    onchange,
    text = "It's Label"
  } = props


  return (
    <>
      <Label variant="ml-3 text-md opacity-60 font-normal" text={text} />
      <div className='grid grid-cols-4 gap-3'>
        {
          listData.map((element, idx) => {
            if (Array.isArray(recommend) && recommend.length > 0) {
              // Mencari rekomendasi yang cocok berdasarkan element
              const matchingRecommend = recommend.find(rec => rec.column === element);

              // Tentukan apakah ini kolom yang direkomendasikan
              const isBest = matchingRecommend !== undefined;
              console.log(recommend.find(rec => rec.column === element))
              const displayText = isBest ? `${element} (${matchingRecommend.type === "Numerical" ? "Regression" : matchingRecommend.type === "Categorical" ? "Classification" : ""})` : element;

              return (
                <>
                  <StyledWrapper key={idx}>
                    <label title={"as"} className="material-checkbox">
                      <input value={element} onChange={onchange} type="checkbox" />
                      <span className="checkmark" />
                      {displayText}
                    </label>
                  </StyledWrapper>
                </>
              );

            } else {
              return (
                <>
                  <StyledWrapper key={idx}>
                    <label className="material-checkbox">
                      <input value={element} onChange={onchange} type="checkbox" />
                      <span className="checkmark" />
                      {element}
                    </label>
                  </StyledWrapper>
                </>
              );
            }
          })
        }

      </div>
    </>
  )



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

export default CheckboxLabelList