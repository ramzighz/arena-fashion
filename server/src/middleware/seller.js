// Seller access key - must be set via SELLER_KEY in server/.env
export const requireSeller = (req, res, next) => {
  const key = process.env.SELLER_KEY;
  if (!key) {
    return res.status(500).json({ success: false, error: 'Seller access not configured.' });
  }
  if (req.get('x-seller-key') !== key) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }
  next();
};
