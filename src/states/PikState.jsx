import { createStore } from 'redux'
import { createWrapper, HYDRATE } from 'next-redux-wrapper'
import { gql, useLazyQuery } from '@apollo/client'
import React, { useContext, useEffect, useReducer } from 'react'
import PikReducer from './PikReducer'
import { createContext } from 'react'
import { GET_NOTIFICATIONS } from '../lib/utils'

const PikState = props => {
  const initialState = {
    coins: 0,
    current_date: new Date(),
    guide_step: 1, // guia de bienvenida de primeros usuarios
    isOpenNotifications: false,
    isMobile: false,
    isOpenPreviewProfile: false,
    notifications: [],
    messageModal: { id: 'empty' },
    checkedNotifications:
      typeof window != 'undefined' &&
      localStorage.getItem('checkedNotifications')
        ? JSON.parse(localStorage.getItem('checkedNotifications'))
        : [],
    selectedUser: null,
    user:
      typeof window != 'undefined' && localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user'))
        : {
            id: 0,
          },
    showNotification: true,
  }

  const [state, dispatch] = useReducer(PikReducer, initialState)

  const [getNotifications] = useLazyQuery(GET_NOTIFICATIONS, {
    // Obteniendo notificaciones
    fetchPolicy: 'no-cache',
    // polInterval: 5000,
    variables: {
      user: state.user.id,
    },
    onCompleted: ({ getNotifications }) => {
      debugger
      getNotifications &&
        dispatch({
          type: 'CHANGE_PROPERTY',
          payload: { property: 'notifications', value: getNotifications },
        })
    },
  })
  //

  const customDispatch = values => {
    dispatch(values)
  }

  const gettingNotifications = () => {
    getNotifications()
  }

  useEffect(() => {
    // Al iniciar
    // sessionStorage.setItem("notifications", "{}")
    // if (!localStorage.getItem("checkedNotifications")) {
    //   localStorage.setItem("checkedNotifications", "[]")
    // }
    // if (!!localStorage.getItem("user")) {
    //   dispatch({ type: "CHANGE_PROPERTY", payload: { property: "user", value: JSON.parse(localStorage.getItem("user")) } })
    //   getNotifications()
    // }
  }, [])
}

const reducer = (state = { tick: 'init' }, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload }
    case 'TICK':
      return { ...state, tick: action.payload }
    default:
      return state
  }
}

const makeStore = context => createStore(reducer)

export const wrapper = createWrapper(makeStore, { debug: true })

//   return (
//     <PikContext.Provider
//       value={{
//         ...state,
//         customDispatch,
//         getNotifications
//       }}
//     >
//       {props.children}
//     </PikContext.Provider>
//   )
// }

// export const PikContext = createContext()

// export default PikState
