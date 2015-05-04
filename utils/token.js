var boom = require('boom');

exports.authorize = function(request) {
    return new Promise(function(resolve, reject) {
        if (request.headers.authorization &&
            request.headers.authorization === process.env.SECRET_TOKEN) {
            resolve(request);
        }
        else {
            reject(boom.unauthorized('Invalid token'));
        }
    });
};