const findData = (search, category, obj) => {
    if(search != ""){
        const columns = Object.keys(obj.data[0])
        const columnName = Object.keys(obj.data[0])[columns.indexOf(category)]
        console.log(obj.data.filter(item => typeof item[category] === 'string' && item[category].toLowerCase().includes(search.toLowerCase())))
    }
}

export default findData


// APLIKASIKAN RESULT NYA KE TABLE
// ICON CLOSE TIDAK SESUAI FUNGSINYA, JIKA DITEKAN CLOSE PADA TABLE SEARCH MAKA YANG DATA TESTING MALAH HILANG