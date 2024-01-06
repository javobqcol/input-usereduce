import { request } from "express";
import { Products } from "../models/products.js";

export const getProducts = async (req, res) => {
  try {
    console.log("aqui")
    const products = await Products.findAll();
    res.json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Products.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "product not exist" });
    }
    res.json(product);
    
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  const { name, description, price } = req.body;
  try {
    const newProduct = await Products.create(
      {
        name,
        description,
        price
      }
    );
    res.json(newProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    //traes el producto con sus tareas
    const { id } = req.params;

    const updateProduct = await Products.findByPk(id);
    if (!updateProduct){
      return res.status(404).json({ message: "product not exist" });
    }
    //actualizas el producto
    updateProduct.set({
      name:req.body.name,
      description:req.body.description,
      price:req.body.price
    });
    await updateProduct.save();
    res.json(updateProduct); 
    console.log("por aqu  paso3")
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Products.destroy({
      where: {
        id,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
