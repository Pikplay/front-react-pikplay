import { faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Button from '../button/Button'

const Checkout = props => {
  const {
    address_billing,
    amount,
    email_billing,
    invoice,
    mobilephone_billing,
    name,
    name_billing,
    number_doc_billing,
  } = props

  const openchekout = e => {
    e.preventDefault()

    var handler = window.ePayco.checkout.configure({
      key: 'b5bb21e660ef8dd79d82af917fd5ff89',
      test: true,
    })

    let data = {
      name,
      description: name,
      invoice,
      currency: 'cop',
      amount,
      tax_base: '0',
      tax: '0',
      country: 'co',
      lang: 'es',
      external: 'false',
      extra1: '',
      extra2: '',
      extra3: '',
      confirmation: 'https://pikplay.co/transacciones',
      response: 'https://pikplay.co/transacciones',
      name_billing,
      address_billing,
      type_doc_billing: 'cc',
      mobilephone_billing,
      number_doc_billing,
      email_billing,
    }
    handler.open(data)
  }

  return (
    <React.Fragment>
      <Button onClick={openchekout} color='blue'>
        <FontAwesomeIcon className='m-r-10' icon={faShoppingBag} />
        Pagar
      </Button>
    </React.Fragment>
  )
}

export default Checkout
