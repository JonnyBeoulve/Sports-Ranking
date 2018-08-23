class SoccerLeague {
    constructor() {
        this.inputString = '',
        this.gameTeams = [],
        this.gameScores = [],
        this.teamStandings = []
    }

    /*======================================================================
    // This method will use fs to read a file and place its contents
    // into a string for further analysis. The passed in argument will
    // determine the name of the file in the files folder to use. If none
    // is specified in commandline, it will defualt to sample.
    ======================================================================*/
    readFileToString() {
        let fs = require('fs'); // Module for reading file
        let fileName = '';
    
        // Either set filename as sample if none type in user during execution, or
        // set as the third command line argument
        if (process.argv.length != 3) fileName = 'sample';
        else fileName = process.argv[2];
    
        this.inputString = fs.readFileSync(`./files/${fileName}.txt`, 'utf8');
    }

    /*======================================================================
    // This method parses the previously created string to find all team
    // names and scores, pushing them to arrays within the class.
    ======================================================================*/
    parseForTeamsAndScores() {
        let skipIndexes = 0;

        // For every index in inputString, find groups of alphabetic letters
        // that correspond to team names. Additionally, find groups of numbers
        // that correspond to scores. Push both of these to arrays within the.
        // class. SkipIndexes is used to skip indexes already taken into
        // consideration in nested loops.
        for (let i = 0; i < this.inputString.length; i++) {
            if (skipIndexes) {
                skipIndexes--;
                continue;
            }

            if (this.inputString[i].match(/[a-z]/i)) {
                let teamName = '';
                let k = i;
                while (this.inputString[k].match(/[a-z]/i) || this.inputString[k] === ' ' || this.inputString[k] === '.' || this.inputString[k] === '-') {
                    teamName += this.inputString[k];
                    k++
                    skipIndexes++;
                }

                teamName = teamName.substring(0, teamName.length - 1);
                this.gameTeams.push(teamName);
                skipIndexes--;
                continue;
            }

            if (this.inputString[i].match(/\d+/g)) {
                let teamScore = '';
                let k = i;
                while (this.inputString[k].match(/\d+/g)) {
                    teamScore += this.inputString[k];
                    k++
                    skipIndexes++;
                }

                this.gameScores.push(teamScore);
                continue;
            }

        }
    }
    
    /*======================================================================
    // This method parses the gameTeams and gameScores arrays within the
    // class to calculate total winning points per team. Note that we will
    // address points in groups of two (2 teams) and skip one index per
    // run.
    ======================================================================*/
    calculateWinsPerTeam() {
        let skipIndex = 0;

        for (let i = 0; i < this.gameTeams.length; i++) {
            if (skipIndex) {
                skipIndex--;
                continue;
            }

            // Determine if either or both teams in a game currently have
            // an object created in teamStandings.
            if (this.teamStandings.filter((team) => team.name === this.gameTeams[i]) > -1) {
                this.teamStandings.push({ name: this.gameTeams[i], points: 0 })
            }

            if (this.teamStandings.filter((team) => team.name === this.gameTeams[i + 1]) > -1) {
                this.teamStandings.push({ name: this.gameTeams[i + 1], points: 0 })
            }

            // Determine winner for a game, or tie, and award points. Wins are worth
            // 3 points while a tie awards both team with 1 point. The findIndexOfTeam
            // helper method will be called to find corresponding indexes.
            if (this.gameScores[i] > this.gameScores[i + 1]) {
                let winningTeamIndex = this.findIndexOfTeam(this.gameTeams[i]);
                this.teamStandings[winningTeamIndex].points = this.teamStandings[winningTeamIndex].points + 3;
                skipIndex++;
            } else if (this.gameScores[i] < this.gameScores[i + 1]) {
                let winningTeamIndex = this.findIndexOfTeam(this.gameTeams[i + 1]);
                this.teamStandings[winningTeamIndex].points = this.teamStandings[winningTeamIndex].points + 3;
                skipIndex++;
            } else if (this.gameScores[i] === this.gameScores[i + 1]) {
                let tyingTeamIndex1 = this.findIndexOfTeam(this.gameTeams[i]);
                let tyingTeamIndex2 = this.findIndexOfTeam(this.gameTeams[i + 1]);
                this.teamStandings[tyingTeamIndex1].points = this.teamStandings[tyingTeamIndex1].points + 1;
                this.teamStandings[tyingTeamIndex2].points = this.teamStandings[tyingTeamIndex2].points + 1;
                skipIndex++;
            }

        }
    }

    /*======================================================================
    // This helper method will loop through the teamStandings array of
    // objects to find the index of a matching team name.
    ======================================================================*/
    findIndexOfTeam(teamName) {
        for (let i in this.teamStandings) if (this.teamStandings[i].name === teamName) return i;
        return false;
    }

    /*======================================================================
    // This method will rearrange the teamStandings object of arrays 
    // using a two-point sorting algorithm. First it'll check if two
    // teams have the same points, and if so arrange them alphabetically.
    // If both teams have different points, sort based on points.
    ======================================================================*/
    sortTeamStandings() {
        this.teamStandings.sort((a, b) => {
            if (a.points === b.points && a.name > b.name) return 1;
            else if (a.points === b.points && a.name < b.name) return -1;
            return a.points > b.points ? -1 : 1;
        })
    }

    /*======================================================================
    // This method will output the current league standings for the
    // user to see.
    ======================================================================*/
    displayLeagueStandings() {
        console.log("\n===== CURRENT LEAGUE STANDINGS =====");
        for (let i = 0; i < this.teamStandings.length; i++) {
            console.log(`\n${i + 1}. ${this.teamStandings[i].name} - ${this.teamStandings[i].points} points`)
        }
        console.log("\n====================================");
    }
}

module.exports = SoccerLeague;