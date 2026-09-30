const express = require("express");
const { exec } = require("child_process");
const db = require("./db");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    service: "BFSI Digital Banking Service",
    status: "running"
  });
});

app.get("/customer", (req, res) => {
  const customerId = req.query.id;

  const query =
    "SELECT * FROM customers WHERE customer_id = '" +
    customerId +
    "'";

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
        query: query
      });
    }

    res.json(rows);
  });
});

app.get("/diagnostics", (req, res) => {
  const host = req.query.host;

  exec("ping -c 1 " + host, (error, stdout) => {
    if (error) {
      return res.status(500).send(error.message);
    }

    res.send(stdout);
  });
});

app.listen(3000, () => {
  console.log("BFSI application listening on port 3000");
});
