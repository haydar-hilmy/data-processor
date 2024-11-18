import Header from "../Fragments/Header/Header"
import ButtonFile from "../Elements/Button/ButtonFile"
import { CircleLoading } from "../Elements/LoadingAsset/CircleLoading"
import { useEffect, useState, useCallback } from "react"
import debounce from 'lodash.debounce'
import MainInput from "../Elements/LabeledInput/Input"
import { useParams } from 'react-router-dom';
import { DataGet } from "../../Function/DBDataset"
import { MainTable } from "../Fragments/Table/Table"
import { getColumnNames } from "../../Function/TableFunction"

const DatasetTabDetail = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [dataset, setDatasets] = useState(null)
    const [thead, setThead] = useState([])
    const [tbody, setTbody] = useState([])

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
        // const filteredData = getDatasets.filter(item =>
        //     item.name.toLowerCase().includes(query.toLowerCase().trim())
        // );
        // setTempDatasets(filteredData); // Result
    }, 500), []);

    const onInputSearch = (event) => {
        const query = event.target.value
        handleSearch(query)
    }

    return (
        <>
            {dataset != null ? (
                <>
                    <Header headerText="View of Dataset" infoText={dataset.name}>
                        <CircleLoading isLoading={isLoading} />
                        <MainInput
                            placeholder="Search data records..."
                            onInput={onInputSearch}
                            style={{ flex: 0.6 }}
                        />
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