# PubSub Microservices

This repository demonstrates a microservice architecture using PubSub pattern with Node.js, Express, MongoDB, and Redis.

## Architecture

- **receiver-service**: Exposes an HTTP endpoint `/receiver` to accept POST data, validates and saves to MongoDB, and publishes events to Redis PubSub.
- **listener-service**: Listens to Redis PubSub events, copies the data to a second collection with a modified timestamp.
- **MongoDB**: Database for storing records.
- **Redis**: Used for PubSub messaging.

## Getting Started

### Prerequisites
- Docker & Docker Compose

### Running the Services

```bash
docker-compose up --build
```

### Endpoints
- `POST /receiver` (receiver-service): Accepts JSON payload

### Database Collections
- **receiver_collection**: Stores original records
- **listener_collection**: Stores copied records with `modified_at`

## Tech Stack
- Node.js
- Express
- MongoDB
- Redis

---

Note: The `node_modules` directory is excluded from version control using [.gitignore](cci:7://file:///Users/ankursingh/Documents/projects/pubsub/pubsub-microservices/.gitignore:0:0-0:0).


## License
MIT
