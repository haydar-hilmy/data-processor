const Input = (props) => {
    const { type, name, placeholder, value, className, accept, onchange, oninput } = props
    return (
        <>
            <input onInput={(event) => { if (oninput != null) { oninput(event.target.value) } }} onChange={onchange} accept={accept} className={`${className} py-2 px-5 border border-1 border-gray-400 border-solid w-64 rounded-md`} type={type} id={name} name={name} placeholder={placeholder} value={value} />
        </>
    )
}

export default Input