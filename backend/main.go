package main

import (
	// "github.com/gin-contrib/sessions"
	// "github.com/gin-contrib/sessions/postgres"
	"github.com/gin-gonic/gin"
	"net/http"
)

func main() {
	r := gin.Default()

	r.NoRoute(func(ctx *gin.Context) {
		ctx.String(http.StatusNotFound, "404")
	})

	r.Run()
}
