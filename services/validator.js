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

const customerSchema = Joi.object({
    id: Joi.number()
        .min(1)
        .max(10000)
        .required(),
    name: Joi.string()
        .min(2)
        .max(100)
        .required(),
    products:  Joi.array(),
    specialDeals: Joi.array(),
    sales: Joi.number()
        .min(1)
        .max(10000)
        .required()
})

const discountSchema = Joi.object({
    id: Joi.number()
        .min(1)
        .max(10000)
        .required(),
    reason: Joi.string()
        .min(2)
        .max(100)
        .required(),
    percentage: Joi.number()
        .min(0)
        .max(100)
        .required()
})

module.exports = {
    validateProductSchema: function(productObject) {
        return productSchema.validate(productObject);
    },
    validateCustomerSchema: function(customerObject) {
        return customerSchema.validate(customerObject);
    },
    validateDiscountSchema: function(discountObject) {
        return discountSchema.validate(discountObject);
    },
}