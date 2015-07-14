# Search

[![Build Status](http://img.shields.io/travis/customelements/api/master.svg?style=flat)](https://travis-ci.org/customelements/api)
[![Dependencies Status](http://img.shields.io/david/customelements/api.svg?style=flat)](https://david-dm.org/customelements/api)
[![DevDependencies Status](http://img.shields.io/david/dev/customelements/api.svg?style=flat)](https://david-dm.org/customelements/api#info=devDependencies)

> An interface to consume and update data on [ElasticSearch](https://www.elastic.co/products/elasticsearch).

Built with [Node](http://nodejs.org/) and [Hapi](http://hapijs.com/). Hosted on [Heroku](https://heroku.com/). Monitored on [New Relic](https://newrelic.com/).

## API endpoints

> Note: This API is not versioned and may be changed at any moment. Use at your own risk.

### GET `/repos`

Searches for a specific term and returns a paginated result.

| params | type | default | description |
| --- | --- | --- | --- |
| q | string | | Search query |
| page | number | 1 | Current page |
| perPage | number | 30 | Items per page |

```bash
curl -X GET api.customelements.io
```

```js
{
    "total":373,
    "page":1,
    "pages":13,
    "results":[
        {
            "id":18821483,
            "name":"voice-elements",
            "owner":"zenorocha",
            "description":"Web Component wrapper to the Web Speech API, that allows you to do voice recognition and speech synthesis using Polymer",
            "created_at":"2014-04-16T00:48:46Z",
            "updated_at":"2015-05-07T08:15:17Z",
            "stargazers_count":1017,
            "forks_count":170
        },
        {...}
    ]
}
```

---

### PUT `/repos`

Requests `fetch.customelements.io` and then update ElasticSearch's data.

```bash
curl -X PUT api.customelements.io -H "Authorization: dXNlcjpwYXNz"
```

Where `dXNlcjpwYXNz` is actually a secret API token.

```js
TODO
```

---

### GET `/id/:id`

Finds repository by id.

```bash
curl -X GET api.customelements.io/id/1
```

```js
{
    "name": "aaa-form-controls",
    "owner": "Will-in-BC",
    "url": "https://github.com/Will-in-BC/aaa-form-controls",
    "owner_url": "https://github.com/Will-in-BC",
    "description": "A polymer element that provides a forms control for CRUD (Create, Retrieve, Update, Delete)",
    "forks": 0,
    "stars": 0,
    "created": "2014-12-03T14:47:50Z"
}
```

---

### POST `/id/:id`

Creates repository by id.

```bash
curl -X POST api.customelements.io/id/1 -H "Authorization: dXNlcjpwYXNz"
```

Where `dXNlcjpwYXNz` is actually a secret API token.

```js
{
    "created": true
}
```

---

### PUT `/id/:id`

Updates repository by id.

```bash
curl -X PUT api.customelements.io/id/1 -H "Authorization: dXNlcjpwYXNz"
```

Where `dXNlcjpwYXNz` is actually a secret API token.

```js
{
    "updated": true
}
```

---

### DELETE `/id/:id`

Deletes repository by id.

```bash
curl -X DELETE api.customelements.io/id/1 -H "Authorization: dXNlcjpwYXNz"
```

Where `dXNlcjpwYXNz` is actually a secret API token.

```js
{
    "found": true
}
```

---

### GET `/name/:owner/:repo`

Finds repository by owner and repo.

```bash
curl -X GET api.customelements.io/name/zenorocha/voice-elements
```

```js
{
    "name": "voice-elements",
    "owner": "zenorocha",
    "url": "https://github.com/zenorocha/voice-elements",
    "owner_url": "https://github.com/zenorocha",
    "description": "Web Component wrapper to the Web Speech API, that allows you to do voice recognition and speech synthesis using Polymer",
    "forks": 154,
    "stars": 971,
    "created": "2014-04-16T00:48:46Z"
}
```

---

### GET `/owner/:owner`

Finds repositories by owner.

```bash
curl -X GET api.customelements.io/owner/zenorocha
```

```js
{
    "total": 5,
    "results": [
        {
            "name": "facebook-button",
            "owner": "zenorocha",
            "url": "https://github.com/zenorocha/facebook-button",
            "owner_url": "https://github.com/zenorocha",
            "description": "Web Component wrapper for Facebook's button using Polymer",
            "forks": 5,
            "stars": 23,
            "created": "2013-08-19T14:27:05Z"
        },
        {...}
    ]
}
```

## License

[MIT License](http://webcomponentsorg.mit-license.org/) © WebComponents.org
