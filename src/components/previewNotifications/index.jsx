// Descripción: Notificaciones generales en la aplicacion
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import UserNotifications from '../userNotifications/UserNotifications'
import { IS_MOBILE } from '../../lib/variables'
import styles from './styles.module.scss'

const Notification = () => {
  const dispatch = useDispatch()
  const messageModal = useSelector(state => state.messageModal)
  const checkedNotifications = useSelector(state => state.checkedNotifications)
  const isOpen = messageModal.id !== 'empty'
  const notifications = useSelector(state => state.notifications)
  const _notifications = notifications.filter(item => item.closed === 0)
  const {
    id = null,
    isHiddenButton,
    message: htmlMessage = null,
  } = messageModal

  const handleClose = () => {
    dispatch({ type: 'SET_MESSAGE', payload: null })
  }

  const isNotificationChecked =
    checkedNotifications && !checkedNotifications.find(item => item === id)

  return (
    <>
      <div className={`${styles.PreviewNotifications}`}>
        <i className="fa fa-bell-o" aria-hidden="true"></i>
        <span className={styles.notyQuantity}>{_notifications.length}</span>
        <div className={styles.bg_black}>
          <UserNotifications />
        </div>
        <div
          className={`${styles.Notificacion} ${isOpen && isNotificationChecked && styles.active
            } ID-${id}`}
        >
          <div className={styles.bg}></div>
          <div className={styles.content}>
            {htmlMessage}
            {!isHiddenButton && (
              <i className="fa fa-bell-o" aria-hidden="true"></i>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Notification
