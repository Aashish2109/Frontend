import { useState } from "react";
import styles from "./admin.module.scss"; // Importing the SCSS file

const Admin = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    
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
                if (data.owner_role === "Admin") {
                    alert("OTP Sent Successfully");
                    document.getElementById(styles.loginContainer).style.display = "none";
                    document.getElementById(styles.otpContainer).style.display = "block";
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
                window.location.href = "./adminfunctions.html";
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    
    return (
        <>
            <div>Admin</div>
            <div className={styles.setmain}>
                <div className={styles.mainContainer}>
                    <h1>Welcome to Library Management System</h1>
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
                                required
                            />
                            <br />
                            <button type="submit">Login</button>
                        </form>
                        <div className={styles.createaccount}>
                            <a href="index.html"><button>Previous</button></a>
                            <a href="admincreateaccount.html"><button>Create Account</button></a>
                        </div>
                    </div>
                    <div id={styles.otpContainer} style={{ display: "none" }}>
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
                            />
                            <button type="submit">Submit OTP</button>
                        </form>
                    </div>
                </div>
                <div>
                    <img src="Login.jpg" alt="login" className={styles.imageclass} />
                </div>
            </div>
        </>
    );
};

export default Admin;
