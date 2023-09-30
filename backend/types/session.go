package types

type Matura struct {
	Subject string `json:"subject"`
	Score   int    `json:"score"`
}

type BaseInformation struct {
	Country          string `json:"country"` // default Poland
	NoRegionSelected bool
	Region           string `json:"region"`
	StudyLevel       int    `json:"studyLevel"`
	NoInterests      bool
	Interests        []string `json:"interests"`
	NoMaturaResults  bool
	MaturaResults    []Matura `json:"maturaResults"`
	NoFutureSkills   bool
	FutureSkills     []string `json:"futureSkills"`
	Specialization   string   `json:"specialization"`
}
