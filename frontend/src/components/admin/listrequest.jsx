import React, { useState, useEffect } from "react";
import styles from "./listrequest.module.scss";
const ListRequest = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    ListRequests();
  }, []);

  // Function to list issue requests
  const ListRequests = async () => {
    try {
      const response = await fetch("/listissuerequests", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setRequests(data);
      console.log(data);
    } catch (error) {
      alert("error");
    }
  };

  // Function to approve an issue request
   const approveIssueRequest=(req_id)=> {
      fetch(`/approve-issue-request/${req_id}`, {
          method: 'PUT'
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Failed to approve issue request');
          }
          return response.json();
      })
      .then(data => {
          alert("Issue request approved successfully");
          console.log('Issue request approved successfully:', data);
          // Optionally, update UI or perform other actions after approval
          ListRequests(); // Refresh issue requests list
      })
      .catch(error => {
          alert("No Available Copies")
          console.error('Error:', error);
      });
  }

  // // Function to reject an issue request
  const rejectIssueRequest=(req_id)=> {
      fetch(`/reject-issue-request/${req_id}`, {
          method: 'DELETE'
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Failed to reject issue request');
          }
          return response.json();
      })
      .then(data => {
          alert("Issue request rejected successfully");
          console.log('Issue request rejected successfully:', data);
          // Optionally,ListIssue
          ListRequest();})

      .catch(error=>{
        alert("Error")

        console.error('Error',error);
      })
  }

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>
        ISSUE REQUEST MANAGEMENT
      </h1>

      <div className={styles.listrequestDiv}>
        <table>
          <thead>
            <tr>
              <th className={styles.tablerow}>Request ID</th>
              <th className={styles.tablerow}>Book ID</th>
              <th className={styles.tablerow}>Reader ID</th>
              <th className={styles.tablerow}>Request Date</th>
              <th className={styles.tablerow}>Approval Date</th>
              <th className={styles.tablerow}>Approver ID</th>
              <th className={styles.tablerow}>Request Type</th>
              <th className={styles.tablerow}>Action</th>
            </tr>
          </thead>
     
        
          <tbody>
            {requests.map((request, idx) => (
              <tr key={idx}>
                <td className={styles.tabledata}>{request.req_id}</td>
                <td className={styles.tabledata}>{request.book_id}</td>
                <td className={styles.tabledata}>{request.reader_id}</td>
                <td className={styles.tabledata}>{request.request_date}</td>
                <td className={styles.tabledata}>{request.approval_date}</td>
                <td className={styles.tabledata}>{request.approver_id}</td>
                <td className={styles.tabledata}>{request.request_type}</td>
                <button onClick={()=>approveIssueRequest(request.req_id)}>Approve</button>
                <button onClick={()=>rejectIssueRequest(request.req_id)}>Reject</button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListRequest;

// go get github.com/twilio/twilio-go
// package authentication

// import (
// 	"math/rand"
// 	"net/http"
// 	"strconv"
// 	"time"

// 	"github.com/gin-gonic/gin"
// 	"github.com/twilio/twilio-go"
// 	"github.com/twilio/twilio-go/rest/api/v2010/account/message"
// )

// // STRUCT DEFINITION

// type Credential struct {
// 	MobileNumber string `json:"mobile_number"`
// }

// // FUNCTION TO GENERATE OTP

// func GenerateOTP() string {
// 	rand.Seed(time.Now().UnixNano())
// 	return strconv.Itoa(rand.Intn(999999))
// }

// var otp string
// var mobileNumber string

// // FUNCTION TO SEND OTP VIA SMS

// func SendOTP(mobileNumber, otp string) error {
// 	accountSID := "your_twilio_account_sid"
// 	authToken := "your_twilio_auth_token"
// 	twilioPhoneNumber := "your_twilio_phone_number"

// 	client := twilio.NewRestClient(accountSID, authToken)

// 	messageParams := &message.CreateMessageParams{
// 		To:   &mobileNumber,
// 		From: &twilioPhoneNumber,
// 		Body: twilio.String("Your OTP is: " + otp),
// 	}

// 	_, err := client.ApiV2010.CreateMessage(messageParams)
// 	return err
// }

// // GENERATE AND SEND OTP VIA SMS

// func GenerateAndSendOTP(c *gin.Context) {
// 	var request Credential
// 	if err := c.BindJSON(&request); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	// Validate mobile number format here if needed

// 	mobileNumber = request.MobileNumber

// 	if mobileNumber == "" {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "mobile number is required"})
// 		return
// 	}

// 	otp = GenerateOTP()

// 	err := SendOTP(mobileNumber, otp)
// 	if err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to send OTP"})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"message": "OTP sent successfully", "otp": otp})
// }

// // FUNCTION TO VALIDATE THE OTP

// func ValidateOTP(c *gin.Context) {
// 	submittedOTP := otp
// 	serverOTP := c.Param("otp")

// 	if submittedOTP == serverOTP {
// 		c.JSON(http.StatusOK, gin.H{"message": "OTP is valid"})
// 	} else {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid OTP"})
// 	}
// }
