const DataSaver = (data, fileName) => { // data must be {}
    let dataString, idDataset = crypto.randomUUID();
    if(localStorage.getItem('DF_DMINIM') != null){
        dataString = {
            id: idDataset,
            name: fileName,
            data: data
        }
        let getDataObj = JSON.parse(localStorage.getItem('DF_DMINIM'))
        getDataObj.push(dataString)
        localStorage.setItem('DF_DMINIM', JSON.stringify(getDataObj))
    } else {
        dataString = [{
            id: idDataset,
            name: fileName,
            data: data
        }]
        localStorage.setItem('DF_DMINIM', JSON.stringify(dataString))
    }
}

export default DataSaver