package database

import (
	t "backend/types"
	"encoding/binary"
	"log"
	"math"
	"strconv"
	"strings"

	// "math/rand"
	"sort"

	"github.com/lib/pq"
	"gonum.org/v1/gonum/mat"
)

type courseScore struct {
	Id    int
	Name  string
	Uni   string
	Score float64
}

func MockGetScoresL2() ([]courseScore, error) {
	var scores []courseScore
	query := "SELECT id, course_name, university_name FROM studia_zwykle ORDER BY RANDOM() LIMIT 5"

	rows, err := DB.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var s courseScore

		err := rows.Scan(&s.Id, &s.Name, &s.Uni)
		if err != nil {
			return nil, err
		}

		scores = append(scores, s)
	}

	return scores, nil
}

func float64frombytes(bytes []byte) float64 {
	bits := binary.LittleEndian.Uint64(bytes)
	float := math.Float64frombits(bits)
	return float
}

func GetScoresL2(inf t.BaseInformation, vector mat.Vector) ([]courseScore, error) {
	var (
		query  string
		scores []courseScore
	)
	if len(inf.Regions) != 0 {
		query = `SELECT id, course_name, vector::text
            FROM studia_zwykle 
            WHERE vector IS NOT NULL`
		// AND lang = $1 AND voivodeship IN ($2) AND degree = $3`

		log.Println(inf)
		rows, err := DB.Query(query) //, inf.Language, pq.Array(inf.Regions), inf.StudyLevel)
		if err != nil {
			log.Println("err", err)
			return nil, err
		}
		defer rows.Close()

		cols, err := rows.Columns()
		log.Println(cols)

		for rows.Next() {
			var vecStr string
			score := courseScore{}

			err := rows.Scan(&score.Id, &score.Name, &vecStr)
			if err != nil {
				return nil, err
			}

			var vec []float64
			vecStr = strings.Trim(vecStr, "{")
			vecStr = strings.Trim(vecStr, "}")
			vecArr := strings.Split(vecStr, ",")
			for _, p := range vecArr {
				a, err := strconv.ParseFloat(p, 64)
				if err != nil {
					return nil, err
				}

				vec = append(vec, a)
			}

			vector1 := mat.NewVecDense(len(vec), vec)
			score.Score = mat.Dot(vector1, vector)

			log.Println(score)

			scores = append(scores, score)
		}

		sort.Slice(scores, func(i, j int) bool {
			return scores[i].Score < scores[j].Score
		})

		return scores, nil
	} else {
		query = `SELECT id, vector::text FROM studia_zwykle 
        WHERE vector IS NOT NULL
        AND lang = $1
        AND degree = $2`

		rows, err := DB.Query(query, inf.Language, inf.StudyLevel)
		if err != nil {
			return nil, err
		}
		defer rows.Close()

		for rows.Next() {
			var vecStr string
			score := courseScore{}

			err := rows.Scan(&score.Id, &score.Name, &vecStr)
			if err != nil {
				return nil, err
			}

			var vec []float64
			vecStr = strings.Trim(vecStr, "{")
			vecStr = strings.Trim(vecStr, "}")
			vecArr := strings.Split(vecStr, ",")
			for _, p := range vecArr {
				a, err := strconv.ParseFloat(p, 64)
				if err != nil {
					return nil, err
				}

				vec = append(vec, a)
			}

			vector1 := mat.NewVecDense(len(vec), vec)
			score.Score = mat.Dot(vector1, vector)

			log.Println(score)

			scores = append(scores, score)
		}

		sort.Slice(scores, func(i, j int) bool {
			return scores[i].Score < scores[j].Score
		})

		return scores, nil
	}
}

func GetScoresL3(inf t.BaseInformation, vector mat.Vector) ([]courseScore, error) {
	var (
		query  string
		scores []courseScore
	)
	if len(inf.Regions) != 0 {
		query = `SELECT id, school_name, vector::text FROM studia_doktoranckie
        WHERE vector IS NOT NULL
        AND lang = $1
        AND voivodeship IN ($2)`

		rows, err := DB.Query(query, inf.Language, pq.Array(inf.Regions))
		if err != nil {
			return nil, err
		}
		defer rows.Close()

		for rows.Next() {
			var vecStr string
			score := courseScore{}

			err := rows.Scan(&score.Id, &score.Name, &vecStr)
			if err != nil {
				return nil, err
			}

			var vec []float64
			vecStr = strings.Trim(vecStr, "{")
			vecStr = strings.Trim(vecStr, "}")
			vecArr := strings.Split(vecStr, ",")
			for _, p := range vecArr {
				a, err := strconv.ParseFloat(p, 64)
				if err != nil {
					return nil, err
				}

				vec = append(vec, a)
			}

			vector1 := mat.NewVecDense(len(vec), vec)
			score.Score = mat.Dot(vector1, vector)

			log.Println(score)

			scores = append(scores, score)
		}

		sort.Slice(scores, func(i, j int) bool {
			return scores[i].Score < scores[j].Score
		})

		return scores, nil
	} else {
		query = "SELECT id, vector::text FROM studia_doktoranckie WHERE vector IS NOT NULL AND lang = $1"

		rows, err := DB.Query(query, inf.Language)
		if err != nil {
			return nil, err
		}
		defer rows.Close()

		for rows.Next() {
			var vecStr string
			score := courseScore{}

			err := rows.Scan(&score.Id, &score.Name, &vecStr)
			if err != nil {
				return nil, err
			}

			var vec []float64
			vecStr = strings.Trim(vecStr, "{")
			vecStr = strings.Trim(vecStr, "}")
			vecArr := strings.Split(vecStr, ",")
			for _, p := range vecArr {
				a, err := strconv.ParseFloat(p, 64)
				if err != nil {
					return nil, err
				}

				vec = append(vec, a)
			}

			vector1 := mat.NewVecDense(len(vec), vec)
			score.Score = mat.Dot(vector1, vector)

			log.Println(score)

			scores = append(scores, score)
		}

		sort.Slice(scores, func(i, j int) bool {
			return scores[i].Score < scores[j].Score
		})

		return scores, nil
	}
}
