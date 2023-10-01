package router

import (
	"backend/database"
	t "backend/types"
	"encoding/gob"
	"log"

	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/postgres"
	"github.com/gin-gonic/gin"
	"gonum.org/v1/gonum/mat"

	"net/http"

	gpt "backend/gpt_api"
)

type Response struct {
	Majors   []t.Major  `json:"majors"`
	Question t.Question `json:"question"`
}

func CreateRouter(conf t.Config) (*gin.Engine, error) {
	gob.Register(t.BaseInformation{})
	gob.Register(gpt.OpenAISession{})

	r := gin.Default()

	store, err := postgres.NewStore(database.DB, []byte(conf.SESSION_SECRET))
	if err != nil {
		return nil, err
	}

	r.Use(sessions.Sessions("hackyeah", store))

	r.NoRoute(func(ctx *gin.Context) {
		ctx.String(http.StatusNotFound, "404")
	})

	r.POST("/api/session", setBaseData)

	r.GET("/tmp-api/session", func(ctx *gin.Context) {
		session := sessions.Default(ctx)
		base := session.Get("base")
		ctx.JSON(http.StatusOK, base)
	})

	r.GET("/api/uniList1", func(ctx *gin.Context) {
		session := sessions.Default(ctx)
		base := session.Get("base").(t.BaseInformation)
		arr := []float64{0.01156950555741787, -0.006257174536585808, 0.0035254855174571276, -0.020580865442752838, -0.03393721580505371, 0.03303736820816994, -0.02424454316496849, -0.01626158319413662, 0.010476830415427685, -0.016865769401192665}

		res, err := database.GetScoresL2(base, mat.NewVecDense(len(arr), arr))
		// res, err := database.MockGetScoresL2()
		if err != nil {
			log.Println(err)
			ctx.String(http.StatusInternalServerError, "err")
			return
		}

		ctx.JSON(http.StatusOK, res)
	})

	r.GET("/api/uniList2", func(ctx *gin.Context) {
		session := sessions.Default(ctx)
		base := session.Get("base").(t.BaseInformation)
		arr := []float64{0.01156950555741787, -0.006257174536585808, 0.0035254855174571276, -0.020580865442752838, -0.03393721580505371, 0.03303736820816994, -0.02424454316496849, -0.01626158319413662, 0.010476830415427685, -0.016865769401192665}

		res, err := database.GetScoresL3(base, mat.NewVecDense(len(arr), arr))
		// res, err := database.MockGetScoresL2()
		if err != nil {
			log.Println(err)
			ctx.String(http.StatusInternalServerError, "err")
			return
		}

		ctx.JSON(http.StatusOK, res)
	})

	r.GET("/api/questions", func(ctx *gin.Context) {
		session := sessions.Default(ctx)
		if session.Get("base") == nil {
			ctx.JSON(http.StatusBadRequest, t.JsonErr{Message: "No session created"})
			return
		}

		var baseData t.BaseInformation = session.Get("base").(t.BaseInformation)
		if baseData.Language == "" {
			ctx.JSON(http.StatusBadRequest, t.JsonErr{Message: "you did not provide a language"})
			return
		}

		s, err := gpt.NewOpenAISession(conf)
		if err != nil {
			ctx.JSON(http.StatusServiceUnavailable, t.JsonErr{Message: "mati wez to jakos ogarnij na froncie bo gpt spadl z rowerka"})
			return
		}

		majors, question, err := s.Start(baseData, conf)
		if err != nil {
			ctx.JSON(http.StatusServiceUnavailable, t.JsonErr{Message: "mati wez to jakos ogarnij na froncie bo gpt spadl z rowerka"})
			return
		}

		session.Set("chatData", s)
		session.Save()

		ctx.JSON(http.StatusOK, Response{majors, question})
	})

	r.POST("/api/questions", func(ctx *gin.Context) {
		var json t.JsonAnswer
		var chatData gpt.OpenAISession

		session := sessions.Default(ctx)
		chatData = session.Get("chatData").(gpt.OpenAISession)

		err := ctx.BindJSON(&json)
		if err != nil {
			ctx.JSON(http.StatusBadRequest, t.JsonErr{Message: "wrong input"})
			return
		}

		majors, question, err := chatData.AnswerAndGetNext(json.Answer, conf)
		if err != nil {
			log.Println(err)
			ctx.JSON(http.StatusServiceUnavailable, t.JsonErr{Message: "mati wez to jakos ogarnij na froncie bo gpt spadl z rowerka"})
			return
		}

		session.Set("chatData", chatData)
		session.Save()

		ctx.JSON(http.StatusOK, Response{majors, question})
	})

	return r, nil
}
