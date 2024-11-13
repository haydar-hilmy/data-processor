const Label = (props) => {
    const { className, text, name } = props
    return (
        <>
        <label htmlFor={name} className={`${className} text-primary-0 font-normal`}>{text}</label>
        </>
    )
}
export default Label