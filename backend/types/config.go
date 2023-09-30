package types

type Config struct {
	DB_HOST        string `env:"POSTGRES_HOST" envDefault:"localhost"`
	DB_PORT        string `env:"POSTGRES_PORT" envDefault:"5432"`
	DB_NAME        string `env:"POSTGRES_DB,required"`
	DB_USER        string `env:"POSTGRES_USER,required"`
	DB_PASS        string `env:"POSTGRES_PASSWORD,required"`
	APP_PORT       string `env:"PORT" envDefault:"80"`
	SESSION_SECRET string `env:"APP_SECRET,required"`
	GPT_API_KEY    string `env:"GPT_API_KEY,required"`
}
