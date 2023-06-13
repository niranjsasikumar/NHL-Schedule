import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DateCard from './DateCard';

function App() {
  const today = new Date();
  const offset = today.getTimezoneOffset();
  const todayString = today.toISOString().substring(0, 10);
  const currentYear = today.getFullYear();

  var minDate = "";
  var maxDate = "";

  if (todayString <= currentYear + "-06-30") {
    minDate = (currentYear - 1) + "-07-01";
    maxDate = currentYear + "-06-30";
  } else {
    minDate = currentYear + "-07-01";
    maxDate = (currentYear + 1) + "-06-30";
  }
  
  const [schedule, setSchedule] = useState(null);
  const [teams, setTeams] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState("all");
  const [startDate, setStartDate] = useState(new Date(today.getTime() - (offset*60*1000)).toISOString().substring(0, 10));
  const [endDate, setEndDate] = useState(new Date(new Date().setDate(today.getDate() + 7)).toISOString().substring(0, 10));
  const [isLoading, setIsLoading] = useState(false);
  const [loadingFailed, setLoadingFailed] = useState(false);

  // Fetch the schedule within the specified date range of the selected team
  const fetchSchedule = async () => {
    try {
      setLoadingFailed(false);
      setIsLoading(true);
      const schedule_response = await axios.get("http://localhost:5000/schedule/" + selectedTeam + "/" + startDate + "/" + endDate);
      setSchedule(schedule_response.data);
    } catch(error) {
      console.log(error);
      setLoadingFailed(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data of all teams
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoadingFailed(false);
        setIsLoading(true);
        const teams_response = await axios.get("http://localhost:5000/teams");
        setTeams(teams_response.data);
      } catch(error) {
        console.log(error);
        setLoadingFailed(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeams();
    fetchSchedule();
  }, []);

  const handleStartDateChange = (event) => {
    const selectedDate = event.target.value;
    if (selectedDate !== "") {
      setStartDate(selectedDate);
    }
  };

  const handleEndDateChange = (event) => {
    const selectedDate = event.target.value;
    if (selectedDate !== "") {
      setEndDate(selectedDate);
    }
  };

  const applyFilters = () => {
    if (startDate > endDate) {
      alert("Cannot apply filters. Please ensure that start date is before end date.");
      return;
    }

    fetchSchedule();
  }

  return (
    <div>

      <div className="bg-dark text-white py-5">
        <div className="container">
          <h1 className="h1 mb-4">NHL Schedule</h1>

          <div className="row">
            <div className="col-md-4 my-2">
              <label className="form-label" htmlFor="start">Start date:</label>
              <input className="form-control" type="date" required="required" id="start" name="start" value={startDate} min={minDate} max={maxDate} onChange={handleStartDateChange} />
            </div>

            <div className="col-md-4 my-2">
              <label className="form-label" htmlFor="end">End date:</label>
              <input className="form-control" type="date" required="required" id="end" name="end" value={endDate} min={minDate} max={maxDate} onChange={handleEndDateChange} />
            </div>

            <div className="col-md-4 my-2">
              <label className="form-label" htmlFor="teams">Team:</label>
              <select className="form-select" name="teams" id="teams" onChange={(event) => setSelectedTeam(event.target.value)}>
                <option value="all">All Teams</option>
                {teams?.map(team => (
                  <option value={team.id}>{team.name}</option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" class="btn btn-primary mt-3" onClick={applyFilters}>Apply filters</button>
        </div>
      </div>

      <div className="container pb-5">
        {loadingFailed ? (
          <p className="mt-4">Failed to load schedule. Try again.</p>
        ) : isLoading ? (
          <p className="mt-4"><span class="spinner-border spinner-border-sm"></span> Loading schedule...</p>
        ) : schedule?.dates?.length === 0 && selectedTeam === "all" ? (
          <p className="mt-4">There are no games in the specified date range.</p>
        ) : schedule?.dates?.length === 0 ? (
          <p className="mt-4">The selected team does not have any games in the specified date range.</p>
        ) : (
          schedule?.dates?.map(date => (
            <DateCard data={date} />
          ))
        )}
      </div>
    </div>
  );
}

export default App;