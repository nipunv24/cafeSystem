import express from "express";
import { addProduct, getCategories, getProductsByCategory } from "../controllers/productController.js";

const router = express.Router();

router.post("/add-product", addProduct);
router.get("/get-categories", getCategories);
router.get("/get-products", getProductsByCategory);


export default router;
