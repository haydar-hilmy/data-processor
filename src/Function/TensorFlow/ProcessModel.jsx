import { arrayToObj, sliceObj, transformArray } from "../ArrObjFunction";
import * as tf from '@tensorflow/tfjs'
import { getSubset, normalizeDataset, valueOfColumn } from "./DataManipulate";

// PROTOCOLS
// - Send a raw dataset (include label and all features)
// - Send a label in a String
// - Send a features in a Array 


function NeuralNetwork(
    trainingData = [{}, {}],
    // testingData = [{}, {}],
    label = "",
    features = [""],
    option = {
        subSet: 10 // default subset 10%
    }
) {
    let selectedLabelFeat = [...features];

    let LetTrainingData = [...trainingData] // all fitur (include label)
    LetTrainingData = getSubset(LetTrainingData, option.subSet)

    let LetTestingData = { kategori: 'pakaian' }

    let selectedTrainingData = sliceObj(LetTrainingData, selectedLabelFeat) // exclude label
    selectedTrainingData = transformArray(normalizeDataset(selectedTrainingData))
    let selectedLabelData = sliceObj(LetTrainingData, [label]) // only label
    selectedLabelData = transformArray(normalizeDataset(selectedLabelData))

    // let selectedTestingData = transformArray(normalizeDataset(LetTestingData))
    let selectedTestingData = [...sliceObj(LetTrainingData, selectedLabelFeat)]
    selectedTestingData.push(LetTestingData)
    selectedTestingData = transformArray(normalizeDataset(selectedTestingData))
    let TestingData = selectedTestingData[selectedTestingData.length - 1]


    // TENSORFLOW
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 16, inputShape: [4], activation: 'relu' }));
    model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));  // 1 unit untuk 2 kelas (0 atau 1)

    model.compile({
        optimizer: 'adam',
        loss: 'binaryCrossentropy',
        metrics: ['accuracy']
    });

    // const xs = tf.tensor2d(selectedTrainingData); // only Feature

    // const ys = tf.tensor2d(selectedLabelData); // Label biner 0 atau 1

    // model.fit(xs, ys, { epochs: 10 }).then(() => {
    //     // Prediksi untuk input baru
    //     model.predict(tf.tensor2d([TestingData], [1, 3])).print();
    // });

    console.log("Pure: ", valueOfColumn(LetTrainingData))
    console.log("All: ", normalizeDataset(LetTrainingData))
    console.log("NormalizeSelected: ", selectedTrainingData)
    console.log("NormalizeLabel: ", selectedLabelData)
    console.log("Testing NormalizeSelected: ", TestingData)
}



export { NeuralNetwork }