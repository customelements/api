# Search

[![Build Status](http://img.shields.io/travis/customelements/search/master.svg?style=flat)](https://travis-ci.org/customelements/search)
[![Dependencies Status](http://img.shields.io/david/customelements/search.svg?style=flat)](https://david-dm.org/customelements/search)
[![DevDependencies Status](http://img.shields.io/david/dev/customelements/search.svg?style=flat)](https://david-dm.org/customelements/search#info=devDependencies)

> An interface to consume and update data on [ElasticSearch](https://www.elastic.co/products/elasticsearch).

Built with [Node](http://nodejs.org/) and [Hapi](http://hapijs.com/). Hosted on [Heroku](https://heroku.com/). Monitored on [New Relic](https://newrelic.com/).

## API endpoints

### GET `/?q=:term`

Searches for a specific term and returns a paginated result.

```bash
curl -X GET search.customelements.io/?q=polymer
```

```js
TODO
```

---

### PUT `/`

Requests `fetch.customelements.io` and then update ElasticSearch's data.

```bash
curl -X PUT search.customelements.io -H "Authorization: dXNlcjpwYXNz"
```

Where `dXNlcjpwYXNz` is actually Heroku's API token.

```js
TODO
```

---

### GET `/id/:id`

Finds repository by id.

```bash
curl -X GET search.customelements.io/id/1
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
curl -X POST search.customelements.io/id/1 -H "Authorization: dXNlcjpwYXNz"
```

Where `dXNlcjpwYXNz` is actually Heroku's API token.

```js
{
    "created": true
}
```

---

### PUT `/id/:id`

Updates repository by id.

```bash
curl -X PUT search.customelements.io/id/1 -H "Authorization: dXNlcjpwYXNz"
```

Where `dXNlcjpwYXNz` is actually Heroku's API token.

```js
{
    "updated": true
}
```

---

### DELETE `/id/:id`

Deletes repository by id.

```bash
curl -X DELETE search.customelements.io/id/1 -H "Authorization: dXNlcjpwYXNz"
```

Where `dXNlcjpwYXNz` is actually Heroku's API token.

```js
{
    "found": true
}
```

---

### GET `/name/:owner/:repo`

Finds repository by owner and repo.

```bash
curl -X GET search.customelements.io/name/zenorocha/voice-elements
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
curl -X GET search.customelements.io/owner/zenorocha
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
