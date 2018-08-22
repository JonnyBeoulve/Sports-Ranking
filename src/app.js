let SoccerLeague = require('../classes/SoccerLeague');

let league1 = new SoccerLeague(); // Instantiate a new instance of SoccerLeague
league1.readFileToString(); // Read the file into a class property
league1.parseForTeamsAndScores(); // Parse string to determine teams and scores