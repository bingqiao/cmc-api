import 'source-map-support/register';

const https = require('https');

export const getListing = async (_event, _context) => {
  const options = {
    hostname: 'sandbox-api.coinmarketcap.com',
    headers: {
      'X-CMC_PRO_API_KEY': 'PLACE_HOLDER'
    },
    path: '/v1/cryptocurrency/listings/latest?start=1&limit=5000&convert=USD'
  };
  return new Promise((resolve, reject) => {
    https.get(options, function(res) {
        console.log("Got response: " + res.statusCode);
        var body = '';
        res.on('data', function(chunk) {
          body += chunk;
        });
        res.on('end', function() {
          resolve({
            statusCode: 200,
            body: body
          });
        });
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
        reject(e);
    });
});
}
