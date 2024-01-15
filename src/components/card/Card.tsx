import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Grow from '@material-ui/core/Grow'
import { capitalize, formatNumber, getCiudades } from '../../lib/utils'
import { useQuery, gql } from '@apollo/client'
import styles from './card.module.scss'
import Author from './Author'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHeart,
  faHeartBroken,
  faShare,
} from '@fortawesome/free-solid-svg-icons'
import { Tooltip } from '@material-ui/core'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import Product from '../../interfaces/Product'

const Card = (props: Product) => {
  const {
    accept_changes,
    apply_cashback,
    certificate,
    city,
    description,
    descuento = 0,
    destacada,
    following,
    handleFavorite,
    handleShare,
    icon_favorite = true,
    id: id_publication,
    image_1,
    is_new,
    likes,
    logDetalle,
    price,
    quantity,
    sale_price,
    slug,
    special_title,
    tags,
    tipo_coleccion,
    title,
    type,
    user,
    user_name,
    user_picture,
    user_transactions,
  } = props

  const usuario =
    typeof localStorage != 'undefined'
      ? localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')).email
        : null
      : null
  let like = null
  if (usuario) like = likes ? !!likes.find(like => like == usuario) : false
  const isDestacada = id_publication == 1 ? true : false
  const { loading, error, data } = useQuery(gql`
    {
      publications {
        title
      }
    }
  `)

  const loggedUser = useSelector(state => state.user)
  const cities = getCiudades()
  const cityLabel = cities.find(item => item.id == city)?.label
  const countryLabel = capitalize(cities.find(item => item.id == city)?.pais)

  return (
    <Grow key={id_publication} in={true} style={{ opacity: 1 }}>
      <div
        key={id_publication}
        className={`${styles.Card} ${isDestacada ? styles.isDestacada : ''}`}
      >
        <div className={styles.descripcion_imagen}>
          <div className={styles.content_imagen}>
            <div className={`${styles.tags} desktop`}>
              {!!!is_new && (
                <span
                  title='El articulo es de segunda mano'
                  className={styles.condition}
                >
                  Usado
                </span>
              )}
              {/* Si aplica cashback */}
              {apply_cashback && (
                <span
                  title='Ganarás Pikcoins por hacer esta compra'
                  className={styles.apply_cashback}
                >
                  <picture className={styles.coin} />
                  ¡Cashback!
                </span>
              )}
              {accept_changes && (
                <span
                  className={styles.condition}
                  title='El vendedor acepta productos como parte de pago o incluso cambiar el producto por otro de su interés'
                >
                  Acepto cambios
                </span>
              )}
              {!!tags &&
                JSON.parse(tags).map((item, ind) => {
                  return <span key={ind}>{item.texto}</span>
                })}
            </div>

            {/* Image */}
            {image_1 && (
              <Link
                href={slug ? '/publicacion/[id]' : 'javascript:void(0)'}
                as={slug ? `/publicacion/${slug}` : 'javascript:void(0)'}
              >
                <a className={styles.image_wrapper}>
                  <Image
                    alt={title}
                    objectFit='cover'
                    layout='fill'
                    src={image_1}
                  />
                </a>
              </Link>
            )}
          </div>
          {
            <div className={styles.descripcion}>
              <div className={styles.icons}>
                <Tooltip title='Seguir publicación'>
                  <a>
                    <FontAwesomeIcon
                      icon={icon_favorite ? faHeart : faHeartBroken}
                      className={classNames(styles.faHeart, {
                        [styles.active]: following || !icon_favorite,
                      })}
                      onClick={() => {
                        loggedUser?.id != 0
                          ? handleFavorite({
                              variables: {
                                publication: id_publication,
                                user: loggedUser?.id,
                              },
                            })
                          : document.querySelector('#btnStart').click()
                      }}
                    />
                  </a>
                </Tooltip>
                <Tooltip title='Compartir en Facebook'>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=https://pikplay.co/publicacion/${slug}`}
                    target='_BLANK'
                  >
                    <FontAwesomeIcon
                      icon={faShare}
                      className={styles.faShare}
                    />
                  </a>
                </Tooltip>
              </div>
              <Link
                href={slug ? '/publicacion/[id]' : 'javascript:void(0)'}
                as={slug ? `/publicacion/${slug}` : 'javascript:void(0)'}
              >
                <a className={id_publication == 1 ? styles.destacada_Card : ''}>
                  <h2>
                    {title ? title : 'Espacio para el título de la publicación'}
                  </h2>
                </a>
              </Link>
              {user?.name && <Author user={user} />}
              <small className={styles.location}>
                {cityLabel}
                &nbsp;-&nbsp;
                {countryLabel}
              </small>
              {/* {!!quantity && <p className={styles.quantity}>{quantity} unidades disponibles</p>} */}
              <div className={styles['likes-precio']}>
                <div className={styles.content_precio}>
                  {
                    /* Precio tachado */
                    // Number(price) != 0 && <span className={styles.tachado}>
                    //   ${formatNumber(price)}
                    // </span>
                  }
                  {
                    // Precio sin tachar
                    Number(sale_price) != 0 && (
                      <React.Fragment>
                        <span className={styles.nuevoPrecio}>
                          ${formatNumber(sale_price)}
                        </span>
                      </React.Fragment>
                    )
                  }
                </div>
              </div>
              <div className={`${styles.tags} mobile`}>
                {!!is_new && (
                  <span
                    title='El articulo es de segunda mano'
                    className={styles.condition}
                  >
                    Usado
                  </span>
                )}
                {/* Si aplica cashback */}
                {apply_cashback && (
                  <span
                    title='Ganarás Pikcoins por hacer esta compra'
                    className={styles.apply_cashback}
                  >
                    <picture className={styles.coin} />
                    ¡Cashback!
                  </span>
                )}
                {accept_changes && (
                  <span
                    className={styles.condition}
                    title='El vendedor acepta productos como parte de pago o incluso cambiar el producto por otro de su interés'
                  >
                    Acepto cambios
                  </span>
                )}
                {tags &&
                  JSON.parse(tags).map((item, ind) => {
                    return <span key={ind}>{item.texto}</span>
                  })}
              </div>
            </div>
          }
        </div>
      </div>
    </Grow>
  )
}

export default Card
