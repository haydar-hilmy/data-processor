import React, { useState, useEffect, useRef } from 'react';
import DataGet from "../../func/DatasetGet"
import TableLoading from '../Elements/Loading/TableLoading/Index';
import openDatabase from '../../func/Test/Test_IndexedDB/Test_Database';
import addDataIndexedDB from '../../func/Test/Test_IndexedDB/Test_AddIndexedDB';

const Dataset = ({ idDataset = null }) => {

    const tableWrapperRef = useRef(null)
    const [dataset, setDataset] = useState([])
    const [maxCount, setMaxCount] = useState(20)
    const [isShowLoadingDataset, setShowLoadingDataset] = useState(true)

    const handleScrollDataset = () => {
        if (tableWrapperRef.current) {
            const scrollTop = tableWrapperRef.current.scrollTop;
            const scrollHeight = tableWrapperRef.current.scrollHeight;
            const clientHeight = tableWrapperRef.current.clientHeight;

            if(scrollTop + clientHeight >= (scrollHeight * 0.9)){
                setMaxCount((prevCount) => prevCount + 20)
            }
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            openDatabase()
            setShowLoadingDataset(true)
            
            let data = await DataGet(idDataset) || [];
            if (Array.isArray(data)) {
                setDataset(data.length > 0 ? data[data.length - 1].data : []);
            } else {
                setDataset(data ? data['data'] : []); 
            }

            setShowLoadingDataset(false)
        };
    
        fetchData();
        
        return () => {};
    }, [idDataset]); 
    

    return (
        <>
            <div ref={tableWrapperRef} onScroll={handleScrollDataset} className="table-wrap border-2 rounded-md">
                <TableLoading isShow={isShowLoadingDataset} />
                {dataset.length > 0 && (
                    <table className="table-auto border-collapse border border-gray-300 w-full">
                        <thead>
                            <tr className="sticky top-0">
                                {Object.keys(dataset[0]).map((header, index) => (
                                    <th key={index} className="border text-green-900 font-medium border-gray-300 bg-green-200 px-4 py-2">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {dataset.slice(0, maxCount).map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {Object.values(row).map((cell, cellIndex) => (
                                        <td key={cellIndex} className="border border-gray-300 px-3 py-2">
                                            {cell}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    )
}

export default Dataset