const response = require('../utils/response');
const { models: { Chat } } = require('../model/index');

module.exports = {

    generateRoomId: (req, res) => {
        try {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let randomID = '';

            for (let i = 0; i < 7; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                randomID += characters.charAt(randomIndex);
            }

            return response({
                res, statusCode: 200, message: 'generateRoomId Berhasil', data: randomID, type: 'SUCCESS', name: 'generateRoomId'
            });
        } catch (error) {
            return response({
                res, statusCode: 500, message: 'Error generateRoomId', data: error.stack.split('\n'), type: 'ERROR', name: 'generateRoomId'
            });
        }
    },

    getById: async (req, res) => {
        try {
            const { userId, vetId } = req.params
            
            const dataChat = await Chat.findOne({
                where: { userId, vetId}
            });

            if (!dataChat) {
                return response({
                    res, statusCode: 404, message: 'dataChat Tidak Ditemukan!', data: dataChat, type: 'NOTFOUND', name: 'getById'
                });
            }

            return response({
                res, statusCode: 200, message: 'getById Berhasil', data: dataChat, type: 'SUCCESS', name: 'getById'
            });
        } catch (error) {
            return response({
                res, statusCode: 500, message: 'Error getById', data: error.stack.split('\n'), type: 'ERROR', name: 'getById'
            });
        }
    }

}