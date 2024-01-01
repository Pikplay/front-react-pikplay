import cookieCutter from 'cookie-cutter'
import storage from 'redux-persist/lib/storage'
import { composeWithDevTools } from 'redux-devtools-extension'
import { configureStore, createSlice, ThunkAction } from '@reduxjs/toolkit'
import { createStore, applyMiddleware } from 'redux'
import { createWrapper, HYDRATE } from 'next-redux-wrapper'
import { persistStore, persistReducer } from 'redux-persist'
import { useMemo } from 'react'
import { useQuery } from '@apollo/client'
import { GET_PUBLICATIONS } from './utils'

let store

const initialState = {
  checkedNotifications:
    typeof window !== 'undefined' && localStorage.getItem('checkedNotifications')
      ? JSON.parse(localStorage.getItem('checkedNotifications'))
      : [],
  coins: 0,
  current_date: new Date(),
  guide_step: 1, // guia de bienvenida de primeros usuarios
  isMobile: false,
  messageModal: { id: 'empty' },
  notifications: [],
  selectedUser: null,
  showNotification: true,
  user: { id: 0 },
}

// create your reducer
const reducer = (state = initialState, action) => {
  const { payload, type } = action
  switch (type) {
    case HYDRATE:
      return { ...state, ...action.payload }

    case 'CHANGE_PROPERTY':
      return { ...state, [action.payload.property]: action.payload.value }

    case 'DELETE_NOTIFICATION':
      const { notifications } = payload
      return {
        ...state,
        notifications,
      }

    case 'LOGOUT':
      cookieCutter.set('token', '', { expires: new Date(0) })
      return { ...state, user: { id: 0 } }

    case 'SET_MESSAGE':
      const notifications1Time = ['postRegistro']
      const messageModal = !payload?.message
        ? { id: 'empty', message: '' }
        : payload.message
      // si el tipo de notificacion es 1time debe quedar almacenada en local storage
      notifications = localStorage.getItem('checkedNotifications')
        ? JSON.parse(localStorage.getItem('checkedNotifications'))
        : []
      if (
        notifications1Time.indexOf(messageModal.id) != 1 &&
        notifications.find(item => item == messageModal.id)
      ) {
        // si es notificacion 1time y ya lo tenemos en el local storage no se debe mostrar
        messageModal.id = 'empty'
      }
      if (
        notifications1Time.indexOf(messageModal.id) != -1 &&
        !notifications.find(item => item == messageModal.id)
      ) {
        // notifications.push(messageModal.id)
        // localStorage.setItem("checkedNotifications", JSON.stringify(notifications))
      }
      return {
        ...state,
        messageModal,
      }
    case 'RECLAMAR_COINS':
      return {
        ...state,
        coins: state.coins + payload.coins,
      }
    case 'PUBLICATION_FORM':
      return {
        ...state,
        publication_form: { ...payload },
      }
    default:
      return state
  }
}

const persistedReducer = persistReducer(
  {
    key: 'pikplay',
    storage,
    whitelist: ['user', 'modal_lead', 'publication_form'], // only these reducers will be persisted
  },
  reducer,
)

// create a makeStore function
const makeStore = initialState =>
  createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware()),
  )

export const initializeStore = preloadedState => {
  let _store = store ?? makeStore(preloadedState)
  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = makeStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }
  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store
  return _store
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}
