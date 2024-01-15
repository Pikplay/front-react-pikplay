import React from 'react'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import styles from './styles.module.scss'

const Loading = props => {
  const { isReady } = props
  const [out, setOut] = useState(false)

  useEffect(() => {
    // setTimeout(() => {
    //     setOut(true)
    // }, 2000)
  }, [isReady])

  return (
    <div
      className={classNames('', {
        [styles.LoadingComponenty]: true,
        [styles.out]: out,
      })}
    >
      <p>
        <span>Cargando...</span>
        <span>Creando publicación...</span>
      </p>
      <img
        loading='lazy'
        src='/images/gifs/loading.gif'
        alt='cargando contenido'
      />
    </div>
  )
}

export default Loading
