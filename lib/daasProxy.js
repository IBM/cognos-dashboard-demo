var request = require("request");
var express = require('express');
var Readable = require('stream').Readable;
var zlib = require('zlib')

/**
 * DDE is using https secure cookies. In developer mode, we sometimes run
 * straight http, so need to strip the Secure flag from the cookies.
 */
function fixSecureCookies(req, headers) {
    // if there are cookies and we are not using https, make sure the Secure is stripped
    if (!req.secure && headers && headers['set-cookie']) {
        const setCookies = headers['set-cookie'];
        for (let i=0; i < setCookies.length; i++) {
            let cookie = setCookies[i];
            if (cookie && cookie.indexOf('Secure') > 0) {
                cookie = cookie.replace('Secure', '');
                setCookies[i] = cookie;
                console.info('Stripped Secure from a cookie');
            }
        }
        headers['set-cookie'] = setCookies;
    }
}

/**
 * JSON body parser is consuming the request payload so it will not pipe automatically.
 * If this is json, construct a new stream so we can forward that to DDE
 */
function resetRequestStream(req) {
  const contentType = req.header('Content-Type');
  const isJson = (contentType && contentType.toLowerCase().startsWith('application/json'));
  if (isJson && req.body && req.method !== 'GET' && req.method !== 'DELETE' ) {
    let bodyData = JSON.stringify(req.body);

    let s = new Readable();
    s._read = function noop() {}; // redundant? see update below
    s.push(bodyData);
    s.push(null);
    s.method  = req.method;
    s.headers = req.headers;

    console.log('forwarding json body. len=' + bodyData.length);
    return s;
  } else {
    return req;
  }

}

module.exports=function(proxyTarget) {
  return  function(req, res, next) {
    var routingURL = proxyTarget + req.url;
    console.info('Proxy request: ' + req.method + ' ' + routingURL);

    var options = {
      timeout: 60000
    };
    req = resetRequestStream(req);

    let resMsg = req.pipe(request(routingURL, options));
    resMsg.on('response', function(response) {
      console.info('Proxy response: ' + response.statusCode);
      fixSecureCookies(req, response.headers);
    });
    resMsg.pipe(res);
  }
};
