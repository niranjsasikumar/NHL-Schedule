import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DateCard from './DateCard';

function App() {
  const [schedule, setSchedule] = useState(null);
  const [teams, setTeams] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState("all");

  // Fetch data of all teams
  useEffect(() => {
    const fetchData = async () => {
      try {
        const teams_response = await axios.get("/teams");
        setTeams(teams_response.data);
      } catch(error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // Fetch schedule for the selected team
  useEffect(() => {
    const fetchData = async () => {
      try {
        var today = new Date();
        const offset = today.getTimezoneOffset();
        today = new Date(today.getTime() - (offset*60*1000));
        today = today.toISOString().substring(0, 10);
        const schedule_response = await axios.get("/schedule/" + selectedTeam + "/" + today);
        setSchedule(schedule_response.data);
      } catch(error) {
        console.log(error);
      }
    };

    fetchData();
  }, [selectedTeam]);

  return (
    <div>

      <div className="bg-dark text-white py-5">
        <div className="container">
          <h1 className="h1 mb-4">NHL Schedule</h1>
          
          <label className="form-label" htmlFor="teams">Team:</label>
          <select className="form-select" name="teams" id="teams" onChange={(event) => setSelectedTeam(event.target.value)}>
            <option value="all">All Teams</option>
            {teams?.map(team => (
              <option value={team.id}>{team.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="container">
        {schedule?.dates?.length === 0 && <p className="mt-4">The selected team does not have any games in the coming week.</p>}

        {schedule?.dates?.map(date => (
          <DateCard data={date} />
        ))}
      </div>
    </div>
  );
}

export default App;