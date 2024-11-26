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
        style,
        type,
        maxlength,
        max,
        min,
        info = ""
    } = props

    return (
        <div className="flex flex-col">
            <input
                ref={ref}
                maxLength={maxlength}
                type={type}
                style={style}
                className={`${variant} w-fit py-2 px-3 rounded-md outline-none duration-100 border border-transparent focus:border-blue-700 bg-secondary-dark placeholder:text-primary-dark-0 placeholder:opacity-50`}
                placeholder={placeholder}
                value={value}
                name={name}
                id={id}
                onInput={oninput}
                onChange={onchange}
                onSubmit={onsubmit}
                onKeyDown={onkeydown}
                onFocus={onfocus}
                max={max}
                min={min}
            />
            {
                info != "" ?
                    <p className='text-sm text-gray-500 mt-1 ml-3'>{info}</p>
                    : ""
            }
        </div>
    )
})

export default MainInput