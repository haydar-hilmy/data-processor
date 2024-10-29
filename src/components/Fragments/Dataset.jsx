import React, { useState } from 'react';
import Papa from 'papaparse';

const Dataset = () => {
    const [data, setData] = useState([]);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];

        if (file && file.type === "text/csv") {
            Papa.parse(file, {
                header: true, // Parsing dengan header untuk mengidentifikasi kolom
                skipEmptyLines: true, // Melewati baris kosong
                complete: (result) => {
                    setData(result.data); // Menyimpan data yang diparsing
                },
            });
        } else {
            alert("Please upload a valid CSV file.");
        }
    };

    return (
        <div className="csv-table">
            <input 
                type="file" 
                accept=".csv" 
                onChange={handleFileUpload} 
                className="mb-4"
            />
            
            {data.length > 0 && (
                <table className="table-auto border-collapse border border-gray-300 w-full">
                    <thead>
                        <tr>
                            {Object.keys(data[0]).map((header, index) => (
                                <th key={index} className="border border-gray-300 px-4 py-2">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, rowIndex) => (
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
    );
};

export default Dataset;
