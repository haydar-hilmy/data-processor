// PROTOCOLS
// variableName must capital, except first word

function isArrayContainObj(arr) {
    if (Array.isArray(arr)) {
        // Memeriksa apakah elemen pertama adalah objek
        if (arr.length > 0 && typeof arr[0] === 'object' && arr[0] !== null) {
            return true
        }
        // Memeriksa apakah elemen pertama adalah string
        else if (arr.length > 0 && typeof arr[0] === 'string') {
            return false
        }
    } else {
        return undefined
    }
};

function sliceObj(objData = [{}, {}], selectedCol = [""]) { // untuk membuang kolom dalam dataset
    const slicedData = objData.map(obj =>
        selectedCol.reduce((acc, key) => {
            if (obj.hasOwnProperty(key)) {
                acc[key] = obj[key];
            }
            return acc;
        }, {})
    );

    return slicedData; // [{}]
}

function arrayToObj(arr = [""]) {
    const obj = Object.fromEntries(arr.map(key => [key, key]));
    return obj // {""}
}

function transformArray(arrObj = [{}, {}]) { // mengubah dari [{}, {}] menjadi [[], []]
    return arrObj.map(item => Object.values(item)); // [[], []]
}

function transformArrayToObjects(array) { // mengubah dari [{}, {}] menjadi {}, {}
    return array.map(obj => JSON.stringify(obj)).join(', ');
}

export { isArrayContainObj, arrayToObj, sliceObj, transformArray, transformArrayToObjects }

// Membuat fungsi untuk mendapatkan info dari dataset