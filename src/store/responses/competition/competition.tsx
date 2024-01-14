import React from 'react';
import Button from '../../../components/button/Button'

const Message = `Bienvenido a los concursos en <b>Pikplay</b>. <br />
Estaras jugando con el número 72, deseas reservarlo?`
const Options = ({ handleUserMessage, set, options }) => {
    debugger;
    return <Button color='blue' onClick={() => handleUserMessage('competition/yes', set)}>
        Si
    </Button>
}

export {
    Message,
    Options,
}
