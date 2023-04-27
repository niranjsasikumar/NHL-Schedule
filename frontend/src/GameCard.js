function GameCard(props) {
  // Full team names
  const awayTeam = props.data?.teams?.away?.team?.name;
  const homeTeam = props.data?.teams?.home?.team?.name;

  // Formate the game time
  const utcDate = new Date(props.data?.gameDate);
  const formattedTime = utcDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric"
  });

  // Status of whether the game has a set time or TBD
  const status = props.data?.status?.detailedState;

  return (
    <div className="border border-1 p-3 mb-3 shadow">
      <p className="m-0 mb-1">{awayTeam} @ {homeTeam}</p>
      <p className="m-0">{status.includes("TBD") ? "TBD" : formattedTime}</p>
    </div>
  );
}

export default GameCard;