var request = require('request')

function getCustomers (fileLoc, cb) {
  request(fileLoc, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      try {
        var resp = body.split('\n')
        var customerList = resp.map(function (row) {
          return JSON.parse(row)
        })
        cb(customerList)
      } catch (error) {
        console.error('Cannot parse file, please ensure file url is a valid customer list that can be parsed in to JSON')
      }
    } else {
      console.log('Customers not found')
    }
  })
}

module.exports = getCustomers
