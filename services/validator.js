const Joi = require('joi');

const productSchema = Joi.object({
    name: Joi.string()
        .regex(/^[a-zA-Z0-9]+( [a-zA-Z0-9]+)*$/)
        .min(3)
        .max(50)
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
        .max(10000),
    discountPct: Joi.number()
        .min(1)
        .max(10000),
    saleMonths: Joi.array()
})

const customerSchema = Joi.object({
    id: Joi.number()
        .min(1)
        .max(10000)
        .required(),
    name: Joi.string()
        .regex(/^[a-zA-Z]+( [a-zA-Z]+)*$/)
        .min(2)
        .max(100)
        .required(),
    products:  Joi.array(),
    specialDeals: Joi.array().items(Joi.object().keys(
        {   productId: Joi.number().required(),
            dealPrice: Joi.number()
                            .min(1)
                            .max(10000)
                            .required()
        }
    )),
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
        .regex(/^[a-zA-Z0-9]+( [a-zA-Z0-9]+)*$/)
        .min(2)
        .max(50)
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