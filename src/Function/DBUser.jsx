import { uniqueNamesGenerator, adjectives, colors, animals, starWars } from 'unique-names-generator';


const DBAddUser = async () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("USER_DMINIM_DB", 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("profile")) {
        db.createObjectStore("profile", { keyPath: "id" });
      }
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction("profile", "readwrite");
      const store = transaction.objectStore("profile");

      // Cek apakah sudah ada data di dalam object store
      const getRequest = store.getAll();
      getRequest.onsuccess = () => {
        if (getRequest.result.length > 0) {
          // Jika sudah ada data, langsung resolve tanpa menambahkan data baru
          resolve(getRequest.result[0]);
        } else {
          // Jika belum ada data, tambahkan data baru
          const idProfile = crypto.randomUUID();
          const dataObj = {
            id: idProfile,
            name: shortName(), // function
            join_date: new Date(),
            image: null
          };

          const addRequest = store.add(dataObj);

          addRequest.onsuccess = () => {
            resolve(dataObj);
          };

          addRequest.onerror = (error) => {
            reject("Failed to save data: " + error);
          };
        }
      };

      getRequest.onerror = (error) => {
        reject("Failed to retrieve data: " + error);
      };
      
      transaction.oncomplete = () => {
        db.close();
      };
    };

    request.onerror = (error) => {
      reject("IndexedDB error: " + error);
    };
  });
};

const DBGetUser = async () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("USER_DMINIM_DB", 1);

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction("profile", "readonly");
      const store = transaction.objectStore("profile");

      // Ambil data dari object store "profile"
      const getRequest = store.getAll();

      getRequest.onsuccess = () => {
        // Jika ada data, kembalikan data pertama (karena hanya satu data yang disimpan)
        if (getRequest.result.length > 0) {
          resolve(getRequest.result[0]);
        } else {
          // Jika tidak ada data
          resolve(null);
        }
      };

      getRequest.onerror = (error) => {
        reject("Failed to retrieve data: " + error);
      };

      transaction.oncomplete = () => {
        db.close();
      };
    };

    request.onerror = (error) => {
      reject("IndexedDB error: " + error);
    };
  });
};



const getRandomDictionary = () => {
  return Math.random() > 0.5 ? starWars : animals;
};

const shortName = () => {
  return uniqueNamesGenerator({
    dictionaries: [animals],
    length: 1,
    style: 'capital',
    separator: ' '
  })
}

export { DBAddUser, DBGetUser, shortName }