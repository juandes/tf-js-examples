require('@tensorflow/tfjs-node');
const use = require('@tensorflow-models/universal-sentence-encoder');

// Load the model.
use.load().then((model) => {
  model.embed('i like tensorflow.js').then((embeddings) => {
    // `embeddings` is an embedding tensor of length 512.
    embeddings.print(false);
  });
});
