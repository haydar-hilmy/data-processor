const Input = (props) => {
    const { type, name, placeholder, value, className, accept } = props
    return (
        <>
            <input accept={accept} className={`${className} py-2 px-5 border border-solid border-gray-700 w-64 rounded-md`} type={type} id={name} name={name} placeholder={placeholder} value={value}  />
        </>
    )
}

export default Input