# Invite-Generator
This is usable as both a cli list generator or as a piecemeal API inside another application.  When used from the command line, it accepts a URL argument to grab a list of customers.  It will then parse the list in to a standard JS array, and determine which customers are within 100km of the main office. That list is printed to a text file in the same directory.  When used as a piecemeal API, each method can be called individually based on your application's needs.

To run, clone the repo and enter the directory. Use "npm install" to grab the project dependencies. Type "node index.js <your url arg here>" to generate a file with the nearby customer list.

To run tests, type "npm run test".
