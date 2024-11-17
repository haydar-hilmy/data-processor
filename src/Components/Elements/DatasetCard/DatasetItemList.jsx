import { Delete, Edit } from "@mui/icons-material"
import ButtonMain from "../Button/Button"
import styled from "styled-components"

const StyledItemList = styled.div`
display: flex;
flex-direction: row;
gap: 8px;
align-items: center;

.tooltip{
    position: relative;
}

.tooltip .tooltiptext {
    font-size: 0.9rem;
    visibility: unset;
    width: fit-content;
    background-color: #333;
    color: #fff;
    text-align: center;
    border-radius: 5px;
    padding: 5px 12px;
    position: absolute;
    z-index: 10;
    bottom: 100%; /* Position the tooltip above */
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    transition: opacity 0.3s;
    user-select: none;
}

.tooltip .tooltiptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #333 transparent transparent transparent;
}

/* Show the tooltip text on hover */
.tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
}

.subOption{
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
}
    
@media (max-width: 768px){
    .subOption{
        flex-direction: column;
        flex: 0.3;
    }
}

`



const DatasetItemList = (props) => {
    const { info = { id: "", name: "", size: `0mb` }, onDelete, onEdit, onclickDataset } = props

    return (
        <StyledItemList>
            <div style={{ flex: 1, cursor: 'pointer' }} className="tooltip flex flex-col gap-1">
                <span className="tooltiptext">Double Tap to see</span>
                <h3 style={{ letterSpacing: '0.02rem', wordBreak: 'break-all' }} className="text-xl font-medium">{info.name}</h3>
                <h6 style={{ letterSpacing: '0.03rem', wordBreak: 'break-all' }} className="text-xs font-light">{info.id}</h6>
            </div>
            <div className="subOption">
                <div style={{ flex: 1 }} className="flex items-center">
                    <span className="md:text-base text-sm font-normal">{info.type}</span>
                </div>
                <div style={{ flex: 1 }} className="flex items-center">
                    <span className="md:text-base text-sm font-normal">{info.size}</span>
                </div>
                <div className="subOption-btn flex flex-row items-center gap-2">
                    <ButtonMain onclick={onDelete} variant="bg-btn-warning">
                        <Delete />
                    </ButtonMain>
                    <ButtonMain variant="bg-btn-success">
                        <Edit />
                    </ButtonMain>
                </div>
            </div>
        </StyledItemList>
    )
}

export default DatasetItemList