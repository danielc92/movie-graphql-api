import "reflect-metadata"
import { createConnection } from "typeorm"
import * as express from "express"
import * as graphqlHTTP from "express-graphql"
import schema from "./graphql"

createConnection()
  .then(async (connection) => {
    const middleware = (
      request: express.Request,
      response: express.Response,
      next: express.NextFunction
    ) => {
      try {
        console.log(request.query)
        next()
      } catch (error) {
        return response.status(400)
      }
    }

    const app = express()
    app.use(middleware)
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
