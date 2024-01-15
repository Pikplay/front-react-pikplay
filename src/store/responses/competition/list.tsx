import React from 'react';
import Button from '../../../components/button/Button'
import Link from 'next/link';

const Message = `Los concursos son actividades que nuestros aliados realizan para afianzar su marca y premiar a los usuarios que participan. 
<br /><br />`
const Html = <ul>
    <Link href="/articulo/conocenos">1. PS5 Disco, Organiza: Blue Panther Medellín</Link>
</ul>
const Options = ({ handleUserMessage, set }) => {
    return <>
        <Button color='transparent' onClick={() => handleUserMessage('init', set)}>
            Volver al inicio
        </Button>
    </>
}

export {
    Html,
    Message,
    Options,
}
