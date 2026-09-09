const zod = require("zod")
const productvalidateschema = zod.object({
    name:zod.string().min(3),
    price:zod.number().min(1),
    stock:zod.number().min(0),
    sku:zod.string(),
    categoryId:zod.string().min(1)
}).strict()

module.exports = productvalidateschema