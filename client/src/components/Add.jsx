import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Add() {
  const [books, setBooks] = useState({
    title: "",
    description: "",
    cover: "",
    price: null,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    setBooks((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/books", books);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="form">
        <h1>Add book</h1>
        <input
          type="text"
          placeholder="title"
          onChange={handleChange}
          name="title"
        />
        <input
          type="text"
          placeholder="description"
          onChange={handleChange}
          name="description"
        />
        <input
          type="text"
          placeholder="cover"
          onChange={handleChange}
          name="cover"
        />
        <input
          type="number"
          placeholder="price"
          onChange={handleChange}
          name="price"
        />

        <button onClick={handleClick}>Add</button>
      </div>
    </>
  );
}
