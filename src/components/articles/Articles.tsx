import React from 'react'
const { motion } = require('framer-motion')
import { useQuery } from '@apollo/client'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { GET_ARTICLES } from '../../lib/utils'
import styles from './styles.module.scss'

interface AticlesProps {
  size?: number
  id?: number
  directionColumn: boolean
}

const Articles = (props: AticlesProps) => {
  const { id, size, directionColumn } = props
  const variables = {
    limit: size ? size : 4,
  }

  const { data } = useQuery(GET_ARTICLES, {
    variables,
    context: {
      headers: {
        'Operation-Name': 'getArticles',
        Variables: JSON.stringify(variables),
      },
    },
  })

  const handleClick = () => {}

  return (
    <div key={id} id={styles.ArticlesComponent}>
      <div className={styles.arrows}>
        <FontAwesomeIcon icon={faArrowLeft} onClick={handleClick} />
        <FontAwesomeIcon icon={faArrowRight} onClick={handleClick} />
      </div>
      <section
        className={`${styles.list} ${
          directionColumn ? styles.vertical : styles.horizontal
        }`}
      >
        {data?.getArticles &&
          data.getArticles.map((item, ind) => {
            return (
              <Link href={`/articulo/${item.slug}`}>
                <motion.article
                  className='Card'
                  key={ind}
                  whileHover={{ scale: 1.1 }}
                  // whileTap={{ scale: 0.8 }}
                  initial={{ y: '100%' }}
                  animate={{
                    y: 0,
                  }}
                >
                  <h1>{item.title}</h1>
                  <summary>{item.summary}</summary>
                  <span
                    className={styles.image_card}
                    dangerouslySetInnerHTML={{ __html: item.image_card }}
                  ></span>
                </motion.article>
              </Link>
            )
          })}
      </section>
    </div>
  )
}

export default Articles
