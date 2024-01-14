import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Transacciones from './Transacciones'

test('', () => {
  const note = {
    content: 'This is a test',
    important: true,
  }

  const component = render(<Transacciones />)
})
