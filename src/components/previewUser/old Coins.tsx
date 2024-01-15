import { gql, useLazyQuery } from '@apollo/client'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { formatNumber } from '../../lib/utils'
import styles from './styles.module.scss'

interface CoinsProps {
  coins?: number
}

const CoinIcon = ({ coins }: CoinsProps) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [isAnimate, setIsAnimate] = useState(false)
  coins = coins ? coins : useSelector(state => state.coins)
  const prevCountCoins = useRef()

  useEffect(() => {
    prevCountCoins.current = coins
  })

  const previousCoins = prevCountCoins.current ? prevCountCoins.current : 0

  useEffect(() => {
    getCoins()
  }, [])

  const GET_COINS = gql`
    query getCoins($user: Int) {
      getCoins(user: $user) {
        id
        user
        detail
        value
        created
      }
    }
  `

  const [getCoins] = useLazyQuery(GET_COINS, {
    fetchPolicy: 'no-cache',
    variables: {
      user: user.id,
    },
    onCompleted: ({ getCoins }) => {
      const coins = getCoins
        ? getCoins.reduce((total, coin) => coin.value + total, 0)
        : 0
      dispatch({
        type: 'CHANGE_PROPERTY',
        payload: { property: 'coins', value: coins },
      })
    },
  })

  const animate = () => {
    setIsAnimate(true)
    setTimeout(() => {
      setIsAnimate(false)
    }, 2000)
  }

  const animateValue = (start, end, duration) => {
    let startTimestamp = null
    const step = timestamp => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      // setCoins(Math.floor(progress * (end - start) + start))
      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }
    window.requestAnimationFrame(step)
  }

  useEffect(() => {
    const initialCoins = 0
    animateValue(previousCoins, initialCoins, 1000)
    animate()
  }, [])

  return (
    <div
      className={`${styles.Coins} ${isAnimate ? styles.animated : ''}`}
      onMouseEnter={animate}
    >
      <picture className={styles.coin} />
      <div className={`f-s-14 ${styles.number} number-coins`}>
        {formatNumber(coins)}
      </div>
      <label>Pikcoins</label>
    </div>
  )
}

export default CoinIcon
