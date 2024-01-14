import React from 'react'

import styles from './challenges.module.scss'
import { useQuery } from '@apollo/client'
import { GET_CHALLENGES } from '../../lib/utils.jsx'
import Coins from '../previewUser/old Coins'

import Skeleton from '@material-ui/lab/Skeleton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import Button from '../button/Button'

const Challenges = () => {
  const { data, loading } = useQuery(GET_CHALLENGES, {
    context: {
      headers: {
        'Operation-Name': 'getChallenges',
      },
    },
  })

  return (
    <section className={styles.ChallengeSection}>
      <div className={styles.challengeHeader}>
        <h3>¡Ve por más!</h3>
        <p>
          ¡Completa desafíos y gana muchos pikcoins! <br />
          Cada dia habrá nuevos desafíos.
        </p>
      </div>

      {loading
        ? new Array(3)
            .fill(null)
            .map((_, i) => (
              <Skeleton
                key={i}
                variant='rect'
                width='100%'
                height={120}
                className='Card'
              />
            ))
        : data.getChallenges.map(
            ({
              id,
              title,
              targetPoints,
              currentPoints,
              prizeCoins,
              deadLine,
              image,
              description,
              finished,
            }) => (
              <article key={id} className={`${styles.challenge}`}>
                {finished && (
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={styles.challengeCompleteIcon}
                  />
                )}
                <picture className={styles.image}>
                  <img className={styles.image} src={image} />
                </picture>
                <div className={styles.challengeDetails}>
                  <h4 className={styles.challengeTitle}>{title}</h4>
                  <div className={styles.progressContainer}>
                    <span
                      className={styles.progressBar}
                      style={{
                        width: `calc((100% * ${currentPoints}) / ${targetPoints})`,
                      }}
                    ></span>
                    <span className={styles.progressScore}>
                      {currentPoints}/{targetPoints}
                    </span>
                  </div>
                  <p>{description}</p>
                  <p>
                    {' '}
                    Expires on: {''}
                    <span className={styles.deadLine}>{deadLine}</span>
                  </p>
                </div>

                <div>
                  <div className={styles.coins_wrapper}>
                    <Coins coins={prizeCoins} />
                  </div>
                  <Button
                    className={styles.btnReclamar}
                    color='blue'
                    disabled={!finished}
                  >
                    Reclamar
                  </Button>
                </div>
              </article>
            ),
          )}
    </section>
  )
}
export default Challenges
