const PORT = 8000;
const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const { default: axios } = require("axios");

app.use(cors());
app.use(express.json());

app.get("/hotels", async (req, res) => {
  const url = `${process.env.URL}?page-size=20`;
  const options = {
    headers: {
      "X-Cassandra-Token": process.env.TOKEN,
    },
  };
  try {
    const response = await axios(url, options);
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

app.get("/hotels/:id", async (req, res) => {
  const id = req.params.id;
  const url = `${process.env.URL}/${id}`;
  const options = {
    headers: {
      "X-Cassandra-Token": process.env.TOKEN,
    },
  };
  try {
    const response = await axios(url, options);
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

//Update Hotel
app.put("/edithotel/:id", async (req, res) => {
  const id = req.params.id;
  const url = `${process.env.URL}/${id}`;
  const data = req.body.data;

  const options = {
    method: "PUT",
    headers: {
      Accepts: "application/json",
      "X-Cassandra-Token": process.env.TOKEN,
    },
    data,
  };
  try {
    const response = await axios(url, options);
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: error });
  }
});

app.listen(PORT, console.log("Server is running on PORT " + PORT));
