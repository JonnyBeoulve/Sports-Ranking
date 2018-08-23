let expect = require("chai").expect;
let SoccerLeague = require("../classes/SoccerLeague");
let fs = require('fs');
let argCache = process.argv;

/*======================================================================
// This testing environment will test all major functionality of the
// app using Mocha and Chai.
======================================================================*/
describe("Sports Ranking App.js", () => {
    before(function() {
        process.argv = ['node', 'start', 'test1'];
      });
    
    after(function() {
        process.argv = argCache;
    });

    it('should import file to string', (done) => {
        let league = new SoccerLeague();
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
});