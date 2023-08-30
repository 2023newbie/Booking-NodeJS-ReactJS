import { useContext, useState } from 'react'
import styles from './SearchPopup.module.css'
import SearchDataContext from '../../store/search-data-context'

// show sidebar search model
function SearchPopup() {
  const { findHotels } = useContext(SearchDataContext)
  const [destination, setDestination] = useState('')
  const [date, setDate] = useState('')
  const [adultQty, setAdultQty] = useState('')
  const [childrenQty, setChildrenQty] = useState('')
  const [roomQty, setRoomQty] = useState('')
  
  const fetchHotels = () => {
    findHotels({destination, date, adultQty, childrenQty, roomQty})
  }
  return (
    <div className={styles.wrap}>
      <form className={styles.form}>
        <h3>Search</h3>
        <div className={`${styles.fs13} ${styles.div}`}>
          <label htmlFor="destination">Destination</label>
          <input
            type="text"
            name="destination"
            list="destination"
            placeholder='Ha Noi'
            value={destination}
            onChange={e => setDestination(e.target.value)}
          />
          <datalist id="destination">
            <option value="Ha Noi" />
            <option value="Ho Chi Minh" />
            <option value="Da Nang" />
          </datalist>
        </div>
        <div className={`${styles.fs13} ${styles.div}`}>
          <label htmlFor="date">Check-in Date</label>
          <input
            type="text"
            name="date"
            placeholder="06/24/2022 to 06/24/2022"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </div>
        <div>
          <p className={styles.fs13}>Options</p>
          <div className={styles.fs12}>
            <span>Min price per night</span>
            <input type="number" />
          </div>
          <div className={styles.fs12}>
            <span>Max price per night</span>
            <input type="number" />
          </div>
          <div className={styles.fs12}>
            <span>Adult</span>
            <input
              type="number"
              name="adultQty"
              placeholder={1}
              value={adultQty}
              onChange={e => setAdultQty(e.target.value)}
            />
          </div>
          <div className={styles.fs12}>
            <span>Children</span>
            <input
              type="number"
              name="childrenQty"
              placeholder={0}
              value={childrenQty}
              onChange={e => setChildrenQty(e.target.value)}
            />
          </div>
          <div className={styles.fs12}>
            <span>Room</span>
            <input
              type="number"
              name="roomQty"
              placeholder={1}
              value={roomQty}
              onChange={e => setRoomQty(e.target.value)}
            />
          </div>
        </div>
        <button className={styles.button} type="button" onClick={fetchHotels}>
          Search
        </button>
      </form>
    </div>
  )
}

export default SearchPopup
