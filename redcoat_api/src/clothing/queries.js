const db = require('../../db');

// queries.js
const getClothingQuery = `
  SELECT * FROM clothing 
  WHERE is_active = true 
  ORDER BY id ASC
`;

const getAllClothingQuery = `
    SELECT * FROM clothing
    ORDER BY id ASC
`

const getClothById = `
  SELECT * FROM clothing 
  WHERE id = $1
`;

const addClothing = `
  INSERT INTO clothing (name, price, category, image_url, description, stock_by_size)
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *
`;

const updateClothing = `
  UPDATE clothing 
  SET name = $1,
      price = $2,
      category = $3, 
      image_url = $4,
      description = $5,
      stock_by_size = $6
  WHERE id = $7
`;

const softDelete = `
  UPDATE clothing 
  SET is_active = false 
  WHERE id = $1
`;

const restore = `
  UPDATE clothing 
  SET is_active = true 
  WHERE id = $1
`;

module.exports = {
  getClothingQuery,
  getAllClothingQuery,
  getClothById,
  addClothing,
  updateClothing,
  softDelete,
  restore,
};
