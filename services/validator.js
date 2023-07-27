const Joi = require('joi');

const productSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    id: Joi.number()
        .min(1)
        .max(10000)
        .required(),
    normalPrice: Joi.number()
        .min(1)
        .max(10000)
        .required(),
    discountPrice: Joi.number()
        .min(1)
        .max(10000)
        .required(),
    discountPct: Joi.number()
        .min(1)
        .max(10000)
        .required(),
    saleMonths: Joi.array()
})

module.exports = {
    validateProductSchema: function(productObject) {
        return productSchema.validate(productObject);
    }
}