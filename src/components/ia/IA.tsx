import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Button from '../button/Button'
import ReactTyped from "react-typed"
import CoinIcon from '../CoinIcon/CoinIcon'
import { formatNumber } from '../../lib/utils'
import { useIAStore } from '../../store/IA'
import styles from './styles.module.scss'

const IA = (props) => {
    const {
        isVisible,
        IAMessage,
        setIAMessage,
        IAOptions,
        setIAOptions,
        handleUserMessage,
        setIsvisible,
        IAExpression,
        containerHeight,
        IAHTMLMessage,
    } = useIAStore((state => state))

    useEffect(() => {
        setTimeout(() => {
            handleUserMessage("initial")
        }, 1000)
    }, [])

    return <div className={`${styles.IAElement} ${!isVisible ? styles.hide : null} `}>
        <div className={`${styles.pacoMin} ${isVisible ? styles.hide : null} `} onClick={() => setIsvisible(true)}>
            <img src={`/images/ia/4.png`} />
        </div>
        <div className={styles.box}>
            <div className={styles.title}>
                Bienvenido a <b>Pikplay Colombia</b>
                <div className={styles.hide} onClick={() => setIsvisible(false)}>x</div>
            </div>
            <div className={styles.text} style={{ height: containerHeight }}>
                <div className={styles.list}>
                    {IAHTMLMessage}
                    {IAMessage}
                </div>

                <div className={styles.buttons}>
                    {IAOptions}
                </div>
            </div>
            <div className={styles.character}>
                <picture className={`${styles.head} ${styles[IAExpression]} `}>
                </picture>
                <div className={styles.circle}>
                    <img className={styles.body} src="/images/ia/cuerpo.png" />
                </div>
            </div>
        </div>
    </div>
}

export default IA
