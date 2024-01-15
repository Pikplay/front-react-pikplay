import React from 'react'
import styles from './styles.module.scss'

const SpecialButton = () => {
    return <div className={styles.SpecialButton}>
        <div className={styles.wrapper}>
            <svg height="60" width="320" xmlns="http://www.w3.org/2000/svg">
                <rect className="shape" height="60" width="320" />
            </svg>
            <div className="text">Subir de Categoria</div>
        </div>
    </div>
}

export default SpecialButton
