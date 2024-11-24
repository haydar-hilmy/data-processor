import { useNavigate } from "react-router-dom"
import Header from "../Fragments/Header/Header"
import { CircleLoading } from "../Elements/LoadingAsset/CircleLoading"
import { useCallback, useState, useEffect, useRef } from "react"
import debounce from "lodash.debounce"
import { DataGet } from "../../Function/DBDataset"
import DatasetItemList from "../Elements/DatasetCard/DatasetItemList"
import { bytesToKB, bytesToMB } from "../../Function/IndexedDBSize"
import MainInput from "../Elements/LabeledInput/Input"

const AnalyzeTab = () => {

    const navigate = useNavigate()

    const [getDatasets, setGetDatasets] = useState([])
    const [tempDatasets, setTempDatasets] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [dataUpdated, setDataUpdated] = useState(false)
    const [querySearch, setQuerySearch] = useState("")
    const searchRef = useRef(null)

    useEffect(() => {
        DataGet().then((result) => {
            setGetDatasets(result);
            setTempDatasets(result);
            setIsLoading(false);
        }).catch(err => {
            console.error(err);
        });

    }, [dataUpdated]);

    useEffect(() => {
        if (searchRef.current) {
            searchRef.current.focus(); // Pastikan fokus tetap pada input
        }
    });

    const handleSearch = useCallback(debounce((query) => {
        const filteredData = getDatasets.filter(item =>
            item.name.toLowerCase().includes(query.toLowerCase().trim())
        );
        setTempDatasets(filteredData); // Result
    }, 500), [getDatasets]);

    const onInputSearch = (event) => {
        const query = event.target.value
        setQuerySearch(query)
        handleSearch(query)
    }

    const handleSearchFocus = () => {
        if (searchRef.current) searchRef.current.focus();
    }

    return (
        <>
            <Header headerText={`Analyze Dataset`}>
                <CircleLoading isLoading={isLoading} />
                <MainInput
                    value={querySearch}
                    onfocus={handleSearchFocus}
                    ref={searchRef}
                    placeholder="Search Dataset"
                    oninput={(e) => onInputSearch(e)}
                    style={{ flex: 0.6 }} />
            </Header>

            <div className="flex flex-col gap-4">
                {
                    tempDatasets.length > 0 && tempDatasets && Array.isArray(tempDatasets) ?
                        tempDatasets.map((dataset, index) => {
                            const sizeInKB = bytesToKB(dataset.size);
                            const sizeInMB = bytesToMB(dataset.size);
                            return (
                                <DatasetItemList
                                    tipText="Double Tap to Analyze"
                                    info={{
                                        id: dataset.id,
                                        name: dataset.name,
                                        type: dataset.type,
                                        size: `${sizeInKB > 1000 ? `${sizeInMB} MB` : `${sizeInKB} KB`}`
                                    }}
                                    key={index}
                                    onclickDataset={() => navigate(dataset.id)}
                                    optionAct="analyze"
                                />
                            );
                        })
                        : <div>No datasets available</div>
                }


            </div>
        </>
    )
}

export default AnalyzeTab