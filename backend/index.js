const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("mongodb")
const MongoClient = mongodb.MongoClient;
const cors = require("cors");

const MONGO_HOST = "localhost";
const PORT = 8443;

const app = express();

// limit post size
app.use(
  bodyParser.urlencoded({
    limit: "1mb",
    extended: true,
  })
);

// to properly parse JSON posted data
app.use(bodyParser.json({ limit: "1mb" }));

app.all('*', function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

MongoClient.connect(`mongodb://${MONGO_HOST}:27017`, {
  useUnifiedTopology: true,
})
  .then((client) => {
    console.log("Connected to Database");
    const db = client.db("dynamicly");
    const expensesCollection = db.collection("expenses");

    // Get Expenses List
    app.get("/expenses", (req, res) => {
      expensesCollection
        .find()
        .toArray()
        .then((results) => {
					const expenses = results.map(({ _id, ...rest }) => ({ id: _id, ...rest }))
          res.send({ data: expenses });
        })
        .catch((error) => res.json(error));
    });

    // Create New Expense
    app.post("/expenses", (req, res) => {
      const { id, date, ...rest } = req.body
      expensesCollection
        .insertOne({ ...rest, date: new Date(date)})
        .then((result) => {
					const expense = result.ops.length > 0 ? result.ops[0] : undefined
					const { _id, ...rest } = expense
          res.send({ data: { id: _id, ...rest } });
        })
        .catch((error) => res.json(error));
    });

    // Update Expense
    app.put("/expenses", (req, res) => {
      const { id, ...rest } = req.body;
      expensesCollection
        .findOneAndUpdate({ _id: new mongodb.ObjectID(id) }, {$set: {...rest }}, {
          upsert: true,
        })
        .then((result) => {
          if (result.ok === 1)
            res.send({ data: { id, ...rest } });
          else
            res.send(({ data: 'update error' }))
        })
        .catch((error) => res.json(error));
    });

    // Remove Expense
    app.delete("/expenses/", (req, res) => {
      const { id } = req.body;
      expensesCollection
        .deleteOne({ _id: new mongodb.ObjectID(id) })
        .then((result) => {
          if (result.deletedCount === 0) {
            return res.json("No quote to delete");
          }
          res.json({ data: { id } });
        })
        .catch((error) => res.json(error));
    });
  })
  .catch((err) => console.error(err));

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(8443, () => console.log(`Example app listening on port ${PORT}!`));
