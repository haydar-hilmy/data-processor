import { useEffect, useState } from "react"
import DatasetItemList from "../Elements/DatasetCard/DatasetItemList"
import Header from "../Fragments/Header/Header"
import MainLayout from "../Layouts/MainLayout"
import { DataGet, DatasetDelete } from "../../Function/DBDataset"
import { bytesToKB, bytesToMB, getObjectSize } from "../../Function/IndexedDBSize"
import ButtonFile from "../Elements/Button/ButtonFile"


const DatasetTab = () => {

    const [getDatasets, setGetDatasets] = useState([])
    const [dataUpdated, setDataUpdated] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setGetDatasets(await DataGet())
            } catch (error) {
                console.error(error)
            }
        }
        DataGet().then((result) => {
            setGetDatasets(result);
        }).catch(err => {
            console.error(err);
        });

        fetchData();
    }, [dataUpdated]);


    return (
        <MainLayout title="Manage Your Dataset" tab="dataset">
            <Header headerText={`Datasets`}>
                <ButtonFile customButton={false} text="Upload" accept=".csv, .json" name="file" />
                <input placeholder="Search" type="text" />
            </Header>

            <div className="flex flex-col gap-4">
                {
                    getDatasets.map((dataset, index) => {
                        const datasetSize = getObjectSize(dataset);
                        const sizeInKB = bytesToKB(datasetSize);
                        const sizeInMB = bytesToMB(datasetSize);
                        return (
                            <DatasetItemList
                                onDelete={() => {
                                    DatasetDelete(dataset.id).then(() => {
                                        setDataUpdated(prev => !prev)
                                    }).catch(err => alert("failed: ", err))
                                }
                                }
                                info={
                                    {
                                        id: dataset.id,
                                        name: dataset.name,
                                        size: `${sizeInKB > 1000 ? `${sizeInMB} MB` : `${sizeInKB} KB`}`
                                    }}
                                key={index} />
                        )
                    })
                }
            </div>
        </MainLayout>
    )
}

export default DatasetTab