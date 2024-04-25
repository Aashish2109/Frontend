package authentication

import (
	"math/rand"
	"net/http"
	"net/smtp"
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

func SendOTP(email, otp string) error {
	from := "aashishg863@gmail.com"
	password := "tisx fsjz zrup ussj"

	smtpHost := "smtp.gmail.com"
	smtpPort := "587"

	msg := "From:" + from + "\n" +
		"To:" + email + "\n" +
		"Subject: One time OTP for login\n\n" +
		"Your OTP is: " + otp

	auth := smtp.PlainAuth("", from, password, smtpHost)

	err := smtp.SendMail(smtpHost+":"+smtpPort, auth, from, []string{email}, []byte(msg))
	if err != nil {
		return err
	}
	// fmt.Println("Email Sent Successfully : " + email)
	return nil

}

// GENERATE AND SEND OTP

func GenerateAndSendOTP(c *gin.Context) {
	var request Credential
	if err := c.BindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}
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
	// fmt.Println(otp)
	err := SendOTP(email, otp)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to send OTP"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "email sent successfully", "otp": otp, "owner_role": user.Role})
}

// FUNCTION TO VALIDATE THE OTP
func ValidateOTP(c *gin.Context) {
	submittedOTP := otp
	serverOTP := c.Param("otp")

	if submittedOTP == serverOTP {
		from := "aashishg863@gmail.com"
		password := "tisx fsjz zrup ussj"

		smtpHost := "smtp.gmail.com"
		smtpPort := "587"

		msg := "From:" + from + "\n" +
			"To:" + email + "\n" +
			"Subject: Login Successful\n\n" +
			"Congratulations You Have Successfully Logged In !!!"

		auth := smtp.PlainAuth("", from, password, smtpHost)

		err := smtp.SendMail(smtpHost+":"+smtpPort, auth, from, []string{email}, []byte(msg))
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "sorry no confirmation message delievered"})
		}
		c.JSON(http.StatusOK, gin.H{"message": "OTP is valid"})
	} else {
		from := "aashishg863@gmail.com"
		password := "tisx fsjz zrup ussj"

		smtpHost := "smtp.gmail.com"
		smtpPort := "587"

		msg := "From:" + from + "\n" +
			"To:" + email + "\n" +
			"Subject:  ****Login Failure ****\n\n" +
			"Sorry you are not authorized user  !!!"

		auth := smtp.PlainAuth("", from, password, smtpHost)

		err := smtp.SendMail(smtpHost+":"+smtpPort, auth, from, []string{email}, []byte(msg))
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "sorry no confirmation message delievered"})
		}
		c.JSON(400, gin.H{"error": "invalid OTP"})
	}
}
