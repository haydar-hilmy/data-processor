import React, { useState, useEffect } from 'react';
import DataGet from "../../func/DatasetGet"
import Dataset from '../oldComponents/Fragments/Dataset';
import MainTitle from '../oldComponents/Elements/Texts/MainTitle';
import MainButton from '../oldComponents/Elements/Button/MainButton';
import TestingTs from '../../Test/TestingTsTest/TestingTs';
import Input from '../oldComponents/Elements/LabeledInput/Input';
import getColumnNamesDataset from '../../func/tensorflow/getColNameDataset';
import Table from '../Fragments/Table';
import { CloseOutlined } from '@mui/icons-material';
import SubDiv from '../oldComponents/Elements/Div/SubDiv';
import TableTitle from '../Elements/Texts/TableTitle';
import DropDown from '../oldComponents/Elements/LabeledInput/DropDown';
import findData from '../../func/tensorflow/findData';

const DatasetPreview = (props) => {
    const { idDataset, nameDataset, setCloseDataset } = props

    const [mainDataset, setMainDataset] = useState(null)
    const [columnNames, setColumnNames] = useState([])
    const [dataSearch, setDataSearch] = useState([])
    const [isShowDataTesting, setShowDataTesting] = useState(false)
    const [isShowDataSearch, setShowDataSearch] = useState(false)
    const [selectedValueSearch, setSelectedValueSearch] = useState(null)


    useEffect(() => {
        const fetchColumnNames = async () => {
            const columns = await getColumnNamesDataset(idDataset)
            setColumnNames(columns)
        }
        fetchColumnNames()
        setMainDataset(DataGet(idDataset))
    }, [])

    function searchData (data) {
        if(data != ""){
            setDataSearch(findData(data, selectedValueSearch, mainDataset))
            setShowDataSearch(true)
        } else {
            setShowDataSearch(false)
        }
    }

    const handleSelectedChange = (value) => {
        setSelectedValueSearch(value)
    }

    return (
        <div className='w-full flex flex-col items-center py-5'>
            <div className="w-full px-3 flex flex-col gap-2 items-center sm:w-11/12 sm:px-0">
                <TableTitle title={nameDataset} onclick={() => setCloseDataset('main')} />

                <Dataset idDataset={idDataset} />

                {isShowDataSearch ? (
                    <Table tbody={dataSearch} thead={columnNames} setCloseTable={() => setShowDataSearch(!isShowDataSearch)} title="Result of search" />
                ) : ("")}

                <div className='flex w-full'>
                    <div className='flex flex-row gap-2'>
                        <Input oninput={searchData} type="text" name="data_search" placeholder="Search" />
                        <DropDown onchange={handleSelectedChange} name="attr_search" data={columnNames} text="Select Attribute" />
                    </div>
                </div>

                {isShowDataTesting ? (
                    <Table thead={columnNames} setCloseTable={() => setShowDataTesting(!isShowDataTesting)} title="Data Testing" />
                ) : ("")}
            </div>
        </div>
    )
}

export default DatasetPreview