const modal = require('../models')

class Bookings {


  bookService(req) {
    return new Promise(async (resolve, reject) => {
      try {
        const { bidHour, city, pincode, address, serviceTime, subCategory, user_id, bookingStatus, bookingId, bookingTime, phoneNo, captainCharge='' } = req.body;
        console.log(req.body)
        const responce = await modal.bookings.create({ bidHour, city, pincode, address, subCategory, serviceTime, userId: user_id, bookingStatus, bookingId, bookingTime, phoneNo, captainCharge })
        resolve({ res: responce, data: {}, code: 200 })
      }
      catch (err) {
        console.log(err)
        resolve({ error_message: "something went wrong", code: 500 })
      }
    })
  }

  getBookings(req)  {
    return new Promise(async (resolve, reject) => {
      try {
        const { user_id } = req.body;
        const responce = await modal.bookings.findAll({ 
          where: { userId: user_id } })
        resolve({ data: responce, code: 200 })
      }
      catch (err) {
        console.log(err)
        resolve({ error_message: "something went wrong", code: 500 })
      }
    })
  }
}

module.exports = () => {
  return new Bookings()
}
