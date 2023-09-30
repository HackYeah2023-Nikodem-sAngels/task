package gpt_api

import (
	"context"
	"fmt"
	"strings"

	openai "github.com/sashabaranov/go-openai"

	t "backend/types"
	// "bufio"
	// "strings"
)

var messageStart = "start"
var messageSystemSetup = `
you are a assistant that helps the user choose a major, by asking him personal questions
you ALWAYS respond with a single question regarding the topic, and possible answers in separate lines, preceded by a number and a closing bracket
NEVER provide a other type of response

ask about preferences, experience, interests

don't ask direct questions
don't ask about estimated exam results, cost of studying, preference in private or public universities, city, region, country

on [` + messageStart + `] (language) you respond with the first question in specified language
`

type Session struct {
	client         *openai.Client
	MessageHistory []openai.ChatCompletionMessage
}

func (s *Session) AddMessage(message openai.ChatCompletionMessage) []openai.ChatCompletionMessage {
	s.MessageHistory = append(s.MessageHistory, message)
	return s.MessageHistory
}

func NewSession(conf t.Config) (Session, error) {
	client := openai.NewClient(conf.GPT_API_KEY)
	session := Session{client, []openai.ChatCompletionMessage{}}

	_, err := session.ask(messageSystemSetup, openai.ChatMessageRoleSystem, false)

	return session, err
}

var Dummy = false // For testing, to not eat through the tokens

func (s *Session) ask(question string, role string, saveResponse bool) (string, error) {
	if Dummy {
		return "Dummy answer to " + question, nil
	}

	newMsg := openai.ChatCompletionMessage{
		Role:    role,
		Content: question,
	}
	s.AddMessage(newMsg)

	resp, err := s.client.CreateChatCompletion(
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

func (s *Session) getQuestion(question string) (Question, error) {
	rawQuestion, err := s.ask(question, openai.ChatMessageRoleUser, true)
	return ParseQuestion(rawQuestion), err
}

func (s *Session) Start(language string) (Question, error) {
	return s.getQuestion(fmt.Sprintf("[%v] (%v)", messageStart, language))
}

func (s *Session) AnswerAndGetNext(answer string) (Question, error) {
	return s.getQuestion(answer)
}

type Question struct {
	Question string   `json:"question"`
	Answers  []string `json:"answers"`
}

func ParseQuestion(rawQuestion string) Question {
	lines := strings.Split(rawQuestion, "\n")

	question := lines[0]

	var answers []string
	for i, answer := range lines[1:] {
		ans := strings.TrimPrefix(answer, fmt.Sprintf("%v) ", i+1))
		answers = append(answers, ans)
	}

	return Question{question, answers}
}
