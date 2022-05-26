import jwtHelper from "../helpers/jwt.helper.js";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "f330ed74$1$eb8d3bf6b3286fc92cc44de237465ea4f209c991";

let isAuth = async (req, res, next) => {
  const tokenFromClient = req.body.token || req.query.token || req.headers["authorization"];

  if (tokenFromClient) {
    try {
      const decoded = await jwtHelper(tokenFromClient, accessTokenSecret);
      req.jwtDecoded = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        message: 'Unauthorized.',
      });
    }
  } else {
    return res.status(403).send({
      message: 'No token provided.',
    });
  }
}

export default isAuth;