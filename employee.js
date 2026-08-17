const setUser = (id,name)=>{
    console.log("set user called....")
    console.log(`id  = ${id} name = ${name}`)

    return `hi ${name}`
}
var data = "hi this is employee"

module.exports = {
    setUser,data
}