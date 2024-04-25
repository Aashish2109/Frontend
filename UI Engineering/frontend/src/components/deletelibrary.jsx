import React from "react";
import { Link } from "react-router-dom";

const DeleteLibrary = () => {
    // Function to delete a library
function deleteLibrary() {
    const library_id = document.getElementById("libraryId").value;
  
    fetch(`/deletelibrary/${library_id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete library");
        }
        return response.json();
      })
      .then((data) => {
        alert("Library Deleted Successfully")
        console.log(messageElement.textContent = data.message);
      })
      .catch((error) => {
        alert("Library Not Found")
        console.log("Library Not Found");
      });
  }
  
  return (
    <div>
      <div className="maindiv">
        <h1>Delete Library</h1>
        <label htmlFor="libraryId">Library ID:</label>
        <input
          type="text"
          id="libraryId"
          name="libraryId"
          placeholder="Enter Library ID"
        />
        <button onClick={deleteLibrary}>Delete Library</button>
        <Link to='/index'>
          <button class="buttonClass">Previous</button>
        </Link>
      </div>
    </div>
  );
};

export default DeleteLibrary;
