import styled from "styled-components"
import { Dashboard as DashboardIcon, Dataset as DatasetIcon, Analytics as AnalyzeIcon, Settings as SettingsIcon, Help as HelpIcon } from '@mui/icons-material'
import { IconButton } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import React, { useRef, useState, useEffect } from 'react';
import UseredPhoto from "../../Elements/UserProfile/UseredPhoto";
import { useNavigate } from "react-router-dom";


const Navbar = (props) => {
    const { variant = "", activeNav = "", username = "User", email = "", userphoto = null } = props

    const [openNav, setOpenNav] = useState(false);
    const BackModalRef = useRef(null);
    const StyledNavRef = useRef(null);

    const navigate = useNavigate()
    const handleTabClick = (tab) => {
        navigate(`/${tab}`)
    }

    const toggleNav = () => {
        setOpenNav(!openNav);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (BackModalRef.current && event.target === BackModalRef.current) {
                setOpenNav(false);
            }
        };

        window.addEventListener('click', handleClickOutside);

        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);


    const StyledNav = styled.nav`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
    height: 100vh;
    width: 19vw;
    position: fixed;
    float: left;
    left: 0;
    top: 0;
    box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.2);
    padding: 12px;
    transition-duration: 150ms;
    z-index: 20;
    transition: transform 0.2s ease-in-out;
    user-select: none;
    
    @media (max-width: 768px){
        width: 40vw;
        position: fixed;
        transition: transform 0.2s ease-in-out;
        transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};
    }
        
    @media (max-width: 480px){
        width: 75vw;
    }

    @media (max-width: 280px){
        width: 100vw;
    }
    `

    const StyledTopNav = styled.div`
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        gap: 12px;
        width: 100%;
        height: 10vh;
        padding: 0 16px;
        box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.2);
        position: fixed;
        top: 0;
        z-index: 18;
        transform: translateY(-100%);
        transition-duration: 150ms;

        @media (max-width: 768px){
            position: sticky;
            transform: translateY(0);
        }

    `

    const BackModal = styled.div`
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 19;
    `

    const StyledTitleNav = styled.div`
    width: 100%;
    
    div.div:nth-child(1) {
        display: block;
        padding: 2px 14px;
    }
    div.div:nth-child(2) {
        display: none;
    }
        
    @media (max-width: 768px) {
        div.div:nth-child(1) {
            display: none;
        }
        div.div:nth-child(2) {
            display: block;
        }
    }
`;




    const StyledListNav = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    justify-content: center;

    span{
        display: flex;
        align-items: center;
        gap: 6px;
        width: 100%;
        background-color: transparent;
        padding: 12px 20px;
        text-align: left;
        border-radius: 8px;
        font-size: 0.85rem;
        font-weight: 400;
        letter-spacing: 0.05rem;
        cursor: pointer;
        transition: background-color 200ms, opacity 200ms;
    }
    span:hover{
        background-color: #0C0C0C;
    }
    span.activeNav{
        background-color: #0C0C0C;
        opacity: 1;
    }
    span.activeNav:hover{
        opacity: 0.65;
    }

    `

    return (
        <>
            <StyledTopNav className="bg-secondary-dark">
                <IconButton onClick={toggleNav} color="inherit">
                    <MenuIcon />
                </IconButton>
                <h6 style={{ flex: 2 }} className="text-2xl font-medium">Data Minim</h6>
            </StyledTopNav>
            {
                openNav ? (
                    <BackModal ref={BackModalRef} id="back_modal"></BackModal>
                ) : ("")
            }
            <StyledNav ref={StyledNavRef} open={openNav} className={`${variant} bg-secondary-dark`}>
                <StyledTitleNav>
                    <div className="div">
                        <h1 className="text-2xl font-medium">Data Minim</h1>
                    </div>
                    <div className="div">
                        <UseredPhoto username={username} email={email} userphoto={userphoto} />
                    </div>
                </StyledTitleNav>
                <StyledListNav>
                    <span
                        className={activeNav === '/dashboard' ? 'activeNav' : ''}
                        onClick={() => handleTabClick('dashboard')}>
                        <DashboardIcon /> Dashboard
                    </span>
                    <span
                        className={activeNav === '/dataset' ? 'activeNav' : ''}
                        onClick={() => handleTabClick('dataset')}>
                        <DatasetIcon /> Dataset
                    </span>
                    <span
                        className={activeNav === '/analyze' ? 'activeNav' : ''}
                        onClick={() => handleTabClick('analyze')}>
                        <AnalyzeIcon /> Analyze
                    </span>
                    <span
                        className={activeNav === '/settings' ? 'activeNav' : ''}
                        onClick={() => handleTabClick('settings')}>
                        <SettingsIcon /> Settings
                    </span>
                    <span
                        className={activeNav === '/help' ? 'activeNav' : ''}
                        onClick={() => handleTabClick('help')}>
                        <HelpIcon /> Help
                    </span>
                </StyledListNav>
                <div className="hidden items-end h-full md:flex">
                    <UseredPhoto username={username} email={email} userphoto={userphoto} />
                </div>
            </StyledNav>
        </>
    )
}

export default Navbar