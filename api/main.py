from fastapi import FastAPI
import csv
from collections import Counter
from starlette.responses import RedirectResponse



app = FastAPI()


matches=[]
next_matches=[]

with open("./oddRugby.csv", 'r') as file:
    csvreader = csv.DictReader(file)
    for row in csvreader: # each row is a list
        matches.append(row)
with open("./transformed_rugby.csv", 'r') as file:
    csvreader = csv.DictReader(file)
    for row in csvreader: # each row is a list
        matches.append(row)

with open("./transformed_new_rugby.csv", 'r') as file:
    csvreader = csv.DictReader(file)
    for row in csvreader: # each row is a list
        next_matches.append(row)


def most_frequent(List):
    occurence_count = Counter(List)
    return occurence_count.most_common(1)[0][0]



def get_winner_by_odd(match):
    if match["odd_team1"]!=None:
        if match["odd_team1"]>match["oddDraw"] and match["odd_team2"]>match["oddDraw"]:
            return "Draw"
        elif match["odd_team1"]>match["odd_team2"]:
            return match["team2"]
        else:
            return match["team1"]

def get_winner_by_points(match):
    if match["score1"]!=None:
        if match["score1"]==match["score2"]:
            return "Draw"
        elif match["score1"]>match["score2"]:
            return match["team1"]
        else:
            return match["team2"]
        
def get_winner_old(o_match):
    r=[]
    for omatch in matches:
        if o_match["team1"] in omatch.values() and o_match["team2"] in omatch.values():
            r.append(get_winner_by_points(omatch))
    if len(r)>=10:
        return most_frequent(r),most_frequent(r[0:10])
    else :
        return most_frequent(r),(r[0:-1])

@app.get("/{pays}")
def get_allMatches(pays:str=None):
    result=[]
    n_result=[]
    if pays :   
        for i in matches:
           if pays in i.values():
               result.append(i)
        for i in next_matches:
           if pays in i.values():
                i["winner_by_odd"]=get_winner_by_odd(i)
                g,f=get_winner_old(i)
                i["winner_by_all_matches"]=g
                if len(result)>=10:
                    i["winner_by_10_l_matches"]=f
                else:
                    i["winner_by_10_l_matches"]="Idem"
                n_result.append(i)
    return {"result10":result[0:10],"next_matches":n_result}

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

