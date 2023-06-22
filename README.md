# NHL Games Schedule Web Application

The web application is hosted [here](https://nhlschedule.herokuapp.com/).

This application displays the schedule of National Hockey League (NHL) games. The schedule can be filtered to display the schedule within a specified date range and/or only the schedule of a selected team.

The data used for the schedule is from the publicly available NHL API. The application contains a React frontend, a Node.js backend, and a RESTful API built with Express.js.

By default, the start date is set to the current date and the end date is set to 7 days from the current date. If there are no games in the coming week and you wish to see a schedule, you may change the date range to any dates between September and June as this is typically when games are played.
