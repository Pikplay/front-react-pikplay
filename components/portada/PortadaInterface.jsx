const { IS_MOBILE } = "../../lib/variables"
import Articles from '../articles/Articles'
import Card from '../card/Card'
import Footer from '../footer/Footer'
import Groot from '../categoryBanner/CategoryBanner'
import HolaJuanito from "../holaJuanito/HolaJuanito"
import React from 'react'
import styles from "./portada.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock } from "@fortawesome/free-regular-svg-icons"
import { gql } from '@apollo/client'
import { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import Places from '../places/Places'
import ModalLead from '../modalLoead/ModalLead'

const SpecialBanner = ({ category, popularyItem, starItem }) => {
  return <span />
  if (false /*!category && popularyItem && starItem*/) {
    return <div id={styles.SpecialBanner}>
      <div className={styles.box}>
        <div className={styles.title}>Lo más visto por los gamers</div>
        <Card key={popularyItem.id} permitirLink={true} {...popularyItem} />
      </div>
      <img src="/images/banners/banner-varios-juegos.png" alt="Juegos SSwitch en promoción" />
      <div className={styles.box}>
        <div className={styles.title}>Anuncio</div>
        <Card key={starItem.id} permitirLink={true} {...starItem} />
      </div>
    </div>
  }
}

const PortadaInterface = ({ category, feed, popularyItem, setFeed, starItem }) => {
  const [showVideo, setShowVideo] = useState(false)
  const isOpen = typeof sessionStorage != "undefined" && JSON.parse(sessionStorage.getItem("notifications"))?.home
  const [showNotification, setShowNotification] = useState(!!!isOpen)

  useEffect(() => {
    if (localStorage.getItem("user") == null) setShowVideo(true)
    setTimeout(() => {
      document.querySelectorAll("video").forEach(item => {
        item.play()
      })
    }, 2000)
    getFollowing()
  }, [])

  const [getFollowing, { data }] = useLazyQuery(gql`
    query getFollowing($user: Int) {
      getFollowing(user: $user)
    }`
    , {
      variables: {
        user: 61
      },
      onCompleted: ({ getFollowing }) => {
        if (getFollowing.length > 0) {
          const _publications = feed ? [...feed] : []
          getFollowing.forEach(item => {
            let element = _publications.find(p => p.id == item.publication)
            if (element) _publications.find(p => p.id == item.publication).following = true
          })
          setFeed(_publications)
        }
      }
    })

  return <React.Fragment>
    {(feed && feed.length < 1) && <h3 style={{ textAlign: "center" }}>
      <FontAwesomeIcon icon={faClock} style={{ marginRight: "10px" }} />
      Mantenimiento programado en progreso
    </h3>}
    {/* <Places /> */}
    {!category && <HolaJuanito />}
    <SpecialBanner {...{ category, popularyItem, starItem }} />
    <ModalLead />
    {/* <Articles /> */}
    <div className={styles.PortadaInterfaceComponent}>
      <div className={styles.main}>
        <div className="listadoRodadas">
          {feed && feed.map((item, ind) => {
            let categoryId
            switch (ind) {
              case 0:
                categoryId = 2
                break;
              case 6:
                categoryId = 3
                break;
              case 12:
                categoryId = 4
                break;
              case 18:
                categoryId = 5
                break;
              case 24:
                categoryId = 1
                break;
              default:
                categoryId = null
                break
            }

            return <React.Fragment>
              {(!IS_MOBILE && categoryId && !category) && <Groot categoryId={categoryId} />}
              <Card special_title="Más vendido" {...item} />
            </React.Fragment>
          })}
        </div>
      </div>
    </div>
    <Footer />
  </React.Fragment>
}

export default PortadaInterface
