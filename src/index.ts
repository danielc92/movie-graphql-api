require("dotenv").config()
import "reflect-metadata"
import { createConnection } from "typeorm"
import express, { Request, Response, NextFunction } from "express"
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
    app.listen(process.env.PORT, () =>
      console.log(`Listening on port ${process.env.PORT}`)
    )
  })
  .catch((error) => console.log(error))
