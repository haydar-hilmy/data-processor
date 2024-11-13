const MainButton = (props) => {
    const { className, text, onclick } = props
    return ( 
        <button className={`${className} bg-blue-500`} onClick={onclick}>{text}</button>
    )
}
export default MainButton