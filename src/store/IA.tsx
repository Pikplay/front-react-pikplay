import React, { useState } from 'react'
import { create } from 'zustand'
import { formatNumber } from '../lib/utils'
import Button from '../components/button/Button'
import CoinIcon from '../components/CoinIcon/CoinIcon'
import ReactTyped from 'react-typed'
import Link from 'next/link'
import { Message as IAMessageCompetition, Options as IAOptionsCompetition } from './responses/competition/competition'
import { Message as IAMessageCompetition_Yes, Options as IAOptionsCompetition_Yes } from './responses/competition/yes'
import { Message as IAMessageCompetition_List, Options as IAOptionsCompetition_List, Html as IAHtmlMessageCompetition_List } from './responses/competition/list'
import { Message as IAMessageDefault, Options as IAOptionsDefault } from './responses/default'
import { Message as IAMessageGift, Options as IAOptionsGift, Expresion as IAExpressionGift, Height as IAcontainerHeightGift } from './responses/gift'
import { HtmlMessage as IAHtmlMessagePikcoins, Message as IAMessagePikcoins, Options as IAOptionsPikcoins, Height as IAcontainerHeightPikcoins } from './responses/pikcoins'

interface State {
  containerHeight: string,
  IAOptions: React.ReactNode,
  isVisible: boolean,
  IAMessage: string,
  IAExpression: string,
  IAHTMLMessage: React.ReactNode,
  handleUserMessage: (message: string) => void,
  setIAMessage: (message: string) => void,
  setIAOptions: (options: React.ReactNode) => void,
  setIsvisible: (isVisible: boolean) => void,
}

const handleUserMessage = (message, set) => {
  calculateResponse(message, set)
}

const calculateResponse = (mensaje, set) => {
  let IAMessageSelected
  let loadingOptions = ["Hmmm...", "Ya veo...", "Que podria ser...", "Ok, te entiendo..."]
  let seleccionAleatoria = loadingOptions[Math.floor(Math.random() * loadingOptions.length)]
  const loadingMessage = <span>{seleccionAleatoria}</span>
  let IAOptionsSelected
  let containerHeightSelected
  let IAExpressionSelected = 'neutral'
  let IAHTMLMessageSelected

  switch (mensaje) {

    case 'competition':
      IAMessageSelected = IAMessageCompetition
      IAOptionsSelected = IAOptionsCompetition
      break;

    case 'competition/list':
      IAMessageSelected = IAMessageCompetition_List
      IAOptionsSelected = IAOptionsCompetition_List
      IAHTMLMessageSelected = IAHtmlMessageCompetition_List
      break;

    case 'competition/yes':
      IAMessageSelected = IAMessageCompetition_Yes
      IAOptionsSelected = IAOptionsCompetition_Yes
      break;

    case 'regalo/10-15':
      IAHTMLMessageSelected = <ul>
        <Link href="/articulo/conocenos">1. PS5 Disco, Organiza: Blue Panther Medellín</Link>
      </ul>
      IAMessageSelected = `Te recomendamos los siguientes juegos, son los más buscados/vendidos para jovenes de 10 a 15 años.`
      IAOptionsSelected = <>
        <Button color='transparent' onClick={() => handleUserMessage('playstation/juegos-gratis', set)}>
          Juegos gratis del mes
        </Button>
        <Button color='transparent' onClick={() => handleUserMessage('inicio', set)}>
          Volver al inicio
        </Button>
      </>
      containerHeightSelected = "300px"
      break;

    case 'otros-temas':
      IAMessageSelected = "Te interesa algo de esto?"
      IAOptionsSelected = <>
        <Button color='transparent' onClick={() => handleUserMessage('otros-temas/eventos', set)}>
          Eventos activos
        </Button>
        <Button color='transparent' onClick={() => handleUserMessage('inicio', set)}>
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
      IAMessageSelected = IAMessageGift
      IAOptionsSelected = IAOptionsGift
      IAExpressionSelected = IAExpressionGift
      containerHeightSelected = IAcontainerHeightGift
      break;

    case 'pikcoins':
      IAHTMLMessageSelected = IAHtmlMessagePikcoins
      IAMessageSelected = IAMessagePikcoins
      IAOptionsSelected = IAOptionsPikcoins
      containerHeightSelected = IAcontainerHeightPikcoins
      break;

    default:
      IAExpressionSelected = 'neutral'
      IAMessageSelected = IAMessageDefault
      IAOptionsSelected = IAOptionsDefault
      containerHeightSelected = "210px"
      break;
  }

  // Applying actions
  set({ IAMessage: loadingMessage })
  setTimeout(() => {
    set({
      IAMessage: <ReactTyped strings={[IAMessageSelected]} typeSpeed={20} />,
      IAOptions: middleWare(IAOptionsSelected, set),
      IAExpression: IAExpressionSelected,
      IAHTMLMessage: IAHTMLMessageSelected,
      containerHeight: containerHeightSelected,
    })
  }, 1000)
}

const middleWare = (Component, set) => {
  return <Component handleUserMessage={handleUserMessage} set={set} />
}

export const useIAStore = create<State>((set, get) => ({
  containerHeight: "210px",
  IAOptions: <></>,
  isVisible: false,
  IAMessage: '',
  IAExpression: 'neutral',
  IAHTMLMessage: <></>,
  handleUserMessage: (message) => handleUserMessage(message, set),
  setIAMessage: (message) => set({ IAMessage: message }),
  setIAOptions: (options) => set({ IAOptions: options }),
  setIsvisible: (isVisible) => set({ isVisible: isVisible }),
}))
