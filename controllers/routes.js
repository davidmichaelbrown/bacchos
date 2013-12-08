var snoothClient = require('./clients/snooth_client')
var request = require('request')

// app routes
exports.index = function(req, res) {
    res.render('index', {title : 'Bacchos'});
}

// find stores by zipcode  
exports.storeQueryHandler = function(req, res) {
    var country = req.query['country'];
    var zipcode = req.query['zipcode'];
    // make request to Snooth using the client module
    snoothClient.storeQuery(country, zipcode, function(data) {
        var responseData = [];
        responseData[0] = zipcode;
        responseData[1] = data;
        res.json(responseData);
    });
}
