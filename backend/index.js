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

app.use(express.json());

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

app.post("/books", (req, res) => {
  const q = "INSERT INTO books(`title`, `description`, `cover`) VALUES (?)";
  const values = [req.body.title, req.body.description, req.body.cover];
  db.query(q, [values], (err, result) => {
    if (err) {
      console.log(err);
    }
    return res.json("book has been created successfully");
  });
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
