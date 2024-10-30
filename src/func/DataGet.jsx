const DataGet = (id = null) => {
    let data = JSON.parse(localStorage.getItem('DF_DMINIM'))
    if(id != null){
        let dataObj = data.find(item => item.id == id)
        if(dataObj){
            return dataObj
        } else {
            return null
        }
    } else {
        return data
    }
}

export default DataGet