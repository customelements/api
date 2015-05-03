# Search

[![Build Status](http://img.shields.io/travis/customelements/search/master.svg?style=flat)](https://travis-ci.org/customelements/search)
[![Dependencies Status](http://img.shields.io/david/customelements/search.svg?style=flat)](https://david-dm.org/customelements/search)
[![DevDependencies Status](http://img.shields.io/david/dev/customelements/search.svg?style=flat)](https://david-dm.org/customelements/search#info=devDependencies)

> An interface to consume and update data on [ElasticSearch](https://www.elastic.co/products/elasticsearch).

Built with [Node](http://nodejs.org/) and [Hapi](http://hapijs.com/). Hosted on [Heroku](https://heroku.com/). Monitored on [New Relic](https://newrelic.com/).

## API endpoints

### GET `/:id`

Finds repositories by ElasticSearch's id.

```bash
curl -X GET search.customelements.io/1
```

```js
{
    name: "aaa-form-controls",
    owner: "Will-in-BC",
    url: "https://github.com/Will-in-BC/aaa-form-controls",
    owner_url: "https://github.com/Will-in-BC",
    description: "A polymer element that provides a forms control for CRUD (Create, Retrieve, Update, Delete)",
    forks: 0,
    stars: 0,
    created: "2014-12-03T14:47:50Z"
}
```

### GET `/repos/:owner`

Finds repositories by GitHub owner.

```bash
curl -X GET search.customelements.io/repos/zenorocha
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
