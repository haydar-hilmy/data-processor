import Label from './Label'
import MainInput from './Input'

const LabeledInput = (props) => {
    const { type = "text", name = "input1", text = "Label", placeholder = "Main Input", info = "", value = null, onchange = () => {}, maxlength, min, max } = props;
    return (
        <div className='flex flex-col gap-1'>
            <Label variant="ml-3 text-md opacity-60 font-normal" name={name} text={text} />
            <div className='flex flex-col'>
                <MainInput max={max} min={min} maxlength={maxlength} onchange={onchange} type={type} id={name} name={name} placeholder={placeholder} text={text} value={value != null ? value : ""} />
                {info != "" ? (
                    <p className='text-sm text-gray-500 mt-1 ml-3'>{info}</p>
                ) : ""}
            </div>
        </div>
    )
}

export default LabeledInput