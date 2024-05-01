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
  // function approveIssueRequest(req_id) {
  //     fetch(`/approve-issue-request/${req_id}`, {
  //         method: 'PUT'
  //     })
  //     .then(response => {
  //         if (!response.ok) {
  //             throw new Error('Failed to approve issue request');
  //         }
  //         return response.json();
  //     })
  //     .then(data => {
  //         alert("Issue request approved successfully");
  //         console.log('Issue request approved successfully:', data);
  //         // Optionally, update UI or perform other actions after approval
  //         listIssueRequests(); // Refresh issue requests list
  //     })
  //     .catch(error => {
  //         alert("No Available Copies")
  //         console.error('Error:', error);
  //     });
  // }

  // // Function to reject an issue request
  // function rejectIssueRequest(req_id) {
  //     fetch(`/reject-issue-request/${req_id}`, {
  //         method: 'DELETE'
  //     })
  //     .then(response => {
  //         if (!response.ok) {
  //             throw new Error('Failed to reject issue request');
  //         }
  //         return response.json();
  //     })
  //     .then(data => {
  //         alert("Issue request rejected successfully");
  //         console.log('Issue request rejected successfully:', data);
  //         // Optionally,ListIssue
  // }

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>
        ISSUE REQUEST MANAGEMENT
      </h1>

      {requests.map((request, idx) => {
        return (
          <>
            <table>
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Book ID</th>
                  <th>Reader ID</th>
                  <th>Request Date</th>
                  <th>Approval Date</th>
                  <th>Approver ID</th>
                  <th>Request Type</th>
                </tr>
              </thead>
              <tbody>
                <div className={styles.listrequestDiv}>
                  <td>Request ID:{request.req_id}</td>

                  <td>Book ID:{request.book_id}</td>

                  <td>Book ID:{request.book_id}</td>

                  <td>Reader ID:{request.reader_id}</td>

                  <td>Request Date:{request.request_date}</td>

                  <td>Approval Date:{request.approval_date}</td>

                  <td>Approver ID:{request.approver_id}</td>

                  <td>Request Type:{request.request_type}</td>
                </div>
              </tbody>
            </table>
          </>
        );
      })}
    </div>
  );
};

export default ListRequest;
