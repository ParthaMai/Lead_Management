
import User from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
};

// new user
const register = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success:false, message: "Email and password required" });
        }
        if (password.length < 6) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }
        const hashed = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashed, name });
        await user.save();

        res.status(201).json({success: true, id: user._id, email: user.email, name: user.name });
    } catch (err) {
        console.error("Register error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user._id, email: user.email },  // payload
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, COOKIE_OPTIONS);

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Logout user
const logout = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out" });
};


const me = async (req, res) => {
  try {
    console.log("req.user:", req.user);

    const userId = req.user?.id || req.user?.userId;
    if (!userId) {
      console.log("No userId found in JWT");
      return res.json({ loggedIn: false });
    }

    const user = await User.findById(userId).select("-password");
    console.log("User from DB:", user);

    if (!user) {
      return res.json({ loggedIn: false });
    }

    res.json({ loggedIn: true, user });
  } catch (err) {
    console.error("Me error:", err);
    res.status(500).json({ loggedIn: false, error: "Internal server error" });
  }
};



export { login, register, logout, me };