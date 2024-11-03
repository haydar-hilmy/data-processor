import React, { useState, useEffect } from 'react';
import DataGet from "../../func/DatasetGet"

const Dataset = ({ idDataset = null }) => {
    const [dataset, setDataset] = useState([]);
    useEffect(() => {
        const timer = setTimeout(() => {
            let data = DataGet(idDataset) || [];
            if (Array.isArray(data)) {
                setDataset(data.length > 0 ? data[data.length - 1].data : []); // jika data array
            } else {
                setDataset(data ? data['data'] : []); // jika data adalah objek
            }
        }, 1000);
        
        return () => clearTimeout(timer);
    }, [idDataset]);

    return (
        <>
            <div className="table-wrap border-2 rounded-md">
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
                            {dataset.map((row, rowIndex) => (
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