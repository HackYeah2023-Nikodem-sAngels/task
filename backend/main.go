package main

import (
	// "github.com/gin-contrib/sessions"
	// "github.com/gin-contrib/sessions/postgres"
	db "backend/database"
	t "backend/types"
	"log"
	"net/http"

	"github.com/caarlos0/env/v9"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading environmental variables:\n%v", err)
	}

	conf := t.Config{}
	err = env.Parse(&conf)
	if err != nil {
		log.Fatalf("Error parsing environmental variables:\n%v", err)
	}

	err = db.InitConnection(conf)
	if err != nil {
		log.Fatalf("Error connecting to database:\n%v", err)
	}

	r := gin.Default()

	r.NoRoute(func(ctx *gin.Context) {
		ctx.String(http.StatusNotFound, "404")
	})

	r.Run()
}
