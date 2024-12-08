import { arrayToObj, sliceObj } from "../ArrObjFunction";
import * as tf from '@tensorflow/tfjs'
import { normalizeData } from "./DataManipulate";

// PROTOCOLS
// - Send a raw dataset (include label and all features)
// - Send a label in a String
// - Send a features in a Array 


function NeuralNetwork(trainingData = [{}, {}], label = "", features = [""]) {
    let selectedLabelFeat = [...features];
    selectedLabelFeat.push(label);

    let normalizeTrainingData = [...trainingData]

    let selectedTrainingData = sliceObj(trainingData, selectedLabelFeat)

    console.log("Normalize: ", normalizeData(normalizeTrainingData))
}



export { NeuralNetwork }