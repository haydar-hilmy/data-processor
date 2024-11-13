import Input from "./Input"
import Label from "./Label"

const LabeledInput = (props) => {
    const { inputClassName, labelClassName, divClassName, type, name, value, placeholder, text, isLabel = true } = props
    return (
        <>
        <div className={`${divClassName} flex flex-col gap-3`}>
            {isLabel == true ? (
                <Label className={labelClassName} text={text} name={name} />
            ) : ""}
            <Input type={type} name={name} placeholder={placeholder} value={value} className={inputClassName} />
        </div>
        </>
    )
}
export default LabeledInput