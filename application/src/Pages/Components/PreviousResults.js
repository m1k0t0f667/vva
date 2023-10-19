import React from 'react';

function PreviousResults({ data, selectedCountry }) {
  const get_winner_by_points = (match) => {
    if (!match.score1 || !match.score2) return "Match non joué";
    if (match.score1 === match.score2) return "Match nul";
    return parseInt(match.score1) > parseInt(match.score2) ? match.team1 : match.team2;
  };

  const determineWinnerColor = (match) => {
    const winner = get_winner_by_points(match);
    if (selectedCountry === winner) return 'text-green-500 font-bold';
    return 'text-red-500 font-bold';
  };

  return (
    <div className="mt-6 grid grid-cols-2 gap-4">
      <h2 className="text-2xl font-bold mb-4 col-span-2">Anciens Résultats</h2>
      {data.result10.map((match, index) => (
        <div key={index} className="bg-gray-100 p-4 mb-4 rounded-lg shadow-md">
          <div className="flex justify-between">
            <span>{match.team1} vs {match.team2}</span>
            <span className={determineWinnerColor(match)}>
              {match.score1} - {match.score2}
            </span>
          </div>
          <div className={`mt-2 text-sm ${determineWinnerColor(match)}`}>
            Gagné par {get_winner_by_points(match)}
          </div>
        </div>
      ))}
    </div>
  );
}

export default PreviousResults;
