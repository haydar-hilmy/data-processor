import { useEffect, useState } from "react"
import CustomToggleLabel from "../../Elements/LabeledInput/CustomToggleLabel"
import LabeledInput from "../../Elements/LabeledInput/LabeledInput"
import LabeledInputWrap from "../../Elements/LabeledInput/LabeledInputWrap"
import ButtonMain from '../../../Components/Elements/Button/Button'

const UpdateTheme = () => {

    const [mainBgColor, setMainBgColor] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        document.documentElement.style.setProperty('--main-bg-color', mainBgColor);
      };



    return (
        <div className="mt-4">
            <h1 className="text-2xl">Appearance</h1>
            <span className="text-sm text-gray-500 mt-1">This feature is under maintenance</span>
            <CustomToggleLabel variant="mt-4" text="Theme" />

            <form onSubmit={handleSubmit}>

                <LabeledInputWrap>
                    <LabeledInput type="color" value={scroll} onchange={(e) => setMainBgColor(e.target.value)} />
                </LabeledInputWrap>
                <ButtonMain type="submit" variant="bg-btn-primary">
                    Change
                </ButtonMain>
            </form>

        </div>
    )
}

export default UpdateTheme