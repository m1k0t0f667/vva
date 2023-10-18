import csv

# Create a list to store the transformed data
transformed_data = []
transformed_data2 = []


# Open the original CSV file for reading
with open("./rugby_dataset_updt.csv", "r") as file:
    csvreader = csv.DictReader(file)

    # Iterate through the rows and transform the data
    for row in csvreader:
        dat=""
        match row["date - Mois"]:
            case "janvier":
                dat="Jan"
            case "fevrier":
                dat="Fev"
            case "mars":
                dat="Mar"
            case "avril":
                dat="Avr"
            case "mai":
                dat="Mai"
            case "juin":
                dat="Jui"
            case "juillet":
                dat="Jul"
            case "aout":
                dat="Aou"
            case "septembre":
                dat="Sep"
            case "octobre":
                dat="Oct"
            case "novembre":
                dat="Nov"
            case "Decembre":
                dat="Dec"
            
            

        team1 = row["home_team"]
        team2 = row["away_team"]
        score1 = row["home_score"]
        score2 = row["away_score"]
        odd_team1 = None
        oddDraw = None
        odd_team2 = None
        time = None
        date = f'{row["date - Jour"]} {dat} {row["date - Annee"]}'

        # Append the transformed data to the list
        transformed_data.append([team1, team2, score1, score2, odd_team1, oddDraw, odd_team2, time, date])

transformed_data.reverse()
# Write the transformed data to a new CSV file

with open("./transformed_rugby.csv", "w", newline="") as file:

    csvwriter = csv.writer(file)
    
    # Write the header
    csvwriter.writerow(["team1", "team2", "score1", "score2", "odd_team1", "oddDraw", "odd_team2", "time", "date"])
    
    # Write the transformed rows
    csvwriter.writerows(transformed_data)
with open("./futur_cotes_translate.csv", "r") as file:
    csvreader = csv.DictReader(file)

    # Iterate through the rows and transform the data
    for row in csvreader:
        dat=""
        match row["Date - Mois"]:
            case "janvier":
                dat="Jan"
            case "fevrier":
                dat="Fev"
            case "mars":
                dat="Mar"
            case "avril":
                dat="Avr"
            case "mai":
                dat="Mai"
            case "juin":
                dat="Jui"
            case "juillet":
                dat="Jul"
            case "aout":
                dat="Aou"
            case "septembre":
                dat="Sep"
            case "octobre":
                dat="Oct"
            case "novembre":
                dat="Nov"
            case "Decembre":
                dat="Dec"
            
            

        team1 = row["Equipe 1"]
        team2 = row["Equipe 2"]
        score1 = None
        score2 = None
        odd_team1 = row["Cote 1"]
        oddDraw = row["Match Nul"]
        odd_team2 = row["Cote 2"]
        time = row["Heure"]
        date = f'{row["Date - Jour"]} {dat} {row["Date - Annee"]}'

        # Append the transformed data to the list
        transformed_data2.append([team1, team2, score1, score2, odd_team1, oddDraw, odd_team2, time, date])

with open("./transformed_new_rugby.csv", "w", newline="") as file:

    csvwriter = csv.writer(file)
    
    # Write the header
    csvwriter.writerow(["team1", "team2", "score1", "score2", "odd_team1", "oddDraw", "odd_team2", "time", "date"])
    
    # Write the transformed rows
    csvwriter.writerows(transformed_data2)