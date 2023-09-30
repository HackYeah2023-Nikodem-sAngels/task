package router

import (
	t "backend/types"
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

func setBaseData(ctx *gin.Context) {
	data := t.BaseInformation{}

	err := ctx.BindJSON(&data)
	if err != nil {
		msg := t.JsonErr{Message: "There was an error during parsing your request"}
		ctx.JSON(http.StatusBadRequest, msg)
	}

	if data.Country == "" {
		data.Country = "Poland"
	}

	if len(data.Regions) == 0 {
		data.NoRegionSelected = true
	}

	if len(data.Interests) == 0 {
		data.NoInterests = true
	}

	if len(data.FutureSkills) == 0 {
		data.NoFutureSkills = true
	}

	switch data.StudyLevel {
	case 1:
		if len(data.MaturaResults) == 0 {
			data.NoMaturaResults = true
		}
	case 2:
	case 3:
		if data.Specialization == "" {
			ctx.JSON(http.StatusBadRequest, t.JsonErr{Message: "specialization not provided"})
			return
		}
	default:
		ctx.JSON(http.StatusBadRequest, t.JsonErr{Message: "study level not provided"})
		return
	}

	session := sessions.Default(ctx)
	session.Set("base", data)

	err = session.Save()
	if err != nil {
		ctx.JSON(http.StatusBadRequest, t.JsonErr{Message: "There was an error during saving your request"})
		return
	}

	ctx.Status(http.StatusOK)
}
