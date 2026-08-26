import jwt from 'jsonwebtoken';

// Verify JWT middleware
export const requireAuth = (req, res, next) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return res.status(500).json({ success: false, error: 'Server misconfiguration.' });
  }

  const authHeader = req.headers.authorization;
  const tokenFromCookie = req.cookies?.arena_jwt;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : tokenFromCookie;

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Authentication required. Please log in to access this resource.',
    });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: 'Invalid or expired authentication session.',
    });
  }
};

// Role-Based Access Control (RBAC) middleware for Admin routes
export const requireRole = (role) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ success: false, error: 'Authentication required.' });
  }
  if (req.user.role !== role) {
    return res.status(403).json({
      success: false,
      error: `Access forbidden. Requires '${role}' privilege.`,
    });
  }
  next();
};
