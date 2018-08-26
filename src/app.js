let SoccerLeague = require('./classes/SoccerLeague');

let league1 = new SoccerLeague(); // Instantiate a new instance of SoccerLeague
league1.readFileToString(); // Read the file into a class property
league1.parseForTeamsAndScores(); // Parse string to determine teams and scores
league1.calculateWinsPerTeam(); // Determine standings by creating an array of objects
league1.sortTeamStandings(); // Sort standings
league1.displayLeagueStandings(); // Display league standings