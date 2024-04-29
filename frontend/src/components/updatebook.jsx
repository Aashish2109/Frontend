import React, { useState } from "react";
import styles from "./updatebook.module.scss";
import UpdateBookImage from "../components/images/updatebook.jpg";
import { Link } from "react-router-dom";
const UpdateBook = () => {
  const [isbn, setisbn] = useState("");
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [publisher, setPublisher] = useState("");
  const [version, setVersion] = useState("");
  const [total_copies, setTotalCopies] = useState("");
  const [available_copies, setAvailableCopies] = useState("");
  const HandleUpdate = async (e) => {
    e.preventDefault();
    const requestData = {
      isbn: isbn,
      title: title,
      authors: authors,
      publisher: publisher,
      version: version,
      total_copies: parseInt(total_copies),
      available_copies: parseInt(available_copies),
    };
    try {
      const response = await fetch("/update-book", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      const data = await response.json();
      if (response.status === 404) {
        alert("book with this ISBN is not present");
      }
      if(response.status===403){
        alert("total copies can not be less than available copies")
      }
      else {
        alert("record updated successfully")
        
      }
      console.log(data);
    } catch (error) {
      alert("error");
    }
  };
  return (
    <>
      <div className={styles.container}>
        <h1>UPDATE BOOK DETAILS</h1>
        <div className={styles.updateBookdiv}>
          <div>
            <img src={UpdateBookImage} alt="updatebookimage"/>
          </div>
          <div className={styles.updateBook}>
            <form id="updateBookForm">
              <label htmlFor="isbn">ISBN:</label>
              <input
                type="text"
                id="isbn"
                name="isbn"
                value={isbn}
                onChange={(e) => setisbn(e.target.value)}
                placeholder="Enter ISBN Number"
                required
                autoComplete="off"
              />

              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Book Title"
              />

              <label htmlFor="authors">Authors:</label>
              <input
                type="text"
                id="authors"
                name="authors"
                value={authors}
                onChange={(e) => setAuthors(e.target.value)}
                placeholder="Enter Author Name"
              />

              <label htmlFor="publisher">Publisher:</label>
              <input
                type="text"
                id="publisher"
                name="publisher"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
                placeholder="Enter Publisher Name"
              />

              <label htmlFor="version">Version:</label>
              <input
                type="number"
                id="version"
                name="version"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                placeholder="Enter Version Number"
              />
              <label htmlFor="total_copies">Total Copies:</label>
              <input
                type="number"
                id="total_copies"
                name="total_copies"
                value={total_copies}
                onChange={(e) => setTotalCopies(e.target.value)}
                placeholder="Enter Total Copies"
              />

              <label htmlFor="available_copies">Available Copies:</label>
              <input
                type="number"
                id="available_copies"
                name="available_copies"
                value={available_copies}
                onChange={(e) => setAvailableCopies(e.target.value)}
                placeholder="Enter Available Copies"
              />
              <button
                type="submit"
                className={styles.updatebookButton}
                onClick={HandleUpdate}
              >
                Update Book
              </button>
              <Link to="/admin/adminfunctions">
                <button className={styles.previousbuttonlink}>Previous</button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateBook;
