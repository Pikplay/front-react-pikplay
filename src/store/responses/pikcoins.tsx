import React from 'react';
import Button from '../../components/button/Button'
import CoinIcon from '../../components/CoinIcon/CoinIcon';

const Height = "160px"
const HtmlMessage = <div>
    <CoinIcon hideNumber />
</div>
const Message = `Claro, te explico. <br /><br />
<b>Pikcoins</b> son las monedas que puedes ganar por jugar y participar en los eventos de Pikplay.
<br /> <br />
Puedes canjearlas por premios o redimir en compras. <br /> <br />¿Quieres saber más ?
<a target="_BLANK" href="http://localhost/articulo/pikcoins-que-son-y-como-redimir-cupones">Conoce más sobre los Pikcoins</a>`
const Expresion = 'neutral'
const Options = ({ handleUserMessage, set }) => {
    debugger;
    return <>
        <Button color='transparent'>
            Saber más de Pikcoins
        </Button>
        <Button color='transparent' onClick={() => handleUserMessage('inicio', set)}>
            Volver al inicio
        </Button>
    </>
}

export {
    Expresion,
    Height,
    HtmlMessage,
    Message,
    Options,
}
