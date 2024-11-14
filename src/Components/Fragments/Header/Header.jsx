import { ArrowBackIos } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

const StyledHeaderText = styled.div`
display: flex;
flex-direction: row;

@media (max-width: 768px){
    gap: 12px;
    flex-direction: column;
}

`


const Header = (props) => {
    const { children, variant, headerText = "Data Minim", isBackButton = true } = props
    const navigate = useNavigate();

    return (
        <header style={{ borderBottomWidth: "2px", borderBottomColor: "#424242", marginBottom: "1rem" }} className={`${variant}`}>
            {isBackButton ? (
                <div className="w-auto">
                    <span onClick={() => navigate(-1)} className="flex items-center gap-1 text-base font-normal w-fit py-1 px-1 cursor-pointer duration-150 hover:opacity-60"><ArrowBackIos fontSize="inherit" />back</span>
                </div>
            ) : ("")}
            <StyledHeaderText className="py-3">
                <h1 style={{ flex: 1 }} className="text-3xl font-medium">{headerText}</h1>
                <div className="flex flex-row gap-2 flex-wrap">
                    {children}
                </div>
            </StyledHeaderText>
        </header>
    )
}

export default Header