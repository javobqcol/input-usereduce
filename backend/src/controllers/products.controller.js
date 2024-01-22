import { request } from "express";
import { Products } from "../models/products.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Products.findAll();
    res.json(products);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'Error de constraint' });
    } else if (error.name === 'SequelizeDatabaseError' && error.parent.code === 'ECONNREFUSED') {
      return res.status(500).json({ message: 'Error de conexión a la base de datos' });
    } else {
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
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
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'Error de constraint' });
    } else if (error.name === 'SequelizeDatabaseError' && error.parent.code === 'ECONNREFUSED') {
      return res.status(500).json({ message: 'Error de conexión a la base de datos' });
    } else {
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
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
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'Error de constraint' });
    } else if (error.name === 'SequelizeDatabaseError' && error.parent.code === 'ECONNREFUSED') {
      return res.status(500).json({ message: 'Error de conexión a la base de datos' });
    } else {
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
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
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'Error de constraint' });
    } else if (error.name === 'SequelizeDatabaseError' && error.parent.code === 'ECONNREFUSED') {
      return res.status(500).json({ message: 'Error de conexión a la base de datos' });
    } else {
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
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
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'Error de constraint' });
    } else if (error.name === 'SequelizeDatabaseError' && error.parent.code === 'ECONNREFUSED') {
      return res.status(500).json({ message: 'Error de conexión a la base de datos' });
    } else {
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
};
