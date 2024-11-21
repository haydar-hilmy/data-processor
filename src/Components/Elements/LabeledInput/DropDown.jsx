import { useState } from "react";
import styled from "styled-components";

const DropDown = (props) => {
    const { data = [], name, text, variant, onchange = () => {}, value, tipsText = "" } = props
    
    const StyledSelect = styled.select`
    max-width: 250px;
    word-break: break-all;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    --tw-text-opacity: 1;
    color: rgba(231, 231, 231, calc(0.5 * var(--tw-text-opacity)));
    `

    const StyledSelectWrap = styled.div`
    position: relative;
    .tooltiptext {
        font-size: 0.9rem;
        visibility: visible;
        width: 100%;
        background-color: #333;
        color: #fff;
        text-align: center;
        border-radius: 5px;
        padding: 5px 12px;
        margin-bottom: 10px;
        position: absolute;
        z-index: 10;
        bottom: 100%; /* Position the tooltip above */
        left: 50%;
        transform: translateX(-50%);
        opacity: 1;
        transition: opacity 0.3s;
        user-select: none;
    }

    .tooltiptext::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: #333 transparent transparent transparent;
    }

    `
    

    return (
        <StyledSelectWrap>
            {
                tipsText != "" ?
                <span className="tooltiptext">{tipsText}</span>
                : ""
            }
            <StyledSelect value={value} onChange={(event) => onchange(event.target.value)} id={name} className={`${variant} py-2 px-5 rounded-md outline-none duration-100 border border-transparent w-auto focus:border-blue-700 bg-secondary-dark cursor-pointer`}>
                {data.length > 0 ? (
                    <option disabled value="" className="font-bold">{text}</option>
                ) : (
                    <option value="" disabled>Undefined</option>
                )}
                {data.map((element, idx) => (
                    <option value={element} key={idx}>{element}</option>
                ))}
            </StyledSelect>
        </StyledSelectWrap>
    )
}

export default DropDown;