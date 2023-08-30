import React, { useContext } from 'react'
import styles from './SearchList.module.css'
import SearchDataContext from '../../store/search-data-context'

// show search list hotels
function SearchList() {
  const { hotels } = useContext(SearchDataContext)
  
  return (
    <div className={styles.wrap}>
      {hotels.length === 0 && <p>Have no hotels with your require.</p>}
      {hotels.length > 0 && hotels.map((place, index) => (
        <div className={styles.place} key={index}>
          <div className={styles.img}>
            <img
              src={place['image_url']}
              alt={place.name}
              width="200px"
              height="200px"
            />
          </div>
          <div className={styles.detail}>
            <h2 className={styles.name}>{place.name}</h2>
            <p>{place.distance} from center</p>
            <p>
              <span className={styles.free}>{place.tag}</span>
            </p>
            <h4>{place.description}</h4>
            <p>{place.type}</p>
            <h5 className={styles.green}>
              {place['free_cancel'] && 'Free cancellation'}
            </h5>
            <p className={styles.green}>
              {place['free_cancel'] &&
                'You can cancel later, so lock in this great price today!'}
            </p>
          </div>
          <div className={styles.mores}>
            <p className={styles.mb80}>
              <span>
                <b>{place['rate_text']}</b>
              </span>
              <span className={styles.rate}>{place.rate}</span>
            </p>
            <p className={styles.price}>
              <span>
                <b>${place.price}</b>
              </span>
            </p>
            <p className={styles.gray}>Includes taxes and fees</p>
            <button className={styles.button}>See availability</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SearchList
