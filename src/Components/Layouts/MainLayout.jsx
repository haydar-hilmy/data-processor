import { useEffect, useState } from "react"
import Navbar from "../Fragments/Navbar/Navbar"
import styled from "styled-components"
import { DBGetUser } from "../../Function/DBUser"

const StyledMain = styled.main`
padding: 24px;
margin-left: 20vw;

@media (max-width: 768px){
    margin-left: 0;
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

    const [UserData, setUserData] = useState({name: "..."})
    
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const result = await DBGetUser();
                setUserData(result);
            } catch (err) {
                console.log(err);
            }
        };
    
        fetchUserData();
    }, []);

    useEffect(() => {
        document.title = title
    }, [])

    return (
        <>
            <Navbar email={UserData.email} username={UserData.name} userphoto={UserData.image} activeNav={tab} />
            <StyledMain>
                {children}
            </StyledMain>
        </>
    )

}

export default MainLayout