# Movie Graphql API

A movie centric API built in Typescript, TypeORM, GraphQL, Docker, Express and Nodejs.

### Stack

- Typescript
- Express.js
- Node.js
- TypeORM
- GraphQL spec
- Docker
- Postgres

### GraphiQL

GraphiQL is enabled and can accessed via `http://localhost:3040/graphql`

### Available scripts

Running the project

```
npm run dev
```

Starting the postgres database with docker

```
npm run db-start
```

Kill the db container and remove it

```
npm run db-kill
```

Restart the db container

```
npm run db-restart
```

Enter the postgres container via psql cli

```
npm run db-console
```

### Query

```
"queryType": {
        "fields": [
          {
            "name": "movies"
          },
          {
            "name": "quotes"
          },
          {
            "name": "soundtracks"
          },
          {
            "name": "actors"
          },
          {
            "name": "reviews"
          },
          {
            "name": "directors"
          },
          {
            "name": "countries"
          },
          {
            "name": "users"
          },
          {
            "name": "awards"
          }
        ]
      },
```

### Mutations

```
"mutationType": {
        "fields": [
          {
            "name": "createReview"
          },
          {
            "name": "createQuote"
          },
          {
            "name": "createSoundtrack"
          },
          {
            "name": "createMovie"
          },
          {
            "name": "updateMovie"
          },
          {
            "name": "createActor"
          },
          {
            "name": "createDirector"
          },
          {
            "name": "createCountry"
          },
          {
            "name": "createUser"
          },
          {
            "name": "updateUser"
          },
          {
            "name": "addToWishList"
          },
          {
            "name": "addToWatchedList"
          },
          {
            "name": "linkMovieAward"
          },
          {
            "name": "linkMovieActor"
          },
          {
            "name": "linkMovieDirector"
          },
          {
            "name": "createAward"
          }
        ]
      }
```

### Configuration

TypeORM configuration can be modified in `ormconfig.json` in root of project. Currently the project uses a docker/postgres setup for local development.
