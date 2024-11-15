import { useEffect, useState } from "react";
import Header from "../Fragments/Header/Header"
import MainLayout from "../Layouts/MainLayout"
import SubNav from "../Fragments/SubNav/SubNav";

const SettingsTab = () => {

    const [subTab, setSubTab] = useState("user")

    const handleClickSubTab = (tab) => {
        setSubTab(tab)
    }


    return (
        <MainLayout title="Application Settings" tab="settings">
            <Header headerText={`Settings`}></Header>

            <SubNav>
                <div onClick={() => handleClickSubTab("user")} className={`${subTab == "user" ? "activeLinkSubNav" : ""} linkSubNav`}>
                    User
                </div>
                <div onClick={() => handleClickSubTab("theme")} className={`${subTab == "theme" ? "activeLinkSubNav" : ""} linkSubNav`}>
                    Theme
                </div>
            </SubNav>

            {
                subTab == "user" ? (
                    "This is User Tab"
                ) : subTab == "theme" ? (
                    "This is Theme Tab"
                ) : ("")
            }
        </MainLayout>
    )

}

export default SettingsTab