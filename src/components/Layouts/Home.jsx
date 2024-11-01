import { useEffect } from 'react';
import MainTitle from '../Elements/Texts/MainTitle';
import LabeledInput from '../Elements/LabeledInput/Index';
import ButtonFile from '../Elements/Button/ButtonFile';
import DataSaver from '../../func/DataSaver';
import React, { useState } from 'react';
import Papa from 'papaparse';
import Dataset from '../Fragments/Dataset';
import DatasetPreview from './DatasetPreview';
import LabelRemember from '../Elements/LabelRemember/Index';
import getLocalStorageSize from '../../func/LocalStorageSize';
import DatasetDelete from '../../func/DatasetDelete';

const Home = () => {
    const [datacsv, setData] = useState([]);
    const [activeTab, setActiveTab] = useState('main');
    const [idDataset, setIdDataset] = useState(null);
    const [nameDataset, setNameDataset] = useState(null);
    const [touchTimeout, setTouchTimeout] = useState(null);

    // Hanlde Touch //Start
    const handleLongPress = (id) => {
        DatasetDelete(id)
    };

    const handleTouchStart = (id) => {
        const timeout = setTimeout(() => handleLongPress(id), 500); // Durasi 500ms untuk long press
        setTouchTimeout(timeout);
    };

    const handleTouchEnd = () => {
        if (touchTimeout) {
            clearTimeout(touchTimeout); // Hentikan timer jika sentuhan diangkat sebelum 500ms
            setTouchTimeout(null);
        }
    };
    // Hanlde Touch //End

    const handleLabelRemember = (id, name) => {
        setIdDataset(id);
        setNameDataset(name);
        setActiveTab('DatasetPreview')
    }

    const handleDeleteDataset = (event, id) => {
        if(isDesktop()){   
            event.preventDefault()
            DatasetDelete(id)
            console.log("ya, desktop")
        }
    }

    const handleFileUpload = (event) => {
        if (getLocalStorageSize() > 4000) {
            console.log("storage is full")
        }

        const file = event.target.files[0];
        const fileName = file.name;


        if (file && file.type === "text/csv") {
            Papa.parse(file, {
                header: true, // Parsing dengan header untuk mengidentifikasi kolom
                skipEmptyLines: true, // Melewati baris kosong
                complete: (result) => {
                    setData(result.data); // Menyimpan data yang diparsing
                    DataSaver(result.data, fileName);
                },
            });
        } else {
            alert("Please upload a valid CSV file.");
        }

        setActiveTab('DatasetPreview')
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
                            <MainTitle text="Easy and Fast Dataset Processing" className="text-center text-3xl font-bold text-primary-0" />
                            <MainTitle text="Dive into data and discover what you can do in a flash!" className="text-center text-base font-normal text-primary-0" />
                        </div>
                        <ButtonFile onchange={handleFileUpload} accept=".csv" name="data" text="Input CSV" />
                        <LabelRemember ontouchEnd={handleTouchEnd} ontouchStart={handleTouchStart} oncontextMenu={handleDeleteDataset} onclickBtn={handleLabelRemember} />
                    </div>
                </div>
            )}

            {activeTab === 'DatasetPreview' && (
                <DatasetPreview idDataset={idDataset} nameDataset={nameDataset} />
            )}
        </>
    )
}

export default Home