class AuthenticationMiddleware {
  constructor({ authenticationTokenManager }) {
    this._authenticationTokenManager = authenticationTokenManager;

    this.requireAuthentication = this.requireAuthentication.bind(this);
  }

  async requireAuthentication(req, res, next) {
    if (!req.headers.authorization) {
      throw new Error('NOT_CONTAIN_ACCESS_TOKEN');
    }

    const accessToken = req.headers.authorization.split(' ')[1];

    await this._authenticationTokenManager.verifyAccessToken(accessToken);

    const decoded = await this._authenticationTokenManager.decodePayload(accessToken);

    if (!decoded) {
      throw new Error('INVALID_TOKEN');
    }

    res.locals.user = decoded;

    next();
  }
}

export default AuthenticationMiddleware;