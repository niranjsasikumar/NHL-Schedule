import GameCard from './GameCard';

function DateCard(props) {
  // Format the date
  const date = new Date(props.data?.date);
  const formattedDate = date.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "UTC"
  });

  return (
    <div>
      <h2 className="h4 my-4">{formattedDate}</h2>
      {props.data?.games?.map(game => (
        <GameCard data={game} />
      ))}
    </div>
  );
}

export default DateCard;