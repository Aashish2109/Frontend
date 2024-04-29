import React, { useState } from "react";
import styles from "./addbook.module.scss";
import addbookImage from "../components/images/addbookimage.jpg";
import { Link } from "react-router-dom";
const AddBook = () => {
  const [isbn, setisbn] = useState("");
  const [lib_id, setLibID] = useState("");
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [publisher, setPublisher] = useState("");
  const [version, setVersion] = useState("");
  const [total_copies, setTotalCopies] = useState("");
  const [available_copies, setAvailableCopies] = useState("");
  const [adminemail, setAdminEmail] = useState("");

  const Handler = async () => {
    try {
      const response = await fetch("/add-book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isbn: isbn,
          lib_id:lib_id,
          title: title,
          authors: authors,
          publisher: publisher,
          version: version,
          total_copies: total_copies,
          available_copies: available_copies,
          email: adminemail,
        }),
      });
      const data = await response.json();
      if (response.status === 400) {
        alert("admin email is incorrect");
      }
      if (response.status === 404) {
        alert("library not found");
      }
      else{
        alert("book added successfully")
      }
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div>
        <h1>ADD BOOK</h1>
        <div className={styles.addbookdiv}>
          <div>
            <img src={addbookImage} />
          </div>
          <div className={styles.mainContent}>
            <label htmlFor="isbn">ISBN:</label>
            <input
              className={styles.addbookInput}
              type="text"
              id="isbn"
              placeholder="Enter ISBN Number"
              value={isbn}
              onChange={(e) => setisbn(e.target.value)}
              required
              pattern="\S+.*"
              autoComplete="off"
            />
            <br />
            <label htmlFor="lib_id">LibID:</label>
            <input
              className={styles.addbookInput}
              type="number"
              id="lib_id"
              placeholder="Enter Library ID"
              value={lib_id}
              onChange={(e) => setLibID(e.target.value)}
              required
              autoComplete="off"
            />
            <br />
            <label htmlFor="title">Title:</label>
            <input
              className={styles.addbookInput}
              type="text"
              id="title"
              placeholder="Enter Book Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              pattern="\S+.*"
              autoComplete="off"
            />
            <br />
            <label htmlFor="authors">Authors:</label>
            <input
              className={styles.addbookInput}
              type="text"
              id="authors"
              placeholder="Enter Authors Name"
              value={authors}
              onChange={(e) => setAuthors(e.target.value)}
              required
              pattern="\S+.*"
              autoComplete="off"
            />
            <br />
            <label htmlFor="publisher">Publisher:</label>
            <input
              className={styles.addbookInput}
              type="text"
              id="publisher"
              placeholder="Enter Publisher Name"
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
              required
              pattern="\S+.*"
              autoComplete="off"
            />
            <br />
            <label htmlFor="version">Version:</label>
            <input
              className={styles.addbookInput}
              type="number"
              id="version"
              placeholder="Enter Book Version"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              required
              pattern="\S+.*"
              autoComplete="off"
            />
            <br />
            <label htmlFor="total_copies">Total Copies:</label>
            <input
              className={styles.addbookInput}
              type="number"
              id="total_copies"
              placeholder="Enter Total Copies"
              value={total_copies}
              onChange={(e) => setTotalCopies(e.target.value)}
              required
              pattern="\S+.*"
              autoComplete="off"
            />
            <br />
            <label htmlFor="available_copies">Available Copies:</label>
            <input
              className={styles.addbookInput}
              type="number"
              id="available_copies"
              placeholder="Enter Available Copies"
              value={available_copies}
              onChange={(e) => setAvailableCopies(e.target.value)}
              required
              pattern="\S+.*"
              autoComplete="off"
            />
            <br />
            <label htmlFor="email">Admin Email:</label>
            <input
              className={styles.addbookInput}
              type="email"
              id="email"
              value={adminemail}
              onChange={(e) => setAdminEmail(e.target.value)}
              placeholder="Enter Admin Email"
              autoComplete="off"
              required
            />
            <br />
            <button onClick={Handler}>Add Book:</button>
            <Link to="/adminfunctions">
              <button className={styles.links}>Previous</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBook;
