const response = require('../utils/response');
const { models: { User, Vet } } = require('../model/index');

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
            const data = await User.create({
                username, password, fullName, email, role,
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
                attributes: ['username'],
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
                attributes: ['username', 'fullname', 'email', 'idVet'],
                where: {
                    role: 'vet',
                }
            });

            // validate is user with role vet doesnt exists
            if (!dataUser.length) {
                return response({
                    res, statusCode: 404, message: 'Dokter Hewan tidak ditemukan!', data: req.body, type: 'ERROR', name: 'getListVet'
                });
            }

            // mapping data vet
            const data = await Promise.all(dataUser.map(async (val) => {
                const dataVet = await Vet.findOne({
                    attributes: ['address', 'experience', 'specialist', 'treatedAnimals'],
                    where: {
                        id: val.idVet
                    }
                });

                return {
                    ...val.dataValues,
                    ...JSON.parse(JSON.stringify(dataVet)),
                }
            }));


            return response({
                res, statusCode: 200, message: 'Berhasil!', data, type: 'SUCCESS', name: 'getListVet'
            });
        } catch (error) {
            return response({
                res, statusCode: 500, message: 'Error getListVet', data: error.stack.split('\n'), type: 'ERROR', name: 'getListVet'
            });
        }
    }

}