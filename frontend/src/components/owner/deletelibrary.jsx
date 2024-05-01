import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./deletelibrary.module.scss";
import DeleteLibraryImage from "../images/deletelibrary.jpg";
const DeleteLibrary = () => {
  const [libraryID, setLibraryID] = useState("");
  const deleteLibrary = async () => {
    try {
      const response = await fetch(`/deletelibrary/${libraryID}`, {
        method: "DELETE",
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        alert("library deleted successfully");
        setLibraryID("");
      } else {
        alert("library not found");
      }
    } catch (error) {
      alert("failed to delete library");
      console.log("Failed To Delete Library");
    }
  };

  return (
    <div>
      <div className={styles.deletelibrary}>
        <div>
          <img
            className={styles.deletelibraryimage}
            src={DeleteLibraryImage}
            alt="deletelibraryimage"
          />
        </div>
        <div className={styles.maindiv}>
          <h1>Delete Library</h1>
          <label htmlFor="libraryId">Library ID:</label>
          <input
            className={styles.deleteLibraryInput}
            type="text"
            id="libraryId"
            name="libraryId"
            value={libraryID}
            onChange={(e) => setLibraryID(e.target.value)}
            placeholder="Enter Library ID"
            required
            pattern="\S+.*"
            autoComplete="off"
          />
          <button onClick={deleteLibrary}>Delete Library</button>
          <Link to="/index">
            <button className={styles.buttonClass}>Previous</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DeleteLibrary;
