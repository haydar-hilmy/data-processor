import { useEffect, useState, useCallback } from "react"
import Header from "../Fragments/Header/Header"
import { CircleLoading } from "../Elements/LoadingAsset/CircleLoading"
import debounce from 'lodash.debounce'
import MainInput from "../Elements/LabeledInput/Input"
import { useParams } from 'react-router-dom';
import { DataGet, findRecord } from "../../Function/DBDataset"
import { MainTable } from "../Fragments/Table/Table"
import { getColumnNames } from "../../Function/TableFunction"
import DropDown from "../Elements/LabeledInput/Dropdown"
import ButtonMain from "../Elements/Button/Button"
import { Analytics } from "@mui/icons-material"
import SubNav from "../Fragments/SubNav/SubNav"

const AnalyzeTabAnalyze = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [dataset, setDatasets] = useState(null)
    const [thead, setThead] = useState([])
    const [tbody, setTbody] = useState([])
    const [filterSearch, setFilterSearch] = useState("")
    const [tipsText, setTipsText] = useState("")
    const [subTab, setSubTab] = useState("menu")

    const { iddataset } = useParams()

    useEffect(() => {
        setIsLoading(true)
        DataGet(iddataset).then((result) => {
            setDatasets(result);
            setIsLoading(false);
            setThead(getColumnNames(result.data))
            setTbody(result.data)
        }).catch(err => {
            console.error(err);
        });
    }, [iddataset])

    const handleSearch = useCallback(debounce((query) => {
        setIsLoading(true)
        if (query != "") {
            setIsLoading(false)
            setTbody(findRecord(query, filterSearch, dataset.data))
        } else {
            setIsLoading(false)
            setTbody(dataset.data)
        }

        if (filterSearch == null || filterSearch == "") {
            setTipsText("Enter a filter value")
        } else {
            setTipsText("")
        }

    }, 500), [filterSearch, dataset]);

    const onInputSearch = (event) => {
        const query = event.target.value
        handleSearch(query)
    }

    const handleFilter = (value) => {
        setFilterSearch(value)
        setTipsText("")
    }

    const handleClickSubTab = (tab) => {
        setSubTab(tab)
    }


    return (
        <>
            {dataset != null ? (
                <>
                    <Header headerText="Data Processing and Analysis" infoText={`${dataset.name} | ${dataset.data.length > 1 ? `${dataset.data.length.toLocaleString('id-ID')} records` : `${dataset.data.length} record`}`}>
                        <CircleLoading isLoading={isLoading} />
                        <MainInput
                            placeholder="Search data records..."
                            oninput={(e) => onInputSearch(e)}
                            style={{ flex: 0.6 }}
                        />
                        <DropDown tipsText={tipsText} value={filterSearch} name="filter_search" onchange={(value) => handleFilter(value)} data={thead} text="Filter by column" />
                    </Header>
                    <div className="flex flex-col gap-4">
                        <MainTable tbody={tbody} thead={thead} />
                        <SubNav>
                            <div onClick={() => handleClickSubTab("menu")} className={`${subTab == "menu" ? "activeLinkSubNav" : ""} linkSubNav`}>
                                Menu
                            </div>
                            <div onClick={() => handleClickSubTab("analysis")} className={`${subTab == "analysis" ? "activeLinkSubNav" : ""} linkSubNav`}>
                                Analysis
                            </div>
                            <div onClick={() => handleClickSubTab("result")} className={`${subTab == "result" ? "activeLinkSubNav" : ""} linkSubNav`}>
                                Result
                            </div>
                        </SubNav>
                    </div>

                    {
                        subTab == "menu" ? (
                            "Menu Tab"
                        ) : subTab == "analysis" ? (
                            "Analysis Tab"
                        ) : subTab == "result" ?(
                            "Result Tab"
                        ) : ("")
                    }

                </>
            ) : (
                <>
                    <Header headerText="View of Dataset" infoText={"Dataset not found"}></Header>
                </>
            )}
        </>
    )
}

export default AnalyzeTabAnalyze