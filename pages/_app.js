import React, { useEffect, useState } from 'react'
import TagManager from 'react-gtm-module'
import graphqlClient from '../lib/graphqlClient'
import { ApolloProvider } from '@apollo/client'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import { persistStore } from 'redux-persist'
import { useStore } from '../lib/store'
import { versions } from '../lib/utils'
import Loading from '../components/loading/Loading'
import '../styles/globalStyles.scss'

const MyApp = (props) => {
  const { Component, pageProps, router } = props
  const store = useStore(pageProps.initialReduxState)
  const persistor = persistStore(store, {}, function () {
    persistor.persist()
  })

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#c93530'
      },
      secondary: {
        main: '#1b95b3'
      }
    }
  })

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
    TagManager.initialize({ gtmId: 'GTM-5WB6P7C' })
    // Cleaning cache if version is not the same
    const lastClientVersion = localStorage.getItem('current_version')
    const lastVersion = versions[0]
    if (lastClientVersion) {
      if (lastClientVersion !== lastVersion) {
        localStorage.clear() // cleaning localStorage
        // cleaning cache
        document.cookie.replace(/(?<=^|;).+?(?=\=|;|$)/g, name => location.hostname.split('.').reverse().reduce(domain => (domain = domain.replace(/^\.?[^.]+/, ''), document.cookie = `${name}=;max-age=0;path=/;domain=${domain}`, domain), location.hostname))
        localStorage.setItem('current_version', lastVersion)
        window.location.reload(true)
      }
    } else {
      localStorage.setItem('current_version', lastVersion)
    }
  }, [])

  useEffect(() => {
    import('react-facebook-pixel')
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init('627225011598226') // facebookPixelId
        ReactPixel.pageView()

        router.events.on('routeChangeComplete', () => {
          ReactPixel.pageView()
        })
      })
  }, [router.events])

  return <Provider store={store}>
    {/* <PersistGate persistor={persistor}> */}
      <ApolloProvider client={graphqlClient}>
        {/* <Loading /> */}
        <Component {...pageProps} key={router.name} />
      </ApolloProvider>
    {/* </PersistGate> */}
  </Provider>

  return <div>
    {process.browser ? <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ApolloProvider client={graphqlClient}>
            <Loading />
            <Component {...pageProps} key={router.name} />
          </ApolloProvider>
        </PersistGate>
      </Provider>
    </MuiThemeProvider>
      : <div />
    }
  </div>
}

export default MyApp
