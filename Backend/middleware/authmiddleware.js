import jwt from "jsonwebtoken";

export const requireAuth = (req, res, next) => {
  const token = req.cookies?.token;

  console.log("Token from cookie:", token);

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded JWT:", decoded); // add this log
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT error:", err);
    res.status(401).json({ message: "Unauthorized" });
  }
};
