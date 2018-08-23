class SoccerLeague {
    constructor() {
        this.inputString = '',
        this.gameTeams = [],
        this.gamePoints = []
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
    // This method parse the previously created string to find all team
    // names and scores, pushing them to arrays within the class.
    ======================================================================*/
    parseForTeamsAndScores() {
        let skipIndexes = 0;

        // For every index in inputString, find groups of alphabetic letters
        // that correspond to team names. Additionally, find groups of numbers
        // that correspond to scores. Push both of these to arrays within the.
        // class. SkipIndexes is used to skip indexes already taken into
        // consideration in nested loops.
        for (let i in this.inputString) {
            if (skipIndexes) {
                skipIndexes--;
                continue;
            }

            if (this.inputString[i].match(/[a-z]/i)) {
                let teamName = '';
                let k = i;
                while (this.inputString[k].match(/[a-z]/i) || this.inputString[k] === ' ') {
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

                this.gamePoints.push(teamScore);
                continue;
            }

        }
    }

}

module.exports = SoccerLeague;