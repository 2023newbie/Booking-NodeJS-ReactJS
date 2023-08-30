const User = require('../models/user')
const City = require('../models/city')
const Hotel = require('../models/hotel')
const Room = require('../models/room')
const Transaction = require('../models/transaction')

exports.postSignup = async (req, res, next) => {
  const email = req.body.email.trim().toLowerCase()
  const password = req.body.password.trim()

  try {
    if (password.length < 5) {
      throw new Error('Password requires at least 5 characters.')
    }
    const pointUser = await User.findOne({ email })
    if (!pointUser) {
      const user = new User({ email, password })
      const userDb = await user.save()
      if (userDb) {
        res.status(201).json({
          message: 'Created successfully!',
        })
      } else {
        throw new Error('Server has something wrong.')
      }
    } else {
      throw new Error('Email already exists.')
    }
  } catch (err) {
    res.status(500).json({
      message: 'Created failed!',
      err: err.message,
    })
  }
}

exports.postLogin = async (req, res) => {
  const email = req.body.email.trim().toLowerCase()
  const password = req.body.password.trim()

  try {
    const user = await User.findOne({ email: email })
    if (user && user.password === password) {
      res.status(201).json({
        message: 'Login successfully!',
        user: user,
      })
    } else {
      throw new Error('Email or password wrongs.')
    }
  } catch (err) {
    res.status(500).json({
      message: 'Login failed!',
      err: err.message,
    })
  }
}

exports.getCities = async (req, res) => {
  try {
    const cities = await City.find()
    res.status(200).json(cities)
  } catch (err) {
    res.status(500).json({message: 'Database throws error.'})
  }
}

exports.getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find()
    res.status(200).json(hotels)
  } catch (err) {
    res.status(500).json({message: 'Database throws error.'})
  }
}

exports.postSearch = async (req, res) => {
  const dest = req.body.destination
  const date = req.body.date
  const adultQty = req.body.adultQty
  const childrenQty = req.body.childrenQty
  const roomQty = req.body.roomQty
  
  try {
    const hotels = await Hotel.find()
    const rooms = await Room.find()
    
    const fullInfoHotels = hotels.map(hotel => {
      const roomsId = hotel.rooms
      const roomsDetail = roomsId.map(roomId => {
        return rooms.find(room => room._id.toString() === roomId)
      })
      return {
        ...hotel,
        rooms: roomsDetail
      }
    })
    const result = fullInfoHotels.map(hotel => {
      return {...hotel._doc, rooms: hotel.rooms}
    })
    const pointHotels = result.filter(hotel => hotel.city.includes(dest))
    res.status(200).json(pointHotels)
  } catch (err) {
    console.log(err)
  }
}

exports.getHotel = async (req, res) => {
  const hotelId = req.params.hotelId
  try {
    const pointHotel = await Hotel.findOne({_id: hotelId})
    const detailHotel = await pointHotel.populate('rooms')
    res.status(200).json(detailHotel)
  } catch (err) {
    console.log(err)
  }
  
}

exports.postTransaction = async (req, res) => {
  const transaction = {
    user: req.body.userId,
    hotel: req.body.hotel,
    room: req.body.rooms,
    dateStart: req.body.dateStart,
    dateEnd: req.body.dateEnd,
    price: req.body.total,
    payment: req.body.payment,
    status: 'Booked'
  }

  try {
    const trans = new Transaction(transaction)
    await trans.save()
    res.status(201).json({message: 'Transaction saved.'})
  } catch (err) {
    console.log(err)
  }
}

exports.getTransactions = async (req, res) => {
  const userId = req.params.userId
  try {
    const pointTransactions = await Transaction.find({user: userId})
    res.status(200).json(pointTransactions)
  } catch (err) {
    console.log(err)
  }
}