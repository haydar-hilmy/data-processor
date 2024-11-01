const ButtonLabelRemember = (props) => {
    const { text, className, onclick } = props
    return (
        <>
            <button onClick={onclick} className={`${className != null ? className : ""} bg-white px-5 py-2 rounded-md border-2 text-primary-0 border-green-400 duration-150 hover:border-green-300 hover:text-gray-500 cursor-pointer`}>{text}</button>
        </>
    )
}
export default ButtonLabelRemember