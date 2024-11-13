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

export default DataGet;