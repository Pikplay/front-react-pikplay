import Zoom from '@material-ui/core/Zoom'
import styles from './styles.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Tooltip } from '@material-ui/core'
import {
  faCheckCircle,
  faStar,
  faStore,
} from '@fortawesome/free-solid-svg-icons'

const Author = ({ user = {}, parentView }) => {
  return (
    <div className={`${styles.AuthorComponent} author ${styles[parentView]}`}>
      <img
        alt={`Imagen de ${user?.name}`}
        className={styles.user_picture}
        src={user?.picture}
      />
      <Tooltip TransitionComponent={Zoom} title='Informacion del aliado'>
        <div className={`content-icon-store ${styles['content-icon-store']}`}>
          <FontAwesomeIcon icon={faStore} />
        </div>
      </Tooltip>
      <p
        title={
          user?.certificate
            ? 'El usuario esta certificado, puedes confiar en esta oferta'
            : ''
        }
      >
        {!!user?.certificate && (
          <Tooltip TransitionComponent={Zoom} title='Aliado certificado'>
            <span className='star-content'>
              <FontAwesomeIcon className={styles.star} icon={faStar} />
            </span>
          </Tooltip>
        )}
        <Tooltip
          TransitionComponent={Zoom}
          title='Nombre de quien vende el articulo'
        >
          <h3>{user?.name}</h3>
        </Tooltip>
        <Tooltip TransitionComponent={Zoom} title='Calificación'>
          <div className={styles.calification}>
            <span>(4,5)</span>
          </div>
        </Tooltip>
        {user?.transactions > 0 && (
          <div className={styles.transactions}>
            <FontAwesomeIcon icon={faCheckCircle} />
            <span>{user?.transactions} ventas completadas</span>
          </div>
        )}
      </p>
    </div>
  )
}

export default Author
