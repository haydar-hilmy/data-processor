import Papa from 'papaparse';
import { useNavigate } from 'react-router-dom';
import { DataSaver } from './DBDataset';


const handleFileUpload = async (event, navigate = false) => {

    const file = event.target.files[0],
        fileName = file.name,
        fileSize = file.size,
        fileType = file.type;
    const fileInfo = {
        fileName: fileName,
        fileSize: fileSize,
        fileType: fileType
    }


    if (file && file.type === "text/csv") {
        Papa.parse(file, {
            header: true, // Parsing dengan header untuk mengidentifikasi kolom
            skipEmptyLines: true, // Melewati baris kosong
            complete: (result) => {
                DataSaver(result.data, fileInfo).then((resultDataSaver) => {
                    if (navigate != false) {
                        navigate(`/dataset/${resultDataSaver.id}`)
                    }
                    return resultDataSaver
                }).catch(err => {
                    console.error("Error during save dataset: ", err);
                    return false
                });
            },
        });
    } else if (file.type === "application/json") {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const jsonData = JSON.parse(e.target.result);
            DataSaver(jsonData, fileInfo).then((resultDataSaver) => {
              if (navigate != false) {
                navigate(`/dataset/${resultDataSaver.id}`);
              }
              return resultDataSaver;
            }).catch(err => {
              console.error("Error during save dataset: ", err);
              return false;
            });
          } catch (err) {
            console.error("Error parsing JSON file: ", err);
          }
        };
        reader.readAsText(file); 
      } else {
        alert("Please upload a valid CSV or JSON file.");
      }
  

    event.target.value = null;
};


function base64ToBlob(base64, mimeType) {
  const byteCharacters = atob(base64);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length);

    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: mimeType });
}


export { handleFileUpload, base64ToBlob }