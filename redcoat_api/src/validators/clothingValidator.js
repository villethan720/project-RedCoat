const Joi = require('joi');

const clothingSchema = Joi.object({
    name: Joi.string().trim().required(),
    price: Joi.number().positive().required(),
    category: Joi.string().trim().required(),
    image_url: Joi.string().uri().optional().allow('', null),
    description: Joi.string().optional().allow('', null),
    stock_by_size: Joi.object()
        .pattern(Joi.string(), Joi.number().integer().min(0))
        .optional()
        .allow(null),
});

module.exports = { clothingSchema };