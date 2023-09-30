package router

import (
	t "backend/types"
	"github.com/gin-gonic/gin"
	"net/http"
)

func CreateRouter(conf t.Config) *gin.Engine {
	r := gin.Default()

	r.NoRoute(func(ctx *gin.Context) {
		ctx.String(http.StatusNotFound, "404")
	})

	return r
}
