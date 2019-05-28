var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var assert = chai.assert;
chai.use(chaiHttp);

var userId = "";

describe('Test users APIs', function () {
    var requestResult;
    var response;
    
    before(function (done) {
        chai.request("http://localhost:4100")
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
        expect(requestResult[0]).to.have.property('friends').that.is.a('Array');
        expect(requestResult[0]).to.have.property('email').that.is.a('string');
    });

    it('The users in the response array have the expected properties', function(){
		expect(response.body).to.satisfy(
			function (body) {
				for (var i = 0; i < body.length; i++) {
                    expect(body[i]).to.have.property('firstName');
                    expect(body[i]).to.have.property('lastName');
                    expect(body[i]).to.have.property('userName');
                    expect(body[i]).to.have.property('email');
                    expect(body[i]).to.have.property('allergies');
                    expect(body[i]).to.have.property('friends');
                    expect(body[i]).to.have.property('diets');
				}
				return true;
			});
    });	
});

describe("Test GET User by userName", function() {
    var requestResult;
    var response;
    var user = 'bursteino'

    before(function (done) {
        chai.request("http://localhost:4100")
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
        expect(requestResult).to.have.length.above(0);
    });

    it('Test specific values of properties in response of GET User', function () {
        assert(requestResult.length == 1);
        expect(requestResult[0]).to.have.property('firstName').that.equals('Omer');
        expect(requestResult[0]).to.have.property('lastName').that.equals('Burstein');
        expect(requestResult[0]).to.have.property('userName').that.equals('bursteino');
    });


});

describe("Test Create User", function() {
    var date = new Date();
    var timestamp = date.getTime();

    var requestResult;
    var response;
    var user = 'test-user-' + timestamp;


    before(function (done) {
        chai.request("http://localhost:4100")
        .post("/users")
        .send({
            "friends": null,
            "diets": null,
            "firstName": "Automated",
            "lastName": "Test",
            "userName": user,
            "password": "pass",
            "email": user+"@ally.com",
            "phone": "206-555-1212",
            "allergies": null,
            "__v": 0
        })
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
    });

    it('Test specific values of properties in response of Create User', function () {
        expect(response.body).to.have.property('firstName').that.equals('Automated');
        expect(response.body).to.have.property('lastName').that.equals('Test');
        expect(response.body).to.have.property('userName').that.equals(user);
        userId = response.body._id;
    });

    // Clean up (DELETE) the user we created
    after(function (done) {
        chai.request("http://localhost:4100")
        .delete("/users/"+userId)
        .end(function (err, res) {
            requestResult = res.body;
            response = res;
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            done();
        });
    });


});