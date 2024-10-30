import DataGet from "../../../func/DataGet"
import MainTitle from "../Texts/MainTitle"
import ButtonLabelRemember from "./Button"

let data = DataGet()

const LabelRemember = () => {
    if (data != null) {
        return (
            <div className="flex flex-col gap-2 w-full mt-2 items-center">
                <div className="flex flex-col items-center">
                    <MainTitle tag="h3" className="text-primary-0 text-base" text="This app remembers your data" />
                </div>
                <div className="flex justify-center flex-wrap w-1/2 gap-2">
                    {
                        data.map((item) => (
                            <ButtonLabelRemember key={item.id} text={item.name} />
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default LabelRemember