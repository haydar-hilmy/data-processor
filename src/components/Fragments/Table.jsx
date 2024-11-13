import SubDiv from "../Elements/Div/SubDiv"
import MainTitle from "../Elements/Texts/MainTitle"
import { CloseOutlined } from "@mui/icons-material"


const Table = (props) => {
    // thead must be: ['', '', '']
    const { className, thead, tbody, title = null, setCloseTable } = props

    return (
        <>
            {title != null ? (
                <SubDiv>
                    <MainTitle tag="h2" className="flex-1 font-medium text-primary-0 text-lg" text={title} />
                    <div className="flex flex-row flex-1 justify-end">
                        <span className='hover:rotate-180 duration-150' onClick={setCloseTable}><CloseOutlined className='text-primary-0 cursor-pointer' /></span>
                    </div>
                </SubDiv>
            ) : ("")}
            <div className="table-wrap border-2 rounded-md">
                <table className={`${className} table-auto border-collapse border border-gray-300 w-full`}>
                    <thead>
                        {thead.length > 0 ? (
                            <tr>
                                {thead.map((col, idx) => (
                                    <th key={idx} className="border text-green-900 font-medium border-gray-300 bg-green-200 px-4 py-2">{col}</th>
                                ))}
                            </tr>
                        ) : (
                            <tr>
                                <th>Column Undefined</th>
                            </tr>
                        )}
                    </thead>
                    <tbody>
                        {tbody != null ? (
                            tbody.length > 0 ? (
                                tbody.map((item, idx) => (
                                    <tr key={idx}>
                                        {Object.values(item).map((value, valueIdx) => (
                                            <td key={valueIdx} className="border border-gray-300 px-3 py-2">{value}</td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="text-center py-2 font-medium text-primary-0" colSpan={thead.length || 1}>Data Not Found</td>
                                </tr>
                            )
                        ) : (
                            <tr>
                                <td className="text-center py-2 font-medium text-primary-0" colSpan={thead.length || 1}>No Data</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Table