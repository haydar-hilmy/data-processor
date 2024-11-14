import { ArrowBackIos } from "@mui/icons-material"
import { Link } from "react-router-dom"
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
    const { children, variant, linkBackButton = "/", headerText = "Data Minim" } = props

    return (
        <header style={{ borderBottomWidth: "2px", borderBottomColor: "#424242", marginBottom: "1rem" }} className={`${variant}`}>
            <div className="w-auto">
                <Link to={linkBackButton}>
                <span className="flex items-center gap-1 text-base font-normal w-fit py-1 px-1"><ArrowBackIos fontSize="inherit" />back</span>
                </Link>
            </div>
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