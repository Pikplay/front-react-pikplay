import React, { useEffect, useState } from 'react'
import Insignia from './Insignia'
import styles from './insignias.module.scss'

const data = {
  insignias: [
    { id: 'first', name: 'Primera compra' },
  ]
}

const Insignias = () => {

  const [insignias, setInsignias] = useState(data.insignias)

  useEffect(() => {
    setTimeout(() => {
      const newInsignia = { id: 'second', name: 'Segunda compra', isNew: true }
      setInsignias([ ...insignias, newInsignia ])
    }, 1000)
  }, [])

  return (
    <div className={styles.Insignias}>
      <h4>Insignias</h4>
      <div className={styles.list}>
        {
          insignias.map(item => {
            return <Insignia data={item} id={item.id} key={item.id} />
          })
        }
      </div>
    </div>
  )
}

export default Insignias
