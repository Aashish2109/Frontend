import { useState } from "react";
import styles from "./reader.module.scss";
import Login from "../images/login.jpg";
import { Link, useNavigate } from "react-router-dom";
const Reader = () => {
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
        } else {
          alert("Reader does not exist");
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

      if (data.error) {
        alert(data.error);
      } else {
        alert("Reader Login Successfully");
        navigate("/readerfunctions");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className={styles.main}>
        <div className={styles.maincontainer}>
          <h1>Welcome Back</h1>
          <h3>Hi Reader, Please Login To Continue</h3>
          <div className={styles.logincontainer}>
            <form onSubmit={handleLogin}>
              <label htmlFor="email">Enter Email:</label>
              <input
                className={styles.inputreader}
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
              <br />
              <div className={styles.readerLogin}>
                <button>Submit OTP</button>
              </div>
            </form>
            <div className={styles.createaccount}>
              <Link to="/index">
                <button className={styles.buttonClass}>Previous</button>
              </Link>

              <Link to="/readercreateaccount">
                <button className={styles.buttonClass}>Create Account</button>
              </Link>
            </div>
          </div>
          <div className={styles.otpcontainer}>
            <h2>Enter OTP</h2>
            <form onSubmit={handleOtpSubmit}>
              <label htmlFor="otp">OTP:</label>
              <input
                className={styles.inputreader}
                type="text"
                id="otp"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                pattern="\S+.*"
                placeholder="enter the otp received"
              />
              <div className={styles.readerLogin}>
                <button>Submit OTP</button>
              </div>
            </form>
          </div>
        </div>
        <div>
          <img src={Login} alt="login" className={styles.imageclass} />
        </div>
      </div>
    </>
  );
};

export default Reader;
