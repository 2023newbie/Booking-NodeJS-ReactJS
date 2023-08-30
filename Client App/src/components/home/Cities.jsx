import React from 'react'
import styles from './Cities.module.css'

// dummy data
const cities = [
	{
		"name": "Dublin",
		"subText": "123 properties",
		"image": "./images/city_1.webp"
	},
	{
		"name": "Reno",
		"subText": "533 properties",
		"image": "./images/city_2.webp"
	},
	{
		"name": "Austin",
		"subText": "532 properties",
		"image": "./images/city_3.webp"
	}
]

// show options cities
function Cities({cities}) {
  return (
    <div className={styles.cities}>
      {cities.map((city, index) => (
        <div className={styles.city} key={index}>
          <div className={styles.img}>
            <img src={city.image} alt={city.name} width='350px' height="250px"/>
          </div>
          <div className={styles.content}>
            <h1>{city.name}</h1>
            <h3>{city.subText}</h3>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Cities