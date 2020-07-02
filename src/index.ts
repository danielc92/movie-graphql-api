import "reflect-metadata"
import { createConnection } from "typeorm"
import * as express from "express"
import * as helmet from "helmet"
import * as graphqlHTTP from "express-graphql"
import schema from "./graphql"

createConnection()
  .then(async (connection) => {
    const app = express()
    app.use(helmet())
    app.use(
      "/graphql",
      graphqlHTTP({
        schema,
        graphiql: true,
      })
    )
    app.listen(3040, () => console.log("Listening on port 3040"))
  })
  .catch((error) => console.log(error))
