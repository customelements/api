module.exports = function() {
    if (!process.env.FOUNDELASTICSEARCH_URL) {
        throw new Error('Please setup environment vars');
    }
}();