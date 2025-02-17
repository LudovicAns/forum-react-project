export default function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] (${res.statusCode}): ${req.method} - ${req.url}`);
  next();
}