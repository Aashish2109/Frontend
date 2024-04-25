import React, { useState } from "react";
import "./createlibrary.css";
const CreateLibrary = () => {
  const [libraryName, setLibraryName] = useState("");
  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/createlibrary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          library_name: libraryName,
        }),
      });
      const data = await response.json();
      console.log(data); 
      if (response.status === 404) {
        alert("Bad Request");
      }
      if (response.status === 409) {
        alert("Library Already Exists");
      } else {
        alert("Library Created Successfully");
        setLibraryName("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="mainContainer">
        <h1>CREATE A NEW LIBRARY</h1>
        <div className="formContainer">
          <form onSubmit={HandleSubmit}>
            <label htmlFor="libraryName">Library Name:</label>
            <input
              type="text"
              id="libraryName"
              value={libraryName}
              onChange={(e) => setLibraryName(e.target.value)}
              required
              autoComplete="off"
            />
            <br />
            <button type="submit">Create Library</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateLibrary;
