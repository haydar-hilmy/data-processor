import { useEffect } from "react"
import Navbar from "../Fragments/Navbar/Navbar"
import styled from "styled-components"
import Header from "../Fragments/Header/Header"

const StyledMain = styled.main`
padding: 24px;
margin-left: 20vw;

@media (max-width: 768px){
    margin-left: 40vw;
}
        
@media (max-width: 480px){
    margin-left: 0;
}

@media (max-width: 280px){
    margin-left: 0;
}
`

const MainLayout = (props) => {
    const { children, title = "Data Minim", tab = "" } = props

    useEffect(() => {
        document.title = title
    }, [])

    return (
        <>
            <Navbar activeNav={tab} />
            <StyledMain>
                {children}
            </StyledMain>
        </>
    )

}

export default MainLayout