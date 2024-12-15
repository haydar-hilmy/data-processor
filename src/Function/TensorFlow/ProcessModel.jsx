import { arrayToObj, sliceObj, transformArray, transformArrayToObjects } from "../ArrObjFunction";
import * as tf from '@tensorflow/tfjs'
import { getSubset, normalizeDataset, valueOfColumn } from "./DataManipulate";

// PROTOCOLS
// - Send a raw dataset (include label and all features)
// - Send a label in a String
// - Send a features in a Array 


function NeuralNetwork(
    trainingData = [{}, {}],
    testingData = [{ "feat1": "val1", "feat2": "val2" }],
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
    // console.group("INITIALIZE VARIABLE")
    console.log("Option: ", option)
    // console.info("SelectedlabelFeat: ", selectedLabelFeat)
    // console.info("LetTrainingData: ", LetTrainingData)
    // console.info("LetTestingData: ", LetTestingData)
    // console.groupEnd()


    // SUBSET DATA
    LetTrainingData = getSubset(LetTrainingData, option.subSet)
    // console.group("SUBSET DATA")
    console.info("LetTrainingData: ", LetTrainingData)
    // console.groupEnd()

    // GET LABEL DATA
    let selectedLabelData = sliceObj([...LetTrainingData], [label])
    // console.group("GET LABEL AND NORMALIZE")
    // console.info("selectedLabelData: ", selectedLabelData)
    selectedLabelData = transformArray(normalizeDataset(selectedLabelData))
    // console.info("selectedLabelData normalize: ", selectedLabelData)
    // console.groupEnd()

    // SLICING ONLY FEATURE
    let selectedTrainingData = sliceObj(LetTrainingData, selectedLabelFeat) // exclude label
    // console.group("SLICING ONLY FEATURE")
    // console.info("selectedTrainingData: ", selectedTrainingData)
    // console.groupEnd()

    // TESTING DATA JOIN TRAINING DATA TO NORMALIZE TOGETHER
    selectedTrainingData = [...selectedTrainingData, ...LetTestingData]
    // console.group("TESTING DATA JOIN TRAINING DATA TO NORMALIZE TOGETHER")
    // console.info("selectedTrainingData: ", selectedTrainingData)
    // console.info("LetTestingData: ", LetTestingData)
    // console.groupEnd()

    // NORMALIZE TOGETHER
    selectedTrainingData = transformArray(normalizeDataset(selectedTrainingData))
    // console.group("NORMALIZE TOGETHER")
    // console.info("selectedTrainingData: ", selectedTrainingData)
    // console.groupEnd()

    // TAKE BACK TESTING DATA FROM TRAINING DATA
    let selectedTestingData = selectedTrainingData.slice(-1)[0] // format = [[0, 2]]
    // console.group("TAKE BACK TESTING DATA FROM TRAINING DATA")
    // console.info("selectedTestingData: ", selectedTestingData)
    // console.groupEnd()

    // // DROP TESTING DATA FROM TRAINING DATA
    selectedTrainingData.pop() // format = [[0, 1, 2, 4]...]
    // console.group("DROP TESTING DATA FROM TRAINING DATA")
    // console.info("selectedTrainingData: ", selectedTrainingData)
    // console.groupEnd()




    // TENSORFLOW
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 16, inputShape: [selectedTrainingData[0].length], activation: 'relu' }));
    model.add(tf.layers.dense({ units: selectedLabelData[0].length, activation: 'sigmoid' }));  // units is length of Label Column

    model.compile({
        optimizer: 'adam',
        loss: 'binaryCrossentropy',
        metrics: ['accuracy']
    });

    const xs = tf.tensor2d(selectedTrainingData)
    const ys = tf.tensor2d(selectedLabelData)

    // console.group("INPUT XS YS")
    // console.info("XS: selectedTrainingData: ", selectedTrainingData)
    // console.info("Length: ", [selectedTrainingData.length, selectedTrainingData[0].length])
    // console.info("YS: selectedLabelData: ", selectedLabelData)
    // console.info("Length: ", [selectedLabelData.length, selectedLabelData[0].length])
    // console.groupEnd()

    model.fit(xs, ys, { epochs: 10, shuffle: false }).then(() => {
        // Prediksi untuk input baru
        model.predict(
            tf.tensor2d([selectedTestingData], [1, selectedTrainingData[0].length])
        ).print();
    });

}



export { NeuralNetwork }