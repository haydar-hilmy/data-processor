const ButtonMain = (props) => {
    const { id = null, name = null, value, variant, text, children = "Button", onchange, onclick } = props

    return (
        <button id={id != null ? id : ""} name={name != null ? name : ""} value={value != null ? value : "" } className={`${variant} cursor-pointer py-2 px-3 flex items-center rounded-md text-white duration-150 hover:opacity-80`} onChange={onchange} onClick={onclick}>
            {children}
            
            {text}
        </button>
    )
}

export default ButtonMain