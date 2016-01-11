var request = require('request')

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

module.exports = getCustomers
