import SubDiv from "../Div/SubDiv"
import MainTitle from "./MainTitle"
import { CloseOutlined } from "@mui/icons-material"

const TableTitle = (props) => {
    const { title, onclick } = props
    return (
        <SubDiv>
            <MainTitle text={title} className="flex-1 font-medium text-primary-0 text-lg" tag="h1" />
            <div className="flex flex-row flex-1 justify-end">
                <span className='hover:rotate-180 duration-150' onClick={onclick}><CloseOutlined className='text-primary-0 cursor-pointer' /></span>
            </div>
        </SubDiv>
    )
}

export default TableTitle