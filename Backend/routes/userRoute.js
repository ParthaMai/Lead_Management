import express from "express"
import { login, register, me, logout } from "../controllers/userController.js"
import { requireAuth } from "../middleware/authmiddleware.js";


const userRouter = express.Router();

userRouter.post("/register",register);
userRouter.post("/login",login);
userRouter.post("/logout",logout);
userRouter.get("/me", requireAuth, me);
userRouter.get("/test", (req, res) => {
  res.json({ msg: "Route works!" });
});



export default userRouter;