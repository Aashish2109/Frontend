import React from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.scss";
import LandingPageImage from "../components/images/landingpage.jpg";

const Index = () => {

  return (
    <>
      <div className={styles.heading}>
        <h1>WELCOME TO ONLINE LIBRARY MANAGEMENT SYSTEM</h1>
      </div>
      <div className={styles.mainDiv}>
      <div>
          <img
            className={styles.landingPage}
            src={LandingPageImage}
            alt="Landingpageimage"
          />
        </div>
        <div className={styles.mainContent}>
        
          <div className={styles.links}>
            <h2>Available Options</h2>
            <Link to="/owner/createlibrary">
              <button className={styles.buttons}>CREATE LIBRARY</button>
            </Link>
            <Link to="/owner/deletelibrary">
              <button className={styles.buttons}>DELETE LIBRARY</button>
            </Link>
            <Link to="/admin/login">
              <button className={styles.buttons}>LOGIN AS ADMIN</button>
            </Link>
            <Link to="/reader/login">
              <button className={styles.buttons}>LOGIN AS READER</button>
            </Link>
            <Link to="/owner/availablelibraries">
              <button className={styles.buttons} >AVAILABLE LIBRARIES</button>
              </Link>
          
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
