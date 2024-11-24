import Header from "../Fragments/Header/Header"
import ButtonFile from "../Elements/Button/ButtonFile"
import { CircleLoading } from "../Elements/LoadingAsset/CircleLoading"
import { useEffect, useState, useCallback, useRef } from "react"
import debounce from 'lodash.debounce'
import MainInput from "../Elements/LabeledInput/Input"
import { useNavigate, useParams } from 'react-router-dom';
import { DataGet, findRecord } from "../../Function/DBDataset"
import { MainTable } from "../Fragments/Table/Table"
import { getColumnNames } from "../../Function/TableFunction"
import DropDown from "../Elements/LabeledInput/DropDown"
import ButtonMain from "../Elements/Button/Button"
import { Analytics } from "@mui/icons-material"

const DatasetTabDetail = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [dataset, setDatasets] = useState(null)
    const [thead, setThead] = useState([])
    const [tbody, setTbody] = useState([])
    const [filterSearch, setFilterSearch] = useState("")
    const [tipsText, setTipsText] = useState("")
    const inputRef = useRef(null)
    const [query, setQuery] = useState("")

    const { iddataset } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        DataGet(iddataset).then((result) => {
            setDatasets(result);
            setIsLoading(false);
            setThead(getColumnNames(result.data))
            setTbody(result.data)
        }).catch(err => {
            console.error(err);
        });



    }, [iddataset])

    const handleSearch = useCallback(debounce((qry) => {
        setIsLoading(true)
        if (qry != "") {
            setIsLoading(false)
            setTbody(findRecord(qry, filterSearch, dataset.data))
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

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus(); // Pastikan fokus tetap pada input
        }
    });

    const onInputSearch = (event) => {
        const query = event.target.value
        setQuery(query)
        handleSearch(query)
    }

    const handleFocus = () => {
        if (inputRef.current) inputRef.current.focus();
    }

    const handleFilter = (value) => {
        setFilterSearch(value)
        setTipsText("")
    }

    return (
        <>
            {dataset != null ? (
                <>
                    <Header headerText="View of Dataset" infoText={`${dataset.name} | ${dataset.data.length > 1 ? `${dataset.data.length.toLocaleString('id-ID')} records` : `${dataset.data.length} record`}`}>
                        <CircleLoading isLoading={isLoading} />
                        <MainInput
                            ref={inputRef}
                            value={query}
                            placeholder="Search data records..."
                            oninput={(e) => onInputSearch(e)}
                            onfocus={handleFocus}
                            style={{ flex: 0.6 }}
                        />
                        <DropDown tipsText={tipsText} value={filterSearch} name="filter_search" onchange={(value) => handleFilter(value)} data={thead} text="Filter by column" />
                        <ButtonMain onclick={() => navigate(`/analyze/${iddataset}`)} variant="bg-btn-special"><Analytics /> Analyze</ButtonMain>
                    </Header>
                    <div className="flex flex-col gap-4">
                        <MainTable isLimitDataShow={true} tbody={tbody} thead={thead} />
                    </div>

                </>
            ) : (
                <>
                    <Header headerText="View of Dataset" infoText={"Dataset not found"}></Header>
                </>
            )}
        </>
    )

}

export default DatasetTabDetail