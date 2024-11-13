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

const DataGet = (id = null) => {
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
            const transaction = db.transaction("datasets", "readonly");
            const store = transaction.objectStore("datasets");

            let data = [];
            const getAllRequest = store.getAll();

            getAllRequest.onsuccess = () => {
                data = getAllRequest.result; 

                if (id !== null) {
                    const dataObj = data.find(item => item.id === id);
                    resolve(dataObj || null); 
                } else {
                    resolve(data); 
                }
            };

            getAllRequest.onerror = () => {
                reject("Error fetching data from IndexedDB");
            };
        };

        request.onerror = () => {
            reject("Error opening IndexedDB");
        };
    });
};


async function DatasetDelete(id) {
    if (confirm("Do you want to delete this dataset?")) {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open("DF_DMINIM_DB", 1);

            request.onsuccess = (event) => {
                const db = event.target.result;
                const transaction = db.transaction("datasets", "readwrite");
                const store = transaction.objectStore("datasets");

                const deleteRequest = store.delete(id);

                deleteRequest.onsuccess = () => {
                    resolve("Dataset deleted successfully");
                };

                deleteRequest.onerror = (error) => {
                    reject("Failed to delete dataset: " + error);
                };
            };

            request.onerror = (error) => {
                reject("Failed to open database: " + error);
            };
        });
    }
}

export { DataSaver, DataGet, DatasetDelete };