const db = require('../../db');

// queries.js
const getClothingQuery = `
  SELECT id, name, price, category, image_url, description, stock_by_size 
  FROM clothing 
  WHERE is_active = true 
  ORDER BY id ASC
`;

const getAllClothingQuery = `
    SELECT id, name, price, category, image_url, description, stock_by_size 
    FROM clothing
    ORDER BY id ASC
`

const getClothById = `
  SELECT * FROM clothing 
  WHERE id = $1
  LIMIT 1;
`;

const addClothing = `
  INSERT INTO clothing (name, price, category, image_url, description, stock_by_size)
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING id, name, price, category, image_url, description, stock_by_size
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
  RETURNING id, name, price, category, image_url, description, stock_by_size
`;

const softDelete = `
  UPDATE clothing 
  SET is_active = false 
  WHERE id = $1 AND id_active = true
  RETURNING id, name, price, category, image_url, description, stock_by_size, is_active
`;

const restore = `
  UPDATE clothing 
  SET is_active = true 
  WHERE id = $1 and is_active = false
  RETURNING id, name, price, category, image_url, description, stock_by_size, is_active
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
