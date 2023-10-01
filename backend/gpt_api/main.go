package gpt_api

import (
	"bytes"
	"context"
	"fmt"
	"net/http"
	"strings"

	t "backend/types"

	openai "github.com/sashabaranov/go-openai"
)

var messageStart = "start"
var messageSystemSetup = `
you are a assistant that helps the user choose a major, by asking him personal questions
you ALWAYS respond with short major description generated from user's answers, FOLLOWED BY a single question regarding the topic, with AT LEAST 2 answers in separate lines, each starting with a number and a dot
NEVER provide answer type of other

ask about preferences, experience, interests

don't ask direct questions
don't ask about estimated exam results, cost of studying, preference in private or public universities, city, region, country

on [` + messageStart + `] (language) you respond with the first question in specified language
`

type OpenAISession struct {
	MessageHistory []openai.ChatCompletionMessage
	configData     t.Config
}

func (s *OpenAISession) AddMessage(message openai.ChatCompletionMessage) []openai.ChatCompletionMessage {
	s.MessageHistory = append(s.MessageHistory, message)
	return s.MessageHistory
}

func NewOpenAISession(conf t.Config) (OpenAISession, error) {
	session := OpenAISession{[]openai.ChatCompletionMessage{}, conf}

	_, err := session.ask(messageSystemSetup, openai.ChatMessageRoleSystem, false)

	return session, err
}

func (s *OpenAISession) ask(question string, role string, saveResponse bool) (string, error) {
	client := openai.NewClient(s.configData.GPT_API_KEY)

	if !s.configData.PROD {
		return "Dummy answer to " + question, nil
	}

	newMsg := openai.ChatCompletionMessage{
		Role:    role,
		Content: question,
	}
	s.AddMessage(newMsg)

	resp, err := client.CreateChatCompletion(
		context.Background(),
		openai.ChatCompletionRequest{
			Model:    openai.GPT3Dot5Turbo,
			Messages: s.MessageHistory,
		},
	)

	if err != nil {
		return "error", err
	}

	res := resp.Choices[0].Message

	if saveResponse {
		s.AddMessage(res)
	}

	return res.Content, nil
}

func (s *OpenAISession) getQuestion(question string) ([]t.Major, t.Question, error) {
	rawQuestion, err := s.ask(question, openai.ChatMessageRoleUser, true)
	if err != nil {
		return []t.Major{}, t.Question{}, err
	}

	perfectMajor, resQuestion := ParseResponse(rawQuestion)
	return getRelatedMajors(perfectMajor), resQuestion, nil
}

func (s *OpenAISession) Start(startData t.BaseInformation, conf t.Config) ([]t.Major, t.Question, error) {
	var renderedTempl bytes.Buffer

	err := conf.TEMPLATES.ExecuteTemplate(&renderedTempl, "firstMsg", startData)
	fmt.Println(renderedTempl.String())
	if err != nil {
		return []t.Major{}, t.Question{}, err
	}

	return s.getQuestion(renderedTempl.String())
}

func (s *OpenAISession) AnswerAndGetNext(answer string, conf t.Config) ([]t.Major, t.Question, error) {
	s.configData = conf
	return s.getQuestion(answer)
}

func ParseResponse(rawQuestion string) (string, t.Question) {
	rlines := strings.Split(rawQuestion, "\n")

	var lines []string
	for _, line := range rlines[:] {
		if line != "" {
			lines = append(lines, line)
		}
	}

	if len(lines) < 2 {
		return lines[0], t.Question{}
	}

	startQuestion := 1
	if lines[1][0] == '1' {
		startQuestion = 0
	}

	question := lines[startQuestion]

	var answers []string
	for i, answer := range lines[startQuestion+1:] {
		ans := strings.TrimPrefix(answer, fmt.Sprintf("%v. ", i+1))
		answers = append(answers, ans)
	}

	if startQuestion == 1 {
		return lines[0], t.Question{Question: question, Answers: answers}
	} else {
		return lines[1], t.Question{Question: question, Answers: answers}
	}
}

func getRelatedMajors(major string) []t.Major {
	url := "http://localhost:3333/" // TODO: CHANGE TO ENVVAR!!!!!!
	postData := []byte(major)

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(postData))
	if err != nil {
		return []t.Major{}
	}

	req.Header.Set("Content-Type", "text/plain")
	client := &http.Client{}

	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Error sending request:", err)
		return []t.Major{}
	}

	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return []t.Major{}
	}

	responseBody := make([]byte, 1024)
	n, err := resp.Body.Read(responseBody)
	if err != nil {
		return []t.Major{}
	}

	embedding := string(responseBody[:n])

	fmt.Printf("Embedding: %v\n", embedding)

	return []t.Major{}
}
