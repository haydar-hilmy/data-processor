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
    const numericData = data.map(row => {
        const numericObj = {};
        Object.keys(row)
            .filter(key => columnTypes[key] === "numeric")
            .forEach(key => {
                numericObj[key] = parseFloat(row[key]);
            });
        return numericObj;
    });

    const categoricalData = data.map(row => {
        const categoricalObj = {};
        Object.keys(row)
            .filter(key => columnTypes[key] === "categorical")
            .forEach(key => {
                categoricalObj[key] = row[key];
            });
        return categoricalObj;
    });

    return {
        numericalData: numericData,
        categoricalData: categoricalData
    };
}


const recommendLabelColumn = (data) => {
    const columns = Object.keys(data[0]); // Mendapatkan nama kolom
    const recommendations = [];
  
    columns.forEach((column) => {
      const uniqueValues = new Set(data.map((row) => row[column])).size;
      const isNumerical = data.every((row) => !isNaN(Number(row[column])));
  
      // Rekomendasi untuk klasifikasi
      if (uniqueValues < 20 && !isNumerical) {
        recommendations.push({ column, type: 'Categorical', reason: 'Low unique values' });
      }
  
      // Rekomendasi untuk regresi
      if (isNumerical && uniqueValues > 20) {
        recommendations.push({ column, type: 'Numerical', reason: 'Continuous values' });
      }
    });
  
    return recommendations;
  };

export { getColumnNames, detectColumnType, splitDataByType, recommendLabelColumn }