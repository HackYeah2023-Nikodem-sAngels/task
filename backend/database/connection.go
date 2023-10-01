package database

import (
	t "backend/types"
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
)

var (
	DB  *sql.DB
	err error
)

func InitConnection(conf t.Config) error {
	connStr := fmt.Sprintf("postgresql://%s:%s@%s:%s/%s?sslmode=disable&fallback_application_name=hackyeah",
		conf.DB_USER, conf.DB_PASS, conf.DB_HOST, conf.DB_PORT, conf.DB_NAME)

	DB, err = sql.Open("postgres", connStr)

	return err
}
