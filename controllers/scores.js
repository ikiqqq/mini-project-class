const Joi = require("joi")
const {scores} = require("../models")
const students = require("./students")

module.exports = {
    postScores : async (req,res) => {
        const body = req.body
        try{
            const schema = Joi.object({
                idStudents : Joi.number().required(),
                math : Joi.number().required(),
                physics : Joi.number().required(),
                algorithm : Joi.number().required(),
                programming : Joi.number().required()
            })

            const {error} = schema.validate({...body})

            if(error){
                return res.status(400).json({
                    status : "Failed",
                    message : error.message
                })
            }

            const studentScore = await scores.create({...body})

            //jika belum kesimpan
            if(!studentScore){
                return res.status(409).json({
                    status : "Failed",
                    message: "Failed to save the data to Database"
                })
            }

            return res.status(200).json({
                status : "Success",
                message: "Successfully to save the data to Database",
                data : studentScore
            })
        }catch(error){
            console.log(error)
            res.status(500).json({
                status : "ERROR",
                message : "Internal Server Error"
            })
        }
    },
    getScores: async (req, res) => {
        try {
            const skors = await scores.findAll()
            if (!skors) {
                return res.status(200).json({
                    status: "Failed",
                    message: "Data Not Found",
                    data: []
                })
            }
            return res.status(200).json({
                status: "Success",
                message: "Successfully retrieved scores",
                data: skors
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: "Failed",
                message: "Internal Server Error"
            })
        }
    },
    getScore: async (req, res) => {
        try {

            const skors = await scores.findOne({
                where: {
                    idStudents : req.params.idStudents,
                },
            })
            if (!skors) {
                return res.status(200).json({
                    status: "Failed",
                    message: "Data Not Found",
                    data: []
                })
            }
            return res.status(200).json({
                status: "Success",
                message: "Successfully retrieved scores",
                data: skors
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: "Failed",
                message: "Internal Server Error"
            })
        }
    },
    updateScores: async (req, res) => {
        const body = req.body
        try {
     
            const schema = Joi.object({
                idStudents : Joi.number(),
                math : Joi.number(),
                physics : Joi.number(),
                algorithm : Joi.number(),
                programming : Joi.number()
            });

            const { error } = schema.validate({ ...body }, { abortEarly: false });

            if (error) {
                return res.status(400).json({
                    status: "failed",
                    message: "Bad Request",
                    errors: error["details"][0]["message"]
                })
            }
            const updatedScores = await scores.update({...body}, {where : {
                idStudents : req.params.idStudents
            }});

            if(!updatedScores[0]){
                return res.status(400).json({
                    status: "Failed",
                    message: "Unable to Update Database"
                })
            }

            const data = await scores.findOne({
                where: {
                    idStudents : req.params.idStudents
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
    deleteScores: async (req,res) => {
        const idStudents = req.params.idStudents
        try{
            const remove = await scores.destroy({
                where : {
                    idStudents //name:name(objek sama)
                }
            }
            )
            if(!remove){
                return res.status(400).json({
                    status : "Failed",
                    message : "Unable to Delete the Data"
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