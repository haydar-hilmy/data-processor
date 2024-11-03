import React, { useEffect, useState } from 'react';
import getColumnNamesDataset from "../../func/tensorflow/getColNameDataset";

const Test_getCol = () => {

    const [columnNames, setColumnNames] = useState([])

    useEffect(() => {
        const fetchColumnNames = async () => {
            const columns = await getColumnNamesDataset();
            setColumnNames(columns);
        };

        fetchColumnNames();
    }, []);

    if (columnNames != null) {

        return (
            <>
                <div>
                    {columnNames.length > 0 ? (
                        <ul>
                            {columnNames.map((col, index) => (
                                <li key={index}>{col}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </>
        )
    } else {
        return (
            <>
            <h1>Data not found</h1>
            </>
        )
    }
}

export default Test_getCol