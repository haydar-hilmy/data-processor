import Input from "../LabeledInput/Input"
import Label from "../LabeledInput/Label"

const ButtonFile = (props) => {
    const { name, value, className, text, accept, onchange } = props
    return (
        <>
            <div>
                <Input onchange={onchange} accept={accept} type="file" name={name} value={value} className={`${className} hidden`} />
                <label className="cursor-pointer bg-green-500 hover:bg-green-400 duration-150 text-white py-2 px-5 rounded-md flex gap-2 items-center" htmlFor={name}>
                    <i className="fas fa-upload"></i>
                    {text}
                </label>
            </div>
        </>
    )
}
export default ButtonFile