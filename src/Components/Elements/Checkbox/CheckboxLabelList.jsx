import { elements } from 'chart.js';
import React, { useState } from 'react';
import styled from "styled-components";
import { isArrayContainObj } from "../../../Function/ArrObjFunction"
import { list } from 'postcss';
import Label from '../LabeledInput/Label';

const CheckboxLabelList = (props) => {
  const {
    listData = [],
    recommend = [],
    onchange = () => { },
    onchangeSpecial = () => { },
    text = "It's Label",
    specialCheckbox = "",
    exception = []
  } = props;

  const [isCheckedSpecial, setIsCheckedSpecial] = useState(false);
  const [regularCheckboxState, setRegularCheckboxState] = useState({});

  // Handle perubahan tombol special
  const specialCheckboxHandle = () => {
    setIsCheckedSpecial((prev) => !prev);
    setRegularCheckboxState((prevState) =>
      Object.keys(prevState).reduce((acc, key) => {
        acc[key] = false; // Semua regular checkbox ke false
        return acc;
      }, {})
    );
  };

  // Handle perubahan tombol regular
  const handleRegularCheckbox = (element) => {
    setRegularCheckboxState((prevState) => ({
      ...prevState,
      [element]: !prevState[element] // Toggle state checkbox
    }));
    setIsCheckedSpecial(false); // Matikan tombol special jika ada checkbox regular yang ditekan
  };

  // Inisialisasi state regular checkbox
  React.useEffect(() => {
    const initialState = listData.reduce((acc, item) => {
      acc[item] = false;
      return acc;
    }, {});
    setRegularCheckboxState(initialState);
  }, [listData]);

  return (
    <>
      <Label variant="ml-3 text-md opacity-60 font-normal" text={text} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-3 my-2">
        {listData.map((element, idx) => {
          const isDisabled = isCheckedSpecial;
          const isChecked = regularCheckboxState[element] || false;



          // Mencari rekomendasi yang cocok berdasarkan element
          const matchingRecommend = recommend.find(
            (rec) => rec.column === element
          );

          const isBest = matchingRecommend !== undefined;
          const reasonText = isBest
            ? `${matchingRecommend.reason} for ${matchingRecommend.type}`
            : "Not recommended";
          const displayText = isBest
            ? `${element} (${matchingRecommend.type === "Numerical" ? "Regression" : matchingRecommend.type === "Categorical" ? "Classification" : ""
            })`
            : element;

          const isExcluded = exception.includes(element);
          if (isExcluded) return (
            <div key={idx}>
              <StyledWrapper>
                <label
                  className={`material-checkbox opacity-50`}
                >
                  <input
                    disabled={true}
                    checked={false}
                    type="checkbox"
                  />
                  <span className="checkmark" />
                  {element} (Labeled)
                </label>
              </StyledWrapper>
            </div>
          );

          return (
            <div key={idx}>
              <StyledWrapper>
                <label
                  title={reasonText}
                  className={`material-checkbox ${isDisabled ? "opacity-50" : ""
                    }`}
                >
                  <input
                    disabled={isDisabled}
                    checked={isChecked}
                    value={element}
                    onChange={(e) => {handleRegularCheckbox(element), onchange(e)}}
                    type="checkbox"
                  />
                  <span className="checkmark" />
                  {displayText}
                </label>
              </StyledWrapper>
            </div>
          );
        })}
      </div>
      {specialCheckbox != "" && (
        <StyledWrapper className='mt-5'>
          <label className="material-checkbox font-semibold">
            <input
              checked={isCheckedSpecial}
              onChange={(e) => {specialCheckboxHandle(), onchangeSpecial(e)}}
              type="checkbox"
            />
            <span className="checkmark" />
            {specialCheckbox}
          </label>
        </StyledWrapper>
      )}
    </>
  );
};


const StyledWrapper = styled.div`
user-select: none;
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
    margin-right: 10px;
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