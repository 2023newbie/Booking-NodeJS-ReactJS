import styles from './Types.module.css'

// DUMMY DATA
const types = [
	{
		"name": "Hotels",
		"count": 4,
		"image": "./images/type_1.webp"
	},
	{
		"name": "Apartments",
		"count": 0,
		"image": "./images/type_2.jpg"
	},
	{
		"name": "Resorts",
		"count": 0,
		"image": "./images/type_3.jpg"
	},
	{
		"name": "Villas",
		"count": 0,
		"image": "./images/type_4.jpg"
	},
	{
		"name": "Cabins",
		"count": 0,
		"image": "./images/type_5.jpg"
	}
]

// show types hotels
function Types() {
  return (
    <div className={styles.wrap}>
	    <h2>Browse by property type</h2>
      <div className={styles.types}>
        {types.map((type, index) => (
          <div className={styles.type} key={index}>
            <div className={styles.img}>
              <img src={type.image} alt={type.name} width='100%' height='150px'/>
            </div>
            <div className={styles.content}>
              <h4>{type.name}</h4>
              <p>{type.count} {type.name.toLowerCase()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Types