async function DatasetDelete (id) {
    if(confirm("Do you want to delete this dataset ?")){
        if(localStorage.getItem('DF_DMINIM')){
            let getObjDataset = JSON.parse(localStorage.getItem('DF_DMINIM'))
            let newObjDataset = getObjDataset.filter(dataset => dataset.id !== id)
            localStorage.setItem('DF_DMINIM', JSON.stringify(newObjDataset))
        }
    }
}

export default DatasetDelete