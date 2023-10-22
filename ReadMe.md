# VVA

### [GitHUB link](https://github.com/m1k0t0f667/vva)

### Contexte

Ce projet est une simulation de match de rugby pendant la période de coupe du monde.

### Data

[Lien vers le power Bi](https://app.powerbi.com/groups/me/reports/cd52148d-2ce1-4b7a-9a8e-803b323464ae/ReportSection4e87dd358444dc8e19ec?experience=power-bi)

### Architecture

Pour l'api :  
Utilisation de fast api et de Uvicorn
`$ uvicorn main:app --reload`

Pour le simulateur en react:
`$ npm start`

Les valeurs utilisés pour les prédictions sont :

- Les points : moyenne du scores durant l'ensembles des rencontres
- Par 10 derniers matchs : l'équipe la plus victorieuse sur les 10 derniers matchs
- Par victoires : l'équipe la plus victorieuse sur l'ensembles des rencontres

Lucie Aloccio, Flavien Walkowiak, Hadrien Briffaux
