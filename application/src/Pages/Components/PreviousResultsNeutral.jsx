import React from 'react';

function PreviousResultsNeutral({ data}) {
  const get_winner_by_points = (match) => {
    if (!match.score1 || !match.score2) return "Match non joué";
    if (match.score1 === match.score2) return "Match nul";
    return parseInt(match.score1) > parseInt(match.score2) ? match.team1 : match.team2;
  };


  return (
    <div className="mt-6 grid grid-cols-2 gap-4">
      <h2 className="text-2xl font-bold mb-4 col-span-2">Anciens Résultats</h2>
      {data.result10.map((match, index) => (
        <div key={index} className="bg-gray-100 p-4 mb-4 rounded-lg shadow-md">
          <div className="flex justify-between mb-2">
            <span className="font-bold text-black">{match.date}</span> {/* Date styled as bold and black */}
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
