function getLocalStorageSize() {
    let totalSize = 0;

    // Loop melalui setiap item di dalam localStorage
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            // Tambahkan ukuran kunci dan nilai dari setiap item
            let keySize = key.length + localStorage.getItem(key).length;
            totalSize += keySize;
        }
    }

    // Konversi ukuran menjadi kilobytes (optional)
    let totalSizeKB = (totalSize / 1024).toFixed(2); // in KB
    return parseFloat(totalSizeKB);
}

export default getLocalStorageSize