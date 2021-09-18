const Joi = require('joi')
const {admins} =  require("../models")
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt");

module.exports = {
    register : async(req,res) => {
        const body = req.body
        try{ // apa saja yg dimasukin
            const schema = Joi.object({
                username : Joi.string().min(4).required(),
                password : Joi.string().min(6).required()
            })

            const check = schema.validate({...body}, {abortEarly: false})
            
            if(check.error){ //udah sesuai data apa blum
                return res.status(400).json({
                    status : "Failed",
                    message : "Bad Request",
                    errors : check.error["details"][0]["message"] //check.error["details"].map((err)=>message),
                })
            }

            //ada apa tidak email di data base
            const checkUsername = await admins.findOne({
                where :{
                    username : body.username
                }
            })

            if(checkUsername){
                return res.status(400).json({
                    status : "Fail",
                    message : "Username Already Exist"
                })
            }

            //menyembunyikan password di db
            const hashedPassword = await bcrypt.hash(body.password, 10);

            const admin = await admins.create({
                username : body.username,
                password : hashedPassword
            }
                )
                
                const payload = {
                    username : admin.dataValues.username,
                    id : admin.dataValues.id
                }

                jwt.sign(payload, "passwordAdmin", {expiresIn : 3600}, (err,token)=>{
                    return res.status(200).json({
                        status : "Success",
                        message : "Registered Succesfully",
                        data : token
                })
            })

        }catch(error){
            console.log(error)
            return res.status(500).json({
                status: "Failed",
                message: "Internal Server Error"
            })
        }
    },

    login : async (req,res) => {
        const body = req.body
        try{
            const schema = Joi.object({
                username : Joi.string().min(4).required(),
                password : Joi.string().min(6).required()
            })

            const {error} = schema.validate({...body})
           
            if(error){
                return res.status(400).json({
                    status : "Failed",
                    message : error.message
                })
            }

            const checkUsername = await admins.findOne({
                where : {
                    username : body.username
                }
            });

            if(!checkUsername){
                return res.status(401).json({
                    status : "Failed",
                    message : "Invalid Username or Password"
            });
        }

        const checkPassword = await bcrypt.compare(body.password, checkUsername.dataValues.password);
      
      if (!checkPassword) {
        return res.status(401).json({
          status: "failed",
          message: "Invalid email or passsword",
        });
      }

        const payload = {
            username : checkUsername.dataValues.username,
            id : checkUsername.dataValues.id
        }
        jwt.sign(payload, "passwordAdmin", {expiresIn : 3600}, (err,token)=>{
            return res.status(200).json({
                status: "Success",
                message : "Login Successfully",
                data : token
            })
        })
        }catch(error){
            console.log(error)
            return res.status(500).json({
                status: "Failed",
                message: "Internal Server Error"
            })
        }
    },
    getAdmins: async (req, res) => {
        try {
            const user = await admins.findAll()
            if (!user) {
                return res.status(200).json({
                    status: "Failed",
                    message: "Admins Not Found",
                    data: []
                })
            }
            return res.status(200).json({
                status: "Success",
                message: "Successfully retrieved Admins",
                data: user
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: "Failed",
                message: "Internal Server Error"
            })
        }
    },
    getAdmin: async (req, res) => {
        try {
            const user = await admins.findOne({
                where: {
                    username : req.params.username
                }
            })
            if (!user) {
                return res.status(200).json({
                    status: "Failed",
                    message: "Admin Not Found",
                    data: []
                })
            }
            return res.status(200).json({
                status: "Success",
                message: "Successfully retrieved admin",
                data: user
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: "Failed",
                message: "Internal Server Error"
            })
        }
    },
    updateAdmins: async (req, res) => {
        const body = req.body
        try {
     
            const schema = Joi.object({
                username: Joi.string(),
                password: Joi.string()
            });

            const { error } = schema.validate({ ...body }, { abortEarly: false });

            if (error) {
                return res.status(400).json({
                    status: "failed",
                    message: "Bad Request",
                    errors: error["details"][0]["message"]
                })
            }
            const updatedAdmins = await admins.update({...body}, {where : {
                id : req.params.id
            }});

            if(!updatedAdmins[0]){
                return res.status(400).json({
                    status: "Failed",
                    message: "Unable to Update Database"
                })
            }

            const data = await admins.findOne({
                where: {
                    id : req.params.id
                }
            })

            return res.status(200).json({
                status: "Success",
                message: "Data Update Successfully",
                data : data
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: "Failed",
                message: "Internal Server Error"
            })
        }
    },
    deleteAdmins: async (req,res) => {
        const username = req.params.username
        try{
            const remove = await admins.destroy({
                where : {
                    username //name:name(objek sama)
                }
            }
            )
            if(!remove){
                return res.status(400).json({
                    status : "Failed",
                    message : "Unable to Delete the Admin"
                })
            }
            return res.status(200).json({
                status : "Success",
                message : "Deleted to Successfully"
            })
        }catch(error){

        }
    }
}