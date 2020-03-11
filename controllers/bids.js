const modal = require('../models')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class Bids {

    getBids(req) {
        return new Promise(async (resolve, reject) => {
            try {
                const { user_id } = req.body;
                let haveBidedAlready=false;
                const responce = await modal.user.findOne({ where: { id: user_id } })
                if (responce.workKnown) {
                    const bidRes = await modal.bookings.findAll({ 
                        where: { subCategory: responce.workKnown, userId: { [Op.not]: user_id } },
                        include:[
                            {
                                model:modal.bids,
                                where:{
                                    userId: user_id 
                                },
                                required:false
                            }
                        ]
                     })
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
                const {bookingId ,userId ,bidAmount}=req.body
                const responce = modal.bids.create({ bookingId , userId ,bidAmount})
                resolve({ id: responce, code: 200 })

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
