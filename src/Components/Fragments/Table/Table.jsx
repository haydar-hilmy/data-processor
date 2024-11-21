import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"

const MainTable = (props) => {
    const { tbody = [{}, {}], thead = [], infoText = "" } = props
    const scrollTableRef = useRef(null);
    const [limitData, setLimitData] = useState(20)
    const [dataCount, setDataCount] = useState("")

    const handleScrollTable = () => {
        if (scrollTableRef.current) {
            const scrollTop = scrollTableRef.current.scrollTop;
            const scrollHeight = scrollTableRef.current.scrollHeight;
            const clientHeight = scrollTableRef.current.clientHeight;

            if (scrollTop + clientHeight >= (scrollHeight * 0.98)) {
                setLimitData((prevCount) => prevCount + 20); // Update jumlah data yang ditampilkan
            }
        }
    };

    useEffect(() => {
        setDataCount(`${tbody.slice(0, limitData).length}/${tbody.length} counted`)
    }, [limitData])


    return (
        <>
            <span className='text-sm text-gray-500 mt-1'>
                {limitData.toLocaleString('id-ID')} / {tbody.length.toLocaleString('id-ID')} <br />
                {infoText != "" ? `${infoText}` : ""}
            </span>

            <div className="styled-table" ref={scrollTableRef} onScroll={handleScrollTable}>
                <table className="table-auto">
                    <thead>
                        <tr>
                            {
                                thead.map((item, index) => {
                                    return <th key={index}>{item}</th>;
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tbody.length > 0 ?
                                tbody.slice(0, limitData).map((row, index) => (
                                    <tr key={index}>
                                        {Object.values(row).map((value, i) => (
                                            <td key={i}>{value}</td>
                                        ))}
                                    </tr>
                                ))
                                :
                                <tr>
                                    <td className="text-center" colSpan={thead != null && thead.length ? thead.length : ""}>
                                        No data exists
                                    </td>
                                </tr>
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}

export { MainTable }