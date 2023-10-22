# Importez les modules nécessaires
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import csv
from collections import Counter
from starlette.responses import RedirectResponse

# Créez une instance FastAPI
app = FastAPI()

# Middleware CORS pour autoriser les requêtes depuis n'importe quelle origine
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Fonction pour charger les données à partir des fichiers CSV
def load_data(file_name: str) -> list:
    data = []
    with open(file_name, "r") as file:
        csvreader = csv.DictReader(file)
        for row in csvreader:
            data.append(row)
    return data

# Chargement des données depuis les fichiers CSV
matches = load_data("./oddRugby.csv") + load_data("./transformed_rugby.csv")
next_matches = load_data("./transformed_new_rugby.csv")
ranking = load_data("./ranking.csv")

# Fonction pour calculer la moyenne
def moyenne(l):
    r = 0
    r1 = 0
    for i in l:
        r += int(i[0])
        r1 += int(i[1])
    return round(r / len(l)), round(r1 / len(l))

# Fonction pour obtenir le classement d'une équipe
def give_ranking(team):
    for t in ranking:
        if t["country"] == team:
            return t

# Fonction utilitaire pour trouver l'élément le plus fréquent dans une liste
def most_frequent(data_list: list) -> str:
    occurence_count = Counter(data_list)
    return occurence_count.most_common(1)[0][0]

# Fonction pour obtenir le vainqueur en fonction des cotes
def get_winner_by_odd(match: dict) -> str:
    if not match["odd_team1"]:
        return None
    if match["odd_team1"] > match["oddDraw"] and match["odd_team2"] > match["oddDraw"]:
        return "Draw"
    return match["team1"] if match["odd_team1"] <= match["odd_team2"] else match["team2"]

# Fonction pour obtenir le vainqueur en fonction des points
def get_winner_by_points(match: dict) -> str:
    if not match["score1"]:
        return None
    if match["score1"] == match["score2"]:
        return "Draw"
    return match["team1"] if match["score1"] > match["score2"] else match["team2"]

# Fonction pour comparer le classement de deux équipes
def compare_ranking(pays1, pays2):
    if give_ranking(pays1)["position"] > give_ranking(pays2)["position"]:
        return pays1
    else:
        return pays2

# Fonction pour obtenir le vainqueur en fonction des anciens matchs
def get_winner_old(current_match: dict) -> tuple:
    relevant_matches = [
        match
        for match in matches
        if current_match["team1"] in match.values()
        and current_match["team2"] in match.values()
    ]
    if len(relevant_matches) == 0:
        print("Aucune donnée")
        return ["Aucune donnée", "Aucune donnée"]
    winners = [get_winner_by_points(match) for match in relevant_matches]
    most_common = most_frequent(winners)
    most_common_10 = most_frequent(winners[:10]) if len(winners) >= 10 else most_common

    return most_common, most_common_10

# Liste des équipes avec leurs couleurs
teams = [
    { "name": "France", "image": team1Image, "countryCode": "France", "color": "#123456" },
    { "name": "Portugal", "image": team2Image, "countryCode": "Portugal", "color": "#654321" },
    { "name": "Angleterre", "image": team3Image, "countryCode": "England", "color": "#789abc" },
    { "name": "Argentine", "image": team4Image, "countryCode": "Argentina", "color": "#def123" },
    { "name": "Afrique du Sud", "image": team5Image, "countryCode": "South Africa", "color": "#456789" },
    { "name": "Australie", "image": team6Image, "countryCode": "Australia", "color": "#ab789c" },
    { "name": "Chili", "image": team7Image, "countryCode": "Chile", "color": "#567def" },
    { "name": "Écosse", "image": team8Image, "countryCode": "Scotland", "color": "#acdbef" },
    { "name": "Fidji", "image": team9Image, "countryCode": "Fiji", "color": "#dea456" },
    { "name": "Géorgie", "image": team10Image, "countryCode": "Georgia", "color": "#123def" },
    { "name": "Irlande", "image": team11Image, "countryCode": "Ireland", "color": "#789dea" },
    { "name": "Italie", "image": team12Image, "countryCode": "Italy", "color": "#456def" },
    { "name": "Japon", "image": team13Image, "countryCode": "Japan", "color": "#ab789d" },
    { "name": "Namibie", "image": team14Image, "countryCode": "Namibia", "color": "#de456f" },
    { "name": "Nouvelle-Zélande", "image": team15Image, "countryCode": "New Zealand", "color": "#456dea" },
    { "name": "Pays de Galles", "image": team16Image, "countryCode": "Wales", "color": "#ab45de" },
    { "name": "Roumanie", "image": team17Image, "countryCode": "Romania", "color": "#def789" },
    { "name": "Samoa", "image": team18Image, "countryCode": "Samoa", "color": "#def123" },
    { "name": "Tonga", "image": team19Image, "countryCode": "Tonga", "color": "#acde45" },
    { "name": "Uruguay", "image": team20Image, "countryCode": "Uruguay", "color": "#45acde" },
]


# Définition des endpoints de l'API
@app.get("/{pays}")
def get_all_matches(pays: str) -> dict:
    relevant_matches = [match for match in matches if pays in match.values()]
    upcoming_matches = []

    for match in next_matches:
        if pays in match.values():
            match["winner_by_odd"] = get_winner_by_odd(match)
            overall, recent = get_winner_old(match)
            match["winner_by_all_matches"] = overall
            match["winner_by_10_l_matches"] = (
                recent if len(relevant_matches) >= 10 else "Idem"
            )
            upcoming_matches.append(match)

    return {
        "ranking": give_ranking(pays),
        "result10": relevant_matches[:10],
        "next_matches": upcoming_matches,
    }

@app.get("/")
def get_prediction(country_1: str = None, country_2: str = None):
    prediction_points = []
    r = []
    if country_1 and country_2:
        for i in matches:
            if country_1 in i.values() and country_2 in i.values():
                r.append(i)
                if country_1 == i["team1"]:
                    prediction_points.append([i["score1"], i["score2"]])
                else:
                    prediction_points.append([i["score2"], i["score1"]])
        h = get_winner_old({"team1": country_1, "team2": country_2})
        if len(prediction_points) == 0:
            val = "No data"
        else:
            val = moyenne(prediction_points)
        return {
            "result_by_points": val,
            "result_by_victory10": h[1],
            "result_by_victory": h[0],
            "result10": r[0:10],
            "result_by_ranking": [give_ranking(country_1), give_ranking(country_2)],
        }

    elif country_1:
        redirect_url = f"/{country_1}"
        return RedirectResponse(redirect_url)
    elif country_2:
        redirect_url = f"/{country_2}"
        return RedirectResponse(redirect_url)
    else:
        return "Please select a country or two country : http://127.0.0.1:8000/?country_1=&country_2="

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8080)
