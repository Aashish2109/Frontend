package authentication

import (
	"bytes"
	"encoding/json"
	"math/rand"
	"net/http"
	"strconv"
	"time"

	"example.com/my-app/db"
	"example.com/my-app/models"
	"github.com/gin-gonic/gin"
)

//STRUCT DEFINITION

type Credential struct {
	Email string `json:"email"`
}

// FUNCTION TO GENERATE OTP

func GenerateOTP() string {
	rand.Seed(time.Now().UnixNano())
	return strconv.Itoa(rand.Intn(999999))
}

var otp string
var email string

// FUNCTION TO SEND OTP

// func SendOTP(email, otp string) error {
// 	from := "aashishg863@gmail.com"
// 	password := "tisx fsjz zrup ussj"

// 	smtpHost := "smtp.gmail.com"
// 	smtpPort := "587"

// 	msg := "From:" + from + "\n" +
// 		"To:" + email + "\n" +
// 		"Subject: One time OTP for login\n\n" +
// 		"Your OTP is: " + otp

// 	auth := smtp.PlainAuth("", from, password, smtpHost)

// 	err := smtp.SendMail(smtpHost+":"+smtpPort, auth, from, []string{email}, []byte(msg))
// 	if err != nil {
// 		return err
// 	}
// 	// fmt.Println("Email Sent Successfully : " + email)
// 	return nil

// }

// GENERATE AND SEND OTP

func GenerateAndSendOTP(c *gin.Context) {
	var request Credential
	if err := c.BindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}
	// var user models.Users
	var user models.Users
	result := db.DB.Where("email = ?", request.Email).First(&user)

	if result.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "no record found"})
		return
	}
	email = request.Email

	if email == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "email is required"})
		return
	}
	otp = GenerateOTP()
	if err := sendTeamsNotification("https://xenonstack1.webhook.office.com/webhookb2/f31c7aab-4faa-4c1f-a216-e7eeb0b2fe89@7ff914bc-ca07-4c28-8277-73e20a4966c7/IncomingWebhook/237010bb92934594a1f0ff278b2804aa/4158b6ff-fddb-4099-baf1-2a992bd0ae2d", "OTP Sent Successfully", otp); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to send notification on team"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "otp sent"})
	// fmt.Println(otp)
	// err := SendOTP(email, otp)
	// if err != nil {
	// 	c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to send OTP"})
	// 	return
	// }
	// c.JSON(http.StatusOK, gin.H{"message": "email sent successfully", "otp": otp, "owner_role": user.Role})
}

func sendTeamsNotification(webhookURL, title, subtitle string) error {
	teamsPayload := map[string]interface{}{
		"@type":      "MessageCard",
		"@context":   "http://schema.org/extensions",
		"themeColor": "0076D7",
		"summary":    title,
		"sections": []map[string]string{
			{"activityTitle": title,
				"activitySubtitle": subtitle,
			},
		},
	}
	//converting payload to json format

	payloadJSON, err := json.Marshal(teamsPayload)
	if err != nil {
		return err
	}

	// final statement to send teams message
	_, err = http.Post(webhookURL, "application/json", bytes.NewBuffer(payloadJSON))
	if err != nil {
		return err
	}
	return nil
}

// FUNCTION TO VALIDATE THE OTP
func ValidateOTP(c *gin.Context) {
	submittedOTP := otp
	serverOTP := c.Param("otp")

	if submittedOTP == serverOTP {
		if err := sendTeamsNotification("https://xenonstack1.webhook.office.com/webhookb2/f31c7aab-4faa-4c1f-a216-e7eeb0b2fe89@7ff914bc-ca07-4c28-8277-73e20a4966c7/IncomingWebhook/237010bb92934594a1f0ff278b2804aa/4158b6ff-fddb-4099-baf1-2a992bd0ae2d", "Login", "Successfully"); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to send notification on team"})
			return
		}
		// from := "aashishg863@gmail.com"
		// password := "tisx fsjz zrup ussj"

		// smtpHost := "smtp.gmail.com"
		// smtpPort := "587"

		// msg := "From:" + from + "\n" +
		// 	"To:" + email + "\n" +
		// 	"Subject: Login Successful\n\n" +
		// 	"Congratulations You Have Successfully Logged In !!!"

		// auth := smtp.PlainAuth("", from, password, smtpHost)

		// err := smtp.SendMail(smtpHost+":"+smtpPort, auth, from, []string{email}, []byte(msg))
		// if err != nil {
		// 	c.JSON(http.StatusInternalServerError, gin.H{"error": "sorry no confirmation message delievered"})
		// }
		c.JSON(http.StatusOK, gin.H{"message": "OTP is valid"})
	} else {
		sendTeamsNotification("https://xenonstack1.webhook.office.com/webhookb2/f31c7aab-4faa-4c1f-a216-e7eeb0b2fe89@7ff914bc-ca07-4c28-8277-73e20a4966c7/IncomingWebhook/237010bb92934594a1f0ff278b2804aa/4158b6ff-fddb-4099-baf1-2a992bd0ae2d", "Login", "Not Successful")
		c.JSON(400, gin.H{"error": "invalid OTP"})

	}

	// from := "aashishg863@gmail.com"
	// password := "tisx fsjz zrup ussj"

	// smtpHost := "smtp.gmail.com"
	// smtpPort := "587"

	// msg := "From:" + from + "\n" +
	// 	"To:" + email + "\n" +
	// 	"Subject:  ****Login Failure ****\n\n" +
	// 	"Sorry you are not authorized user  !!!"

	// auth := smtp.PlainAuth("", from, password, smtpHost)

	// err := smtp.SendMail(smtpHost+":"+smtpPort, auth, from, []string{email}, []byte(msg))
	// if err != nil {
	// 	c.JSON(http.StatusInternalServerError, gin.H{"error": "sorry no confirmation message delievered"})
	// }

}

// import (
// 	"errors"
// 	"fmt"
// 	"net/http"

// 	"example.com/my-app/db"
// 	"example.com/my-app/models"
// 	"github.com/gin-gonic/gin"
// 	"github.com/twilio/twilio-go"
// 	openapi "github.com/twilio/twilio-go/rest/verify/v2"
// )

// var TWILIO_ACCOUNT_SID string = "AC778c17d360fc0ac7d29bddba17527b3e"
// var TWILIO_AUTH_TOKEN string = "152065a20460074f5dbaebc8779a9b1a"
// var VERIFY_SERVICE_SID string = "VAf3a0fc1021ebfbd4781e35c91d506a4a"
// var client *twilio.RestClient = twilio.NewRestClientWithParams(twilio.ClientParams{
// 	Username: TWILIO_ACCOUNT_SID,
// 	Password: TWILIO_AUTH_TOKEN,
// })

// type Credential struct {
// 	ContactNumber string `json:"contact_number"`
// }

// func SendOtp(phone string) (string, error) {
// 	to := "+91" + phone
// 	params := &openapi.CreateVerificationParams{}
// 	params.SetTo(to)
// 	params.SetChannel("sms")

// 	resp, err := client.VerifyV2.CreateVerification(VERIFY_SERVICE_SID, params)
// 	if err != nil {
// 		fmt.Println(err.Error())
// 		return "", errors.New("OTP Failed TO GENERATE")
// 	} else {
// 		// fmt.Printf("Sent verification '%s'\n", *resp.Sid)
// 		return *resp.Sid, nil
// 	}

// }
// func CheckOtp(phone, code string) error {
// 	to := "+91" + phone
// 	params := &openapi.CreateVerificationCheckParams{}
// 	params.SetTo(to)
// 	params.SetCode(code)

// 	resp, err := client.VerifyV2.CreateVerificationCheck(VERIFY_SERVICE_SID, params)

// 	if err != nil {
// 		fmt.Println(err.Error())
// 		return errors.New("INVALID OTP")
// 	} else if *resp.Status == "approved" {
// 		return nil
// 	} else {
// 		return errors.New("INVALID OTP")
// 	}
// }
// func GenerateAndSendOTP(c *gin.Context) {
// 	var request Credential
// 	if err := c.BindJSON(&request); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 	}
// 	// var user models.Users
// 	var user models.Users
// 	result := db.DB.Where("contact_number = ?", request.ContactNumber).First(&user)

// 	if result.RowsAffected == 0 {
// 		c.JSON(http.StatusNotFound, gin.H{"error": " otp no record found"})
// 		return
// 	}
// 	otp, err := SendOtp(request.ContactNumber)
// 	if err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"message": "OTP sent successfully", "otp": otp})
// }

// func ValidateOTP(c *gin.Context) {
// 	// Get OTP from URL parameter
// 	otp := c.Param("otp")

// 	// Get phone number from request body
// 	var request Credential
// 	if err := c.BindJSON(&request); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	// Check if OTP is valid
// 	err := CheckOtp(request.ContactNumber, otp)
// 	if err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	// OTP validation successful
// 	c.JSON(http.StatusOK, gin.H{"message": "OTP validation successful"})
// }
