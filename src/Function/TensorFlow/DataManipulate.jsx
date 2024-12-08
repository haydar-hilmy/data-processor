function normalizeData(data = [{}, {}]) {
    // Fungsi untuk mengubah format desimal dengan koma ke titik (untuk kolom numerik)
    const convertToDecimal = (value) => {
        if (typeof value === 'string') {
            // Mengganti koma dengan titik jika ada dan konversi ke float
            return parseFloat(value.replace(',', '.'));
        }
        return value;
    };

    // Menentukan kolom-kolom yang perlu dinormalisasi
    const cols = Object.keys(data[0]);

    // Menyimpan min-max values untuk kolom numerik
    const minMaxValues = cols.reduce((acc, col) => {
        const values = data.map(item => item[col]);

        // Jika kolom berisi angka, hitung min-max untuk normalisasi
        if (typeof values[0] === 'number') {
            const min = Math.min(...values);
            const max = Math.max(...values);
            acc[col] = { min, max, type: 'numeric' };
        } else {
            // Jika kolom berisi string, beri label encoding
            const uniqueValues = [...new Set(values)];
            acc[col] = { values: uniqueValues, type: 'string' };
        }

        return acc;
    }, {});

    // Melakukan normalisasi pada setiap data point
    const normalizedData = data.map(item => {
        const normalizedItem = {};

        cols.forEach(col => {
            const { type, min, max, values } = minMaxValues[col];

            if (type === 'numeric') {
                // Normalisasi kolom numerik dengan memastikan konversi ke desimal
                const numericValue = convertToDecimal(item[col]);
                normalizedItem[col] = (numericValue - min) / (max - min);
            } else if (type === 'string') {
                // Label encoding untuk kolom string
                normalizedItem[col] = values.indexOf(item[col]);
            }
        });

        return normalizedItem;
    });

    return normalizedData;
}


export { normalizeData }