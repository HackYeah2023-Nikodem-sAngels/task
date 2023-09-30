package main

import (
	db "backend/database"
	r "backend/router"
	t "backend/types"
	"log"

	"github.com/caarlos0/env/v9"
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

	router, err := r.CreateRouter(conf)
	if err != nil {
		log.Fatalf("Error creating web server:\n%v", err)
	}

	router.Run()
}
