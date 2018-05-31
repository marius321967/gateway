Simplistic nodejs service listens for incoming events and passes them further down to (multiple) WebSocket listeners.

No restriction via roles, only authorization via tokens. This should be used only by your trusted back-end services, not client applications.

The service is split into two servers (_listen_ and _broadcast_).

## Usage
Your project should document the types of events that are passed through this service and what format of data they contain.

### How to fire events?
Send HTTP POST /event to the listen server with body:
```json
{
    "event": "<type of event>",
    "data": ...
}
```

Include relevant data that you want the listener to receive. Include _Authorization_ header with credentials (see below).

Server should respond with:
```json 
{ "code": "OK" }
```

Possible error codes:
- `INVALID_BODY` (400)
- `UNAUTHENTICATED` (403)
- `AUTH_UNRECOGNIZED_SCHEME` (403)

### How to listen to events?
Connect via WebSocket to the broadcast server. Then send initialization message:
```json
{
  "authentication": "<credentials>",
  "events": [
    "<type of event to listen to>",
    "<another type of event to listen to>"
  ]
}
```

`events` contains types you want to listen to. The server will respond:
```json
{
  "type": "init",
  "code": "OK"
}
```

Possible error codes:
- `INVALID_SYNTAX`
- `INVALID_EVENTS_MISSING`
- `AUTH_UNRECOGNIZED_SCHEME`
- `UNAUTHENTICATED`

Now when an event is fired, you will receive a message:
```json
{
  "type": "event",
  "event": "<type of event>",
  "data": ...
}
```

## Authentication
Send authentication credentials: `<scheme> <token>`

Currently, only 'Basic' authentication is supported. This works by storing authorized tokens in a file.

## Configuration
### Auth tokens
Write tokens you want to accept in `/tokens/tokens` file. Make sure the file has only necessary permissions.

Tokens must be no less than 16 characters long, otherwise they will be ignored. 

### HTTPS
To enable, provide HTTPS_ENABLE=true environment variable to the service. Create `/certs/cert.key` and `/certs/cert.crt` files.

## Ports
- listen - 8080,
- broadcast - 8081.

### Docker
- production - 11000 and 11001,
- development - 12000 and 12001.

## Development
1. `npm install`
1. Configure
1. `npm start` (or `npm run docker` or `npm run dockerd` for background)

To run unit tests: `npm test`. _Note: authentication services are currently not tested._

## Possible expansions
The project may benefit from additional authentication schemes (e.g. expirable Bearer tokens) and authorization via roles.