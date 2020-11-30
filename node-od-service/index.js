const tf = require('@tensorflow/tfjs-node');
const toxicity = require('@tensorflow-models/toxicity');
const express = require('express');

const threshold = 0.9;
const port = process.env.PORT || 8080;

async function runServer() {
  const model = await toxicity.load(threshold);
  const app = express();

  app.use(express.json());

  app.post('/prediction', (req, res) => {
    model.classify([req.body.sentence]).then((predictions) => {
      // Send the response to the user
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
