import Header from "../Fragments/Header/Header"
import ButtonFile from "../Elements/Button/ButtonFile"
import { CircleLoading } from "../Elements/LoadingAsset/CircleLoading"
import { useEffect, useState, useCallback } from "react"
import debounce from 'lodash.debounce'
import MainInput from "../Elements/LabeledInput/Input"
import { useParams } from 'react-router-dom';
import { DataGet, findRecord } from "../../Function/DBDataset"
import { MainTable } from "../Fragments/Table/Table"
import { getColumnNames } from "../../Function/TableFunction"
import DropDown from "../Elements/LabeledInput/Dropdown"

const DatasetTabDetail = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [dataset, setDatasets] = useState(null)
    const [thead, setThead] = useState([])
    const [tbody, setTbody] = useState([])
    const [filterSearch, setFilterSearch] = useState("")

    const { iddataset } = useParams()

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

    const handleSearch = useCallback(debounce((query) => {
        if(query != ""){
            setTbody(findRecord(query, filterSearch, dataset.data))
        } else {
            setTbody(dataset.data)
        }
    }, 500), [filterSearch, dataset]);

    const onInputSearch = (event) => {
        const query = event.target.value
        handleSearch(query)
    }

    const handleFilter = (value) => {
        setFilterSearch(value)
    }

    return (
        <>
            {dataset != null ? (
                <>
                    <Header headerText="View of Dataset" infoText={`${dataset.name} | ${dataset.data.length > 1 ? `${dataset.data.length.toLocaleString('id-ID')} records` : `${dataset.data.length} record`}`}>
                        <CircleLoading isLoading={isLoading} />
                        <MainInput
                            placeholder="Search data records..."
                            oninput={(e) => onInputSearch(e)}
                            style={{ flex: 0.6 }}
                        />
                        <DropDown value={filterSearch} name="filter_search" onchange={(value) => handleFilter(value)} data={thead} text="Filter by column" />
                    </Header>
                    <div className="flex flex-col gap-4">
                        <MainTable tbody={tbody} thead={thead} />
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