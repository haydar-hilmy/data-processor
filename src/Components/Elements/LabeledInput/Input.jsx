const MainInput = (props) => {
    const { oninput, value, name, id, variant } = props

    return (
        <input className={`${variant} `} value={value} name={name} id={id} onInput={oninput} />
    )
}

export default MainInput