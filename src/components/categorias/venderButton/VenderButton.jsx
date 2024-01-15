import React from 'react'
import Link from 'next/link'
import Button from '../../button/Button'

const VenderButton = () => {
  return (
    <Link href='/publicacion/crear' as='/publicacion/crear'>
      <Button color='blue' outline>
        Vender
      </Button>
    </Link>
  )
}

export default VenderButton
