import express from "express";
import mysql from "mysql";
import cors from "cors";

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

app.use(express.json());
app.use(cors());

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
  const q =
    "INSERT INTO books(`title`, `description`, `cover`, `price`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.description,
    req.body.cover,
    req.body.price,
  ];
  db.query(q, [values], (err, result) => {
    if (err) {
      console.log(err);
    }
    return res.json("book has been created successfully");
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";
  db.query(q, [bookId], (err, result) => {
    if (err) {
      console.log(err);
    }
    return res.json("book has been deleted successfully");
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q =
    "UPDATE books SET `title` = ?, `description` = ?, `cover` = ?, `price` = ? WHERE id = ?";
  const values = [
    req.body.title,
    req.body.description,
    req.body.cover,
    req.body.price,
  ];
  db.query(q, [...values, bookId], (err, result) => {
    if (err) {
      console.log(err);
    }
    return res.json("book has been updated successfully");
  });
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
