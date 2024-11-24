import React from "react"

const MainInput = React.forwardRef((props, ref) => {
    const { 
        oninput,
        onchange,
        onkeydown,
        onsubmit,
        onfocus,
        value,
        name,
        id,
        variant,
        placeholder = "Main Input",
        style ,
        type,
        maxlength,
        } = props

    return (
        <input
        ref={ref}
        maxLength={maxlength} 
        type={type} 
        style={style} 
        className={`${variant} py-2 px-3 rounded-md outline-none duration-100 border border-transparent focus:border-blue-700 bg-secondary-dark placeholder:text-primary-dark-0 placeholder:opacity-50`}
        placeholder={placeholder}
        value={value}
        name={name}
        id={id}
        onInput={oninput}
        onChange={onchange}
        onSubmit={onsubmit}
        onKeyDown={onkeydown}
        onFocus={onfocus}
        />
    )
})

export default MainInput