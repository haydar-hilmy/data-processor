function normalizeDataset(data = [{}, {}]) {
    // Helper function untuk mengubah string numerik dengan koma ke titik
    const parseNumber = (val) => {
        if (typeof val === 'string') {
            return parseFloat(val.replace(',', '.'));
        }
        return val;
    };

    // Langkah 1: Menyusun data numerik dan kategori
    let numericData = {};
    let categoricalData = {};
    let allCategories = {};

    // Pisahkan data numerik dan kategori
    data.forEach(row => {
        Object.keys(row).forEach(col => {
            const value = parseNumber(row[col]);

            // Cek apakah nilai adalah numerik atau kategori
            if (!isNaN(value)) {
                // Jika numerik, masukkan ke numericData
                if (!numericData[col]) {
                    numericData[col] = [];
                }
                numericData[col].push(value);
            } else {
                // Jika kategori, masukkan ke categoricalData
                const category = row[col].toString().toLowerCase();
                if (!categoricalData[col]) {
                    categoricalData[col] = new Set();
                }
                categoricalData[col].add(category);
            }
        });
    });

    // Langkah 2: Min-Max Scaling untuk fitur numerik
    const minMaxScaling = (values) => {
        const min = Math.min(...values);
        const max = Math.max(...values);
        return values.map(value => (value - min) / (max - min));
    };

    // Normalisasi kolom numerik
    for (const col in numericData) {
        numericData[col] = minMaxScaling(numericData[col]);
    }

    // Langkah 3: One Hot Encoding untuk fitur kategori
    let oneHotEncodedData = data.map(row => {
        let encodedRow = {};

        Object.keys(row).forEach(col => {
            const value = row[col].toString().toLowerCase();
            if (numericData[col]) {
                // Jika kolom ini numerik, gunakan data yang sudah diskalakan
                encodedRow[col] = numericData[col].shift(); // Ambil nilai yang sudah dinormalisasi
            } else if (categoricalData[col]) {
                // Jika kolom ini kategori, lakukan one-hot encoding
                categoricalData[col].forEach(category => {
                    encodedRow[`${col}_${category}`] = (value === category) ? 1 : 0;
                });
            } else {
                // Salin nilai asli jika tidak perlu pemrosesan lebih lanjut
                encodedRow[col] = value;
            }
        });

        return encodedRow;
    });

    return oneHotEncodedData;
}

function getSubset(data, percentage = 10) {
    // Pastikan persentase berada dalam rentang yang valid (0-100)
    if (percentage < 0 || percentage > 100) {
        throw new Error("Percentage must be between 0 and 100");
    }

    // Hitung jumlah record yang ingin diambil berdasarkan persentase
    const subsetSize = Math.floor((percentage / 100) * data.length);

    // Ambil subset acak dari data
    const shuffledData = shuffleArray([...data]); // Mengacak data secara acak
    return shuffledData.slice(0, subsetSize); // Ambil subset sesuai jumlah yang dihitung
}
// Fungsi untuk mengacak array
function shuffleArray(array) {
    let currentIndex = array.length, randomIndex, temporaryValue;

    // Selama ada elemen yang belum diproses
    while (currentIndex !== 0) {
        // Pilih indeks acak
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // Tukar elemen dengan elemen acak
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function valueOfColumn(dataset) { // fungsi untuk membuat info value apa saja dari masing-masing kolom pada dataset
    // Helper function to determine if a value is numerical
    const isNumeric = (value) => {
        if (typeof value === 'number') return true;
        if (typeof value === 'string') {
            const numericValue = value.replace(',', '.');
            return !isNaN(parseFloat(numericValue)) && isFinite(numericValue);
        }
        return false;
    };

    // Helper function to convert a string to a number
    const toNumber = (value) => parseFloat(value.replace(',', '.'));

    // Initialize result array
    const result = [];

    // Iterate through the keys of the first object to analyze columns
    Object.keys(dataset[0]).forEach((key) => {
        const columnValues = dataset.map((row) => row[key]);

        // Check if the column is numerical
        if (columnValues.every((value) => isNumeric(value))) {
            const numericalValues = columnValues.map((value) =>
                typeof value === 'string' ? toNumber(value) : value
            );
            result.push({
                [key]: {
                    type: "numerical",
                    data: {
                        min: Math.min(...numericalValues),
                        max: Math.max(...numericalValues),
                    },
                },
            });
        } else {
            // Assume the column is categorical
            result.push({
                [key]: {
                    type: "categorical",
                    data: Array.from(new Set(columnValues)), // Unique values
                },
            });
        }
    });

    return result;
}


export { normalizeDataset, getSubset, shuffleArray, valueOfColumn }