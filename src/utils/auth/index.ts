import * as jwt from "jsonwebtoken"

export const handleAuth = async (
  token: string | null | undefined,
  routeRequiresAuth: boolean
) => {
  if (!routeRequiresAuth) return null
  if (routeRequiresAuth && !token)
    return "Missing token, send in 'x-access-token' header"
  try {
    const verify = await jwt.verify(token, "secret")
    if (!verify) return "Your token is invalid"
    return null
  } catch (error) {
    console.log(error)
    if (error.name && error.name === "TokenExpiredError")
      return "Your token has expired please login again."
    return "Your token is invalid"
  }
}
