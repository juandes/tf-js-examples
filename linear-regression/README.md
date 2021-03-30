# Linear Regression

In this example, I'm presenting a web application that trains a linear regression model using a subset of my Fitbit steps dataset. The dataset has two columns: steps walked in a given day and distance walked in kilometers. The step steps column is the model's independent variable and the distance, the target.

Launching the app will automatically start the training and display visualize its progress through [**tfjs-vis**](https://js.tensorflow.org/api_vis/1.5.0/). To run the app, clone the repository, go to this directory (`linear-regression/`), start a local HTTP server from there, and access the app from the browser.

I recommend using the tool http-server to start the server. After installing it, run

```
$ http-server
```

And go to the printed URL, e.g., http://127.0.0.1:8080/, to access the app.

You can find an online version of the app at https://juandes.github.io/tf-js-examples/linear-regression/index.html