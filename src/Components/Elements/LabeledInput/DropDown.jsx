import { useState } from "react";
import styled from "styled-components";

const DropDown = (props) => {
    const { data = [], name, text, variant, onchange = () => {} } = props

    const StyledSelect = styled.select`
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    --tw-text-opacity: 1;
    color: rgba(231, 231, 231, calc(0.5 * var(--tw-text-opacity)));
    `
    

    return (
        <>
            <StyledSelect defaultValue="" onChange={(event) => onchange(event.target.value)} id={name} className={`${variant} py-2 px-5 rounded-md outline-none duration-100 border border-transparent w-auto focus:border-blue-700 bg-secondary-dark cursor-pointer`}>
                {data.length > 0 ? (
                    <option disabled value="" className="font-bold">{text}</option>
                ) : (
                    <option value="" disabled>Undefined</option>
                )}
                {data.map((element, idx) => (
                    <option value={element} key={idx}>{element}</option>
                ))}
            </StyledSelect>
        </>
    )
}

export default DropDown;