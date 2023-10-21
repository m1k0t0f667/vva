from bs4 import BeautifulSoup
import csv
import requests
from urllib.parse import urlencode

# Define the URL for the proxy and parameters
proxy_url = "https://proxy.scrapeops.io/v1/"
proxy_params = {
    "api_key": "1a8a0cf6-7567-4331-9072-45c46d3e9042",
    "url": "https://rawling.github.io/wr-calc/",
    "wait": 3000,
}

# Make a request to the proxy
response = requests.get(proxy_url, params=urlencode(proxy_params))

# Check if the response was successful
if response.status_code != 200:
    print("Failed to fetch data from the proxy.")
    exit()

# Parse the HTML content with BeautifulSoup
soup = BeautifulSoup(response.content, "html.parser")


def fetch_world_cup_data():
    team = []

    # Find all <tr> elements with the class "ranking"
    main_div = soup.find_all("tr", class_="ranking")

    if not main_div:
        print("Failed to find the main div. The website structure might have changed.")
        return

    for val in main_div:
        position = val.find("td", class_="pos").text.strip()
        country = val.find("td", class_="name").text.strip()
        points = val.find("td", attrs={"data-bind": "text: ptsDisplay"}).text.strip()
        team.append([position, country, points])

    return team


data = fetch_world_cup_data()
print(data)
# Open the CSV file in write mode and create a CSV writer
with open("ranking.csv", "w", newline="") as csvfile:
    writer = csv.writer(csvfile)

    # Write the header row
    writer.writerow(["position", "country", "points"])

    # Write the data rows
    writer.writerows(data)
