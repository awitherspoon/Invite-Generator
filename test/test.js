var inviteGenerator = require('../inviteGenerator.js')
var expect = require('chai').expect

describe('Invite Generator', function () {
  describe('toRad', function () {
    it('should return valid radian when number is passed', function () {
      var expectedResult = -0.08726646259971647
      var radiansTest = inviteGenerator.toRad(-5)
      expect(radiansTest).to.equal(expectedResult)
    })

    it('should return NaN when invalid parameter is passed', function () {
      var radiansTest = inviteGenerator.toRad('hi')
      expect(radiansTest).to.not.be.ok
    })
  })

  describe('getCustomers', function () {
    it('should return list of customers', function (done) {
      var fileLoc = 'https://gist.githubusercontent.com/brianw/19896c50afa89ad4dec3/raw/6c11047887a03483c50017c1d451667fd62a53ca/gistfile1.txt';
      inviteGenerator.getCustomers(fileLoc, cb)
      function cb (customerList) {
        expect(customerList.length).to.equal(32)
        done()
      }
    })
  })

  describe('getInvitedCustomers', function () {
    it('should return customers with distance <= 100', function (done) {
      var fileLoc = 'https://gist.githubusercontent.com/brianw/19896c50afa89ad4dec3/raw/6c11047887a03483c50017c1d451667fd62a53ca/gistfile1.txt';
      inviteGenerator.getCustomers(fileLoc, cb)
      function cb (customerList) {
        var invitedCustomers = inviteGenerator.getInvitedCustomers(customerList, cb2)
      }
      function cb2 (invitedCustomers) {
        var failCount = 0
        for (var obj in invitedCustomers) {
          if (invitedCustomers[obj].distance > 100) {
            failCount++
          }
        }
        expect(failCount).to.equal(0)
        done()
      }
    })
  })

  describe('assignDistance', function () {
    it('should return the right distance for any two given lat and long', function () {
      var customer = {
        latitude: '51.4540',
        longitude: '-0.0879'
      }
      var expectedResult = 468.00757944747585;
      var testResult = inviteGenerator.assignDistance(customer);
      expect(testResult).to.equal(expectedResult)
    })

    it('should return NaN when invalid parameter is passed', function () {
      var customer = {
        latitude: 'hi',
        longitude: 'bye'
      }
      var distanceTest = inviteGenerator.assignDistance(customer)
      expect(distanceTest).to.not.be.ok
    })
  })
})
