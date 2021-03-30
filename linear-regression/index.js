/* eslint-disable no-undef */

// Code referenced from Practical TensorFlow.js (Apress) by Juan De Dios Santos Rivera
// https://www.apress.com/us/book/9781484262726

const csvUrl = 'df.csv';
const dataSurface = { name: 'Steps and Distance Scatterplot', tab: 'Data' };
const dataToVisualize = [];
const predictionsToVisualize = [];

let csvDataset;
let model;
let flattenedDataset;

async function defineModel() {
  // Make sure the tfjs-vis visor is open.
  tfvis.visor().open();

  // numOfFeatures is the number of column or features minus the label column
  const numOfFeatures = (await csvDataset.columnNames()).length - 1;

  // Define the model.
  // Note that there's no activation function because we want
  // a linear relationship
  model = tf.sequential();
  model.add(tf.layers.dense({
    inputShape: [numOfFeatures],
    units: 1,
  }));

  model.compile({
    optimizer: tf.train.adam(0.1),
    loss: tf.losses.meanSquaredError,
    metrics: ['mse'], // Also mean squared error
  });
}

async function trainModel() {
  // Convert the features (xs) and labels (ys) to an array
  flattenedDataset = csvDataset
    .map(({ xs, ys }) => ({ xs: Object.values(xs), ys: Object.values(ys) }))
    .batch(32);

  // Fit the model using the prepared Dataset
  await model.fitDataset(flattenedDataset, {
    epochs: 30,
    // Here we want to show on the tfvis visor the loss
    // and mse metric and update it after every epoch.
    callbacks: [
      tfvis.show.fitCallbacks(
        { name: 'Mean Squared Error', tab: 'Training' },
        ['mse'],
        { callbacks: ['onEpochEnd'] },
      )],
  });
}

async function loadData() {
  // Our target variable (what we want to predict) is the the column 'distance'
  // so we add it to the configuration as the label
  csvDataset = tf.data.csv(
    csvUrl, {
      columnConfigs: {
        distance: {
          isLabel: true,
        },
      },
    },
  );
}

async function visualizeData() {
  await csvDataset.forEachAsync((e) => {
    dataToVisualize.push({ x: e.xs.steps, y: e.ys.distance });
  });

  tfvis.render.scatterplot(dataSurface, { values: [dataToVisualize], series: ['Dataset'] });
}

function createPredictionInput() {
  const input = document.createElement('input');
  input.type = 'number';
  input.id = 'predict-input';

  document.querySelector('#predict').appendChild(input);
}

function createPredictionOutputParagraph() {
  const p = document.createElement('p');
  p.id = 'predict-output-p';

  document.querySelector('#predict').appendChild(p);
}

function createPredictButton() {
  const btn = document.createElement('BUTTON');
  btn.innerText = 'Predict!';
  btn.id = 'predict-btn';

  // Listener that waits for clicks.
  // Once a click is done, it will execute the function
  btn.addEventListener('click', () => {
    // Get the value from the input
    const valueToPredict = document.getElementById('predict-input').value;
    const parsedValue = parseInt(valueToPredict, 10);
    const prediction = model.predict(tf.tensor1d([parsedValue])).dataSync();

    // Get the <p> element and append the prediction result
    const p = document.getElementById('predict-output-p');
    p.innerHTML = `Predicted value is: ${prediction}`;

    // Push the input value and the prediction to the predictionsToVisualize array
    // Then, draw it.
    predictionsToVisualize.push({ x: parsedValue, y: prediction });
    const structureToVisualize = {
      values: [dataToVisualize, predictionsToVisualize],
      series: ['1. Training Data', '2. Predictions'],
    };

    tfvis.render.scatterplot(dataSurface, structureToVisualize);
    // Automatically switch to the "Data" tab
    tfvis.visor().setActiveTab('Data');
  });

  document.querySelector('#predict').appendChild(btn);
}

async function init() {
  createPredictionInput();
  createPredictButton();
  createPredictionOutputParagraph();

  await loadData();
  await visualizeData();
  await defineModel();
  await trainModel();
}

init();
