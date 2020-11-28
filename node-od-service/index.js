const tf = require('@tensorflow/tfjs-node');
const toxicity = require('@tensorflow-models/toxicity');
const express = require('express');

const threshold = 0.9;
const port = 8081;

async function runServer() {
  const model = await toxicity.load(threshold);
  const app = express();

  app.use(express.json());

  app.post('/prediction', (req, res) => {
    model.classify([req.body.sentence]).then((predictions) => {
      res.json({
        predictions,
      });
    });
  });
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}

runServer();