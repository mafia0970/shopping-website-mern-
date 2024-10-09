import mongoose from "mongoose";
import Product from "../models/product.model.js"

export const addproduct = async (req, res) => {
    const product = req.body;
    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ sucess: false, message: "please enter all data" });
    }
    const newProduct = new Product(product)
    try {
        await newProduct.save();
        res.status(200).json({ sucess: true, data: newProduct });
    } catch (error) {
        console.error("error", error.message)
        res.status(500).json({ sucess: false, message: "server error" });
    }
}

export const deleteproduct = async (req, res) => {
    const { id } = req.params
    try {
        await Product.findByIdAndDelete(id)
        res.status(200).json({ sucess: true, message: "deleted" })

    } catch (error) {
        res.status(202).json({ sucess: false, message: "Not deleted" })
    }
}

export const getproduct = async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json({ sucess: true, data: products })

    } catch (error) {
        res.status(202).json({ sucess: false, message: "No data found" })
    }
}

export const updateproduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;

    try {
        // Check if product exists
        const existingProduct = await Product.findById(id);
        if (!existingProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // Update product
        const updated_product = await Product.findByIdAndUpdate(id, product, { new: true });
        res.status(200).json({ success: true, data: updated_product });
    } catch (error) {
        // Server error
        res.status(500).json({ success: false, message: "Update failed", error: error.message });
    }
};
