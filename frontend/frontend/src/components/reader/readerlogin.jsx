import { useState } from "react";
import styles from "./readerlogin.module.scss";
import LoginImage from '../images/login.jpg'
import { Link, useNavigate } from "react-router-dom";
const ReaderLogin = () => {
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
        if (data.owner_role === "Reader") {
          alert("OTP Sent Successfully");
        }
        else {
          alert("reader does not exist");
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
      if(data.owner_role==="Reader") {
        alert("reader login successfully");
        navigate("/reader/readerfunctions");
      }else{
        alert("error")
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required pattern="\S+.*"
                autoComplete="off"
                placeholder="Please enter your email"
              />
              <button className={styles.adminLogin}>
                Login
              </button>
            </form>
            <div className={styles.createaccount}>
              <Link to="/index" style={{textDecoration:"none"}}>
                <button className={styles.createAccountButtons}>Previous</button>
              </Link>

              <Link to="/reader/readercreateaccount" style={{textDecoration:"none"}}>
                <button className={styles.createAccountButtons}>Create Account</button>
              </Link>
            </div>
          </div>
          <div className={styles.otpContainer}>
            <h2>Enter OTP</h2>
            <form onSubmit={handleOtpSubmit}>
              <label htmlFor="otp">OTP:</label>
              <input   style={{
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

export default ReaderLogin;
