import { useEffect, useState } from 'react'
import Cities from './Cities'
import HotelList from './HotelList'
import styles from './Main.module.css'
import Types from './Types'

function Main() {
  const [cities, setCities] = useState([])
  const [hotels, setHotels] = useState([])

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('http://localhost:5000/cities')
        if (!res.ok) {
          throw new Error('Fetch failed.')
        }
        const cities = await res.json()
        setCities(cities)
      } catch (err) {
        console.log(err)
      }
    })();
    (async () => {
      try {
        const res = await fetch('http://localhost:5000/hotels')
        if (!res.ok) {
          throw new Error('Fetch failed.')
        }
        const hotels = await res.json()
        setHotels(hotels)
      } catch (err) {
        console.log(err)
      }
    })()
  }, [])
  

  return (
    <div className={styles.container}>
      <Cities cities={cities} />
      <Types />
      <HotelList hotels={hotels} />
    </div>
  )
}

export default Main