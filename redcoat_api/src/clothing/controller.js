const pool = require('../../db');
const queries = require('./queries');
const { clothingSchema } = require('../validators/clothingValidator');

// Get all active clothing
const getClothing = async (req, res) => {
  try {
    const result = await pool.query(queries.getClothingQuery);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error getting clothing:", error);
    res.status(500).send("Server error");
  }
};

//Get all active and unactive clothing
const getAllClothing = async (req, res) => {
    try {
        const result = await pool.query(queries.getAllClothingQuery);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error getting all clothing", error);
        res.status(500).send("Server Error");
    }
};

// Get clothing by ID
const getClothingById = async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).send("Invalid ID");

  try {
    const result = await pool.query(queries.getClothById, [id]); // 🔧 FIXED key: should be getClothById not getClothId
    if (!result.rows.length) return res.status(404).send("Clothing item not found");
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error getting clothing by ID:", error);
    res.status(500).send("Server error");
  }
};

// Add new clothing
const addClothing = async (req, res) => {
  const { error, value } = clothingSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      error: 'Validation failed',
      details: error.details.map((detail) => detail.message),
    });
  }

  const { name, price, category, image_url, description, stock_by_size } = value;

  try {
    const result = await pool.query(queries.addClothing, [
      name, 
      price, 
      category, 
      image_url, 
      description, 
      stock_by_size
    ]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding clothing:', err);
    res.status(500).json({ error: 'Interal server error' });
  }
};

// Update clothing
const updateClothes = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });

  const { error, value } = clothingSchema.validate(req.body, {abortEarly: false });
  if (error) {
    return res.status(400).json({
      error: 'Validation failed',
      details: error.details.map((detail) => detail.message),
    });
  }

  const { name, price, category, image_url, description, stock_by_size } = value;

  try {
    const check = await pool.query(queries.getClothById, [id]);
    if (!check.rows.length) {
      return res.status(404).json({ error: 'Clothing Id does not exist' });
    }

    await pool.query(queries.updateClothing, [
      name, 
      price, 
      category, 
      image_url, 
      description, 
      stock_by_size,
      id
    ]);

    res.status(200).json({message: 'Clothing updated successfully' });
  } catch (err) {
    console.error('Error updating clothing:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Soft delete
const softDeleteClothing = async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).send("Invalid ID");

  try {
    await pool.query(queries.softDelete, [id]); // 🔧 FIXED: must use pool.query()
    res.sendStatus(204);
  } catch (err) {
    console.error('Soft delete failed:', err);
    res.status(500).json({ error: 'Soft delete failed' });
  }
};

// Restore
const restoreClothing = async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).send("Invalid ID");

  try {
    await pool.query(queries.restore, [id]); // 🔧 FIXED: must use pool.query()
    res.sendStatus(200);
  } catch (err) {
    console.error('Restore failed:', err);
    res.status(500).json({ error: 'Restore failed' });
  }
};

module.exports = {
  getClothing,
  getAllClothing,
  getClothingById,
  addClothing,
  updateClothes,
  softDeleteClothing,
  restoreClothing,
};
