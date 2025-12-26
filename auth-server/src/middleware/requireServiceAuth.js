export function requireServiceAuth(req, res, next) {
  const cert = req.socket.getPeerCertificate();

  if (!cert || !cert.subject) {
    return res.status(401).json({ error: "client_cert_required" });
  }

  if (cert.subject.CN !== "client-backend") {
    return res.status(403).json({ error: "invalid_service" });
  }

  next();
}