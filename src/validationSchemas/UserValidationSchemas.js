const zod = require("zod")
const numberregx = /^[6-9][0-9]{9}$/
const nameregx = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
const uservalidationschema = zod.object({
    name:zod.string().min(3).regex(nameregx),
    email: zod.string().email(),
    number: zod.string().regex(numberregx),
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