console.log("🛡️ AUTH MIDDLEWARE LOADED");
import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  console.log("🛡️ PROTECT MIDDLEWARE HIT");

  const token = req.cookies?.token;
  console.log("🛡️ TOKEN:", token);

  if (!token) {
    console.log("❌ NO TOKEN FOUND");
    return res.status(401).json({ message: "Not authorized, token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ TOKEN DECODED:", decoded);

    req.user = decoded;
    next();
  } catch (err) {
    console.log("❌ TOKEN INVALID");
    return res.status(401).json({ message: "Invalid token" });
  }
};

