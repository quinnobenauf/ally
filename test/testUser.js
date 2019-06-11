var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var assert = chai.assert;
var host = 'http://ally-app.azurewebsites.net';
chai.use(chaiHttp);

var userId = "";

describe('GET: Test users APIs', function () {
    var requestResult;
    var response;
    
    before(function (done) {
        chai.request(host)
        .get("/users")
        .end(function (err, res) {
            requestResult = res.body;
            response = res;
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            done();
        });
    });

    it('Test basic response properties', function () {
        expect(response).to.have.status(200);
        expect(response).to.have.headers;
        expect(response).to.not.be.null;
        expect(response).to.be.json;
        expect(requestResult).to.have.length.above(0);
    });

    it('Test some properties within user object in the response array', function () {
        expect(requestResult[0]).to.include.keys('firstName');
        expect(requestResult[0]).to.include.keys('lastName');
        expect(requestResult[0]).to.have.property('email').that.is.a('string');
    });

    it('The users in the response array have the expected properties', function(){
		expect(response.body).to.satisfy(
			function (body) {
				for (var i = 0; i < body.length; i++) {
                    expect(body[i]).to.have.property('firstName');
                    expect(body[i]).to.have.property('lastName');
                    expect(body[i]).to.have.property('email');
                    expect(body[i]).to.have.property('allergies');
                    expect(body[i]).to.have.property('diets');
				}
				return true;
			});
    });	
});

describe("GET: Test User by userName", function() {
    var requestResult;
    var response;
    var user = 'obenaufq'

    before(function (done) {
        chai.request(host)
        .get("/users/"+user)
        .end(function (err, res) {
            requestResult = res.body;
            response = res;
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            done();
        });
    });

    it('Test basic response properties of Create User', function () {
        expect(response).to.have.status(200);
        expect(response).to.have.headers;
        expect(response).to.not.be.null;
        expect(response).to.be.json;
    });

    it('Test specific values of properties in response of GET User', function () {
        expect(requestResult[0]).to.have.property('firstName').that.equals('Quinn');
        expect(requestResult[0]).to.have.property('lastName').that.equals('Obenauf');
        expect(requestResult[0]).to.have.property('userName').that.equals('obenaufq');
    });


});

