import React, { useState } from 'react'
import ImageProfile from '../imageProfile/ImageProfile'
import Link from 'next/link'
import Login from '../login/Login'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import Switch from '@material-ui/core/Switch'
import CoinIcon from '../CoinIcon/CoinIcon'

import styles from './styles.module.scss'

import VARS from '../../lib/variables'
const { IS_MOBILE } = VARS

const PreviewUser = () => {
  const dispatch = useDispatch()
  const [isOpenPreviewProfile, setIsOpenPreviewProfile] = useState(false)
  const router = useRouter()
  const user = useSelector(state => state.user)

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
    router.push('/?action=logout')
  }

  const handleClickImage = () => {
    setIsOpenPreviewProfile(!isOpenPreviewProfile)
  }

  return (
    <div
      className={`${styles.PreviewUser} PreviewUser ${isOpenPreviewProfile ? styles.actived : null
        }`}
    >
      {user.id !== 0
        ? (
          <React.Fragment>
            <ImageProfile
              handleClickImage={IS_MOBILE ? handleClickImage : null}
            />
            <div className={styles.coins} id="PreviewProfile--Coins">
              <CoinIcon coins={10} />
            </div>
            <div className={styles.bg_white}></div>
            <div className={styles.bg_black}>
              <ol>
                <Link href='/perfil' as='/perfil'>
                  <a>
                    Mi cuenta
                    <br />
                    {/* <Coins /> */}
                  </a>
                </Link>
              </ol>
              <ol>
                <Link href='/usuario/me' as='/usuario/me'>
                  <a>
                    Soy vendedor
                    <br />
                    {/* <Coins /> */}
                  </a>
                </Link>
              </ol>
              <ol>
                <Link href='/concursos' as='/concursos'>
                  <a>
                    Concursos
                  </a>
                </Link>
              </ol>
              <ol>
                <Link href='/transacciones' as='/transacciones'>
                  Transacciones
                </Link>
              </ol>
              <ol>
                <Link href='/publicaciones' as='/publicaciones'>
                  <a>Publicaciones</a>
                </Link>
              </ol>
              <ol onClick={() => handleLogout()}>Salir</ol>
              <ol>Configuración</ol>
              <ol>
                Modo nocturno
                <span style={{ float: 'right', marginTop: '-10px' }}>
                  <Switch
                    // checked={true}
                    // onChange={ }
                    color="primary"
                    name="checkedB"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                </span>
              </ol>
            </div>
          </React.Fragment>
        ) : (
          <Login />
        )}
    </div>
  )
}

export default PreviewUser
