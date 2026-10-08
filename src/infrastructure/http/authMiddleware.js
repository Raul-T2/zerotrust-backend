// Zero Trust: cada peticion a un recurso protegido valida el token.
export function createAuthMiddleware(tokenService) {
  return (req, res, next) => {
    const header = req.headers.authorization ?? '';
    const [scheme, token] = header.split(' ');

    if (scheme !== 'Bearer' || !token) {
      return res.status(401).json({ error: 'Token requerido' });
    }
    try {
      req.user = tokenService.verify(token);
      return next();
    } catch {
      return res.status(401).json({ error: 'Token invalido o expirado' });
    }
  };
}
