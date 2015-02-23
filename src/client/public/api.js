'use strict';

var request = require('request');
var config  = require('./config.json');

var Api = {

  post: function (endpoint, payload) {
    return new Promise(function (resolve, reject) {
      request.post({
        url: config.api_base + endpoint,
        form: payload
      }, function (error, resonse, body) {
        if (error) return reject(error);
        try {
          var resObj = JSON.parse(body);
          if (!resObj) reject(new Error("Unable to parse response"));
          if (!resObj.success && resObj.error) reject(new Error(resObj.error));
          resolve(resObj);
        } catch (e) {
          reject(e.message);
        }
      });
    });
  }

};

module.exports = Api;
