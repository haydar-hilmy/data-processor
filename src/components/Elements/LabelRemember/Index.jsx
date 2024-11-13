import { div } from "@tensorflow/tfjs"
import DataGet from "../../../func/DatasetGet"
import MainTitle from "../Texts/MainTitle"
import ButtonLabelRemember from "./Button"
import { useEffect, useState } from "react"


const LabelRemember = (props) => {
    const { onclickBtn, oncontextMenu, ontouchStart, ontouchEnd, dataUpdated } = props
    let [data, setData] = useState(DataGet())
    
    useEffect(() => {
        setData(DataGet())
    }, [dataUpdated])


    if (data != null) {
        return (
            <div className="flex flex-col gap-2 w-full mt-2 items-center">
                <div className="flex flex-col items-center">
                    <MainTitle tag="h3" className="text-base" text="This app remembers your data" />
                </div>
                <div className="flex justify-center flex-wrap w-1/2 gap-2">
                    {
                        data.map((item) => (
                            <div key={item.id}>
                                <ButtonLabelRemember ontouchStart={() => ontouchStart(item.id)} ontouchEnd={() => ontouchEnd()} oncontextmenu={(event) => oncontextMenu(event, item.id)} onclick={() => onclickBtn(item.id, item.name)} text={item.name} />
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default LabelRemember