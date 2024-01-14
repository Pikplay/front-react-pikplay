import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStore } from '@fortawesome/free-solid-svg-icons'
import { Tooltip } from '@material-ui/core'
import styles from './styles.module.scss'
import { getCiudades } from '../../lib/utils'

const Places = () => {
  const places = [
    {
      address: 'Cra. 48 ##10-45',
      city: 'medellin',
      image:
        'https://telemedellin.tv/wp-content/uploads/2020/05/IMG_4444-1024x640-1.jpg',
      name: 'Centro Comercial Monterrey',
      nickname: 'MO',
      phone: '01 (81) 888-8888',
    },
    {
      address: 'Cl. 45 ##1-85',
      city: 'barranquilla',
      image:
        'https://fastly.4sqi.net/img/general/600x600/51140435_S1UjdPhfEe-hEwHfw7omuI1W8LEq93TlmWtxB7L8lrE.jpg',
      name: 'Centro Comercial Metrocentro',
      nickname: 'ME',
    },
  ]
  const cities = getCiudades()

  return (
    <div className={styles.PlacesComponent}>
      <section className={styles.places}>
        <FontAwesomeIcon icon={faStore} />
        {places.map(item => {
          const cityLabel = cities.find(city => city.id == item.city)?.label
          const tooltip = (
            <div>
              <div>{item.name}</div>
              {/* <img max-height={100} src={item.image} width={100} /> */}
              <div>Ciudad: {cityLabel}</div>
              <div>Direccion: {item.address}</div>
            </div>
          )
          return (
            <article>
              <Tooltip title={tooltip}>
                <span>{item.nickname}</span>
              </Tooltip>
            </article>
          )
        })}
      </section>
    </div>
  )
}

export default Places
