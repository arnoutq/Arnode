# Arnode
> A lightweight Node.js web framework with TypeScript

## Routing
GET routes are added with the `get` method and POST routes with the `post` method.
You can specify a controller or a callback:

```js
app.get("/", () => { console.log("GET Route") });
app.post("/login", () => { console.log("POST Route") });
```
**Query parameters**:

```js
app.get("/:id", (req: Request) => { console.log(req.query.id) });
```
`req.query`can be used for query parameters

**Form data**:
```js
app.post("/login", (req: Request)=> { console.log(req.body.testform) });
```
`req.body`can be used to retrieve form data

**Response**:
```js
app.get("/", (req: Request, res: Response) => { 
  res.html("<h1>HTML response</h1>");
});

app.get("/", (req: Request, res: Response) => { 
  res.json( {text: 'JSON response'} );
});
```
`res.html`can be used to render HTML
<br/>
`res.json`can be used to render JSON


## Middleware

Middleware can be added to routes with the method `middleware(callback: Function)`:

```js
app.get("/", ()=> { console.log("GET Route") }).middleware(() => { console.log("Middleware") });
```

## Controllers

You can specify a controller as a callback:

```js
app.post("/login", userController.login);
```

## Content Types
✅ application/json
<br/>
✅ application/x-www-form-urlencoded

## License

MIT © [Arnout Quint](https://github.com/arnoutq)

