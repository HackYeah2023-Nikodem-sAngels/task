import json

import pandas

lista = []

with open("doktorskie1.json") as data:
    data = json.load(data)
    for uczelnia in data["results"]:
        ### DOKTORSKIE
        slownik = {
            #     "uniwersytet": uczelnia["doctoralSchoolName"],
            #     "wojewodztwo": uczelnia["voivodeship"],
            #     "uczelnia": uczelnia["responsibleInstitutionName"],
            #     "dyscypliny": [discipline["disciplineName"] for discipline in uczelnia["disciplines"]],
            #     "www": uczelnia["www"] if uczelnia["www"] is not None else {},
            ### UCZELNIE ZWYKLE
            "nazwa przedmiotu": uczelnia["iscedName"],
            "kierunki": [
                {
                    key: value
                    for key, value in kierunek.items()
                    if key in {"formName", "titleName", "languageName", "courseName"}
                }
                for kierunek in uczelnia["courseInstances"]
            ],
            "wojewodztwo": uczelnia["leadingInstitutionVoivodeship"],
            "teacherTraining": uczelnia["teacherTraining"],
            "miasto": uczelnia["leadingInstitutionCity"],
            "rodzaj": uczelnia["mainInstitutionKind"],
            "poziom": uczelnia["levelName"],
            "dyscypliny": [
                discipline["disciplineName"] for discipline in uczelnia["disciplines"]
            ],
            "uniwersytet": uczelnia["mainInstitutionName"],
        }
        lista.append(slownik)

    # print(data["results"][0]["profileName"])
print(lista)
dict = {"results": lista}
with open("sampleDoktorskie.json", "w") as outfile:
    json.dump(dict, outfile, indent=4)
