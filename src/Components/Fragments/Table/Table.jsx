import { useState } from "react"
import styled from "styled-components"

const MainTable = (props) => {
    const { tbody, thead } = props 
    const [data, setData] = useState([])

    const StyledTableWrap = styled.div`
    overflow-x: auto;
    overflow-y: auto;
    height: 80vh;
    border: 2px solid #424242;
    border-radius: 10px;

    table{
        width: 100%;
        border-collapse: collapse;

        thead tr th{
            padding: 4px 12px;
            word-break: break-all;
            border: 1px solid #424242;
        }
    }

    `

    return (
        <StyledTableWrap>

        <table>
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
                <tr>

                </tr>
            </tbody>
        </table>
                    </StyledTableWrap>
    );
}

export { MainTable }