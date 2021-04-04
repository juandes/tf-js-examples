# Toxicity detector service

## Introduction

In this example, I'm building a service that serves TensorFlow.js pre-trained toxicity detector model. It uses as input a string and returns the model's output.

## Instructions

To install the dependencies, use:

```sh
$ npm i
```

To run it locally, use:

```sh
$ npm run serve
```

To try it, use:

```sh
$ curl -X POST "http://localhost:8080/prediction" -H  "accept: application/json" -H  "Content-Type: application/json" -d '{"sentence":"you are awful"}'
```

The output look like:

```json
curl -X POST "http://localhost:8080/prediction" -H  "accept: application/json" -H  "Content-Type: application/json" -d '{
    "sentence": "you are awful"
}'
{
    "predictions": [
        {
            "label": "identity_attack",
            "results": [
                {
                    "probabilities": {
                        "0": 0.9944738745689392,
                        "1": 0.005526169203221798
                    },
                    "match": false
                }
            ]
        },
        {
            "label": "insult",
            "results": [
                {
                    "probabilities": {
                        "0": 0.016954446211457253,
                        "1": 0.9830455780029297
                    },
                    "match": true
                }
            ]
        },
        {
            "label": "obscene",
            "results": [
                {
                    "probabilities": {
                        "0": 0.9975994229316711,
                        "1": 0.0024006091989576817
                    },
                    "match": false
                }
            ]
        },
        {
            "label": "severe_toxicity",
            "results": [
                {
                    "probabilities": {
                        "0": 0.9999971389770508,
                        "1": 0.0000028739455046888907
                    },
                    "match": false
                }
            ]
        },
        {
            "label": "sexual_explicit",
            "results": [
                {
                    "probabilities": {
                        "0": 0.9994100332260132,
                        "1": 0.0005900045507587492
                    },
                    "match": false
                }
            ]
        },
        {
            "label": "threat",
            "results": [
                {
                    "probabilities": {
                        "0": 0.9982189536094666,
                        "1": 0.0017810455756261945
                    },
                    "match": false
                }
            ]
        },
        {
            "label": "toxicity",
            "results": [
                {
                    "probabilities": {
                        "0": 0.015485570766031742,
                        "1": 0.9845144152641296
                    },
                    "match": true
                }
            ]
        }
    ]
}
```

There's also a `Dockerfile` to dockerize the application and a `Makefile` with the needed instructions.

I have deployed a live version of the app. To try it, use:

```sh
$ curl -X POST "https://node-toxic-service-sfy7qphkba-ue.a.run.app/prediction" -H  "accept: application/json" -H  "Content-Type: application/json" -d '{"sentence":"you are awful"}'
```

For a complete tutorial, including how to deploy it in Google Cloud's Cloud Run, see [Deploy a pre-trained TensorFlow.js model using Node in Cloud Run](https://juandes.com/tensorflowjs-node-cloudrun/). For more information about the toxicity detector, see [Toxicity classifier](https://github.com/tensorflow/tfjs-models/tree/master/toxicity).