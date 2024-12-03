import { useState } from "react";
import styled from "styled-components";
import Label from "./Label";

const DropDown = (props) => {
    const {
        data = [],
        name,
        text,
        variant,
        onchange = () => { },
        value,
        tipsText = "",
        label = "",
        info = "",
        recommend = [] // [{}, {}]
    } = props

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
        <>
            <StyledSelectWrap className="flex flex-col gap-1">
                {
                    tipsText != "" ?
                        <span className="tooltiptext">{tipsText}</span>
                        : ""
                }
                {
                    label != "" ? (
                        <Label variant="ml-3 text-md opacity-60 font-normal" text={label} name={name} />
                    ) : ""
                }
                <StyledSelect value={value} onChange={(event) => onchange(event.target.value)} id={name} className={`${variant} py-2 px-3 rounded-md outline-none duration-100 border border-transparent w-auto focus:border-blue-700 bg-secondary-dark cursor-pointer`}>
                    {data.length > 0 ? (
                        <option disabled value="" className="font-bold">{text}</option>
                    ) : (
                        <option value="" disabled>Undefined</option>
                    )}
                    {data.map((element, idx) => {
                        if (Array.isArray(recommend) && recommend.length > 0) {
                            // Mencari rekomendasi yang cocok berdasarkan element
                            const matchingRecommend = recommend.find(rec => rec.column === element);

                            // Tentukan apakah ini kolom yang direkomendasikan
                            const isBest = matchingRecommend !== undefined;
                            const displayText = isBest ? `${element} (for ${matchingRecommend.type == "Numerical" ? "Regression" : matchingRecommend.type == "Categorical" ? "Classification" : ""})` : element;

                            return (
                                <option
                                    title={isBest ? `${matchingRecommend.type} Label for ${matchingRecommend.type == "Numerical" ? "Regression" : matchingRecommend.type == "Categorical" ? "Classification" : ""}` : ''}
                                    value={element}
                                    key={idx}
                                >
                                    {displayText}
                                </option>
                            );
                        } else {
                            return (
                                <option value={element} key={idx}>{element}</option>
                            )
                        }
                    })}
                </StyledSelect>
                {
                    info != "" ?
                        <p className='text-sm text-gray-500 ml-3'>{info}</p>
                        : ""
                }
            </StyledSelectWrap>
        </>
    )
}

export default DropDown;