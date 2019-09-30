### Using Graphql with node.js and mongodb

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

Will return

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