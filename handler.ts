import 'source-map-support/register';
const config = require('./config.json');

const https = require('https');

const defaultOptions = {
  hostname: config.hostname,
  headers: {
    'X-CMC_PRO_API_KEY': config.apiKey
  }
};

export const getListing = async (_event, _context) => {
  const unit = _event.pathParameters.unit;
  const options = Object.assign(defaultOptions, {path: `/v1/cryptocurrency/listings/latest?start=1&limit=5000&convert=${unit}`});
  return new Promise((resolve, reject) => {
    https.get(options, function (res) {
      console.log("Got response: " + res.statusCode);
      var body = '';
      res.on('data', function (chunk) {
        body += chunk;
      });
      res.on('end', function () {
        resolve({
          headers: {
            'Cache-Control': 'max-age=600',
            'Access-Control-Allow-Origin': '*' // this is needed. it seems claudia.js otherwise enables this automatically. needs verification.
          },
          statusCode: 200,
          body: body
        });
      });
    }).on('error', function (e) {
      console.log("Got error: " + e.message);
      reject(e);
    });
  });
}

export const getQuotes = async (_event, _context) => {
  let symbol = _event.pathParameters.symbol;
  let unit = _event.pathParameters.unit || 'USD';
  if (!symbol) {
    throw new Error('Invalid symbol');
  }
  const options = Object.assign(defaultOptions, {path: `/v1/cryptocurrency/quotes/latest?symbol=${symbol}&convert=${unit}`});
  return new Promise((resolve, reject) => {
    https.get(options, function (res) {
      console.log("Got response: " + res.statusCode);
      var body = '';
      res.on('data', function (chunk) {
        body += chunk;
      });
      res.on('end', function () {
        resolve({
          headers: {
            'Cache-Control': 'max-age=600',
            'Access-Control-Allow-Origin': '*' // this is needed. it seems claudia.js otherwise enables this automatically. needs verification.
          },
          statusCode: 200,
          body: body
        });
      });
    }).on('error', function (e) {
      console.log("Got error: " + e.message);
      reject(e);
    });
  });
}