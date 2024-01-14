import React, { createContext } from 'react'
import { getNotifications } from './utils'

const MainContext = createContext()

const MainProvider = async ({ children }) => {
  const notifications = await getNotifications({})
  const changeValue = (key, valor) => {
    this.setState({
      [key]: valor,
    })
  }

  const initialState = {
    name: 'test',
    notifications,
    changeValue,
  }

  return <MainContext.Provider value={initialState}></MainContext.Provider>
}

export default MainProvider
