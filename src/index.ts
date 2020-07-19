import "reflect-metadata"
import { createConnection } from "typeorm"
import express from "express"
import helmet from "helmet"
import graphqlHTTP from "express-graphql"
import schema from "./graphql"
import cors from "cors"

createConnection()
  .then(async (connection) => {
    const app = express()
    app.use(cors())
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
