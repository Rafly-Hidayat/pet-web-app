const response = require('../utils/response')
const { models: { Vet, User, DataUser } } = require('../model/index')

module.exports = {
    getData: async (req, res) => {
        try {
            const data = await Vet.findAll({
                include: {
                    model: User,
                    as: 'user',
                    attributes: { exclude: ['password'] },
                }
            });

            const flattenedData = data.flatMap(item => {
                const { user, ...rest } = item;
                delete rest.dataValues.user;
                return { ...rest.dataValues, ...user.dataValues };
            });

            return response({
                res, statusCode: 200, message: 'Daftar dokter hewan', data: flattenedData, type: 'SUCCESS', name: 'getData user vet'
            });
        } catch (error) {
            return response({
                res, statusCode: 500, message: 'Error getData', data: error.stack.split('\n'), type: 'ERROR', name: 'getData user vet'
            });
        }
    }
}