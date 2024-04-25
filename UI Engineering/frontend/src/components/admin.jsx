// import { useState } from "react";

// const Admin = () => {
//     const[email,setEmail]=useState('')
//     const Handler=async()=>{
//     try{
//     const response=await fetch("/send-otp", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email: email }),
//     })
//     const data =await response.json();
//         if (data.error) {
//           alert(data.error);
//         } else {
//           fetch("/login", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ email: email }),
//           });
//           if (data.owner_role == "Admin") {
//             alert("OTP Sent Succesully");
//           }
//           else{
//             alert("admin does not exists")
//           }
//         }
//       }
//       catch(error){console.error("Error:", error)};
//   };
//     fetch(`/validate-otp/${otp}`, {
//       method: "POST",
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.error) {
//           alert(data.error);
//         } else {
//           alert("Admin Login Successfully");
//           window.location.href = "./adminfunctions.html";
//         }
//       })
//       .catch((error) => console.error("Error:", error));


//   return (
//     <>
//     <div>Admin</div>
   
//     <div className="setmain">
//       <div className="main-container">
//             <h1>Welcome to Library Management System</h1>
//              <h3>Hi Admin, Please Login To Continue</h3>
//              <div id="login-container">
//                  <form onSubmit={Handler}>
//                     <label htmlFor="email">Enter Email:</label>
//                     <input type="email" id="email" name="email" required/>
//                     <br/>
//                      <button type="submit">Login</button>
//                  </form>
//                  <div class="createaccount">
//                      <a href="index.html"><button>Previous</button></a>
//                      <a href="admincreateaccount.html"><button>Create Account</button></a>
//                  </div>
//              </div>
//              <div id="otp-container" style="display: none;">
//                  <h2>Enter OTP</h2>
//                  <form id="otp-form">
//                      <label htmlFor="otp">OTP:</label>
//                      <input type="text" id="otp" name="otp" required/>                     
//                      <button type="submit">Submit OTP</button>
//                  </form>
//              </div>
//          </div>
//          <div>
//              <img src="Login.jpg" alt="login" class="imageclass" />
//          </div>
//      </div>
//      </>

// )

// };
// export default Admin