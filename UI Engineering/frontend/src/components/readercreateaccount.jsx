import React, { useState } from "react";
import "./readercreateaccount.css";
const ReaderCreateAccount = () => {
  const [libraryName, setLibraryName] = useState("");
  const [readerName, setReaderName] = useState("");
  const [readerEmail, setReaderEmail] = useState("");
  const [readerPhone, setReaderPhone] = useState("");

  const Handler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/createaccount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          library_name: libraryName,
          owner_name: readerName,
          owner_email: readerEmail,
          owner_phone: readerPhone,
          owner_role: "Reader"
        }),
      });
      const data = await response.json();
      if(data.error){
        alert("Reader Already Exists")
      }
      else{
        alert("Reader Created Successfully")
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div className="container">
      <h1>Create A New Account</h1>
      <form onSubmit={Handler}>
        <label htmlFor="libraryName">Library Name:</label>
        <input
          type="text"
          id="libraryName"
          name="library_name"
          placeholder="Enter Library Name"
          required
          autoComplete="off"
          value={libraryName}
          onChange={(e) => setLibraryName(e.target.value)}
        />
        <br />
        <label htmlFor="OwnerName">Reader Name:</label>
        <input
          type="text"
          id="OwnerName"
          name="owner_name"
          placeholder="Enter reader Name"
          required
          autoComplete="off"
          value={readerName}
          onChange={(e) => setReaderName(e.target.value)}
        />
        <br />
        <label htmlFor="OwnerEmail">Reader Email:</label>
        <input
          type="email"
          id="OwnerEmail"
          name="owner_email"
          placeholder="Enter reader Email"
          required
          autoComplete="off"
          value={readerEmail}
          onChange={(e) => setReaderEmail(e.target.value)}
        />
        <br />
        <label htmlFor="OwnerPhone">Reader Phone:</label>
        <input
          type="tel"
          id="OwnerPhone"
          name="owner_phone"
          placeholder="Enter Contact Number"
          required
          autoComplete="off"
          value={readerPhone}
          onChange={(e) => setReaderPhone(e.target.value)}
        />
        <br />
        <label htmlFor="OwnerRole">Role</label>
        <input type="text" value="Reader"/>
        <br />
        <button class="buttonclass" type="submit">
          Create Account
        </button>
      </form>
      <div className="previous">
        <a href="reader.html">
          <button>Login</button>
        </a>
      </div>
    </div>
  );
};

export default ReaderCreateAccount;
