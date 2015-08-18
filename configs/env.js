module.exports = function() {
    if (!process.env.SECRET_TOKEN ||
        !process.env.ELASTIC_URL) {
        throw new Error('Please setup environment vars');
    }
}();