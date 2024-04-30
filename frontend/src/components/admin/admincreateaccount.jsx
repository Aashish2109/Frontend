import React, { useState } from "react";
import styles from "./admincreateaccount.module.scss";
import SignUpImage from "../images/signup.jpg";
import { Link } from "react-router-dom";
const AdminCreateAccount = () => {
  const [libraryName, setLibraryName] = useState("");
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPhone, setAdminPhone] = useState("");

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
          owner_name: adminName,
          owner_email: adminEmail,
          owner_phone: adminPhone,
          owner_role: "Admin",
        }),
      });
      const data = await response.json();
      console.log(data);
      if(response.status===404){
        alert("library not found")
      }
      if(response.status===409){
        alert("admin already exists in the library")
      }else {
        alert("Admin Created Successfully");
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <>
      <div className={styles.adminCreate}>
        <div>
          <img className={styles.SignUpImage} src={SignUpImage} alt="signupimage" />
        </div>

        <div className={styles.adminContainer}>
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
            <label htmlFor="OwnerName">Admin Name:</label>
            <input
              className={styles.inputField}
              type="text"
              id="OwnerName"
              name="owner_name"
              placeholder="Enter Admin Name"
              required pattern="\S+.*"
              autoComplete="off"
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
            />
            <br />
            <label htmlFor="OwnerEmail">Admin Email:</label>
            <input
              className={styles.inputField}
              type="email"
              id="OwnerEmail"
              name="owner_email"
              placeholder="Enter Admin Email"
              required pattern="\S+.*"
              autoComplete="off"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
            />
            <br />
            <label htmlFor="OwnerPhone">Admin Phone:</label>
            <input
              className={styles.inputField}
              type="text"
              id="OwnerPhone"
              name="owner_phone"
              placeholder="Enter 10 Digit Contact Number"
              required pattern="[1-9]{1}[0-9]{9}"              
              autoComplete="off"
              value={adminPhone}
              onChange={(e) => setAdminPhone(e.target.value)}
            />
            <br />
            <label htmlFor="OwnerRole">Role:</label>
            <input className={styles.inputField} type="text" value="Admin" />
            <br />
            <button class={styles.buttonClass} type="submit">
              Create Account
            </button>
          </form>

          <Link to="/admin">
            <button className={styles.buttonClass}>Login</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default AdminCreateAccount;
