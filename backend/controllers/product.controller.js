import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProduct=async (req, res) => {
    try{
        const products = await Product.find({});
        res.status(200).json({sucess: true, data : products});
        }catch (error){
            console.log("Erro na procura de produtos:", error.message);
            res.status(500).json({sucess:false, message:"Erro no Servidor"});
    } 
}

export const createProduct=async (req,res)=>{
    console.log("!!!!", req.body)
    const product = req.body; // user will send this data

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({sucess:false,message:"Por favor preencha todos os campos"})
    }
    const newProduct = new Product(product);
    try{
        await newProduct.save()
        res.status(200).json({sucess: true, data: newProduct })
    } catch (error) {
        console.error("Erro ao criar o produto:", error.message)
        res.status(500).json({sucess: false,  message: "Erro no servidor"})
    }
}

export const updateProduct= async (req, res)=> {
    const{ id } = req.params;

    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message:"ID do produto inválido"})
    }

try{
    const updateProduct=await Product.findByIdAndUpdate(id,product,{new:true});
    await Product.findByIdAndUpdate(id, product,{new:true});~
    res.status(200).json({ sucess: true, data: updateProduct});
} catch (error){
    res.status(500).json({sucess: false, message: "Erro no servidor"})
}
}

export const deleteProduct=async (req, res)=>{
    const { id }= req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message:"ID do produto inválido"})
    }
    
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({sucess: true, message: "Produto eliminado"});
     } catch (error) {
        console.log("Erro ao tentar eliminar o produto:", error.message);
        res.status(500).json({sucess:false, message: "Erro no servidor"})
     }
}
