module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: require('./controllers/get.js')
    },
    {
        method: 'GET',
        path: '/owners',
        handler: require('./controllers/owners/get.js')
    },
    {
        method: 'GET',
        path: '/owners/{owner}',
        handler: require('./controllers/owners/owner/get.js')
    },
    {
        method: 'GET',
        path: '/repos',
        handler: require('./controllers/repos/get.js')
    },
    {
        method: 'GET',
        path: '/repos/{owner}',
        handler: require('./controllers/repos/owner/get.js')
    },
    {
        method: 'GET',
        path: '/repos/{owner}/{repo}',
        handler: require('./controllers/repos/repo/get.js')
    },
    {
        method: 'GET',
        path: '/search',
        handler: require('./controllers/search/get.js')
    },
    {
        method: 'GET',
        path: '/search/{type}',
        handler: require('./controllers/search/type/get.js')
    }
];
