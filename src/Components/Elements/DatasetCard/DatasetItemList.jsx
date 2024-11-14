import { Delete, Edit } from "@mui/icons-material"
import ButtonMain from "../Button/Button"
import styled from "styled-components"

const StyledItemList = styled.div`
display: flex;
flex-direction: row;
gap: 8px;
`

const DatasetItemList = (props) => {
    const { info = { id: "", name: "", size: `0mb` }, onDelete, onEdit, onclickDataset } = props

    return ( 
        <StyledItemList>
            <div style={{ flex: 1 }} className="flex flex-col gap-1">
                <h3 style={{ letterSpacing: '0.02rem' }} className="text-xl font-medium">{info.name}</h3>
                <h6 style={{ letterSpacing: '0.03rem', wordBreak: 'break-all' }} className="text-sm font-light">{info.id}</h6>
            </div>
            <div style={{ flex: 1 }} className="flex items-center">
                <span className="text-base font-medium">{info.size}</span>
            </div>
            <div style={{ flex: 0.3 }} className="flex flex-row items-center gap-2">
                <ButtonMain onclick={onDelete} variant="bg-red-700">
                    <Delete />
                </ButtonMain>
                <ButtonMain variant="bg-green-700">
                    <Edit />
                </ButtonMain>
            </div>
        </StyledItemList>
    )
}

export default DatasetItemList