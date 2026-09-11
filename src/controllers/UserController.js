const userModel = require("../modles/UserModle")
const mailSend = require("../utils/MailUtils")
const cloudinaryUpload = require("../utils/CloudinaryUpload")
// const { response } = require("express")
const xlsx = require("xlsx")


const getAllUsers = async(req,res) =>{
    const users = await userModel.find()
    res.json({message:"Get all users...",data:users})
}

const getUserById = (req,res)=>{
    console.log("params...",req.params) //{id:""}
    console.log(req.params.id)
    res.json({message:"get user by id called...",id:req.params.id})
}

const searchByid = async(req,res)=>{
    const id = req.params.id

    const founduser = await userModel.findById(id)
    if(founduser){
        res.json({
            message:"User found",
            data:founduser
        })
    }
    else{
        res.json({
            message:"User not found"
        })

    }
}

const searchUser2 = async(req,res)=>{

    const data = req.query; //{josn object}
    console.log(data)
    res.json({data:data})
}

const createuser = async (req, res) => {
  try {
    console.log(req.file);

    const cloudinaryResponse = await Promise.all(
        req.files.map((file)=> cloudinaryUpload(file.path))
    );

    const urls = cloudinaryResponse.map((url)=>url.secure_url)
    const savedUser = await userModel.insertOne({...req.body,profilepic:urls[0]});
     await mailSend(req.body.email,"mail test",
        `
  <html>
    <body style="font-family:Arial; background:#f4f4f4; padding:30px;">
      <div style="background:white; padding:25px; text-align:center;">
        <h1 style="color:#2563eb;">Welcome 👋</h1>
        <h2>Hello ${req.body.name || "User"}!</h2>
        <p>Your account has been created successfully.</p>
        <p><strong>Email:</strong> ${req.body.email}</p>
        <a href="https://example.com"
           style="background:#2563eb; color:white; padding:10px 20px; text-decoration:none;">
          Visit Website
        </a>
      </div>
    </body>
  </html>
  `
    );
    await mailSend(
    req.body.email,
    "GitHub Image",
    `
    <html>
      <body>
        <h1>Hello ${req.body.name}</h1>
        <p>Here is your GitHub image.</p>
      </body>
    </html>
    `
);
    res.json({
      message: "user saved!!",
      data: savedUser,
    });
  } catch (err) {
    console.log(err);
    
    res.json({ err: err });
  }
};

// const createuser = async (req, res) => {
//   try {
//     console.log(req.files);
//     mapping = req.files.map((file) => file.path);
//     const savedUser = await userModel.insertOne({...req.body,profilepic:mapping[0],profileThumnails:mapping.slice(1,4)});
//     await mailSend(req.body.email,"mail test",
//         `
//   <html>
//     <body style="font-family:Arial; background:#f4f4f4; padding:30px;">
//       <div style="background:white; padding:25px; text-align:center;">
//         <h1 style="color:#2563eb;">Welcome 👋</h1>
//         <h2>Hello ${req.body.name || "User"}!</h2>
//         <p>Your account has been created successfully.</p>
//         <p><strong>Email:</strong> ${req.body.email}</p>
//         <a href="https://example.com"
//            style="background:#2563eb; color:white; padding:10px 20px; text-decoration:none;">
//           Visit Website
//         </a>
//       </div>
//     </body>
//   </html>
//   `
//     );
//     await mailSend(
//     req.body.email,
//     "GitHub Image",
//     `
//     <html>
//       <body>
//         <h1>Hello ${req.body.name}</h1>
//         <p>Here is your GitHub image.</p>
//       </body>
//     </html>
//     `
// );
//     res.json({
//       message: "user saved!!",
//       data: savedUser,
//     });
//   } catch (err) {
//         console.log(err);
//     res.json({ err: err });
//   }
// };


const deleteUser = async(req,res) =>{
    try{
        const id = req.params.id;
        const deletedUser = await userModel.findByIdAndDelete(id)
        if(deletedUser){
            res.status(200).json({
                message:"user deleted",
                date:deletedUser
            })
        }
        else{
            res.status(404).json({
                message:"user not found",
            })
        }

    }
    catch(err){
        res.status(404).json({
            message:"error while deleting",
            err:err
        })
    }
}

const updateuser = async(req,res) =>{
    try{

        const id = req.params.id;
        const updatedUser = await userModel.findByIdAndUpdate(id, req.body,{new:true});

        if(updatedUser){
            res.status(200).json({
        message: "user updated",
        data: updatedUser,
            });
        }else{
            res.status(404).json({
                message:"user not found to update"
            })
        }

    }
    catch(err){
        res.status(500).json({
            message:"error while updating",
            err:err
        })
    }
}

const updatebyage = async(req,res) => {
    try{
        const age = req.params.age;
        const updatewithage  =  await userModel.updateMany({age:{$gte:age}},req.body,{new:true})
        if(updatewithage){
            res.status(200).json({
        message: "user updated",
        data: updatewithage,
            });
        }else{
            res.status(404).json({
                message:"user not found to update"
            })
        }
    }
    catch(err){
        res.status(500).json({
            message:"error while updating by age",
            err:err
        })
    }
}

const updateusingid = async(req,res) => {

    try{

        const data =req.query;
        const id = req.query.id;

        const updateusurl = await userModel.findByIdAndUpdate(id, req.query,{new:true})
        if(req.query.id){
        
            if(updateusurl){
                res.status(200).json({
            message: "user updated",
            data: updateusurl,
                });
            }else{
                res.status(404).json({
                    message:"user not found to update"
                })
            }
        }else{
            res.status(404).json({
                message:"id not found to update"
            })
        }
    }
    catch(err){
        res.status(500).json({
            message:"error while updating using url data",
            err:err
        })
    }
}

const createMultipuleusers = async(req,res)=>{

    try{
        const workbook = xlsx.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(worksheet);

        const new_users = data.map((user) => ({
            name: user.name,
            age: user.age,
            number: user.number,
            bloodgroup: user.bloodgroup,
            skills: user.skills ? user.skills.split(",") : [],
            address: user.address ? JSON.parse(user.address) : {},
            email: user.email,
            password: user.password
        }));

        await userModel.insertMany(new_users);
        console.log(data);

        res.status(200).json({
             message: "Multiple users created",
           // data: savedUsers
        });
    }
    catch(err){
        console.log(err);
        
        res.status(500).json({
            
            message:"error ",
            err:err
        })
    }
}

module.exports ={
    getAllUsers, getUserById,searchByid, searchUser2, createuser, deleteUser, updateuser, updatebyage,
    updateusingid, createMultipuleusers
}