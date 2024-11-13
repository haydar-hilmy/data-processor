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

export default DatasetDelete;
