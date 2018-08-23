let expect = require("chai").expect;
let SoccerLeague = require("../classes/SoccerLeague");

/*======================================================================
// This testing environment will test all major functionality of the
// app using Mocha and Chai.
======================================================================*/
// Test execution with no third argument, defaulting to sample.txt
describe("App.js with no third argument", () => {
    before(() => {
        process.argv = ['node', 'start'];
    });

    it('should default import sample.txt to string', (done) => {
        let league = new SoccerLeague();
        expect(league.inputString).to.be.empty;
        league.readFileToString();
        expect(league.inputString).to.include('Lions');
        done();
    });
});

// Use test1.js to test each method in SoccerLeague.
describe("App.js with basictest", () => {
    before(() => {
        process.argv = ['node', 'start', 'basictest'];
      });

    it('should import file to string', (done) => {
        let league = new SoccerLeague();
        expect(league.inputString).to.be.empty;
        league.readFileToString();
        expect(league.inputString).to.be.a('string');
        done();
    });

    it('should parse for teams', (done) => {
        let league = new SoccerLeague();
        league.readFileToString();
        expect(league.gameTeams).to.have.lengthOf(0)
        league.parseForTeamsAndScores();
        expect(league.gameTeams).to.have.lengthOf(8)
        done();
    });

    it('should calculate points per team', (done) => {
        let league = new SoccerLeague();
        league.readFileToString();
        league.parseForTeamsAndScores();
        expect(league.teamStandings).to.be.an('array').that.is.empty;
        league.calculateWinsPerTeam();
        expect(league.teamStandings[6].name).to.include('Colorado City SC');
        expect(league.teamStandings[2].points).to.equal(4);
        done();
    });
    
     it('should sort teams by points -> alphabetically', (done) => {
        let league = new SoccerLeague();
        league.readFileToString();
        league.parseForTeamsAndScores();
        league.calculateWinsPerTeam();
        expect(league.teamStandings[0].name).to.include('Portland Timbers');
        league.sortTeamStandings();
        expect(league.teamStandings[2].name).to.include('Portland Timbers');
        done();
    });
});

// Use advancedtest.js to perform testing with a larger data set
describe("App.js with advancedtest", () => {
    before(() => {
        process.argv = ['node', 'start', 'advancedtest'];
    });

    it('should parse team names including periods and dashes', (done) => {
        let league = new SoccerLeague();
        league.readFileToString();
        league.parseForTeamsAndScores();
        expect(league.gameTeams[9]).to.include('Paris Saint-Germain F.C.');
        done();
    });

    it('should accurately calculate several wins and ties for a team', (done) => {
        let league = new SoccerLeague();
        league.readFileToString();
        league.parseForTeamsAndScores();
        league.calculateWinsPerTeam();
        expect(league.teamStandings[4].points).to.equal(10);
        done();
    });

    it('should correctly sort a large number of teams by points -> aphabetically', (done) => {
        let league = new SoccerLeague();
        league.readFileToString();
        league.parseForTeamsAndScores();
        league.calculateWinsPerTeam();
        league.sortTeamStandings();
        expect(league.teamStandings[0].name).to.include('Manchester United F.C.');
        expect(league.teamStandings[16].name).to.include('FC Bayern Munich');
        expect(league.teamStandings[18].name).to.include('Spain National');
        done();
    });
});