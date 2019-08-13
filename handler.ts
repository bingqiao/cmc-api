import 'source-map-support/register';

const https = require('https');

export const getListing = async (_event, _context) => {
  const options = {
    hostname: 'sandbox-api.coinmarketcap.com',
    headers: {
      'X-CMC_PRO_API_KEY': '4f269312-2491-4cd7-80fc-09aefdac3268'
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
            headers: {
              'Access-Control-Allow-Origin': '*' // this is needed. it seems claudia.js otherwise enables this automatically. needs verification.
            },
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
