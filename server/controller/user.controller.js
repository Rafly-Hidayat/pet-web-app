const response = require('../utils/response');
const { models: { User, Vet, DataVet } } = require('../model/index');
const Sequelize = require('sequelize');
const path = require("path");
const mime = require('mime');
const fs = require('fs');

// const DataVet = User.belongsTo(Vet, { as: 'dataVet', foreignKey: 'vetId' });

module.exports = {

    register: async (req, res) => {
        try {
            // difine the request
            const { username, password, fullName, email, role } = req.body;

            // get user by username
            const dataUser = await User.findOne({
                where: {
                    username
                }
            });

            // validate is user with the username already registered
            if (dataUser) {
                return response({
                    res, statusCode: 409, message: 'Username ini sudah terdaftar', data: req.body, type: 'ERROR', name: 'register user'
                });
            }

            // create new user
            const createData = await User.create({
                username, password, fullName, email, role,
            });
            const data = await User.findOne({
                attributes: ['id', 'username', 'role'],
                where: {
                    id: createData.id
                }
            });
            return response({
                res, statusCode: 200, message: 'Daftar Berhasil', data, type: 'SUCCESS', name: 'register user'
            });
        } catch (error) {
            return response({
                res, statusCode: 500, message: 'Error Register', data: error.stack.split('\n'), type: 'ERROR', name: 'register user'
            });
        }
    },

    login: async (req, res) => {
        try {
            // difine the request
            const { username, password } = req.body;

            // get user by username & password
            const data = await User.findOne({
                attributes: ['id', 'username', 'role'],
                where: {
                    username, password
                }
            });

            // validate is user doesnt exists
            if (!data) {
                return response({
                    res, statusCode: 404, message: 'Username atau Password salah!', data: req.body, type: 'ERROR', name: 'login user'
                });
            }

            return response({
                res, statusCode: 200, message: 'Login Berhasil', data, type: 'SUCCESS', name: 'login user'
            });
        } catch (error) {
            return response({
                res, statusCode: 500, message: 'Error Login', data: error.stack.split('\n'), type: 'ERROR', name: 'login user'
            });
        }
    },

    getListVet: async (req, res) => {
        try {
            // get list user where role = vet
            const dataUser = await User.findAll({
                include: {
                    model: Vet,
                    as: 'dataVet',
                    attributes: ['address', 'experience', 'specialist', 'treatedAnimals']
                },
                attributes: ['username', 'fullname', 'email'],
                where: {
                    role: 'vet',
                }
            })

            // validate is user with role vet doesnt exists
            if (!dataUser.length) {
                return response({
                    res, statusCode: 404, message: 'Dokter Hewan tidak ditemukan!', data: req.body, type: 'ERROR', name: 'getListVet'
                });
            }

            // console.log(dataUser.flatmap())

            return response({
                res, statusCode: 200, message: 'Berhasil!', data: dataUser, type: 'SUCCESS', name: 'getListVet'
            });
        } catch (error) {
            return response({
                res, statusCode: 500, message: 'Error getListVet', data: error.stack.split('\n'), type: 'ERROR', name: 'getListVet'
            });
        }
    },

    update: async (req, res) => {
        try {
            const { fullName, email, addreess, experiance, spesialist, treatedAnimals } = req.body
            const result = await Sequelize.Transaction(async (updateData) => {
                const dataUser = await User.findOne({
                    where: {
                        id: req.params.id
                    }
                })

                if (!dataUser) {
                    return response({
                        res, statusCode: 404, message: 'User tidak ditemukan!', data: req.body, type: 'ERROR', name: 'update User'
                    });
                }

                const updateUser = await User.update(
                    { fullName, email },
                    {
                        where: {
                            id: dataUser.id
                        }
                    }, { transaction: updateData }
                )

                if (dataUser.role === 'vet') {
                    const updateVet = await Vet.update(
                        { addreess, experiance, spesialist, treatedAnimals },
                        {
                            where: {
                                id: dataUser.idVet
                            }
                        }, { transaction: updateData }
                    )
                }

            })
        } catch (error) {
            return response({
                res, statusCode: 500, message: 'Error update User', data: error.stack.split('\n'), type: 'ERROR', name: 'update User'
            });
        }
    },

    tesUpload: async (req, res) => {
        try {
            console.log(req.file)
            const image = req.file.path; // Get the uploaded file path

            if (image) {
                // Save the user and file path to the database
                const data = await User.create({ username: 'tes', password: 'tes', image }).catch(err => res.send(err));
                return response({
                    res, statusCode: 200, message: 'Berhasil', data, type: 'SUCCESS', name: 'tesUpload'
                });
            }
            return res.send('gagal')

        } catch (error) {
            return response({
                res, statusCode: 500, message: 'Error tesUpload', data: error.stack.split('\n'), type: 'ERROR', name: 'tesUpload'
            });
        }
    },

    tesGetImage: async (req, res, next) => {
        try {
            const dataUser = await User.findOne({
                where: {
                    id: req.params.id
                }
            })  

            // const filePath = path.resolve(`${dataUser.image}`)
            const filePath = path.join(__dirname, '..', dataUser.image);
            console.log(filePath, 'file path', fs.existsSync(filePath))
            if (fs.existsSync(filePath)) {
                return res.sendFile(filePath)
            }
            res.status(404).json({ message: 'File not found', dataUser });

        } catch (error) {
            return response({
                res, statusCode: 500, message: 'Error tesUpload', data: error.stack.split('\n'), type: 'ERROR', name: 'tesUpload'
            });
        }
    },

}