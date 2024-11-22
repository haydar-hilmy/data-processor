import { ArrowBackIos } from "@mui/icons-material"
import { useMediaQuery } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"


const Header = (props) => {
    const { children, variant, headerText = "Data Minim", isBackButton = true, infoText = "" } = props
    const navigate = useNavigate();
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const [scrollingDown, setScrollingDown] = useState(false);
    const [navbarVisible, setNavbarVisible] = useState(true);
    const isMobile = useMediaQuery('(max-width: 768px)');

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop > lastScrollTop) {
                if(!isMobile){
                    // Scroll ke bawah
                    setNavbarVisible(false);
                }
            } else {
                // Scroll ke atas
                setNavbarVisible(true);
            }

            setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop); // Menghindari nilai negatif
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollTop]);


    const StyledHeaderText = styled.div`
    display: flex;
    flex-direction: row;


    @media (max-width: 768px){
        gap: 12px;
        flex-direction: column;
    }

`


    return (
        <header style={{
            transform: `${navbarVisible ? "translateY(0)" : "translateY(-130%)"}`,
            borderBottomColor: "#424242",
            borderBottomWidth: "2px",
            marginBottom: "1rem",
            position: isMobile ? 'unset' : 'sticky',
            zIndex: 7,
            top: isMobile ? '5vh' : '0',
            transitionDuration: '250ms',
        }} className={`${variant} bg-primary-dark`}>
            {isBackButton ? (
                <div className="w-auto">
                    <span onClick={() => navigate(-1)} className="flex items-center gap-1 text-base font-normal w-fit py-1 px-1 cursor-pointer duration-150 hover:opacity-60"><ArrowBackIos fontSize="inherit" />back</span>
                </div>
            ) : ("")}
            <StyledHeaderText className="py-3">
                <div style={{ flex: 1 }} className="flex flex-col">
                    <h1 className="text-3xl font-medium">{headerText}</h1>
                    {
                        infoText != "" ? (
                            <span className='text-sm text-gray-500 mt-1'>{infoText}</span>
                        ) : ""
                    }
                </div>
                <div className="flex flex-row gap-2 flex-wrap items-center">
                    {children}
                </div>
            </StyledHeaderText>
        </header>
    )
}

export default Header