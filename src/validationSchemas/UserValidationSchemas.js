const zod = require("zod")
const uservalidationschema = zod.object({
    name:zod.string().min(3),
    email: zod.string().email(),
    password: zod.string().min(6),
    age:zod.number().min(18).max(60),
    bloodGroup: zod.string(),
    address: zod.object({
        city: zod.string(),
        state: zod.string(),
    }),
    skills:zod.array(zod.string()),
}).strict()

module.exports = uservalidationschema