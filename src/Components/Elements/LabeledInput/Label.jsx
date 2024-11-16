const Label = (props) => {
    const { text, name, variant } = props
    return (
        <label className={variant} htmlFor={name}>{text}</label>
    )    
}

export default Label