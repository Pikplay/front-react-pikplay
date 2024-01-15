import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Footer from '../../../../src/components/footer/Footer'
import Card from '../../../../src/components/card/Card'
import Advertisements from '../../../../src/components/advertisements/Advertisements.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { useLazyQuery } from '@apollo/client'
import { GET_FOLLOWED_PUBLICATIONS } from '../../../../src/lib/utils'
import FullScreenWidget from '../fullScreenWidget/FullScreenWidget'
import styles from './portada.module.scss'

const { IS_MOBILE } = '../../lib/variables'

const CategoryBanner = dynamic(
  () => import('../../../../src/components/categoryBanner/CategoryBanner.jsx'),
  { ssr: false },
)

const SpecialBanner = ({ category, popularyItem, starItem }) => {
  return (
    <div id={styles.SpecialBanner}>
      <div className={styles.box}>
        <div className={styles.title}>Lo más visto por los gamers</div>
        <Card key={popularyItem.id} permitirLink={true} {...popularyItem} />
      </div>
      <img
        src='/images/banners/banner-varios-juegos.png'
        alt='Juegos SSwitch en promoción'
      />
      <div className={styles.box}>
        <div className={styles.title}>Anuncio</div>
        <Card permitirLink={true} {...starItem} />
      </div>
    </div>
  )
}

let ModalLead = () => <div />

const PortadaInterface = ({
  category,
  handleFavorite,
  feed,
  popularyItem,
  setFeed,
  starItem,
}) => {
  const [showVideo, setShowVideo] = useState(false)
  const isOpen =
    typeof sessionStorage != 'undefined' &&
    JSON.parse(sessionStorage.getItem('notifications'))?.home
  const [showNotification, setShowNotification] = useState(!!!isOpen)
  const [showModalLead, setShowModalLead] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('user') == null) setShowVideo(true)
    getFollowedPublications()

    // show modal lead
    if (!localStorage.getItem('modal_lead')) {
      setTimeout(() => {
        setShowModalLead(true)
      }, 5000)
    }

    ModalLead = dynamic(
      () => import('../../../../src/components/modalLoead/ModalLead'),
      { ssr: false },
    )
  }, [])

  const [getFollowedPublications, { data }] = useLazyQuery(
    GET_FOLLOWED_PUBLICATIONS,
    {
      fetchPolicy: 'no-cache',
      variables: {
        user: 61,
      },
      onCompleted: ({ getFollowedPublications }) => {
        if (getFollowedPublications.length > 0) {
          const _publications = feed ? [...feed] : []
          getFollowedPublications.forEach(item => {
            let element = _publications.find(p => p.id == item.id)
            if (element)
              _publications.find(p => p.id == item.id).following = true
          })
          setFeed(_publications)
        }
      },
    },
  )

  const Products = () => {
    return <div className={styles.PortadaInterfaceComponent}>
      <div className={styles.main}>
        <div className='listadoRodadas'>
          {feed &&
            feed.map((item, ind) => {
              let categoryId = 0
              switch (ind) {
                case 0:
                  categoryId = 2
                  break
                case 6:
                  categoryId = 3
                  break
                case 12:
                  categoryId = 4
                  break
                case 18:
                  categoryId = 5
                  break
                case 24:
                  categoryId = 1
                  break
                case 30:
                  categoryId = 6
                  break
                default:
                  categoryId = null
                  break
              }

              const showCategoryBanner = !IS_MOBILE && categoryId && !category

              return (
                <>
                  {showCategoryBanner && (
                    <CategoryBanner categoryId={categoryId} />
                  )}
                  <Card {...{ handleFavorite, ...item }} />
                </>
              )
            })}
        </div>
      </div>
    </div>
  }

  const Maintenance = () => {
    return (
      <h3 style={{ textAlign: 'center' }}>
        <FontAwesomeIcon icon={faClock} style={{ marginRight: '10px' }} />
        Mantenimiento programado en progreso
      </h3>
    )
  }

  return (<>
    <section>
      {feed && feed.length < 1 && <Maintenance />}
      {!category && <Advertisements />}
      {/* <SpecialBanner {...{ category, popularyItem, starItem }} /> */}
      {/* <FullScreenWidget /> */}
      {showModalLead && <ModalLead />}
      {/* <Products /> */}
    </section>
    <Footer />
  </>
  )
}

export default PortadaInterface
