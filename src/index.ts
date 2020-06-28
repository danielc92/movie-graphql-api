import "reflect-metadata"
import { createConnection } from "typeorm"
import * as express from "express"
import { buildSchema, GraphQLError } from "graphql"
import * as graphqlHTTP from "express-graphql"

createConnection()
  .then(async (connection) => {
    const schema = buildSchema(`
    type Query {
        hello: String
    }`)

    const rootValue = {
      hello: () => {
        return "hello world"
      },
    }

    const app = express()
    app.use(
      "/graphql",
      graphqlHTTP({
        schema,
        rootValue,
        graphiql: true,
      })
    )
    app.listen(3040, () => console.log("Listening on port 3040"))
  })
  .catch((error) => console.log(error))
