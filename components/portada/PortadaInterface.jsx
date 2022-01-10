import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock } from "@fortawesome/free-regular-svg-icons"
import Card from '../card/Card'
import Footer from '../footer/Footer'
import styles from "./portada.module.scss"
import { useEffect, useState } from 'react';
// import Subcategories from '../subcategories';
// import HolaJuanito from "../holaJuanito/HolaJuanito"

const SpecialBanner = ({ category, handleLike, popularyItem, starItem }) => {
  if (!category && popularyItem && starItem) {
    return <div id={styles.SpecialBanner}>
      <div className={styles.box}>
        <div className={styles.title}>Lo más visto por los gamers</div>
        <Card key={popularyItem.id} handleLike={handleLike} permitirLink={true} {...popularyItem} />
      </div>
      <img src="/images/banners/banner-varios-juegos.png" alt="Juegos SSwitch en promoción" />
      <div className={styles.box}>
        <div className={styles.title}>Anuncio</div>
        <Card key={starItem.id} handleLike={handleLike} permitirLink={true} {...starItem} />
      </div>
    </div>
  } else {
    switch (category) {
      case "playstation":
        return <img className="block-center m-t-20" src="https://www.combogamer.com/wp-content/uploads/2014/05/ps4-launch-banner.png" />
      case "nintendo-switch":
        return <img className="block-center m-t-20" src="https://switchplayer.net/wp-content/uploads/2017/03/Nintendo-Switch-List-Banner-1-820x171.png" />
      default:
        return <div></div>
    }
  }
}

const PortadaInterface = ({ category, handleLike, feed, popularyItem, starItem }) => {
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
  }, [])

  return <React.Fragment>
    {feed.length < 1 && <h3 style={{ textAlign: "center" }}>
      <FontAwesomeIcon icon={faClock} style={{ marginRight: "10px" }} />
      Mantenimiento programado en progreso
    </h3>}
    {/* {!category && <HolaJuanito />} */}
    {
      // showVideo && <div className={styles.videoContent}>
      //   <video onClick={handlePlay} className="block-center" src="/videos/video1.mp4" />
      // </div>
    }
    <SpecialBanner {...{ category, handleLike, popularyItem, starItem }} />
    <div className={styles.view_Rodadas}>
      <div className={styles.main}>
        <div className="listadoRodadas">
          {feed && feed.map((item, ind) => {
            return <React.Fragment>
              {ind == 4 && <ins class="adsbygoogle" style={{ display: "inline-block", width: "336px", height: "280px" }} data-ad-client="ca-pub-4730353912478910" data-ad-slot="4411619983"></ins>}
              {/* <video className="block-center video-evita-estafas" src="/videos/evita-estafas.mp4" /> */}
              <Card special_title="Más vendido" handleLike={handleLike} {...item} />
            </React.Fragment>
          })}
        </div>
      </div>
    </div>
    <Footer />
  </React.Fragment>
}

export default PortadaInterface