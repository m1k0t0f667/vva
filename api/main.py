from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import csv
from collections import Counter
from starlette.responses import RedirectResponse

app = FastAPI()

# Middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data Loading
def load_data(file_name: str) -> list:
    data = []
    with open(file_name, 'r') as file:
        csvreader = csv.DictReader(file)
        for row in csvreader:
            data.append(row)
    return data

matches = load_data("./oddRugby.csv") + load_data("./transformed_rugby.csv")
next_matches = load_data("./transformed_new_rugby.csv")

# Utility Functions
def most_frequent(data_list: list) -> str:
    occurence_count = Counter(data_list)
    return occurence_count.most_common(1)[0][0]

def get_winner_by_odd(match: dict) -> str:
    if not match["odd_team1"]:
        return None

    if match["odd_team1"] > match["oddDraw"] and match["odd_team2"] > match["oddDraw"]:
        return "Draw"
    return match["team1"] if match["odd_team1"] <= match["odd_team2"] else match["team2"]

def get_winner_by_points(match: dict) -> str:
    if not match["score1"]:
        return None

    if match["score1"] == match["score2"]:
        return "Draw"
    return match["team1"] if match["score1"] > match["score2"] else match["team2"]

def get_winner_old(current_match: dict) -> tuple:
    relevant_matches = [match for match in matches if current_match["team1"] in match.values() and current_match["team2"] in match.values()]
    winners = [get_winner_by_points(match) for match in relevant_matches]
    most_common = most_frequent(winners)
    most_common_10 = most_frequent(winners[:10]) if len(winners) >= 10 else most_common

    return most_common, most_common_10

# API Endpoints
@app.get("/{pays}")
def get_all_matches(pays: str) -> dict:
    relevant_matches = [match for match in matches if pays in match.values()]
    upcoming_matches = []

    for match in next_matches:
        if pays in match.values():
            match["winner_by_odd"] = get_winner_by_odd(match)
            overall, recent = get_winner_old(match)
            match["winner_by_all_matches"] = overall
            match["winner_by_10_l_matches"] = recent if len(relevant_matches) >= 10 else "Idem"
            upcoming_matches.append(match)

    return {"result10": relevant_matches[:10], "next_matches": upcoming_matches}

# @app.get("/")
# def get_prediction(country_1: str=None, country_2: str=None):
#     prediction_points=[]
#     if country_1 and country_2:
#         for i in matches:
#            if country_1 in i.values() and country_2 in i.values():
#                if country_1 
#         for i in next_matches:
#            if country_1 in i.values() and country_2 in i.values():
#                 i["winner_by_odd"]=get_winner_by_odd(i)
#                 g,f=get_winner_old(i)
#                 i["winner_by_all_matches"]=g
#                 if len(result)>=10:
#                     i["winner_by_10_l_matches"]=f
#                 else:
#                     i["winner_by_10_l_matches"]="Idem"
#                 n_result.append(i)
#     elif country_1 :
#         redirect_url = f"/{country_1}"
#         return RedirectResponse(redirect_url)
#     elif country_2 :
#         redirect_url = f"/{country_2}"
#         return RedirectResponse(redirect_url)
#     else :
#         return "Please select a country or two country : http://127.0.0.1:8000/?country_1=&country_2="

