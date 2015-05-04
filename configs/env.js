module.exports = function() {
    if (!process.env.SECRET_TOKEN ||
        !process.env.FOUNDELASTICSEARCH_URL) {
        throw new Error('Please setup environment vars');
    }
}();