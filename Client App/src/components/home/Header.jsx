import { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Header.module.css'
import { DateRange } from 'react-date-range'

import 'react-date-range/dist/styles.css' // css of date-range model
import 'react-date-range/dist/theme/default.css' // css of date-range model
import SearchDataContext from '../../store/search-data-context'

// show options header
function Header() {
  const { findHotels } = useContext(SearchDataContext)
  const navigate = useNavigate()
  const [isFocusDateInput, setIsFocusDateInput] = useState(false)
  const [dateState, setDateState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ])
  const destinationInput = useRef()
  const dateInput = useRef()
  const adultQtyInput = useRef()
  const childrenQtyInput = useRef()
  const roomQtyInput = useRef()

  // navigate page to /search
  const clickHandler = event => {
    event.preventDefault()
    findHotels({
      destination: destinationInput.current.value,
      date: dateInput.current.value,
      adultQty: adultQtyInput.current.value,
      childrenQty: childrenQtyInput.current.value,
      roomQty: roomQtyInput.current.value
    })
    navigate('/search')
  }

  // focus input date to show model
  const focusDateInputHandler = () => {
    setIsFocusDateInput(true)
  }

  // blur input date to hide model
  const blurDateInputHandler = () => {
    setIsFocusDateInput(false)
  }

  // convert type of dateState to mm/dd/yyyy
  let startDate = dateState[0].startDate.toLocaleDateString()
  let endDate = dateState[0].endDate.toLocaleDateString()

  return (
    <>
      {/* model date-picker */}
      {isFocusDateInput && (
        <div
          onMouseDown={e => e.preventDefault()}
          className={styles['date-picker-container']}
        >
          <DateRange
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            minDate={new Date()}
            onChange={item => setDateState([item.selection])}
            ranges={dateState}
          />
        </div>
      )}

      {/* HEADER */}
      <header className={styles['wrap-header']}>
        {/* MESSAGE PART */}
        <div className={styles.header}>
          <h1>A lifetime of discounts? It's Genius.</h1>
          <p>
            Get rewarded for your travels - unlock instant savings of 10% or
            more with a free account
          </p>
          <button className={styles.button}>Sign in / Register</button>

          {/* FORM SEARCH */}
          <form className={styles.form}>
            <div>
              <label htmlFor="">
                <i className="fa fa-bed"></i>
              </label>
              <input
                type="text"
                placeholder="Where are you going?"
                list="destination"
                ref={destinationInput}
              />
              <datalist id="destination">
                <option value="Ha Noi" />
                <option value="Ho Chi Minh" />
                <option value="Da Nang" />
              </datalist>
            </div>

            <div className={styles.divDate}>
              <label htmlFor="">
                <i className="fa fa-calendar"></i>
              </label>
              <input
                className={styles['input-ccc']}
                type="text"
                placeholder="06/24/2022 to 06/24/2022"
                onFocus={focusDateInputHandler}
                value={`${startDate} to ${endDate}`}
                onBlur={blurDateInputHandler}
                ref={dateInput}
                onChange={() => {}}
              />
            </div>

            <div className={styles.roomCount}>
              <div>
                <i className="fa fa-female"></i>
              </div>
              <div>
                <input
                  type="number"
                  placeholder="1 adult"
                  ref={adultQtyInput}
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="0 children"
                  ref={childrenQtyInput}
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="1 room"
                  ref={roomQtyInput}
                />
              </div>
            </div>

            <button onClick={clickHandler} className={styles.button}>
              Search
            </button>
          </form>
        </div>
      </header>
    </>
  )
}

export default Header
