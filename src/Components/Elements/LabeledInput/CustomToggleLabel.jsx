import ToggleSwitch from "../Checkbox/ToggleSwitch"
import Label from "./Label"

const CustomToggleLabel = (props) => {
    const { name, text } = props
    return (
        <div className="flex flex-row">
            <ToggleSwitch />
            <Label name={name} text={text} />
        </div>
    )
}

export default CustomToggleLabel