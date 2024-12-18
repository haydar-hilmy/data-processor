import { useEffect } from 'react';
import ButtonFile from "../Elements/Button/ButtonFile"
import React, { useState } from 'react';
import Papa from 'papaparse';
import LabelRemember from '../Elements/LabelRemember/Index';
import { useNavigate } from 'react-router-dom';
import { getIndexedDBSize } from '../../Function/IndexedDBSize';
import FadeInCustom from '../Animation/FadeElement';
import { DataSaver, DatasetDelete } from '../../Function/DBDataset';

import { DBAddUser } from '../../Function/DBUser';


const Home = () => {
    const [touchTimeout, setTouchTimeout] = useState(null);
    const [dataUpdated, setdataUpdated] = useState(false); // data at labelRemember
    const [datasetName, setDatasetName] = useState('');
    const [datasetId, setDatasetId] = useState('');

    const navigate = useNavigate();

    // Hanlde Touch //Start
    const handleLongPress = (id) => {
        DatasetDelete(id).then(() => {
            setdataUpdated(prev => !prev)
        })
    };

    useEffect(() => {
        DBAddUser()
    }, [])

    const handleTouchStart = (id) => {
        const timeout = setTimeout(() => handleLongPress(id), 500);
        setTouchTimeout(timeout);
    };

    const handleTouchEnd = () => {
        if (touchTimeout) {
            clearTimeout(touchTimeout);
            setTouchTimeout(null);
        }
    };
    // Handle Touch
    //End

    const handleDeleteDataset = (event, id) => {
        if (isDesktop()) {
            event.preventDefault()
            DatasetDelete(id).then(() => {
                setdataUpdated(prev => !prev)
            })
        }
    }

    const handleLabelRemember = (id, name) => {
        setDatasetId(id)
        setDatasetName(name)
        setTimeout(() => {
            navigate(`dataset/${id}`)
        }, 100); // timeout: to avoid error querying data
    }


    const handleFileUpload = (event) => {

        const file = event.target.files[0],
            fileName = file.name,
            fileSize = file.size,
            fileType = file.type;
        const fileInfo = {
            fileName: fileName,
            fileSize: fileSize,
            fileType: fileType
        }


        if (file && file.type === "text/csv") {
            Papa.parse(file, {
                header: true, // Parsing dengan header untuk mengidentifikasi kolom
                skipEmptyLines: true, // Melewati baris kosong
                complete: (result) => {
                    DataSaver(result.data, fileInfo).then((resultDataSaver) => {
                        setDatasetId(resultDataSaver.id);
                        navigate(`dataset/${resultDataSaver.id}`)
                    });
                    setDatasetName(fileName)
                },
            });
        } else if (file.type === "application/json") {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const jsonData = JSON.parse(e.target.result);
                    DataSaver(jsonData, fileInfo).then((resultDataSaver) => {
                        if (navigate != false) {
                            navigate(`/dataset/${resultDataSaver.id}`);
                        }
                        return resultDataSaver;
                    }).catch(err => {
                        console.error("Error during save dataset: ", err);
                        return false;
                    });
                } catch (err) {
                    console.error("Error parsing JSON file: ", err);
                }
            };
            reader.readAsText(file); // Membaca file JSON sebagai teks
        } else {
            alert("Please upload a valid CSV or JSON file.");
        }


        event.target.value = null;
    };

    const isDesktop = () => {
        return !(typeof window !== 'undefined' && 'ontouchstart' in window);
    };

    useEffect(() => {
        document.title = "DataMinim - Data Analytics";
    }, []);



    return (
        <>
            <FadeInCustom className="w-full flex justify-center items-center">
                <div className='flex flex-col w-4/5 h-screen items-center justify-center gap-4'>
                    <div className='flex flex-col w-full items-center gap-2'>
                        <h1 className="text-center text-3xl font-bold">Easy and Fast Dataset Processing</h1>
                        <h2 className="text-center text-base font-normal">Dive into data and discover what you can do in a flash!</h2>
                    </div>
                    <ButtonFile onchange={handleFileUpload} accept=".csv, .json" name="data" text="Upload Dataset" />
                    <LabelRemember dataUpdated={dataUpdated} ontouchEnd={handleTouchEnd} ontouchStart={handleTouchStart} oncontextMenu={handleDeleteDataset} onclickBtn={handleLabelRemember} />
                </div>
            </FadeInCustom>
        </>
    )
}

export default Home