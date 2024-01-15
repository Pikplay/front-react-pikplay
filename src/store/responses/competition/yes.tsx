import React from 'react';
import Button from '../../../components/button/Button'

const Message = `Ahora estas participando!, Ahora lo que sigue es pagar tu boleta y como dijo la chancera "Mucha suerte!!!"`
const Options = ({ handleUserMessage, set }) => {
    return <>
        <Button color='blue' onClick={() => handleUserMessage('inicio', set)}>
            Pagar mi boleta
        </Button>
        <Button color='transparent' onClick={() => handleUserMessage('inicio', set)}>
            Hablar con el asesor
        </Button>
    </>
}

export {
    Message,
    Options,
}
