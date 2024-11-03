import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';

const TestingTs = () => {
    const [prediction, setPrediction] = useState(null);

    useEffect(() => {
        // Define a model for linear regression
        const model = tf.sequential();
        model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

        // Compile the model with loss and optimizer
        model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

        // Generate synthetic data for training
        const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
        const ys = tf.tensor2d([1, 3, 5, 7], [4, 1]);

        // Train the model
        model.fit(xs, ys).then(() => {
            // Predict on a new value and set the prediction to state
            const output = model.predict(tf.tensor2d([5], [1, 1]));
            output.data().then(result => setPrediction(result[0])); // Store the first prediction value
        });
    }, []);

    return (
        <div>
            <h3>Prediction Result:</h3>
            {prediction !== null ? <p>{prediction}</p> : <p>Loading...</p>}
        </div>
    );
};

export default TestingTs;
