import { useState } from "react";
import styles from "./adminlogin.module.scss";
import LoginImage from '../images/login.jpg'
import { Link, useNavigate } from "react-router-dom";
const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (data.error) {
        alert(data.error);
      } else {
        if (data.owner_role === "Admin" || data.owner_role==="Reader") {
          alert("OTP Sent Successfully");
        }
        else {
          alert("user does not exist");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/validate-otp/${otp}`, {
        method: "POST",
      });
      const data = await response.json();
      if(data.owner_role==="Admin"){
        alert("admin login successfully")
        navigate("/admin/adminfunctions")
      } else if(data.owner_role==="Reader") {
        alert("reader login successfully");
        navigate("/reader/readerfunctions");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                pattern="\S+.*"
                autoComplete="off"
                placeholder="Please enter your email"
              />
              <button className={styles.adminLogin}>
                Login
              </button>
            </form>
            <div className={styles.createaccount}>
              <Link to="/index">
                <button className={styles.createAccountButtons}>Previous</button>
              </Link>

              <Link to="/admincreateaccount">
                <button className={styles.createAccountButtons}>Create Account</button>
              </Link>
            </div>
          </div>
          <div className={styles.otpContainer}>
            <h2>Enter OTP</h2>
            <form onSubmit={handleOtpSubmit}>
              <label htmlFor="otp">OTP:</label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                pattern="\S+.*"
                placeholder="enter the otp received"
              />
              <div className={styles.adminLogin}>
              <button >
                Submit OTP
              </button>
              </div>
              
            </form>
          </div>
        </div>
        <div>
          <img src={LoginImage} alt="login" className={styles.imageclass} />
        </div>
      </div>
    </>
  );
};

export default AdminLogin;