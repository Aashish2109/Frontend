package authentication

import (
	"net/http"

	"example.com/my-app/db"
	"example.com/my-app/models"
	"github.com/gin-gonic/gin"
)

type Credentials struct {
	Email string `json:"email"`
}

func Login(c *gin.Context) {
	var credentials Credentials
	if err := c.ShouldBindJSON(&credentials); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var user models.Users
	result := db.DB.Where("email = ?", credentials.Email).First(&user)
	if result.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "no record found"})
		return
	}
	if user.Role == "Admin" {
		c.JSON(http.StatusOK, gin.H{"message": "admin successfully logged in"})
		return
	} else {
		c.JSON(http.StatusOK, gin.H{"message": "reader successfully logged in"})
	}
}
