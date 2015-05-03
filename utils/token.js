exports.token = function( headers ) {
    var result = {};

    if ( headers.authorization ===  process.env.ES_TOKEN) {
	result.type = true,
	result.message = 'valid token'
    }
    else {
    	result.type = false,
	result.message = 'Invalid Token'
    }

    return result;
};
