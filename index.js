var getCustomers = require('./modules/getCustomers.js')
var getInvitedCustomers = require('./modules/getInvitedCustomers.js')

var FILE_LOCATION = process.argv[2] ? process.argv[2] : null

if (FILE_LOCATION) {
  getCustomers(FILE_LOCATION, getInvitedCustomers)
} else {
  console.log('No file location given, please add a file url as an argument and try again')
}
