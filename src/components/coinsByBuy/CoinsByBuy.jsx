import CoinIcon from '../CoinIcon/CoinIcon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons'
import styles from './styles.module.scss'

const CoinsByBuy = ({ price }) => {
  const gift = Math.floor(price * 0.01)
  return (
    <div className={styles.CoinsByBuy}>
      <span className={styles.secure_purshase}>
        <FontAwesomeIcon className={styles.verified} icon={faCheckCircle} />{' '}
        Compra segura
      </span>
      <div className={styles.flex}>
        <span>Por la compra de este artículo llevate: </span>
        <span>
          <CoinIcon coins={gift} />
        </span>
      </div>
    </div>
  )
}

export default CoinsByBuy
