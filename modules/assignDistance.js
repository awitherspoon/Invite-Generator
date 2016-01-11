var toRad = require('./toRad.js')

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

module.exports = assignDistance
