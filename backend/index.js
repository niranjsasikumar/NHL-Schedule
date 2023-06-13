const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());

app.get("/schedule/:team/:start/:end", async (req, res) => {
  try {
    const { team, start, end } = req.params;

    var response = null;
    if (team == "all") {
      response = await axios.get("https://statsapi.web.nhl.com/api/v1/schedule?startDate=" + start + "&endDate=" + end);
    } else {
      response = await axios.get("https://statsapi.web.nhl.com/api/v1/schedule?teamId=" + team + "&startDate=" + start + "&endDate=" + end);
    }

    const schedule = response.data;
    res.json(schedule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while retrieving the NHL schedule." });
  }
});

app.get("/teams", async (req, res) => {
  try {
    const response = await axios.get("https://statsapi.web.nhl.com/api/v1/teams");
    const teams = response.data.teams;
    teams.sort((a, b) => a.name.localeCompare(b.name));
    res.json(teams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while retrieving the NHL teams information." });
  }
});

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log("Connected to backend.");
});