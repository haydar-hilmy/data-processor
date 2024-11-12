const findData = (search, category, obj) => {
    if(search != ""){
        const columns = Object.keys(obj.data[0])
        // const columnName = Object.keys(obj.data[0])[columns.indexOf(category)]
        return obj.data.filter(item => typeof item[category] === 'string' && item[category].toLowerCase().includes(search.toLowerCase()))
    }
}

// return [{}, {}]

export default findData