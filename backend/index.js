// const express = require("express");
// const mysql = require("mysql");
import express from "express";
import mysql from "mysql";

const app = express();
const port = 8800;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "test",
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to database");
  }
});

app.get("/", (req, res) => {
  res.json("Hello this is backend!");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
