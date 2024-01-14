/* eslint-disable react/prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import styles from './imageProfile.module.scss'
import { useSelector } from 'react-redux'

const ImageProfile = props => {
  const { height, url, width, star } = props
  const { category, picture } = useSelector(state => state.user)
  const { handleClickImage } = props
  const defaultSize = '40px'

  return (
    <div
      className={`content_image ${styles.content_image} ${styles[category]}`}
      id='content_image_profile_menu'
      onClick={handleClickImage}
      style={{
        height: height || defaultSize,
        width: width || defaultSize,
      }}
    >
      <span
        className={`${styles.picture} ${star ? styles.star : ''}`}
        style={{
          backgroundImage: `url(${url || picture})`,
          height: height || defaultSize,
          width: width || defaultSize,
        }}
        // whileHover={{ rotate: [0, 15, - 15, 5, 0] }}
      />
    </div>
  )
}

ImageProfile.propTypes = {
  height: PropTypes.string,
  url: PropTypes.string,
  width: PropTypes.string,
  star: PropTypes.bool, // Si esta en true aparece animacion de papeles de colores cayendo
}

export default ImageProfile
