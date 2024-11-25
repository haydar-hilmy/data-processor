import { useEffect, useState, useCallback, useRef } from "react"
import Header from "../Fragments/Header/Header"
import { CircleLoading } from "../Elements/LoadingAsset/CircleLoading"
import debounce from 'lodash.debounce'
import MainInput from "../Elements/LabeledInput/Input"
import { useParams } from 'react-router-dom';
import { DataGet, findRecord } from "../../Function/DBDataset"
import { MainTable } from "../Fragments/Table/Table"
import { detectColumnType, getColumnNames, splitDataByType } from "../../Function/TableFunction"
import DropDown from "../Elements/LabeledInput/DropDown"
import ButtonMain from "../Elements/Button/Button"
import { Analytics } from "@mui/icons-material"
import SubNav from "../Fragments/SubNav/SubNav"
import LabeledInput from "../Elements/LabeledInput/LabeledInput"
import LabeledInputWrap from "../Elements/LabeledInput/LabeledInputWrap"
import Label from "../Elements/LabeledInput/Label"
import { BarChart, DoughnutChart } from "../Elements/Chart/Charts"

const AnalyzeTabAnalyze = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [dataset, setDatasets] = useState(null)
    const [theadMainDataset, setTheadMainDataset] = useState([])
    const [tbodyMainDataset, setTbodyMaindataset] = useState([])
    const [filterSearch, setFilterSearch] = useState("")
    const [tipsText, setTipsText] = useState("")
    const [subTab, setSubTab] = useState("menu")
    const searchRef = useRef(null)
    const [searchQuery, setSearchQuery] = useState("")

    const [typeMainDataset, setTypeMainDataset] = useState(null)

    const { iddataset } = useParams()

    useEffect(() => {
        setIsLoading(true)
        DataGet(iddataset).then((result) => {
            setDatasets(result);
            setIsLoading(false);
            setTheadMainDataset(getColumnNames(result.data))
            setTbodyMaindataset(result.data)
            setTypeMainDataset(splitDataByType(result.data, detectColumnType(result.data)))
        }).catch(err => {
            console.error(err);
        });
    }, [iddataset])

    useEffect(() => {
        if (searchRef.current) {
            searchRef.current.focus(); // Pastikan fokus tetap pada input
        }
    });

    const handleSearch = useCallback(debounce((query) => {
        setIsLoading(true)
        if (query != "") {
            setIsLoading(false)
            setTbodyMaindataset(findRecord(query, filterSearch, dataset.data))
        } else {
            setIsLoading(false)
            setTbodyMaindataset(dataset.data)
        }

        if (filterSearch == null || filterSearch == "") {
            setTipsText("Enter a filter value")
        } else {
            setTipsText("")
        }

    }, 500), [filterSearch, dataset]);

    const onInputSearch = (event) => {
        const query = event.target.value
        setSearchQuery(query)
        handleSearch(query)
    }

    const handleFilter = (value) => {
        setFilterSearch(value)
        setTipsText("")
    }

    const handleClickSubTab = (tab) => {
        setSubTab(tab)
    }

    const handleFocusSearch = () => {
        if (searchRef.current) searchRef.current.focus();
    }


    return (
        <>
            {dataset != null ? (
                <>
                    <Header headerText="Data Processing and Analysis" infoText={`${dataset.name} | ${dataset.data.length > 1 ? `${dataset.data.length.toLocaleString('id-ID')} records` : `${dataset.data.length} record`}`}>
                        <CircleLoading isLoading={isLoading} />
                        <MainInput
                            ref={searchRef}
                            value={searchQuery}
                            placeholder="Search data records..."
                            onfocus={handleFocusSearch}
                            oninput={(e) => onInputSearch(e)}
                            style={{ flex: 0.6 }}
                        />
                        <DropDown tipsText={tipsText} value={filterSearch} name="filter_search" onchange={(value) => handleFilter(value)} data={theadMainDataset} text="Filter by column" />
                    </Header>
                    <div className="flex flex-col gap-4">
                        <SubNav>
                            <div onClick={() => handleClickSubTab("dataset")} className={`${subTab == "dataset" ? "activeLinkSubNav" : ""} linkSubNav`}>
                                Dataset
                            </div>
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
                        subTab == "dataset" ? (
                            <>
                                <MainTable tbody={tbodyMainDataset} thead={theadMainDataset} isLimitDataShow={true} />
                            </>
                        ) :
                            subTab == "menu" ? (
                                <div className="mt-4">
                                    <h1 className="text-2xl">Configure Analysis</h1>
                                    <LabeledInputWrap>
                                        <DropDown label="Analyze Method" data={["Regression", "Classification", "Clustering"]} />

                                    </LabeledInputWrap>
                                </div>
                            ) : subTab == "analysis" ? (
                                <>
                                    <div className="flex flex-col md:flex-row gap-3">
                                        <div style={{ flex: 1, width: '45%' }}>
                                            <MainTable infoText="Categorical" tbody={typeMainDataset.categoricalData} thead={getColumnNames(typeMainDataset.categoricalData)} />
                                        </div>
                                        <div style={{ flex: 1, width: '45%' }}>
                                            <MainTable infoText="Numerical" tbody={typeMainDataset.numericalData} thead={getColumnNames(typeMainDataset.numericalData)} />
                                        </div>
                                    </div>
                                </>
                            ) : subTab == "result" ? (
                                <>
                                    <BarChart />
                                    <DoughnutChart />
                                </>
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