import React, { useState } from 'react';

const KNNModelExample = () => {
  const [model, setModel] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [inputData, setInputData] = useState([0, 0]); // Data input untuk prediksi
  const [data, setData] = useState([
    { features: [1, 1], label: 'Class A' },
    { features: [2, 2], label: 'Class A' },
    { features: [3, 3], label: 'Class B' },
    { features: [4, 4], label: 'Class B' }
  ]);

  // Fungsi untuk melatih model KNN
  const trainModel = () => {
    // Siapkan data untuk pelatihan
    const inputs = data.map(item => item.features);
    const labels = data.map(item => item.label);

    // Membuat model KNN dengan ml5.js
    const knn = ml5.KNNClassifier();

    // Latih model dengan data
    inputs.forEach((input, index) => {
      knn.addExample(input, labels[index]);
    });

    setModel(knn);
    alert('Model KNN berhasil dilatih!');
  };

  // Fungsi untuk memprediksi data baru
  const handlePrediction = () => {
    if (model) {
      model.classify(inputData, (error, results) => {
        if (error) {
          console.error(error);
        } else {
          setPrediction(results[0].label); // Menampilkan label dari prediksi
        }
      });
    }
  };

  return (
    <div>
      <h1>KNN dengan ml5.js</h1>
      <div>
        <button onClick={trainModel}>Latih Model KNN</button>
      </div>

      <div>
        <h3>Data Input untuk Prediksi:</h3>
        <input
          type="number"
          value={inputData[0]}
          onChange={(e) => setInputData([parseFloat(e.target.value), inputData[1]])}
          placeholder="Fitur 1"
        />
        <input
          type="number"
          value={inputData[1]}
          onChange={(e) => setInputData([inputData[0], parseFloat(e.target.value)])}
          placeholder="Fitur 2"
        />
        <button onClick={handlePrediction}>Prediksi</button>
      </div>

      {prediction && (
        <div>
          <h3>Hasil Prediksi: {prediction}</h3>
        </div>
      )}
    </div>
  );
};

export default KNNModelExample;
