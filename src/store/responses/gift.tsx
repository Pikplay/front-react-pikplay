import React from 'react';
import Button from '../../components/button/Button'

const Message = `Que edad tiene la persona a la cual le quieres dar el obsequio?`
const Expresion = 'loved'
const Height = "160px"
const Options = (handleUserMessage, set) => {
    debugger;
    return <>
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
}

export {
    Height,
    Expresion,
    Message,
    Options,
}
