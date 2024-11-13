import { DataGet } from "../../../Function/DBDataset"
import ButtonLabelRemember from "./Button"
import { useEffect, useState } from "react"
import styled from "styled-components"

const LoadingLabelBox = styled.div`
animation: pulse 0.4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`

const LabelRemember = (props) => {
    const { onclickBtn, oncontextMenu, ontouchStart, ontouchEnd, dataUpdated } = props
    const [showLoadingLabel, setShowLoadingLabel] = useState(true)
    let [data, setData] = useState([])

    useEffect(() => {
        DataGet().then(data => {
            setData(data)
            setShowLoadingLabel(false)
        }).catch(error => {
            setShowLoadingLabel(true)
            console.error(error)
        })
    }, [dataUpdated])


    if (data[0] != null) {
        return (
            <div className="flex flex-col gap-2 w-full mt-2 items-center">
                <div className="flex flex-col items-center">
                    <h3 className="text-base">This App Remembers Your Data</h3>
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
    } else {
        return (
            showLoadingLabel != false ? (
                <>
                    <div className="flex items-center space-x-2">
                        <div className="space-y-2">
                            <LoadingLabelBox className="rounded-md bg-gray-600 h-10 w-[200px]" />
                        </div>
                    </div>
                </>
            ) : ("")

        )
    }
}

export default LabelRemember