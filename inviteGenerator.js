var request = require('request')
var fs = require('fs')
var _ = require('lodash')

var FILE_LOCATION = process.argv[2] ? process.argv[2] : null
FILE_LOCATION ? getCustomers(FILE_LOCATION, getInvitedCustomers) : console.log('No file location given')

function getCustomers (fileLoc, cb) {
  request(fileLoc, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var resp = body.split('\n')
      var customerList = resp.map(function (row) {
        return JSON.parse(row)
      })
      cb(customerList)
    } else {
      console.log('Customers not found')
    }
  })
}

function toRad (num) {
  return num * (Math.PI / 180)
}

function assignDistance (customer) {
  if (customer.latitude.match(/[a-z]/i) || customer.longitude.match(/[a-z]/i)) {
    return NaN
  }
  var centralLoc = {
    latitude: 53.3381985,
    longitude: -6.2592576
  }
  var R = 6371
  var dLat = toRad(customer.latitude - centralLoc.latitude)
  var dLon = toRad(customer.longitude - centralLoc.longitude)
  var lat1 = toRad(centralLoc.latitude)
  var lat2 = toRad(customer.latitude)

  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  var d = R * c
  return d
}

function getInvitedCustomers (customerList, cb) {
  var customersWithDistance = customerList.map(function (customer) {
    return {
      name: customer.name,
      distance: assignDistance(customer)
    }
  })
  var invitedCustomers = _.filter(customersWithDistance, function (customer) {
    return customer.distance <= 100
  })
  if (!cb) {
    fs.writeFile('maillist.txt', JSON.stringify(invitedCustomers), function (err) {
      if (err) return console.log(err)
      console.log('Customer list created in maillist.txt')
    })
  } else {
    cb(invitedCustomers)
    return
  }
}

module.exports = {
  getCustomers: getCustomers,
  getInvitedCustomers: getInvitedCustomers,
  assignDistance: assignDistance,
  toRad: toRad
}
