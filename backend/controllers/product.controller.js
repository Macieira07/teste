import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProduct = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ sucess: true, data: products });
    } catch (error) {
        console.log("Erro na procura de produtos:", error.message);
        res.status(500).json({ sucess: false, message: "Erro no Servidor" });
    }
}

export const createProduct = async (req, res) => {
    console.log("!!!!", req.body)
    const product = req.body; // user will send this data

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ sucess: false, message: "Por favor preencha todos os campos" })
    }
    const newProduct = new Product(product);
    try {
        await newProduct.save()
        res.status(200).json({ sucess: true, data: newProduct })
    } catch (error) {
        console.error("Erro ao criar o produto:", error.message)
        res.status(500).json({ sucess: false, message: "Erro no servidor" })
    }
}


export const updateProduct = async (req, res) => {
    const { id } = req.params;

    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Product Id" });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        res.status(200).json({ success: true, data: updatedProduct, message:"Produto atualizado com sucesso!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Product Id" });
    }

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted" });
    } catch (error) {
        console.log("error in deleting product:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
