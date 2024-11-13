const addDataIndexedDB = (data) => {
    const request = indexedDB.open('myDatabase', 1);

    request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction(['myStore'], 'readwrite');
        const store = transaction.objectStore('myStore');

        // Menambahkan data
        const addRequest = store.add(data);

        addRequest.onsuccess = () => {
            console.log('Data added successfully');
        };

        addRequest.onerror = (event) => {
            console.error('Error adding data:', event.target.error);
        };
    };
};

export default addDataIndexedDB