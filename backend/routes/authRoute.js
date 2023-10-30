import express from "express";
import {
  registerController,
  loginController,
  testController,
  priceController,
  getPriceController,
  searchController
} from "../controller/authController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);

router.post("/price", requireSignIn, isAdmin, priceController);
router.get("/price/:movieId", getPriceController);

router.get("/test", requireSignIn, isAdmin, testController);

router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

router.get("/admin-auth", requireSignIn,isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

router.get("/search/:keyword", searchController);

export default router;
