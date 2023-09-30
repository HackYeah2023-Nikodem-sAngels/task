package gpt_api

import (
	"context"
	"fmt"

	openai "github.com/sashabaranov/go-openai"

	t "backend/types"
	// "bufio"
	// "strings"
)

var messageStart = "start"
var messageSystemSetup = `
you are a assistant that helps the user choose a major, by asking him personal questions

on every prompt you respond with a question regarding the topic, and possible answers in separate lines, preceded by a number

ask about preferences, experience, interests

don't ask direct questions
don't ask about estimated exam results, cost of studying, preference in private or public universities, city, region, country

on [` + messageStart + `] (language) you respond with the first question in specified language
`

type Session struct {
	client *openai.Client
}

func NewSession(conf t.Config) (Session, error) {
	client := openai.NewClient(conf.GPT_API_KEY)
	session := Session{client}

	_, err := session.ask(messageSystemSetup, openai.ChatMessageRoleSystem)

	return session, err
}

var Dummy = false // For testing, to not eat through the tokens

func (s Session) ask(question string, role string) (string, error) {
	if Dummy {
		return "Dummy answer", nil
	}

	resp, err := s.client.CreateChatCompletion(
		context.Background(),
		openai.ChatCompletionRequest{
			Model: openai.GPT3Dot5Turbo,
			Messages: []openai.ChatCompletionMessage{
				{
					Role:    role,
					Content: question,
				},
			},
		},
	)

	if err != nil {
		fmt.Printf("gpt error: %v\n", err)
		return "error", err
	}

	return resp.Choices[0].Message.Content, nil
}

func (s Session) getQuestion(question string) (Question, error) {
	rawQuestion, err := s.ask(question, openai.ChatMessageRoleUser)
	return ParseQuestion(rawQuestion), err
}

func (s Session) Start(language string) (Question, error) {
	return s.getQuestion(fmt.Sprintf("[%v] (%v)", messageStart, language))
}

func (s Session) AnswerAndGetNext(answer string) (Question, error) {
	return s.getQuestion(answer)
}

type Question struct {
	Question string   `json:"question"`
	Answers  []string `json:"answers"`
}

func ParseQuestion(rawQuestion string) Question {
	question := rawQuestion
	var answers []string

	fmt.Println(rawQuestion)
	//
	// scanner := bufio.NewScanner(strings.NewReader(x))
	// for scanner.Scan() {
	// 	append(answers, scanner.Text())
	// }
	//
	// if err := scanner.Err(); err != nil {
	// 	fmt.Printf("error occurred: %v\n", err)
	// 	// TODO: handle error
	// }

	return Question{question, answers}
}
