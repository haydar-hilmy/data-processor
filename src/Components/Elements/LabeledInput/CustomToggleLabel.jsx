import ToggleSwitch from "../Checkbox/ToggleSwitch"
import Label from "./Label"

const CustomToggleLabel = (props) => {
    const { name, text, variant } = props
    return (
        <div className={`${variant} flex flex-row items-center gap-3`}>
            <ToggleSwitch />
            <Label name={name} text={text} />
        </div>
    )
}

export default CustomToggleLabel