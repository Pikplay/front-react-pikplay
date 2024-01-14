// @ts-nocheck

import React, { useState } from 'react'
import styles from '../styles.module.scss'
import { useIAStore } from '../../../src/store/IA';

const competitionsList = [
  {
    title: "Rifa de Nintendo Switch Oled 2024 + 2 juegos a elección",
    author: {
      name: "Juan Perez",
      image: "https://i.pravatar.cc/150?img=1",
    },
    availableNumbers: 10,
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
        <h1>Listado de concursoa activos</h1>
        {
          competitionsList.map((competition) => (
            <div>
              <h2>{competition.title}</h2>
              <div>Números disponibles: {competition.availableNumbers}</div>
              <p>Por: {competition.author.name}</p>
              <img src={competition.author.image} alt={competition.author.name} />
              <button onClick={goToDetail}>Pedir número</button>
            </div>
          ))}
      </div>
      :
      <div>
        Detalle de lal concurso
        <NumbersBox />
        <button onClick={() => setCompetitionId(0)}>Volver</button>
      </div>
    }
  </div>
}

type NumberBoxProps = {
  name: string;
  status: string;
}

const NumbersBox = () => {
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
