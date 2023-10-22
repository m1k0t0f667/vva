import React from 'react';

function PreviousResultsNeutral({ data, teams }) {
  const get_winner_by_points = (match) => {
    if (!match.score1 || !match.score2) return "Match non joué";
    if (match.score1 === match.score2) return "Match nul";
    
    let winningTeamName = getWinner(match);

    // Recherche de la couleur de l'équipe gagnante dans la liste des équipes
    let winningTeamColor = "#000000"; // Couleur par défaut au cas ou mdrrr

    if (teams && teams.length > 0) {
      const team = teams.find((t) => t.name === winningTeamName);
      if (team) {
        winningTeamColor = team.color;
      }
    }

    return (
      <div>
        <span style={{ color: winningTeamColor }}>
          {winningTeamName}
        </span>
      </div>
    );
  };

  const getWinner = (match) => {
    return parseInt(match.score1) > parseInt(match.score2) ? match.team1 : match.team2;
  };

  return (
    <div className="mt-6 grid grid-cols-2 gap-4">
      <h2 className="text-2xl font-bold mb-4 col-span-2">Anciens Résultats</h2>
      {data.result10.map((match, index) => (
        <div key={index} className="bg-gray-100 p-4 mb-4 rounded-lg shadow-md">
          <div className="flex justify-between mb-2">
            <span className="font-bold text-black">{match.date}</span>
          </div>
          <div className="flex justify-between">
            <span>{match.team1} vs {match.team2}</span>
          </div>
          <div>{match.score1} - {match.score2}</div>
          Gagné par {get_winner_by_points(match)}
        </div>
      ))}
    </div>
  );
}

export default PreviousResultsNeutral;
