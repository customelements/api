module.exports = function() {
    if (!process.env.HEROKU_API_TOKEN ||
        !process.env.FOUNDELASTICSEARCH_URL) {
        throw new Error('Please setup environment vars');
    }
}();