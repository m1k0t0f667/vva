from bs4 import BeautifulSoup
import csv
import requests
from urllib.parse import urlencode


def american_to_european_odds(american_odds):
    if american_odds > 0:
        european_odds = (american_odds / 100) + 1
    elif american_odds < 0:
        european_odds = (-100 / american_odds) + 1
    else:
        european_odds = 1  # Even odds (e.g., American odds of 100)
    return european_odds


proxy_params = {
    "api_key": "1a8a0cf6-7567-4331-9072-45c46d3e9042",
    "url": "https://www.oddsportal.com/rugby-union/world/world-cup/results/",
    "wait": 3000,
    "scoll": 5000,
    "wait": 3000,
}

response = requests.get(
    url="https://proxy.scrapeops.io/v1/",
    params=urlencode(proxy_params),
)

print(response.content)
# chrome_options = Options()
# chrome_options.add_argument("--headless")
# chrome_options.add_argument("--disable-gpu")
# chrome_options.add_argument("--disable-dev-shm-usage")
# chrome_options.add_argument("--no-sandbox")
# driver = webdriver.Chrome(options=chrome_options)
# driver.get("https://www.oddsportal.com/rugby-union/world/world-cup/results/")

soup = BeautifulSoup(response.content, "html.parser")

# divs_with_attribute = soup.find_all("div", class_="eventRow")
# nL = []
# for div in divs_with_attribute:
#     nL.append(div.get_text())
#     print(div.get_text())
# nL[0] = nL[0].split("Cup")
# nL[0] = nL[0][1]
# data = [["Date", "Time", "Team1", "Team2", "odd1", "Draw", "odd2"]]
# date = "00/00/00"
# for event in nL:
#     if "1X2B's" in event:
#         work = event.split("1X2B's")
#         date = work[0]
#         time_match = work[1][0:5]
#         i = 5
#         while type(work[1][i])==str:

#         print(date)
#         print(time_match)
#         print(work[1])

#     time_match = event[0:5]
#     # match_time = time_match.group(1) if time_match else None
#     # team1 = team_matches[0] if len(team_matches) > 0 else None
#     # team2 = team_matches[1] if len(team_matches) > 1 else None
#     # odds1 = odds_matches[0] if len(odds_matches) > 0 else None
#     # Draw = odds_matches[1] if len(odds_matches) > 1 else None
#     # odds3 = odds_matches[2] if len(odds_matches) > 2 else None
#     # l = odds1.split()
#     # print(l)
#     # data.append([date, match_time, team1, team2, odds1, Draw, odds3])

# # Printing the extracted data

# # # Specify the name of the CSV file you want to create


def fetch_world_cup_data():
    main_div = soup.find("div", attrs={"data-v-012eb9f0": ""})
    if not main_div:
        print("Failed to find the main div. The website structure might have changed.")
        return

    matches = []
    current_date = None
    event_rows = main_div.find_all("div", class_="eventRow")

    for event in event_rows:
        # If the date div exists in this event row, update current_date
        date_div = event.find(
            "div",
            class_="text-black-main font-main w-full truncate text-xs font-normal leading-5",
        )

        if date_div:
            var = date_div.text.strip()
            f = var.replace(" - Play Offs", "")
            current_date = f

        # Extracting match time
        match_time = event.find("p").text.strip()

        # Extracting the two teams from the event using the title attribute
        teams = [
            a["title"] for a in event.find_all("a", title=True) if "title" in a.attrs
        ]
        score = []
        team = [a for a in event.find_all("a", title=True) if "title" in a.attrs]
        for t in team:
            all_div = t.find_all("div")
            score.append(all_div[1].text.strip())

        score1 = "N/A"
        score2 = "N/A"
        if len(score) == 2:
            score1 = score[0]
            score2 = score[1]

        print(score1, score2)
        # Check if we have found two teams, otherwise skip this event row
        if len(teams) < 2:
            print("Warning: Less than two teams found for an event. Skipping...")
            continue

        team1, team2 = teams[0], teams[1]

        # Extracting the odds for each team
        odds = event.find_all("p", class_="height-content", limit=3)

        # If less than 3 odds found, warn and skip
        if len(teams) < 2:
            print("Warning: Less than two teams found for an event. Skipping...")
            continue

        odd_team1, oddDraw, odd_team2 = (
            american_to_european_odds(float(odds[0].text.strip())),
            american_to_european_odds(float(odds[1].text.strip())),
            american_to_european_odds(float(odds[2].text.strip())),
        )

        matches.append(
            {
                "team1": team1,
                "team2": team2,
                "score1": score1,
                "score2": score2,
                "odd_team1": odd_team1,
                "oddDraw": oddDraw,
                "odd_team2": odd_team2,
                "time": match_time,
                "date": current_date,  # Use the current_date for this match
            }
        )

    return matches


data = fetch_world_cup_data()


# Open the CSV file in write mode and create a CSV writer
with open("oddRugby.csv", "w") as csvfile:
    writer = csv.DictWriter(
        csvfile,
        fieldnames=[
            "team1",
            "team2",
            "score1",
            "score2",
            "odd_team1",
            "oddDraw",
            "odd_team2",
            "time",
            "date",
        ],
    )
    writer.writeheader()
    writer.writerows(data)
# Find all div elements with the attribute data-v-012eb9f0
