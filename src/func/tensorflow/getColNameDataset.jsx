import * as tf from '@tensorflow/tfjs';
import DataGet from '../DatasetGet';
import Dataset from '../../components/Fragments/Dataset';

async function getColumnNamesDataset(id = null) {
    if (id != null) {
        const columnNames = Object.keys(DataGet(id).data[0])
        columnNames[columnNames.length - 1] = `${columnNames[columnNames.length - 1]} (label)` // set default label
        return columnNames
    } else {
        return null;
    }
}

export default getColumnNamesDataset