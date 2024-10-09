import express from 'express'
import { addproduct, deleteproduct, getproduct, updateproduct } from '../controllers/products.controller.js';

const router = express.Router()

router.post("/", addproduct)


router.delete("/:id", deleteproduct)

router.get("/", getproduct)

router.put("/:id", updateproduct)


export default router