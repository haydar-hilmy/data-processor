import { useEffect } from 'react';
import MainTitle from '../Elements/Texts/MainTitle';
import LabeledInput from '../Elements/LabeledInput/Index';
import ButtonFile from '../Elements/Button/ButtonFile';
import DataSaver from '../../func/DatasetSaver';
import React, { useState } from 'react';
import Dataset from '../Fragments/Dataset';
import Papa from 'papaparse';
import DatasetPreview from './DatasetPreview';
import LabelRemember from '../Elements/LabelRemember/Index';
import getLocalStorageSize from '../../func/LocalStorageSize';
import DatasetDelete from '../../func/DatasetDelete';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Home = () => {
    const [datacsv, setData] = useState([]);
    const [activeTab, setActiveTab] = useState('main');
    const [idDataset, setIdDataset] = useState(null);
    const [nameDataset, setNameDataset] = useState(null);
    const [touchTimeout, setTouchTimeout] = useState(null);
    const [dataUpdated, setdataUpdated] = useState(false);

    const navigate = useNavigate();

    const handleMoveTab = (page) => {
        setActiveTab(page)
    }

    // Hanlde Touch //Start
    const handleLongPress = (id) => {
        DatasetDelete(id).then(() => {
            setdataUpdated(prev => !prev)
        })
    };

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
    // Hanlde Touch //End

    const handleDeleteDataset = (event, id) => {
        if (isDesktop()) {
            event.preventDefault()
            DatasetDelete(id).then(() => {
                setdataUpdated(prev => !prev)
            })
        }
    }

    const handleLabelRemember = (id, name) => {
        setIdDataset(id);
        setNameDataset(name);
        setActiveTab('DatasetPreview')
    }


    const handleFileUpload = (event) => {

        if (getLocalStorageSize() > 1000) {
            console.log(`Storage: ${getLocalStorageSize()}`)
        }

        const file = event.target.files[0];
        const fileName = file.name;


        if (file && file.type === "text/csv") {
            Papa.parse(file, {
                header: true, // Parsing dengan header untuk mengidentifikasi kolom
                skipEmptyLines: true, // Melewati baris kosong
                complete: (result) => {
                    setData(result.data); // Menyimpan data yang diparsing
                    DataSaver(result.data, fileName).then((resultDataSaver) => {
                        setIdDataset(resultDataSaver.id);
                        navigate(`dataset/${resultDataSaver.id}`)
                    });
                    setActiveTab('DatasetPreview')
                    setNameDataset(fileName)
                },
            });
        } else {
            alert("Please upload a valid CSV file.");
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
            {activeTab === 'main' && (
                <div className="w-full flex justify-center items-center">
                    <div className='flex flex-col w-4/5 h-screen items-center justify-center gap-4'>
                        <div className='flex flex-col w-full items-center gap-2'>
                            <MainTitle text="Easy and Fast Dataset Processing" className="text-center text-3xl font-bold" />
                            <MainTitle text="Dive into data and discover what you can do in a flash!" className="text-center text-base font-normal" />
                        </div>
                        <ButtonFile onchange={handleFileUpload} accept=".csv" name="data" text="Input CSV" />
                        <LabelRemember dataUpdated={dataUpdated} ontouchEnd={handleTouchEnd} ontouchStart={handleTouchStart} oncontextMenu={handleDeleteDataset} onclickBtn={handleLabelRemember} />
                    </div>
                </div>
            )}

            {activeTab === 'DatasetPreview' && (
                <DatasetPreview setCloseDataset={handleMoveTab} idDataset={idDataset} nameDataset={nameDataset} />
            )}
        </>
    )
}

export default Home