import Label from './Label'
import MainInput from './Input'

const LabeledInput = (props) => {
    const { type = "text", name = "input1", text = "Label", placeholder = "Main Input", info = "", value, onchange, maxlength } = props;
    return (
        <div className='flex flex-col gap-2 my-2'>
            <Label variant="ml-3" name={name} text={text} />
            <div className='flex flex-col'>
                <MainInput maxlength={maxlength} onchange={onchange} type={type} id={name} name={name} placeholder={placeholder} text={text} value={value} />
                {info != "" ? (
                    <p className='text-sm text-gray-500 mt-1 ml-3'>{info}</p>
                ) : ""}
            </div>
        </div>
    )
}

export default LabeledInput