// @ts-nocheck

import React, { useState } from 'react'
import styles from '../styles.module.scss'
import { useIAStore } from '../../../src/store/IA'
const { motion } = require('framer-motion')

const competitionsList = [
  {
    availableNumbers: 10,
    author: {
      name: "Juan Perez",
    },
    image: "/images/others/ps5.png",
    title: "Rifa de Nintendo Switch Oled 2024 + 2 juegos a elección",
    right: "-80px"
  },
  {
    availableNumbers: 87,
    author: {
      name: "Juancho Fenix",
    },
    image: "/images/others/control-switch.png",
    title: "Control Joy-Con - Rojo Neón y Azul Neón",
    right: "-120px"
  }
]

const CompetitionsList = () => {
  const [competitionId, setCompetitionId] = useState<number>(0);
  const goToDetail = () => {
    setCompetitionId(1);
  }

  return <div className={styles.Detail}>
    {competitionId == 0
      ?
      <div>
        <h1>Listado de concursos activos</h1>
        <div className={styles.competitionsList}>
          {
            competitionsList.map((competition, ind) => (
              <motion.article
                className='Card'
                key={ind}
                initial={{ y: '100%' }}
                onClick={goToDetail}
                whileHover={{ scale: 1.1 }}
                animate={{
                  y: 0,
                }}
              >
                <h2>{competition.title}</h2>
                <div>
                  Números <br />
                  disponibles: {competition.availableNumbers}
                </div>
                <p>
                  Organizador: <br />
                  {competition.author.name}
                </p>
                <img width={200} style={{ right: competition.right }} src={competition.image} />
              </motion.article>
            ))}
        </div>
      </div>
      :
      <div>
        Detalle de lal concurso
        <CompetitionDetail />
        <button onClick={() => setCompetitionId(0)}>Volver</button>
      </div>
    }
  </div>
}

type NumberBoxProps = {
  name: string;
  status: string;
}

const CompetitionDetail = () => {
  const {
    setIsvisible,
    handleUserMessage
  } = useIAStore((state => state))

  const quantityNumbers = 100;
  const numbersList = Array.from({ length: 100 }, (_, i) => i + 1).map((number) => (
    { name: '', status: 'available', isPaid: false, number: null }
  ));

  numbersList[22] = { name: 'Juan', status: 'blocked', isPaid: true, number: 3187414972 }
  numbersList[11] = { name: 'Diana', status: 'blocked', isPaid: false, number: 3187414972 }
  numbersList[41] = { name: 'Isabella', status: 'blocked', isPaid: true, number: 3187414972 }

  const handleClick = (number) => {
    setIsvisible(true)
    handleUserMessage('competition')
  }

  return <div className={styles.contentOptions} style={{ display: 'flex', flexWrap: 'wrap' }}>
    {
      numbersList.map((number, ind) => (
        <div
          className={`${styles.option} 
        ${styles[number.status]}`}
          onClick={handleClick}
        >
          <div>{ind}</div>
          <div>{number.name}</div>
          <div>{number.isPaid && 'Pagado'}</div>
        </div>
      ))
    }
  </div>
}

export default CompetitionsList
