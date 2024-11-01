import React, { useState, useEffect } from 'react';
import DataGet from "../../func/DataGet"
import Dataset from '../Fragments/Dataset';
import MainTitle from '../Elements/Texts/MainTitle';
import MainButton from '../Elements/Button/MainButton';
import TestingTs from '../../func/tensorflow/TestingTs';

const DatasetPreview = (props) => {
    const { idDataset, nameDataset } = props

    return (
        <div className='w-full flex flex-col items-center'>
            <div className="w-11/12 flex flex-col gap-2 items-center">
                <div className="w-full">
                    <MainTitle text={nameDataset} className="font-medium text-primary-0 text-lg" tag="h1" />
                </div>
                <Dataset idDataset={idDataset} />
                <div>
                    <MainButton text="View Dataset" />
                </div>
            </div>
        </div>
    )
}

export default DatasetPreview