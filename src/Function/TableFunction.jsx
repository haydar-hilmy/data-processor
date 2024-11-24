function getColumnNames(data) {
    if (data.length === 0) return ["no data object [clue: data must be [{}, {}, {}]"];
    // Ambil kolom dari objek pertama, kemudian ubah menjadi array
    return Object.keys(data[0]);
}

function detectColumnType(data = [{}, {}]) {
    const columnTypes = {};
    // Iterasi setiap kolom dalam objek data
    Object.keys(data[0]).forEach(column => {
        const sampleValue = data[0][column];
        if (!isNaN(sampleValue) && typeof parseFloat(sampleValue) === "number") {
            columnTypes[column] = "numeric";
        } else {
            columnTypes[column] = "categorical";
        }
    });

    return columnTypes;
}

function splitDataByType(data = [{}, {}], columnTypes = [{}, {}]) {
    const numericData = data.map(row =>
        Object.keys(row)
            .filter(key => columnTypes[key] === "numeric")
            .map(key => parseFloat(row[key]))
    );

    const categoricalData = data.map(row =>
        Object.keys(row)
            .filter(key => columnTypes[key] === "categorical")
            .map(key => row[key])
    );

    // return {numericData[{}, {}], categoricalData[{}, {}]}

    return { numericData, categoricalData };
}

export { getColumnNames, detectColumnType, splitDataByType }