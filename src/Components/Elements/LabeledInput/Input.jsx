const MainInput = (props) => {
    const { oninput, onchange, onkeydown, onsubmit, value, name, id, variant, placeholder = "Main Input", style } = props

    return (
        <input style={style} className={`${variant} py-2 px-3 rounded-md outline-none duration-100 border border-transparent focus:border-blue-700 bg-secondary-dark placeholder:text-primary-dark-0`} placeholder={placeholder} value={value} name={name} id={id} onInput={oninput} onChange={onchange} onSubmit={onsubmit} onKeyDown={onkeydown} />
    )
}

export default MainInput