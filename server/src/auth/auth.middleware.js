import tokenService from '../token/token.service.js';

export default function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(res.status(401).json('Unauthorized'));
    }

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return next(res.status(401).json('Unauthorized'));
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(res.status(401).json('Unauthorized'));
    }

    req.user = userData;
    next();
  } catch (e) {
    return next(res.status(500).json('Server Error'));
  }
}