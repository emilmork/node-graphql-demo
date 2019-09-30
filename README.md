### Using Graphql with node.js and mongodb

Graphql example with node.js, mongodb and apollo server.

Install
```js
npm install
```

Database setup
```js
Create and setup a local database
```

Start server
```js
node index
```

Open localhost:4000

Example queries

```
{
  country {
    getCountries {
      name
      regions {
        name
        municipalities {
          name
        }
      }
    }
  }
}
```

Will return something like

```
[{
  name: "Norway",
  regions: [
    {
      name: "Finnmark",
      municipalities: [
        {
          name: "Alta
        },
        ...
      ]
    },
    ...
  ]
}, ...]
```