const DataSaver = async (data, fileInfo) => {
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

            const currentDate = new Date()
            const formatDate = `${currentDate.toLocaleDateString('id-ID')} ${currentDate.toLocaleTimeString('id-ID')}`

            const idDataset = crypto.randomUUID();
            const dataString = {
                id: idDataset,
                name: fileInfo.fileName,
                data: data,
                size: fileInfo.fileSize,
                type: fileInfo.fileType,
                date: formatDate
            };

            const addRequest = store.add(dataString);

            addRequest.onsuccess = () => {
                resolve({
                    id: idDataset,
                    name: fileInfo.fileName,
                    data: data,
                    size: fileInfo.fileSize,
                    type: fileInfo.fileType,
                    date: formatDate
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

const DataGet = (id = null, fileName = '') => {
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
                } else if (fileName !== '') {
                    const filteredData = data.filter(item =>
                        item.name.toLowerCase().includes(fileName.toLowerCase().trim())
                    );
                    resolve(filteredData.length > 0 ? filteredData : null);
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
    if (confirm(`Do you want to delete this dataset?\n${id}`)) {
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

const findRecord = (search, category = "", obj = [{}, {}]) => {
    if(search != ""){
        // const columns = Object.keys(obj.[0])
        // const columnName = Object.keys(obj.data[0])[columns.indexOf(category)]
        return obj.filter(item => typeof item[category] === 'string' && item[category].toLowerCase().includes(search.toLowerCase()))
        // return [{}, {}]
    }
}



export { DataSaver, DataGet, DatasetDelete, findRecord };