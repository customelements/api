module.exports = function() {
    if (!process.env.ES_URL ||
        !process.env.ES_TOKEN) {
        throw new Error('Please setup environment vars');
    }
}();