import json

import psycopg2

conn = psycopg2.connect(
    "dbname=hackyeah user=u1 password=2oxREaU8tmqUANruiQDS62tWJtsBPYW82xsfgY6w host=192.168.72.190 port=5432"
)
cursor = conn.cursor()

with open("sampleDoktorskie.json") as doktorskie:
    doktorskie = json.load(doktorskie)
    for uczelnia in doktorskie["results"]:
        uniwersytet = uczelnia.get("uniwersytet", "")
        wojewodztwo = uczelnia.get("wojewodztwo", "")
        uczelnia_name = uczelnia.get("uczelnia", "")
        dyscypliny = ", ".join(
            uczelnia.get("dyscypliny", [])
        )  # Join the list of disciplines into a string
        www = uczelnia.get("www", "")

        # Now you can use these values to construct your SQL query and insert data into the database
        query = (
            f"INSERT INTO studia_doktoranckie (uniwersytet, wojewodztwo, uczelnia, dyscypliny, www) VALUES "
            f"('{uniwersytet}', '{wojewodztwo}', '{uczelnia_name}', '{dyscypliny}', '{www}')"
        )

        cursor.execute(query)


# with open("sample.json") as zwykle:
#     zwykle = json.load(zwykle)
#     for uczelnia in zwykle["results"]:
#         nazwa_przedmiotu = uczelnia.get("nazwa przedmiotu", "")
#         wojewodztwo = uczelnia.get("wojewodztwo", "")
#         teacher_training = uczelnia.get("teacherTraining", "")
#         miasto = uczelnia.get("miasto", "")
#         rodzaj = uczelnia.get("rodzaj", "")
#         poziom = uczelnia.get("poziom", "")
#         kierunki = uczelnia.get("kierunki", "")
#         dyscypliny_list = uczelnia.get("dyscypliny", [])
#         dyscypliny = ', '.join([d.get("disciplineName", "") for d in dyscypliny_list])
#         uniwersytet = uczelnia.get("uniwersytet", "")
#         for kierunek in kierunki:
#             course_name = kierunek["courseName"]
#             form_name = kierunek["formName"]
#             title_name = kierunek["titleName"]
#             lang = kierunek["languageName"]
#             query = f"INSERT INTO studia_zwykle (nazwa_przedmiotu, wojewodztwo, teacher_training, miasto, rodzaj, poziom, dyscypliny, uniwersytet, course_name, form_name, title_name, lang) " \
#                     f"VALUES ('{nazwa_przedmiotu}', '{wojewodztwo}', '{teacher_training}', '{miasto}', '{rodzaj}', '{poziom}', '{dyscypliny}', '{uniwersytet}', '{course_name}', '{form_name}', '{title_name}', '{lang}')"
#
#             cursor.execute(query)

conn.commit()
conn.close()
