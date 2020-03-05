const modal = require('../models')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class Bids {

    getBids(req) {
        return new Promise(async (resolve, reject) => {
            try {
                const { user_id } = req.body;
                const responce = await modal.user.findOne({ where: { id: user_id } })
                if (responce.workKnown) {
                    const bidRes = await modal.bookings.findAll({ where: { subCategory: responce.workKnown, userId: { [Op.not]: user_id } } })
                    resolve({ data: bidRes, code: 200 })
                }

            }
            catch (err) {
                console.log(err)
                resolve({ error_message: "something went wrong", code: 500 })
            }
        })
    }

    bidService(req) {
        return new Promise(async (resolve, reject) => {
            try {
                resolve({ id: req.body.bookingId, code: 200 })

            }
            catch (err) {
                resolve({ error_message: "account not found", code: 500 })
            }
        })

    }
}

module.exports = () => {
    return new Bids()
}
