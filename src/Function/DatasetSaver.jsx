const DataSaver = async (data, fileName) => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("DF_DMINIM_DB", 1);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains("datasets")) {
                db.createObjectStore("datasets", { keyPath: "id" });
            }
        };

        request.onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction("datasets", "readwrite");
            const store = transaction.objectStore("datasets");

            const idDataset = crypto.randomUUID();
            const dataString = {
                id: idDataset,
                name: fileName,
                data: data
            };

            const addRequest = store.add(dataString);

            addRequest.onsuccess = () => {
                resolve({
                    id: idDataset,
                    name: fileName
                });
            };

            addRequest.onerror = (error) => {
                reject("Failed to save data: " + error);
            };
        };

        request.onerror = (error) => {
            reject("IndexedDB error: " + error);
        };
    });
};

export default DataSaver;