const { students, scores } = require("../models")
const Joi = require('joi')


module.exports = {
    postStudent: async (req, res) => {
        const body = req.body
        try {
            const schema = Joi.object({
                name: Joi.string().required(),
                dateOfBirth: Joi.date().required(),
                address: Joi.string().required()
            });

            const { error } = schema.validate({ ...body }, { abortEarly: false });

            if (error) {
                return res.status(400).json({
                    status: "failed",
                    message: "Bad Request",
                    errors: error["details"][0]["message"]
                })
            }

            const newStudent = await students.create({
                name: body.name,
                dateOfBirth: body.dateOfBirth,
                address: body.address
            })

            if (!newStudent) {
                return res.status(400).json({
                    status: "failed",
                    message: "Unable to save the data to database"
                })
            }


            res.status(200).json({
                status: "Successs",
                message: " Successfully saved to database",
                data: newStudent
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: "Failed",
                message: "Internal Server Error"
            })
        }
    },
    getStudents: async (req, res) => {
        try {
            const kelases = await students.findAll({
                attributes : {
                    exclude : ["id", "updatedAt", "createAt"]
                },
                include: [
                  {
                    as: "scores",
                    model: scores,
                  },
                ],
            })
            if (!kelases) {
                return res.status(200).json({
                    status: "Failed",
                    message: "Data Not Found",
                    data: []
                })
            }

            // const studentsGet = await students.findOne({
            //     where: {
            //       id: kelases.dataValues.id,
            //     },
            //     attributes : {
            //         exclude : ["idS", "updatedAt", "createAt"]
            //     },
            //     include: [
            //       {
            //         as: "scores",
            //         model: scores,
            //       },
            //     ],
            //   });
            return res.status(200).json({
                status: "Success",
                message: "Successfully retrieved klases",
                data: kelases
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: "Failed",
                message: "Internal Server Error"
            })
        }
    },
    getStudent: async (req, res) => {
        try {
            const kelases = await students.findOne({
                where: {
                    name : req.params.name
                },
                attributes : {
                    exclude : ["idStudents", "updatedAt"]
                },
                include: [
                  {
                    as: "scores",
                    model: scores,
                  },
                ],
            })
            if (!kelases) {
                return res.status(200).json({
                    status: "Failed",
                    message: "Data Not Found",
                    data: []
                })
            }

            // const studentsGet = await students.findOne({
            //     where: {
            //       name: kelases.dataValues.name,
            //     },
            //     attributes : {
            //         exclude : ["idStudents", "updatedAt"]
            //     },
            //     include: [
            //       {
            //         as: "scores",
            //         model: scores,
            //       },
            //     ],
            //   });
            return res.status(200).json({
                status: "Success",
                message: "Successfully retrieved klases",
                data: kelases
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: "Failed",
                message: "Internal Server Error"
            })
        }
    },
    updateStudents: async (req, res) => {
        const body = req.body
        try {
     
            const schema = Joi.object({
                name: Joi.string(),
                dateOfBirth: Joi.string(),
                address: Joi.string()
            });

            const { error } = schema.validate({ ...body }, { abortEarly: false });

            if (error) {
                return res.status(400).json({
                    status: "failed",
                    message: "Bad Request",
                    errors: error["details"][0]["message"]
                })
            }
            const updatedStudents = await students.update({...body}, {where : {
                id : req.params.id
            }});

            if(!updatedStudents[0]){
                return res.status(400).json({
                    status: "Failed",
                    message: "Unable to Update Database"
                })
            }

            const data = await students.findOne({
                where: {
                    id : req.params.id,
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
    deleteStudents: async (req,res) => {
        const name = req.params.name
        try{
            const remove = await students.destroy({
                where : {
                    name //name:name(objek sama)
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