import React, { useState } from "react";
import './addbook.css'
import { Link } from "react-router-dom";
const AddBook = () => {
  const [isbn, setisbn] = useState("");
  const [libID, setLibID] = useState("");
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [publisher, setPublisher] = useState("");
  const [version, setVersion] = useState("");
  const [totalcopies, setTotalCopies] = useState("");
  const [availablecopies, setAvailableCopies] = useState("");
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
          lib_id: libID,
          title: title,
          authors: authors,
          publisher: publisher,
          version: version,
          total_copies: totalcopies,
          available_copies: availablecopies,
          email: adminemail,
        }),
      })
      const data =await response.json()
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div>
        <h1>ADD BOOK</h1>
        <div className="main-content">
          <label htmlFor="isbn">ISBN</label>
          <input
            type="text"
            id="isbn"
            placeholder="Enter ISBN Number"
            value={isbn}
            onChange={(e) => setisbn(e.target.value)}
            required
          />
          <br />
          <label htmlFor="lib_id">LibID</label>
          <input
            type="number"
            id="lib_id"
            placeholder="Enter Library ID"
            value={libID}
            onChange={(e) => setLibID(e.target.value)}
            required
          />
          <br />
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter Book Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <br />
          <label htmlFor="authors">Authors</label>
          <input
            type="text"
            id="authors"
            placeholder="Enter Authors Name"
            value={authors}
            onChange={(e) => setAuthors(e.target.value)}
            required
          />
          <br />
          <label htmlFor="publisher">Publisher</label>
          <input
            type="text"
            id="publisher"
            placeholder="Enter Publisher Name"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
            required
          />
          <br />
          <label htmlFor="version">Version</label>
          <input
            type="number"
            id="version"
            placeholder="Enter Book Version"
            value={version}
            onChange={(e) => setVersion(e.target.value)}
            required
          />
          <br />
          <label htmlFor="total_copies">Total Copies</label>
          <input
            type="number"
            id="total_copies"
            placeholder="Enter Total Copies"
            value={totalcopies}
            onChange={(e) => setTotalCopies(e.target.value)}
            required
          />
          <br />
          <label htmlFor="available_copies">Available Copies</label>
          <input
            type="number"
            id="available_copies"
            placeholder="Enter Available Copies"
            value={availablecopies}
            onChange={(e) => setAvailableCopies(e.target.value)}
            required
          />
          <br />
          <label htmlFor="email">Admin Email</label>
          <input
            type="email"
            id="email"
            value={adminemail}
            onChange={(e) => setAdminEmail(e.target.value)}
            placeholder="Enter Admin Email"
          />
          <br />
          <button onClick={Handler}>Add Book</button>
          <Link to="/adminfunction">
            <button class="links">Previous</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default AddBook;
