const ButtonLabelRemember = (props) => {
    const { text, variant, onclick, oncontextmenu, ontouchStart, ontouchEnd } = props
    return (
        <>
            <button onTouchStart={ontouchStart} onTouchEnd={ontouchEnd} onContextMenu={oncontextmenu} onClick={onclick} className={`${variant != null ? variant : ""} bg-gray-700 px-5 py-2 rounded-md text-primary-dark-0 duration-150 hover:opacity-60 cursor-pointer select-none`}>{text}</button>
        </>
    )
}
export default ButtonLabelRemember