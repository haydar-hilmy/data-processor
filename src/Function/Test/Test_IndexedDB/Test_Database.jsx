const openDatabase = () => {
    const request = indexedDB.open('myDatabase', 1); // 'myDatabase' adalah nama database dan 1 adalah versi database
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      
      // Membuat object store jika tidak ada
      if (!db.objectStoreNames.contains('myStore')) {
        db.createObjectStore('myStore', { keyPath: 'id' }); // Membuat store dengan keyPath 'id'
      }
    };
    
    request.onsuccess = (event) => {
      console.log('Database opened successfully:', event.target.result);
      const db = event.target.result;
      // Lakukan operasi pada database setelah berhasil dibuka
    };
  
    request.onerror = (event) => {
      console.error('Database error:', event.target.error);
    };
  };
  

  export default openDatabase