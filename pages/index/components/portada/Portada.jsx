import React, { useEffect } from 'react'
import date from 'date-and-time'
import PortadaInterface from './PortadaInterface'
import { useState } from 'react'
import { CREATE_FAVORITE } from '../../../../src/lib/utils'
import 'date-and-time/locale/es'
import { useSelector } from 'react-redux'
import { useMutation, useQuery } from '@apollo/client'
import { toast } from 'react-toastify'
import Link from 'next/link'

date.locale('es')

function Portada({ category, feed: data = [] }) {
  const [feed, setFeed] = useState(data)
  const [open, setOpen] = useState(false)
  const popularyItem = feed ? feed[0] : null
  const starItem = feed && feed.find(item => item.id == 68)

  useEffect(() => {
    setFeed(data)
  }, [data])

  const [handleFavorite] = useMutation(CREATE_FAVORITE, {
    onCompleted: () => {
      toast(
        <p className='m-0'>
          Te avisaremos si hay un cambio de precio o si alguien más esta
          interesado en la publicación.
          <span className='f-r'>🧐</span>
          <br />
          <br />
          <Link href='/publicaciones'>
            <small>
              Puedes revisar las publicaciones que sigues haciendo click aquí
            </small>
          </Link>
        </p>,
      )
    },
  })

  return (
    <PortadaInterface
      {...{
        feed,
        category,
        handleFavorite,
        open,
        popularyItem,
        setFeed,
        starItem,
      }}
    />
  )
}

export default Portada
