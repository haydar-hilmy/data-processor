function isArrayContainObj (arr) {
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

export { isArrayContainObj }