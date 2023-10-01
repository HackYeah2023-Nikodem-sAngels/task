package types

type Question struct {
	Question string   `json:"question"`
	Answers  []string `json:"answers"`
}

type Major struct {
	Name        string `json:"name"`
	Description string `json:"description"`
}
