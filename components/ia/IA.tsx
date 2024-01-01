import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Button from '../button/Button'
import ReactTyped from "react-typed"
import CoinIcon from '../CoinIcon/CoinIcon'
import { formatNumber } from '../../lib/utils'
import styles from './styles.module.scss'

const IA = (props) => {
    const pikcoinTRM = 1200
    const { expression } = props;
    const expressionsList = ['happy', 'sad', 'angry', 'surprised', 'confused', 'disgusted', 'fearful', 'neutral'];
    const defaultInitialMessage = `Hola! en que te puedo ayudar? <br/> El precio de la <b>Pikcoin</b> de hoy es $${formatNumber(pikcoinTRM)}`
    const [isVisible, setIsvisible] = useState(false)
    const [IAMessage, setIAMessage] = useState(<></>)
    const [IAOptions, setIAOptions] = useState(<></>)
    const [userMessage, setUserMessage] = useState(null)
    const [containerHeight, setContainerHeight] = useState("250px")
    const [IAHTMLMessage, setIAHTMLMessage] = useState(<></>)
    const [IAExpression, setIAExpression] = useState('neutral')
    const teenegerGames = <ul>
        <Link href="/articulo/conocenos">1. PS5 Disco, Organiza: Blue Panther Medellín</Link>
    </ul>

    const defaultIAOptions = <>
        <Button color='transparent' onClick={() => handleUserMessage('pikcoins')}>
            ¿Que son los Pikcoins?
        </Button>
        <Button color='transparent' onClick={() => handleUserMessage('regalo')}>
            Quiero asesoria para un regalo
        </Button>
        <Button color='transparent' onClick={() => handleUserMessage('playstation')}>
            Jugadores Playstation
        </Button>
        <Button color='transparent' onClick={() => handleUserMessage('xbox')}>
            Jugadores XBOX
        </Button>
        <Button color='transparent' onClick={() => handleUserMessage('concursos')}>
            Concursos
        </Button>
        <Button color='transparent' onClick={() => handleUserMessage('otros-temas')}>
            Otros temas
        </Button>
    </>

    const hide = () => {
        setIsvisible(false)
    }

    const handleUserMessage = (message) => {
        setUserMessage(message)
        calculateResponse(message)
    }

    useEffect(() => {
        setTimeout(() => {
            setIAMessage(<ReactTyped strings={[defaultInitialMessage]} typeSpeed={20} />);
            setIAOptions(defaultIAOptions)
        }, 1000)
    }, [])

    const handleRouter = () => {
        alert()
    }

    const calculateResponse = (mensaje) => {
        let IAMessageSelected
        let loadingOptions = ["Hmmm...", "Ya veo...", "Que podria ser...", "Ok, te entiendo..."]
        let seleccionAleatoria = loadingOptions[Math.floor(Math.random() * loadingOptions.length)]
        const loadingMessage = <span>{seleccionAleatoria}</span>
        let IAOptionsSelected
        let containerHeightSelected
        let IAHTMLMessageSelected = <></>
        let IAExpressionSelected = 'neutral'

        switch (mensaje) {
            case 'regalo/10-15':
                IAHTMLMessageSelected = teenegerGames
                IAMessageSelected = `Te recomendamos los siguientes juegos, son los más buscados/vendidos para jovenes de 10 a 15 años.`
                IAOptionsSelected = <>
                    <Button color='transparent' onClick={() => handleUserMessage('playstation/juegos-gratis')}>
                        Juegos gratis del mes
                    </Button>
                    <Button color='transparent' onClick={() => handleUserMessage('inicio')}>
                        Volver al inicio
                    </Button>
                </>
                containerHeightSelected = "300px"
                break;

            case 'concursos':
                IAMessageSelected = `Los concursos son actividades que nuestros aliados realizan para afianzar su marca y premiar a los usuarios que participan. 
                <br /><br />`
                IAHTMLMessageSelected = <ul>
                    <Link href="/articulo/conocenos">1. PS5 Disco, Organiza: Blue Panther Medellín</Link>
                </ul>

                IAOptionsSelected = <>
                    <Button color='transparent' onClick={() => handleUserMessage('inicio')}>
                        Volver al inicio
                    </Button>
                </>
                containerHeightSelected = "300px"
                break;

            case 'otros-temas':
                IAMessageSelected = "Te interesa algo de esto?"
                IAOptionsSelected = <>
                    <Button color='transparent' onClick={() => handleUserMessage('otros-temas/eventos')}>
                        Eventos activos
                    </Button>
                    <Button color='transparent' onClick={() => handleUserMessage('inicio')}>
                        Volver al inicio
                    </Button>
                </>
                containerHeightSelected = "90px"
                break;

            case 'playstation':
                IAMessageSelected = "¿Sobre que quieres saber?"
                IAOptionsSelected = <>
                    <Button color='transparent' onClick={() => handleUserMessage('playstation/juegos-gratis')}>
                        Juegos gratis del mes
                    </Button>
                    <Button color='transparent' onClick={() => handleUserMessage('inicio')}>
                        Volver al inicio
                    </Button>
                </>
                containerHeightSelected = "90px"
                break;

            case 'playstation/juegos-gratis':
                IAMessageSelected = `Los juegos gratis de Diciembre son: <br /> <br />
                1. GTA V < br />
                    2. Juego 2 < br />
                        3. Juego 3 < br /> `
                IAOptionsSelected = <>
                    <Button color='transparent' onClick={() => handleUserMessage('inicio')}>
                        Volver al inicio
                    </Button>
                </>
                containerHeightSelected = "250px"
                break;

            case 'regalo':
                IAMessageSelected = "Que edad tiene la persona a la cual le quieres dar el obsequio?"
                IAExpressionSelected = 'loved'
                IAOptionsSelected = <>
                    <Button color='transparent'>
                        Entre 10 y 15 años
                    </Button>
                    <Button color='transparent' onClick={() => handleUserMessage('regalo/10-15')}>
                        Entre 15 y 18 años
                    </Button>
                    <Button color='transparent' onClick={() => handleUserMessage('')}>
                        Más de 18 años
                    </Button>
                    <Button color='transparent' onClick={() => handleUserMessage('inicio')}>
                        Volver al inicio
                    </Button>
                </>
                containerHeightSelected = "160px"
                break;

            case 'pikcoins':
                IAHTMLMessageSelected = <div>
                    <CoinIcon hideNumber />
                </div>
                IAMessageSelected = `Claro, te explico. < br /><br />
                <b>Pikcoins</b> son las monedas que puedes ganar por jugar y participar en los eventos de Pikplay.
                < br /> <br />
                Puedes canjearlas por premios o redimir en compras. < br /> <br />¿Quieres saber más ?
                    <a target="_BLANK" href="http://localhost/articulo/pikcoins-que-son-y-como-redimir-cupones">Conoce más sobre los Pikcoins</a>`
                IAOptionsSelected = <>
                    <Button color='transparent'>
                        Saber más de Pikcoins
                    </Button>
                    <Button color='transparent' onClick={() => handleUserMessage('inicio')}>
                        Volver al inicio
                    </Button>
                </>
                containerHeightSelected = "280px"
                break;

            default:
                IAExpressionSelected = 'neutral'
                IAMessageSelected = defaultInitialMessage
                IAOptionsSelected = defaultIAOptions
                containerHeightSelected = "210px"
                break;
        }

        // Applying actions
        setIAMessage(loadingMessage)
        setTimeout(() => {
            setContainerHeight(containerHeightSelected)
            setIAMessage(<ReactTyped strings={[IAMessageSelected]} typeSpeed={20} />);
            setIAOptions(IAOptionsSelected)
            setIAHTMLMessage(IAHTMLMessageSelected)
            setIAExpression(IAExpressionSelected)
        }, 1000)
    }

    return <div className={`${styles.container} ${!isVisible ? styles.hide : null} `}>
        <div className={`${styles.pacoMin} ${isVisible ? styles.hide : null} `} onClick={() => setIsvisible(true)}>
            <img src={`/images/ia/4.png`} />
        </div>
        <div className={styles.box}>
            <div className={styles.title}>
                Bienvenido a <b>Pikplay Colombia</b>
                <div className={styles.hide} onClick={() => setIsvisible(false)}>X</div>
            </div>
            <div className={styles.text} style={{ height: containerHeight }}>
                <div className={styles.list}>
                    {IAHTMLMessage}
                    {IAMessage}
                </div>

                <div className={styles.buttons}>
                    {IAOptions}
                </div>
                {/* <input placeholder='¿Que te gustaria saber?' onKeyDown={e => enterKey(e)} /> */}
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
