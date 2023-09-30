import psycopg2

conn = psycopg2.connect(
   database="hackyeah", 
   user='u1', 
   password='2oxREaU8tmqUANruiQDS62tWJtsBPYW82xsfgY6w', 
   host='192.168.72.190', 
   port='5432'
)

cursor = conn.cursor()

# whatever you want to do

conn.close()