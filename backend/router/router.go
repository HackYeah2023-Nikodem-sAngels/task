package router

import (
	"backend/database"
	t "backend/types"
	"fmt"

	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/postgres"
	"github.com/gin-gonic/gin"

	"net/http"
)

func CreateRouter(conf t.Config) (*gin.Engine, error) {
	r := gin.Default()

	store, err := postgres.NewStore(database.DB, []byte(conf.SESSION_SECRET))
	if err != nil {
		return nil, err
	}

	r.Use(sessions.Sessions("sessions", store))

	r.NoRoute(func(ctx *gin.Context) {
		ctx.String(http.StatusNotFound, "404")
	})

	r.GET("/session-set", func(ctx *gin.Context) {
		session := sessions.Default(ctx)

		session.Set("used", true)
		session.Save()

		ctx.String(http.StatusOK, "Session set")
	})

	r.GET("/session-get", func(ctx *gin.Context) {
		session := sessions.Default(ctx)

		hasSession := session.Get("used")
		if hasSession == nil {
			hasSession = false
		}

		ctx.String(http.StatusOK, fmt.Sprint(hasSession))
	})
	return r, nil
}
