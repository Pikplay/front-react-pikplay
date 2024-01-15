import Link from 'next/link'
import React, { lazy, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import styles from './styles.module.scss'
import { getCategories, slugify } from '../../lib/utils'

const Categorias = props => {
  const [isOpenPreviewProfile, setIsOpenPreviewProfile] = useState(false)
  const { scroll } = props

  const VenderButton = dynamic(() => import('./venderButton/VenderButton'), {
    ssr: false,
  })

  return (
    <div className={styles.Categorias}>
      <ul>
        {getCategories().map(category => {
          const image = category.image
            ? category.image
            : '/images/icons/' + category.id + '.png'
          return (
            <li filter='game' key={category.id}>
              <Link
                scroll={scroll}
                href='/categoria/[id]'
                as={'/categoria/' + slugify(category.name)}
              >
                <a>
                  {!!image && <img src={image} alt={category.name} />}
                  {category.name}
                </a>
              </Link>
            </li>
          )
        })}
        <li className={styles['crear-publicacion']}>{<VenderButton />}</li>
      </ul>
    </div>
  )
}

export default Categorias
