import { useState } from "react";
import styles from "./adminlogin.module.scss";
import LoginImage from "../images/login.jpg";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
const AdminLogin = () => {
  const [email, setEmail] = useState("");
  // const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log(data);
      const token=data.token;
      localStorage.setItem("token",token)
      // var Cookies = window.Cookies;
      // Cookies.setItem("token",token)
      console.log(token);
      if (response.ok && data.owner_role==="Admin") {
        alert("admin logged in successfully");
        if(token){
          navigate("/admin/adminfunctions");
        }
        else{
          alert("expired")
          navigate("/admin/adminlogin")
        }
        
      } else if(response.status===404){
        alert("admin does not exist");
        setEmail('')
        setPassword('')
      }
      else{
        alert("incorrect username or password")
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // const handleOtpSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await fetch(`/validate-otp/${otp}`, {
  //       method: "POST",
  //     });
  //     const data = await response.json();
  //     if (data.message === "OTP is valid") {
  //       alert("admin login successfully");
  //       navigate("/admin/adminfunctions");
  //     } else {
  //       alert(data.error);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  return (
    <>
      <div className={styles.setMain}>
        <div className={styles.mainContainer}>
          <h1>Welcome Back</h1>
          <h3>Please Login To Continue</h3>
          <div className={styles.loginContainer}>
            <form onSubmit={handleLogin}>
              <label htmlFor="email">Enter Email:</label>
              <input
                className={styles.inputAdmin}
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                pattern="\S+.*"
                autoComplete="off"
                placeholder="Please enter your email"
              />
              <label htmlFor="password">Enter Password:</label>
              <input
                className={styles.inputAdmin}
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                pattern="\S+.*"
                autoComplete="off"
                placeholder="Please enter your password"
              />
              <button className={styles.adminLogin}>Login</button>
            </form>
            <div className={styles.createaccount}>
              <Link to="/index" style={{ textDecoration: "none" }}>
                <button className={styles.createAccountButtons}>
                  Previous
                </button>
              </Link>

              <Link
                to="/admin/admincreateaccount"
                style={{ textDecoration: "none" }}
              >
                <button className={styles.createAccountButtons}>
                  Create Account
                </button>
              </Link>
            </div>
          </div>
          {/* <div className={styles.otpContainer}>
            <h2>Enter OTP</h2>
            <form onSubmit={handleOtpSubmit}>
              <label htmlFor="otp">OTP:</label>
              <input
                style={{
                  width: "90%",
                  padding: "8px",
                  marginBottom: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required pattern="\S+"
                placeholder="enter the otp received"
              />
              <div className={styles.adminLogin}>
                <button>Submit OTP</button>
              </div>
            </form>
          </div> */}
        </div>
        <div>
          <img src={LoginImage} alt="login" className={styles.imageclass} />
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
