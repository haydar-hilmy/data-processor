const DropDown = (props) => {
    const { data, name, text, className, onchange } = props

    return (
        <>
            <select onChange={(event) => onchange(event.target.value)} id={name} className={`${className} custom-dropdown py-2 px-5 border border-1 border-gray-400 border-solid w-64 rounded-md`}>
                {data.length > 0 ? (
                    <option value="" disabled selected>{text}</option>
                ) : (
                    <option value="" disabled>Undefined</option>
                )}
                {data.map((element, idx) => (
                    <option value={element} key={idx}>{element}</option>
                ))}
            </select>
        </>
    )
}

export default DropDown;