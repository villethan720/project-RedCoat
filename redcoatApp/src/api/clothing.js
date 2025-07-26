import axios from 'axios';
import { buildApiUrl } from '../config/api';
import API_CONFIG from '../config/api';

// Base URL for your clothing API
const API_BASE_URL = buildApiUrl(API_CONFIG.ENDPOINTS.CLOTHING);

// GET all active clothing
export const getClothing = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching clothing:', error);
    throw error;
  }
};

//GET all clothing (active and not active)
export const getAllClothing = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching clothing', error);
    throw error;
  }
}

// GET clothing by ID
export const getClothingById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching clothing ID ${id}:`, error);
    throw error;
  }
};

// POST new clothing
export const addClothing = async (clothing) => {
  try {
    const response = await axios.post(API_BASE_URL, clothing);
    return response.data;
  } catch (error) {
    console.error('Error adding clothing:', error);
    throw error;
  }
};

// PUT (update) clothing by ID
export const updateClothing = async (id, updates) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, updates);
    return response.data;
  } catch (error) {
    console.error(`Error updating clothing ID ${id}:`, error);
    throw error;
  }
};

// DELETE (soft delete) clothing by ID
export const softDeleteClothing = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting clothing ID ${id}:`, error);
    throw error;
  }
};

// PATCH to restore soft-deleted clothing
export const restoreClothing = async (id) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/restore/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error restoring clothing ID ${id}:`, error);
    throw error;
  }
};
