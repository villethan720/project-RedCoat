const pool = require('../../db');
const queries = require('./queries');

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
  const {
    name,
    price,
    category,
    image_url,
    description,
    stock_by_size,
  } = req.body;

  if (!name || !price || !category) {
    return res.status(400).send("Missing required fields");
  }

  try {
    const result = await pool.query(queries.addClothing, [ // 🔧 FIXED key: should be addClothing not addClothes
      name,
      price,
      category,
      image_url,
      description,
      stock_by_size
    ]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error adding clothing:", error);
    res.status(500).send("Error adding clothing");
  }
};

// Update clothing
const updateClothes = async (req, res) => {
  const id = parseInt(req.params.id);
  const {
    name,
    price,
    category,
    image_url,
    description,
    stock_by_size
  } = req.body;

  if (isNaN(id)) return res.status(400).send("Invalid ID");

  try {
    const check = await pool.query(queries.getClothById, [id]); // 🔧 FIXED key again
    if (!check.rows.length) return res.status(404).send("Clothing ID does not exist");

    await pool.query(queries.updateClothing, [ // 🔧 FIXED: should be updateClothing not updateClothes
      name,
      price,
      category,
      image_url,
      description,
      stock_by_size,
      id
    ]);

    res.status(200).send("Clothing updated successfully");
  } catch (error) {
    console.error("Error updating clothing:", error);
    res.status(500).send("Error updating clothing");
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
