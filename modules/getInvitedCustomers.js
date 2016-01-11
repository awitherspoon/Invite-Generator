var fs = require('fs')
var _ = require('lodash')
var assignDistance = require('./assignDistance.js')

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

module.exports = getInvitedCustomers
