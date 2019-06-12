var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var assert = chai.assert;
var host = 'http://ally-app.azurewebsites.net';
chai.use(chaiHttp);

describe('GET: Test Allergies API', function () {
    var requestResult;
    var response;

    before(function (done) {
        chai.request(host)
        .get("/allergies")
        .end(function (err, res) {
            requestResult = res.body;
            response = res;
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            done();
        });
    });

    it("Test basic response properties", function() {
        expect(response).to.have.status(200);
        expect(response).to.have.headers;
        expect(response).to.not.be.null;
        expect(response).to.be.json;
        expect(requestResult).to.have.length.above(0);
    });

    it("The Allergiess in the response array have the expected properties", function() {
        expect(response.body).to.satisfy(
			function (body) {
				for (var i = 0; i < body.length; i++) {
                    expect(body[i]).to.have.property('_id');
                    expect(body[i]).to.have.property('type');
				}
				return true;
			});
    });


});

describe("POST: Test adding an Allergy", function () {
    var requestResult;
    var response;
    var allergy = "Stinky Food"
    var allergyId;

    before(function (done) {
        chai.request(host)
        .post("/allergies")
        .send({"type" : allergy})
        .end(function (err, res) {
            requestResult = res.body;
            response = res;
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            done();
        });
    });

    it('Test basic response properties of create Allergy', function () {
        expect(response).to.have.status(200);
        expect(response).to.have.headers;
        expect(response).to.not.be.null;
        expect(response).to.be.json;
        allergyId = response.body._id;
    });

    it("Verify Allergy added is in Response", function () {
        expect(response.body).to.have.property('type').that.equals(allergy);
    })

    after(function (done) {
        chai.request(host)
        .delete("/allergies/"+allergyId)
        .end(function (err, res) {
            requestResult = res.body;
            response = res;
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            done();
        });
    });

});