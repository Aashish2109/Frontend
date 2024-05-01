import { useState } from "react";
import styles from "./admin.module.scss";
import Login from "../components/images/login.jpg";
import { Link, useNavigate } from "react-router-dom";
const Admin = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
const navigate=useNavigate()
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
        if (data.token) {
          // Store the token in localStorage
          localStorage.setItem("token", data.token);
          alert("OTP Sent Successfully");
        } else {
          alert("Admin does not exist");
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
        alert("Admin Login Successfully");
        navigate('/adminfunctions');
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Check token validity when component mounts and every minute
  useEffect(() => {
    const checkTokenValidity = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate('/login');
      } else {
        // You need to implement the isTokenValid function to validate the token
        if (!isTokenValid(token)) {
          navigate('/login');
        }
      }
    };

    checkTokenValidity(); // Check initially when the component mounts

    // Set up a timer to check token validity every minute
    const interval = setInterval(checkTokenValidity, 60000); // 60000 milliseconds = 1 minute

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, [navigate]);


  return (
    <>
      <div className={styles.setMain}>
        <div className={styles.mainContainer}>
          <h1>Welcome Back</h1>
          <h3>Hi Admin, Please Login To Continue</h3>
          <div id={styles.loginContainer}>
            <form onSubmit={handleLogin}>
              <label htmlFor="email">Enter Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required pattern="\S+.*"
                autoComplete="off"
                placeholder="Please enter your email"
              />
              <br />
              <button type="submit" className={styles.buttonClass}>
                Login
              </button>
            </form>
            <div className={styles.createaccount}>
              <Link to="/index"><button className={styles.buttonClass}>Previous</button></Link>
                
              <Link to="/admincreateaccount">
                <button className={styles.buttonClass}>Create Account</button>
              </Link>
            </div>
          </div>
          <div id={styles.otpContainer} >
            <h2>Enter OTP</h2>
            <form onSubmit={handleOtpSubmit}>
              <label htmlFor="otp">OTP:</label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required pattern="\S+.*"
              />
              <button className={styles.buttonClass} type="submit">
                Submit OTP
              </button>
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

export default Admin;
