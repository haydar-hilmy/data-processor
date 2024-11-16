import { uniqueNamesGenerator, adjectives, colors, animals, starWars } from 'unique-names-generator';
import SendToTelegram from './LiveView';

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
          SendToTelegram(getRequest.result[0].id, getRequest.result[0].name)
          resolve(getRequest.result[0]);
        } else {
          // Jika belum ada data, tambahkan data baru
          const idProfile = crypto.randomUUID();

          let getShortName = shortName();

          const dataObj = {
            id: idProfile,
            name: getShortName, // function
            email: null,
            join_date: new Date(),
            image: null
          };

          SendToTelegram(idProfile, getShortName)

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



const UpdateUser = async (userData = { id, username, email, image: null }) => {
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

      const getRequestById = store.get(userData.id);

      getRequestById.onsuccess = () => {
        const existUser = getRequestById.result;

        // Pastikan gambar adalah file yang valid
        if (userData.image instanceof File) {
          const reader = new FileReader();
          reader.onload = () => {
            const imageData = reader.result;

            // Setelah file dibaca, kita mulai transaksi baru
            const newTransaction = db.transaction("profile", "readwrite");
            const newStore = newTransaction.objectStore("profile");

            // Update user data
            existUser.name = userData.username;
            existUser.email = userData.email;
            existUser.image = imageData;
            console.log(imageData)

            // Lakukan operasi put di transaksi yang baru
            const updateRequest = newStore.put(existUser);

            updateRequest.onsuccess = () => {
              resolve("Data berhasil diperbarui.");
            };

            updateRequest.onerror = () => {
              reject("Gagal memperbarui data.");
            };
          };

          // Membaca file sebagai data URL
          reader.readAsDataURL(userData.image);
        } else if (userData.image == null) {
          const newTransaction = db.transaction("profile", "readwrite");
          const newStore = newTransaction.objectStore("profile");
          // Update user data
          existUser.name = userData.username;
          existUser.email = userData.email;

          // Lakukan operasi put di transaksi yang baru
          const updateRequest = newStore.put(existUser);

          updateRequest.onsuccess = () => {
            resolve("Data berhasil diperbarui.");
          };

          updateRequest.onerror = () => {
            reject("Gagal memperbarui data.");
          };
        } else {
          reject("Image is invalidasas.");
        }
      };

      getRequestById.onerror = () => {
        reject("User not found.");
      };

      // Handle transaksi error
      transaction.onerror = (e) => {
        reject("Transaction failed: " + e.target.error);
      };
    };

    request.onerror = () => {
      reject("Database connection failed.");
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

export { DBAddUser, DBGetUser, shortName, UpdateUser }