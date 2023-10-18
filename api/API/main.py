from fastapi import FastAPI
import requests
from bs4 import BeautifulSoup
import pandas as pd
import os

app = FastAPI()

chapeaux = {
    "Chapeau 1": ["Afrique du Sud", "Nouvelle-Zélande", "Angleterre", "Pays de Galles"],
    "Chapeau 2": ["Irlande", "Australie", "France", "Japon"],
    "Chapeau 3": ["Écosse", "Argentine", "Fidji", "Italie"],
    "Chapeau 4": ["Samoa", "Géorgie", "Uruguay", "Tonga"],
    "Chapeau 5": ["Roumanie", "Namibie", "Chili", "Portugal"]
}

pays = [equipe for sublist in chapeaux.values() for equipe in sublist]

def fetch_and_parse(url):
    try:
        response = requests.get(url)
        response.raise_for_status()
        return BeautifulSoup(response.text, 'html.parser')
    except requests.RequestException:
        return None

def extract_data(soup):
    equipes1 = [div.text.strip() for div in soup.select(".scoreboard_contestant-1 div")]
    equipes2 = [div.text.strip() for div in soup.select(".scoreboard_contestant-2 div")]
    hours = [div.text.strip() for div in soup.select("div.scoreboard_hour")]
    dates = [div.text.strip() for div in soup.select("div.event_infoTime.ng-star-inserted")]
    all_cotes = [cote.text.strip() for cote in soup.select("span.oddValue")]

    equipes_cotes = []

    for i in range(len(equipes1)):
        equipe1, cote1 = equipes1[i], all_cotes[i*3]
        cote_null, cote2 = all_cotes[i*3 + 1], all_cotes[i*3 + 2]
        equipe2 = equipes2[i]

        if equipe1 not in pays or equipe2 not in pays:
            continue

        heure = hours[i]
        date = dates[i]

        equipes_cotes.append([equipe1, cote1, cote_null, cote2, equipe2, heure, date, ""])

    return equipes_cotes

def update_csv(data):
    directory = "BetclicTest"
    if not os.path.exists(directory):
        os.makedirs(directory)

    path = os.path.join(directory, "cotes_equipes.csv")

    try:
        old_data_df = pd.read_csv(path, delimiter='|')
    except FileNotFoundError:
        old_data_df = pd.DataFrame(columns=['Equipe 1', 'Cote 1', 'Match Nul', 'Cote 2', 'Equipe 2', 'Heure', 'Date', 'Annotation'])

    for row in data:
        equipe1, cote1, match_nul, cote2, equipe2, heure, date, annotation = row

        existing_entry = old_data_df[(old_data_df["Equipe 1"] == equipe1) & 
                                     (old_data_df["Equipe 2"] == equipe2) &
                                     (old_data_df["Date"] == date)]
                                     
        if not existing_entry.empty:
            if (existing_entry["Heure"].iloc[0] == heure) and (existing_entry["Cote 2"].iloc[0] != cote2):
                old_cote = existing_entry["Cote 2"].iloc[0]
                annotation = f"L'ancienne cote était de : {old_cote} pour {equipe2}."
                old_data_df.loc[existing_entry.index, "Annotation"] = annotation
                old_data_df.loc[existing_entry.index, "Cote 2"] = cote2
                old_data_df.loc[existing_entry.index, "Date"] = date
        else:
            old_data_df = pd.concat([old_data_df, pd.DataFrame([row], columns=old_data_df.columns)], ignore_index=True)

    old_data_df.to_csv(path, sep='|', index=False)

@app.get("/")
def read_root():
    return {"message": "Bienvenue sur l'API !"}

@app.get("/update-data/")
def update_data():
    url = "https://www.betclic.fr/coupe-du-monde-2023-s5/coupe-du-monde-2023-c34"
    soup = fetch_and_parse(url)

    if soup:
        data = extract_data(soup)
        update_csv(data)
        return {"status": "success", "message": "Les données ont été mises à jour dans BetclicTest/cotes_equipes.csv."}
    else:
        return {"status": "error", "message": "Erreur lors de la mise à jour des données."}
