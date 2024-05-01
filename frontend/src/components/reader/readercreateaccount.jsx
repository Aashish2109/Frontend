import React, { useState } from "react";
import styles from "./readercreateaccount.module.scss";
import SignUpImage from "../images/signup.jpg";
import { Link } from "react-router-dom";
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
          owner_role: "Reader",
        }),
      });
      const data = await response.json();
      console.log(data);
     if(response.status===404){
      alert("library not found")
     } else {
        alert("reader created successfully");
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <>
      <div className={styles.readerCreate}>
        <div>
          <img className={styles.SignUpImage} src={SignUpImage} alt="signupimage" />
        </div>

        <div className={styles.readerContainer}>
          <h1>Create A New Account</h1>
          <form onSubmit={Handler}>
            <label htmlFor="libraryName">Library Name:</label>
            <input
              className={styles.inputField}
              type="text"
              id="libraryName"
              name="library_name"
              placeholder="Enter Library Name"
              required pattern="\S+.*"
              autoComplete="off"
              value={libraryName}
              onChange={(e) => setLibraryName(e.target.value)}
            />
            <br />
            <label htmlFor="OwnerName">Reader Name:</label>
            <input
              className={styles.inputField}
              type="text"
              id="OwnerName"
              name="owner_name"
              placeholder="Enter Reader Name"
              required pattern="\S+.*"
              autoComplete="off"
              value={readerName}
              onChange={(e) => setReaderName(e.target.value)}
            />
            <br />
            <label htmlFor="OwnerEmail">Reader Email:</label>
            <input
              className={styles.inputField}
              type="email"
              id="OwnerEmail"
              name="owner_email"
              placeholder="Enter Reader Email"
              required pattern="\S+.*"
              autoComplete="off"
              value={readerEmail}
              onChange={(e) => setReaderEmail(e.target.value)}
            />
            <br />
            <label htmlFor="OwnerPhone">Reader Phone:</label>
            <input
              className={styles.inputField}
              type="tel"
              id="OwnerPhone"
              name="owner_phone"
              placeholder="Enter Contact Number"
              required pattern="[1-9]{1}[0-9]{9}"
              autoComplete="off"
              value={readerPhone}
              onChange={(e) => setReaderPhone(e.target.value)}
            />
            <br />
            <label htmlFor="OwnerRole">Role:</label>
            <input className={styles.inputField} type="text" value="Reader" />
            <br />
            <button class={styles.buttonClass} type="submit">
              Create Account
            </button>
          </form>

          <Link to="/reader/login">
            <button className={styles.buttonClass}>Login</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ReaderCreateAccount;
