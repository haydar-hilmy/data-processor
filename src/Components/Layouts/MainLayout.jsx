import { useEffect } from "react"
import Navbar from "../Fragments/Navbar/Navbar"

const MainLayout = (props) => {
    const { children, title = "Data Minim", tab = "" } = props

    useEffect(() => {
        document.title = title
    }, [])

    return (
        <>
            <Navbar activeNav={tab} />
            <main>
                {children}
            </main>
        </>
    )

}

export default MainLayout