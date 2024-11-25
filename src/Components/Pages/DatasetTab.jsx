import { useEffect, useState, useCallback, useRef } from "react"
import DatasetItemList from "../Elements/DatasetCard/DatasetItemList"
import Header from "../Fragments/Header/Header"
import MainLayout from "../Layouts/MainLayout"
import { DataGet, DatasetDelete } from "../../Function/DBDataset"
import { bytesToKB, bytesToMB, getObjectSize } from "../../Function/IndexedDBSize"
import ButtonFile from "../Elements/Button/ButtonFile"
import MainInput from "../Elements/LabeledInput/Input"
import debounce from 'lodash.debounce'
import { handleFileUpload } from "../../Function/HandleFile"
import { useNavigate } from "react-router-dom"
import { CircleLoading } from "../Elements/LoadingAsset/CircleLoading"

const DatasetTab = () => {

    const navigate = useNavigate();

    const [getDatasets, setGetDatasets] = useState([])
    const [dataUpdated, setDataUpdated] = useState(false)
    const [tempDatasets, setTempDatasets] = useState([])
    const [isLoading, setIsLoading] = useState(false)
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

    const handleSearch = useCallback(debounce((qry) => {
        const filteredData = getDatasets.filter(item =>
            item.name.toLowerCase().includes(qry.toLowerCase().trim())
        );
        setTempDatasets(filteredData); // Result
    }, 500), [getDatasets]);

    const onInputSearch = (event) => {
        const query = event.target.value
        setQuerySearch(query)
        handleSearch(query)
    }

    const handleFocusSearch = () => {
        if (searchRef.current) searchRef.current.focus();
    }


    return (
        <>
            <Header headerText={`Datasets`}>
                <CircleLoading isLoading={isLoading} />
                <ButtonFile
                onchange={(event) => {
                    handleFileUpload(event).then((result) => {
                        DataGet().then((newData) => {
                            setIsLoading(true)
                            setGetDatasets(newData)
                            setTempDatasets(newData)
                            setDataUpdated(prev => !prev); 
                        }).catch(err => console.error("Failed to Refresh Datasets: ", err))
                    })

                }} customButton={false} text="Upload" accept=".csv, .json" name="file" />
                <MainInput
                    ref={searchRef}
                    value={querySearch}
                    onfocus={handleFocusSearch}
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
                                    tipText="Double Tap to See"
                                    onDelete={() => {
                                        DatasetDelete(dataset.id).then(() => {
                                            setIsLoading(true)
                                            setDataUpdated(prev => !prev)
                                        }).catch(err => alert("failed: ", err));
                                    }}
                                    info={{
                                        id: dataset.id,
                                        name: dataset.name,
                                        type: dataset.type,
                                        size: `${sizeInKB > 1000 ? `${sizeInMB} MB` : `${sizeInKB} KB`}`
                                    }}
                                    key={index}
                                    onclickDataset={() => navigate(dataset.id)}
                                />
                            );
                        })
                        : <div>No datasets available</div>
                }


            </div>
        </>
    )
}

export default DatasetTab