package types

type Question struct {
	Question string   `json:"question"`
	Answers  []string `json:"answers"`
}
