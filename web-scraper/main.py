import json
import requests
import psycopg2

conn = psycopg2.connect(
    "dbname=hackyeah user=u1 password=2oxREaU8tmqUANruiQDS62tWJtsBPYW82xsfgY6w host=192.168.72.190 port=5432"
)
cursor = conn.cursor()

lista_nazw_uczelni = []

# with open("sampleDoktorskie.json") as doktorskie:
#     doktorskie = json.load(doktorskie)
#     for uczelnia in doktorskie["results"]:
#         uniwersytet = uczelnia.get("uniwersytet", "")
#         wojewodztwo = uczelnia.get("wojewodztwo", "")
#         uczelnia_name = uczelnia.get("uczelnia", "")
#         dyscypliny = uczelnia['dyscypliny']
#
#         www = uczelnia.get("www", "")
#         if www == "":
#             www = None

# cursor.execute(
#     "INSERT INTO studia_doktoranckie (school_name, voivodeship, university_name, disciplines) VALUES (%s, %s, %s, %s)",
#     (uniwersytet, wojewodztwo, uczelnia_name, dyscypliny)
# )


with open("sample.json") as zwykle:
    zwykle = json.load(zwykle)
    for uczelnia in zwykle["results"]:
        nazwa_przedmiotu = uczelnia.get("nazwa przedmiotu", "")
        wojewodztwo = uczelnia.get("wojewodztwo", "")
        teacher_training = uczelnia.get("teacherTraining", "")
        if teacher_training == "Nie":
            teacher_training = False
        else:
            teacher_training = True
        miasto = uczelnia.get("miasto", "")
        rodzaj = uczelnia.get("rodzaj", "")
        poziom = uczelnia.get("poziom", "")
        kierunki = uczelnia.get("kierunki", "")
        dyscypliny_list = uczelnia.get("dyscypliny", [])
        dyscypliny = [d.get("disciplineName", "") for d in dyscypliny_list]
        uniwersytet = uczelnia.get("uniwersytet", "")

        lista_nazw_uczelni.append(uniwersytet)
        for kierunek in kierunki:
            course_name = kierunek["courseName"]
            form_name = kierunek["formName"]

            if form_name == "stacjonarne":
                form_name = True
            else:
                form_name = False

            if rodzaj == "Uczelnia publiczna":
                rodzaj = True
            else:
                rodzaj = False

            title_name = kierunek["titleName"]
            lang = kierunek["languageName"]

            if poziom == "drugiego stopnia":
                poziom = 2
            elif poziom == "pierwszego stopnia":
                poziom = 1
            else:
                poziom = 0

            # cursor.execute(
            #     "INSERT INTO studia_zwykle (faculty, voivodeship, teacher_training, city, private, degree, course_disciplines, university_name, course_name, stationary, title_name, lang) "
            #     "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
            #     (nazwa_przedmiotu, wojewodztwo, teacher_training, miasto, rodzaj, poziom, dyscypliny, uniwersytet,
            #      course_name, form_name, title_name, lang)
            # )


lista_nazw_uczelni = list(set(lista_nazw_uczelni))
lista_nazw_uczelni2 = []

lista_nazw_uczelni_fixed = []
lista_nazw_uczelni2_fixed = []
with open("api2.json") as datam:
    datam = json.load(datam)
    for placowka in datam["list"]:
        lista_nazw_uczelni2.append(placowka["name"])

for text_with_bad_encoding in lista_nazw_uczelni:
    decoded_text = text_with_bad_encoding.encode("latin-1", "replace").decode("latin-1")
    lista_nazw_uczelni_fixed.append(decoded_text)

for text_with_bad_encoding in lista_nazw_uczelni2:
    decoded_text = text_with_bad_encoding.encode("latin-1", "replace").decode("latin-1")
    lista_nazw_uczelni2_fixed.append(decoded_text)

to_samo_uni = []

for uni in lista_nazw_uczelni_fixed:
    if uni in lista_nazw_uczelni2_fixed:
        to_samo_uni.append(uni)

found_universities = []

for name_to_find in to_samo_uni:
    matching_university = None
    for university in datam["list"]:
        if university["name"] == name_to_find:
            matching_university = university
            break

    if matching_university:
        found_universities.append(
            {"Name": matching_university["name"], "ID": matching_university["id"]}
        )


for uni in found_universities:
    link_to_use = f"https://aplikacje.edukacja.gov.pl/api/internal-data-hub/public/opi/university/{uni['ID']}/course"
    res = requests.get(link_to_use)
    res = res.json()
    for kierunek in res["list"]:
        second_link_to_use = f"https://aplikacje.edukacja.gov.pl/api/internal-data-hub/public/opi/university/{uni['ID']}/course/{kierunek['id']}"
        res2 = requests.get(second_link_to_use)
        res2 = res2.json()
        descr = res2["courseDescription"]

        update_query = (
            "UPDATE studia_zwykle SET description = %s "
            "WHERE university_name = %s and (%s = ANY(course_disciplines) or course_name like %s);"
        )

        cursor.execute(
            update_query, (descr, uni["Name"], kierunek["name"], kierunek["name"])
        )

conn.commit()
conn.close()
