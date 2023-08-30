import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DatePicker from '../DatePicker'
import classes from './FormBooking.module.css'

const FormBooking = ({ hotel }) => {
  const navigate = useNavigate()
  const [dateState, setDateState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ])
  const [isSelectDate, setIsSelectDate] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [totalPrice, setTotalPrice] = useState(0)
  const fullnameInput = useRef()
  const emailInput = useRef()
  const phoneInput = useRef()
  const identityCardInput = useRef()

  useEffect(() => {
    const user = localStorage.getItem('currentUser')
    if (user) {
      const parsedUser = JSON.parse(user)
      setCurrentUser(parsedUser)
    }
  }, [])

  // convert type of dateState to mm/dd/yyyy
  let startDate = dateState[0].startDate.getDate()
  let endDate = dateState[0].endDate.getDate()

  let rentDay = endDate - startDate
  if (startDate === endDate) {
    rentDay = 1
  }

  const saveTransaction = () => {
    const formInfo = {
      fullname: fullnameInput.current.value,
      email: emailInput.current.value,
      phone: phoneInput.current.value,
      identityCard: identityCardInput.current.value
    }

    if (!isSelectDate) return

    for (const key in formInfo) if (formInfo[key] === '') return

    const roomsList = Array.from(document.querySelectorAll('input[type="checkbox"]'))
    const pointRoomsDom = roomsList.filter(room => room.checked)
    const pointRooms = pointRoomsDom.map(room => room.id.split('-')[1])

    const payment = document.querySelector('#payment').value

    if (payment === '') return

    const trans = {
      userId: currentUser._id,
      hotel: hotel.title,
      rooms: pointRooms,
      dateStart: dateState[0].startDate.toLocaleDateString(),
      dateEnd: dateState[0].endDate.toLocaleDateString(),
      total: totalPrice,
      payment: payment
    }

    fetch('http://localhost:5000/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(trans)
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === 'Transaction saved.') {
          navigate('/transactions/' + currentUser._id)
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <div className={classes['form-booking']}>
      <div className={classes.dates}>
        <h3 className={classes.title}>Dates</h3>
        <DatePicker
          dateState={dateState}
          setDateState={setDateState}
          onClick={() => {
            setTotalPrice(0)
            const checkboxes = document.querySelectorAll(
              'input[type="checkbox"]'
            )
            for (const input of checkboxes) {
              input.checked = false
            }
            if (isSelectDate === false) {
              setIsSelectDate(true)
            }
          }}
        />
      </div>

      <div className={classes['reserve-info']}>
        <h3 className={classes.title}>Reserve Info</h3>
        <label htmlFor="fullname">Your Full Name:</label>
        <input
          type="text"
          placeholder="Full Name"
          id="fullname"
          ref={fullnameInput}
        />
        <br />
        <label htmlFor="email">Your Email:</label>
        <input
          type="text"
          placeholder="Email"
          id="email"
          ref={emailInput}
          value={currentUser ? currentUser.email : ''}
        />
        <br />
        <label htmlFor="phone">Your Phone Number:</label>
        <input
          type="text"
          placeholder="Phone Number"
          id="phone"
          ref={phoneInput}
        />
        <br />
        <label htmlFor="card">Your Identity Card Number:</label>
        <input
          type="text"
          placeholder="Card Number"
          id="card"
          ref={identityCardInput}
        />
        <br />
      </div>

      {/* render rooms */}
      {isSelectDate && (
        <div className={classes['select-rooms']}>
          <h3 className={classes.title}>Select Rooms</h3>
          <div className={classes.rooms}>
            {hotel.rooms.map(room => {
              return (
                <div className={classes.room}>
                  <h4 className={classes['title-room']}>{room.title}</h4>
                  <p>{room.desc}</p>
                  <div className={classes['space-between']}>
                    <p>
                      <span className={classes['small-text']}>Max people:</span>{' '}
                      <span className={classes.bold}>{room.maxPeople}</span>
                    </p>

                    {/* render options room */}
                    <div className={classes['tick-rooms']}>
                      {room.roomNumbers.map(roomNum => {
                        return (
                          <div className={classes['tick-room']}>
                            <label htmlFor={`tick-${roomNum}`}>{roomNum}</label>
                            <input
                              type="checkbox"
                              id={`tick-${roomNum}`}
                              onChange={e => {
                                if (e.target.checked) {
                                  setTotalPrice(
                                    prevValue =>
                                      prevValue + room.price * rentDay
                                  )
                                } else {
                                  setTotalPrice(
                                    prevValue =>
                                      prevValue - room.price * rentDay
                                  )
                                }
                              }}
                            />
                          </div>
                        )
                      })}{' '}
                    </div>
                  </div>
                  <p className={classes.bold}>
                    $<span>{room.price}</span>
                  </p>
                </div>
              )
            })}{' '}
          </div>
        </div>
      )}
      <div className={classes['total-bill']}>
        <h3 className={classes.title}>
          Total Bill: $<span>{totalPrice}</span>
        </h3>
        <div className={classes.confirm}>
          <select id="payment" name="payment">
            <option value=''>Select Payment Method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Cash">Cash</option>
          </select>
          <button onClick={saveTransaction}>Reserve Now</button>
        </div>
      </div>
    </div>
  )
}

export default FormBooking
