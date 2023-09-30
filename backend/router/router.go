package router

import (
	"backend/database"
	t "backend/types"
	"encoding/gob"

	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/postgres"
	"github.com/gin-gonic/gin"

	"net/http"
)

func CreateRouter(conf t.Config) (*gin.Engine, error) {
	gob.Register(t.BaseInformation{})

	r := gin.Default()

	store, err := postgres.NewStore(database.DB, []byte(conf.SESSION_SECRET))
	if err != nil {
		return nil, err
	}

	r.Use(sessions.Sessions("sessions", store))

	r.NoRoute(func(ctx *gin.Context) {
		ctx.String(http.StatusNotFound, "404")
	})

	r.POST("/api/session", setBaseData)

	r.GET("/tmp-api/session", func(ctx *gin.Context) {
		session := sessions.Default(ctx)
		base := session.Get("base")
		ctx.JSON(http.StatusOK, base)
	})

	return r, nil
}
