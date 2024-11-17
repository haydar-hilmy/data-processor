const ButtonMain = (props) => {
    const { id = null, name = null, value, variant, text, children = "Button", onchange, onclick, disabled, isLoading = false, info } = props

    return (
        <>
            <button disabled={disabled} id={id != null ? id : ""} name={name != null ? name : ""} value={value != null ? value : ""} className={`${variant} ${isLoading ? "cursor-progress" : "cursor-pointer"} py-2 px-3 flex items-center rounded-md border border-transparent text-white duration-150 hover:opacity-80`} onChange={onchange} onClick={onclick}>
                {children}

                {text}
            </button>
            {
                info != "" ? (
                    <span className='text-sm text-gray-500 mt-1 ml-3'>{info}</span>
                ) : ""
            }
        </>
    )
}

export default ButtonMain