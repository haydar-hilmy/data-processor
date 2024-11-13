const bytesToMB = (bytes) => {
    return (bytes / (1024 * 1024)).toFixed(2);
};

const getIndexedDBSize = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("DF_DMINIM_DB", 1);

        request.onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction("datasets", "readonly");
            const store = transaction.objectStore("datasets");
            const getAllRequest = store.getAll();
            
            getAllRequest.onsuccess = () => {
                const allData = getAllRequest.result;
                let totalSize = 0;

                allData.forEach(item => {
                    totalSize += JSON.stringify(item).length;
                });

                resolve(bytesToMB(totalSize)); // return in MB
            };

            getAllRequest.onerror = (error) => {
                reject('Error retrieving data:', error);
            };
        };

        request.onerror = (error) => {
            reject('IndexedDB error:', error);
        };
    });
};

export default getIndexedDBSize
