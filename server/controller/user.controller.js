const path = require("path");
const fs = require('fs');
const response = require('../utils/response');
const { models: { User } } = require('../model/index');

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
            const image = `uploads/${username[0]}.jpg`
            const createData = await User.create({
                username, password, fullName, email, role, image
            });
            const data = await User.findOne({
                attributes: { exclude: ['password'] },
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
                attributes: { exclude: ['password'] },
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

    update: async (req, res) => {
        try {
            const { fullName, email, id } = req.body
            const dataUser = await User.findOne({
                where: {
                    id,
                    role: 'user'
                }
            })

            if (!dataUser) {
                return response({
                    res, statusCode: 404, message: 'User ini tidak ditemukan!', data: req.body, type: 'ERROR', name: 'update user'
                });
            }

            await User.update({ fullName, email }, {
                where: {
                    id: dataUser.id
                }
            })

            const data = await User.findOne({
                attributes: { exclude: ['password'] },
                where: {
                    id,
                    role: 'user'
                }
            })

            return response({
                res, statusCode: 200, message: 'Update Berhasil', data, type: 'SUCCESS', name: 'update user'
            });
        } catch (error) {
            return response({
                res, statusCode: 500, message: 'Error update User', data: error.stack.split('\n'), type: 'ERROR', name: 'update User'
            });
        }
    },

    updatePicture: async (req, res) => {
        try {
            const image = req.file.path; // Get the uploaded file path
            const { id } = req.params;

            if (image) {
                const dataUser = await User.findOne({ where: { id } })
                if (!dataUser) {
                    return response({
                        res, statusCode: 404, message: 'User ini tidak ditemukan!', data: req.body, type: 'ERROR', name: 'updatePicture'
                    });
                }
                // Save the user and file path to the database
                await User.update({ image }, { where: { id } }).catch(err => res.send(err));

                const data = await User.findOne({ where: { id } })
                return response({
                    res, statusCode: 200, message: 'Berhasil', data, type: 'SUCCESS', name: 'updatePicture'
                });
            }
            return res.send('gagal')

        } catch (error) {
            return response({
                res, statusCode: 500, message: 'Error updatePicture', data: error.stack.split('\n'), type: 'ERROR', name: 'updatePicture'
            });
        }
    },

    getPicture: async (req, res) => {
        try {
            const dataUser = await User.findOne({ where: { id: req.params.id } })
            if (!dataUser || !dataUser.image) {
                return response({
                    res, statusCode: 404, message: 'User ini tidak ditemukan!', data: req.body, type: 'ERROR', name: 'updatePicture'
                });
            }

            const filePath = path.join(__dirname, '..', dataUser.image);
            console.log(filePath, 'file path', fs.existsSync(filePath))
            if (fs.existsSync(filePath)) {
                return res.sendFile(filePath)
            }
            res.status(404).json({ message: 'File not found', dataUser });

        } catch (error) {
            return response({
                res, statusCode: 500, message: 'Error getPicture', data: error.stack.split('\n'), type: 'ERROR', name: 'getPicture'
            });
        }
    },

}