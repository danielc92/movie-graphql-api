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
[
          {
            "name": "movies",
            "description": "Returns a list of Movies."
          },
          {
            "name": "quotes",
            "description": "Returns a list of Quotes."
          },
          {
            "name": "soundtracks",
            "description": "Returns a list of Soundtracks."
          },
          {
            "name": "actors",
            "description": "Returns a list of Actors."
          },
          {
            "name": "reviews",
            "description": "Returns a list of Reviews."
          },
          {
            "name": "directors",
            "description": "Returns a list of Directors."
          },
          {
            "name": "countries",
            "description": "Returns a list of Countries."
          },
          {
            "name": "users",
            "description": "Returns a list of Users."
          },
          {
            "name": "awards",
            "description": "Returns a list of Awards."
          }
        ]
```

### Mutations

```
[
          {
            "name": "createReview",
            "description": "Create a single Review."
          },
          {
            "name": "createQuote",
            "description": "Create a single Quote for a Movie"
          },
          {
            "name": "createSoundtrack",
            "description": "Create a single Soundtrack for a Movie"
          },
          {
            "name": "createMovie",
            "description": "Create a single Movie."
          },
          {
            "name": "updateMovie",
            "description": "Update an existing Movie."
          },
          {
            "name": "createActor",
            "description": "Create a single Actor."
          },
          {
            "name": "createDirector",
            "description": "Create a single Director."
          },
          {
            "name": "createCountry",
            "description": "Create a single Country."
          },
          {
            "name": "createUser",
            "description": "Create a single User."
          },
          {
            "name": "updateUser",
            "description": "Update an existing User"
          },
          {
            "name": "addToWishList",
            "description": "Add a Movie to User's movieWishList."
          },
          {
            "name": "addToWatchedList",
            "description": "Add a Movie to User's movieWatchedList."
          },
          {
            "name": "linkMovieAward",
            "description": "Associate an existing Award with an existing Movie"
          },
          {
            "name": "linkMovieActor",
            "description": "Associate an existing Actor with an existing Movie"
          },
          {
            "name": "linkMovieDirector",
            "description": "Associate an existing Director with an existing Movie"
          },
          {
            "name": "createAward",
            "description": "Create a single Award."
          }
        ]
```

### Configuration

TypeORM configuration can be modified in `ormconfig.json` in root of project. Currently the project uses a docker/postgres setup for local development.
