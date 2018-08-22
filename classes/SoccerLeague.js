class SoccerLeague {
    constructor() {
        this.inputString = ''
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

    parseForTeamsAndScores() {
        console.log('Working');
    }

}

module.exports = SoccerLeague;