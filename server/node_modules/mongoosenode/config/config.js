/**
 * Services config.
*/
function getHost(name) {
  return process.env.CI === 'true' ? name : '127.0.0.1';
}

/*
 * Configuration
 */
var config = {
  host: getHost(),  
  db: {
    'secret': '9mu2L4VeiWkPLXEoWAbvwzb-nyw6eA2NY1gUgNR33Adqec1PHzFLomeYhFD6whq4ieWpHAwF1WeZgFCqpd6o8W00054587Q',
    'database': 'mongodb://username:password@127.0.0.1:27017/databasename',            //Mongodb URI
    'auth_duration' : 30,                                                                            //seconds
  },


};

/**
 * Export `config`.
 */




module.exports = config;