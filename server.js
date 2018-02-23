var express = require("express");
var app = express();
var cfenv = require("cfenv");
var bodyParser = require('body-parser');
var rp = require('request-promise');

var env = process.env.NODE_ENV || 'dev';
var conf = require('./config/config-'+env);

// Get our API routes
const api = require('./server/routes/api');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Point static path to dist
app.use(express.static(__dirname + '/dist'));

// Set our api routes
app.use('/api', api);

var mydb;

var dde_client_id;
var dde_client_secret;


console.log('ENVIROMENT: '+env);

app.get("/api/dde/credentials", function(request, response) {
  console.log("in api/dde/credentials");
  console.log(dde_client_id);
  //response.send(dde_client_id);
  response.json({ "client_id": dde_client_id });
  //response.json({ "client_id": dde_client_id, "client_secret":dde_client_secret });
});


/* Endpoint to create a new DDE session.
* Send a POST request to https://jdcluster.us-south.containers.mybluemix.net/daas/v1/session with body
* {
* 	"expiresIn": 3600,
*   "webDomain": "https://myportal.mybluemix.net"
* }
*/
app.post("/api/dde/session", function(request, response) {
  console.log(dde_client_id);

  var options = {
      method: 'POST',
      uri: conf.dde_session_uri,
      headers: {
        'Authorization': 'Basic ' + new Buffer(dde_client_id + ':' + dde_client_secret).toString('base64'),
         'content-type': 'application/json'
      },
      body: {
          "expiresIn": 3600,
          webDomain: conf.web_domain
          //"webDomain": "http://localhost:3000" // for local testing
          //"webDomain": "https://dde-angnode-app.stage1.mybluemix.net" // for deployment
      },
      json: true // Automatically stringifies the body to JSON
  };

  rp(options)
      .then(function (parsedBody) {
          // POST succeeded...
          console.log("post suceeded");
          console.log(JSON.stringify(parsedBody));
          response.send(parsedBody);
      })
      .catch(function (err) {
          // POST failed...
          console.log("post failed!");
          console.log(JSON.stringify(err));
          response.send(err);
      });

});

// load local VCAP configuration  and service credentials
var vcapLocal;
try {
  vcapLocal = require('./vcap-local.json');
  console.log("Loaded local VCAP", vcapLocal);
} catch (e) { }

const appEnvOpts = vcapLocal ? { vcap: vcapLocal} : {}

const appEnv = cfenv.getAppEnv(appEnvOpts);

if (appEnv.services['cloudantNoSQLDB'] || appEnv.getService(/cloudant/)) {
  // Load the Cloudant library.
  var Cloudant = require('cloudant');

  // Initialize database with credentials
  if (appEnv.services['cloudantNoSQLDB']) {
     // CF service named 'cloudantNoSQLDB'
     var cloudant = Cloudant(appEnv.services['cloudantNoSQLDB'][0].credentials);
  } else {
     // user-provided service with 'cloudant' in its name
     var cloudant = Cloudant(appEnv.getService(/cloudant/).credentials);
  }

  //database name
  var dbName = 'mydb';

  // Create a new "mydb" database.
  cloudant.db.create(dbName, function(err, data) {
    if(!err) //err if database doesn't already exists
      console.log("Created database: " + dbName);
  });

  // Specify the database we are going to use (mydb)...
  mydb = cloudant.db.use(dbName);
}



if (appEnv.services['dynamic-dashboard-embedded'] || appEnv.getService(/dynamic-dashboard-embedded/)) {

  // fetch DDE credentials
  if (appEnv.services['dynamic-dashboard-embedded']) {
     // CF service named 'dynamic-dashboard-embedded'
     var ddecred = appEnv.services['dynamic-dashboard-embedded'][0].credentials;
     console.log('cf service dde credentials: ' + JSON.stringify(ddecred));
  } else {
     // user-provided service with 'dynamic-dashboard-embedded' in its name
     var ddecred = appEnv.getService(/dynamic-dashboard-embedded/).credentials;
     console.log('user provided service dde credentials: ' + ddecred);
  }

  dde_client_id = ddecred.client_id;
  dde_client_secret = ddecred.client_secret;
  console.log('dde credentials - client_id: ' + dde_client_id);
  console.log('dde credentials- client_secret:' + dde_client_secret);
}










// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});


var port = process.env.PORT || 3000
app.listen(port, function() {
    console.log("To view your app, open this link in your browser: http://localhost:" + port);
});
