import React, { useState } from "react";
import "./admincreateaccount.css";
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
          owner_role: "Admin"
        }),
      });
      const data = await response.json();
      if(data.error){
        alert("Admin Already Exists")
      }
      else{
        alert("Admin Created Successfully")
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
        <label htmlFor="OwnerName">Admin Name:</label>
        <input
          type="text"
          id="OwnerName"
          name="owner_name"
          placeholder="Enter Admin Name"
          required
          autoComplete="off"
          value={adminName}
          onChange={(e) => setAdminName(e.target.value)}
        />
        <br />
        <label htmlFor="OwnerEmail">Admin Email:</label>
        <input
          type="email"
          id="OwnerEmail"
          name="owner_email"
          placeholder="Enter Admin Email"
          required
          autoComplete="off"
          value={adminEmail}
          onChange={(e) => setAdminEmail(e.target.value)}
        />
        <br />
        <label htmlFor="OwnerPhone">Admin Phone:</label>
        <input
          type="tel"
          id="OwnerPhone"
          name="owner_phone"
          placeholder="Enter Contact Number"
          required
          autoComplete="off"
          value={adminPhone}
          onChange={(e) => setAdminPhone(e.target.value)}
        />
        <br />
        <label htmlFor="OwnerRole">Role</label>
        <input type="text" value="Admin"/>
        <br />
        <button class="buttonclass" type="submit" >
          Create Account
        </button>
      </form>
      <div className="previous">
        <a href="admin.html">
          <button>Login</button>
        </a>
      </div>
    </div>
  );
};

export default AdminCreateAccount;
