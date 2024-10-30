import React, { useState, useEffect } from 'react';
import DataGet from "../../func/DataGet"

const DatasetPreview = () => {
    const [dataset, setDataset] = useState([]);
    useEffect(() => {
        const timer = setTimeout(() => {
            let data = DataGet() || [];
            if (data.length > 0) {
                setDataset(data[data.length - 1].data);
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return(
        <>
        <div className="csv-table">
           
           {dataset.length > 0 && (
               <table className="table-auto border-collapse border border-gray-300 w-full">
                   <thead>
                       <tr>
                           {Object.keys(dataset[0]).map((header, index) => (
                               <th key={index} className="border border-gray-300 px-4 py-2">
                                   {header}
                               </th>
                           ))}
                       </tr>
                   </thead>
                   <tbody>
                       {dataset.map((row, rowIndex) => (
                           <tr key={rowIndex}>
                               {Object.values(row).map((cell, cellIndex) => (
                                   <td key={cellIndex} className="border border-gray-300 px-4 py-2">
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

export default DatasetPreview