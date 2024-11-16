import { useEffect, useState } from "react"
import Navbar from "../Fragments/Navbar/Navbar"
import styled from "styled-components"
import { DBGetUser } from "../../Function/DBUser"
import { Outlet, useLocation, matchPath } from 'react-router-dom'
import { myRouter } from "../../App"

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
    const location = useLocation(); // Mendapatkan lokasi path saat ini
    const [title, setTitle] = useState("Default Title");

    useEffect(() => {
        // Mencari route yang cocok berdasarkan pathname menggunakan matchPath
        const route = myRouter.routes
            .flatMap(route => route.children ? route.children : route)
            .find(route => matchPath(route.path, location.pathname)); // Memastikan cocok dengan path dinamis

        // Set title dari route yang cocok
        setTitle(route?.title || "Default Title");
    }, [location]);   // Re-run useEffect setiap location berubah


    const [UserData, setUserData] = useState({ name: "..." })

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
    }, [title])

    return (
        <>
            <Navbar email={UserData.email} username={UserData.name} userphoto={UserData.image} activeNav={title} />
            <StyledMain>
                <Outlet />
            </StyledMain>
        </>
    )

}

export default MainLayout