import { useEffect, useState } from "react"
import Header from "../Fragments/Header/Header"
import MainLayout from "../Layouts/MainLayout"
import SubNav from "../Fragments/SubNav/SubNav"
import { UpdateUserForm } from "../Fragments/Form/UpdateUserForm"


const SettingsTab = () => {

    const [subTab, setSubTab] = useState("user")

    const handleClickSubTab = (tab) => {
        setSubTab(tab)
    }




    return (
        <>
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
                    <UpdateUserForm />
                ) : subTab == "theme" ? (
                    "This is Theme Tab"
                ) : ("")
            }
        </>
    )

}

export default SettingsTab