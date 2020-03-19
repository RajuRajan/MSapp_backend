const modal = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

class Bids {
    getBids(req) {
        return new Promise(async (resolve, reject) => {
            try {
                const { user_id } = req.body
                let haveBidedAlready = false
                const responce = await modal.user.findOne({
                    where: { id: user_id },
                })
                if (responce.workKnown) {
                    const bidRes = await modal.bookings.findAll({
                        where: {
                            subCategory: responce.workKnown,
                            userId: { [Op.not]: user_id },
                        },
                        include: [
                            {
                                model: modal.bids,
                                where: {
                                    userId: user_id,
                                },
                                required: false,
                            },
                        ],
                    })
                    resolve({ data: bidRes, code: 200 })
                }
            } catch (err) {
                console.log(err)
                resolve({ error_message: 'something went wrong', code: 500 })
            }
        })
    }

    bidService(req) {
        return new Promise(async (resolve, reject) => {
            try {
                const { bookingId, userId, bidAmount } = req.body
                var Sentiment = require('sentiment')
                var sentiment = new Sentiment()
                var result = 0
                var score = 0
                const bidScore = {
                    $50: 1,
                    $100: 0.5,
                    $150: 0,
                }
                function analyseWords(data) {
                    var res = sentiment.analyze(data)
                    return res.comparative
                }
                modal.feedbacks
                    .findAll({ where: { userId: userId } })
                    .then(feeds => {
                        for (let f of feeds) {
                            result = result + analyseWords(f.dataValues.feed)
                            console.log('result==>', result)
                        }
                        console.log('final result==>', result / feeds.length)
                        score =
                            (result / feeds.length + bidScore[bidAmount]) / 2
                        console.log('score=======', score)

                        const responce = modal.bids.create({
                            bookingId,
                            userId,
                            bidAmount,
                            score,
                        })
                        resolve({ id: responce, code: 200 })
                    })
            } catch (err) {
                resolve({ error_message: 'account not found', code: 500 })
            }
        })
    }
}

module.exports = () => {
    return new Bids()
}
