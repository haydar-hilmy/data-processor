import { arrayToObj, sliceObj, transformArray, transformArrayToObjects } from "../ArrObjFunction";
import * as tf from '@tensorflow/tfjs'
import { getSubset, normalizeDataset, valueOfColumn } from "./DataManipulate";

// PROTOCOLS
// - Send a raw dataset (include label and all features)
// - Send a label in a String
// - Send a features in a Array 


function NeuralNetwork(
    trainingData = [{}, {}],
    testingData = [{"feat1": "val1", "feat2": "val2"}],
    label = "",
    features = [""],
    option = {
        subSet: 10 // default subset 10%
    }
) {
    // INITIALIZE VARIABLE
    let selectedLabelFeat = [...features] // format = ["", ""]
    let LetTrainingData = [...trainingData] // format = [{"feat1": "val1"}, {"feat2": "val2"}] || all fitur (include label)
    let LetTestingData = [...testingData] // format = [{"feat1": "val1", "feat2": "val2"}]

    console.group("INITIALIZE VARIABLE")
    console.info("SelectedlabelFeat: ", selectedLabelFeat)
    console.info("LetTrainingData: ", LetTrainingData)
    console.info("LetTestingData: ", LetTestingData)
    console.groupEnd()
    
    
    // SUBSET DATA
    LetTrainingData = getSubset(LetTrainingData, option.subSet)
    console.group("SUBSET DATA")
    console.info("LetTrainingData: ", LetTrainingData)
    console.groupEnd()

    // SLICING ONLY FEATURE
    let selectedTrainingData = sliceObj(LetTrainingData, selectedLabelFeat) // exclude label
    console.group("SLICING ONLY FEATURE")
    console.info("selectedTrainingData: ", selectedTrainingData)
    console.groupEnd()

    // TESTING DATA JOIN TRAINING DATA TO NORMALIZE TOGETHER
    selectedTrainingData = [...selectedTrainingData, ...LetTestingData]
    console.group("TESTING DATA JOIN TRAINING DATA TO NORMALIZE TOGETHER")
    console.info("selectedTrainingData: ", selectedTrainingData)
    console.info("LetTestingData: ", LetTestingData)
    console.groupEnd()
    
    selectedTrainingData = transformArray(normalizeDataset(selectedTrainingData))
    console.group("NORMALIZE TOGETHER")
    console.info("selectedTrainingData: ", selectedTrainingData)
    console.groupEnd()

    // TAKE BACK TESTING DATA FROM TRAINING DATA
    let selectedTestingData = selectedTrainingData.slice(-1)[0] // format = [[0, 2]]
    console.group("TAKE BACK TESTING DATA FROM TRAINING DATA")
    console.info("selectedTestingData: ", selectedTestingData)
    console.groupEnd()

    // // DROP TESTING DATA FROM TRAINING DATA
    selectedTrainingData.pop() // format = [[0, 1, 2, 4]...]
    console.group("DROP TESTING DATA FROM TRAINING DATA")
    console.info("selectedTrainingData: ", selectedTrainingData)
    console.groupEnd()

    // let selectedLabelData = sliceObj(LetTrainingData, [label]) // only label
    // selectedLabelData = transformArray(normalizeDataset(selectedLabelData))


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
}



export { NeuralNetwork }

// MEMBUAT KONFIGURASI LABEL
// PERSIAPAN DATA FEATURE DAN TESTING SUDAH SIAP (INCLUDE NORMALIZE)