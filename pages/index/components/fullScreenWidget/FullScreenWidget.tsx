import React from 'react'
import styles from './styles.module.scss'
import Card from '../../../../src/components/card/Card'

const FullScreenWidget = () => {
  return (
    <div className={styles.BigScreenPublications}>
      <div className={styles.texts}>
        <span className={styles.text1}>Destacado</span>
        <span className={styles.text2}>Semanal</span>
      </div>
      <div className={styles.publications}>
        <Card
          id={0}
          title={''}
          description={''}
          price={0}
          sale_price={0}
          image_1='https://www.sdpnoticias.com/resizer/qnHYigdOWFZYdDVYgbbMo2BhzRo=/640x360/filters:format(jpg):quality(90):focal(916x523:926x533)/cloudfront-us-east-1.images.arcpublishing.com/sdpnoticias/CO5ACKGVQ5FMHP222XXYJ7G7LI.jpg'
        />
        <Card
          id={0}
          title={''}
          description={''}
          price={0}
          sale_price={0}
          image_1='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrQarbVIoUoixDs5a9vDBtofbqS9LdU49suA&usqp=CAU'
        />
      </div>
      <div className={styles.video}>
        <iframe
          width='700'
          height='440'
          src='https://www.youtube.com/embed/rCIV0y8jNy4?si=tmBCJoUa1BKMQ2B0'
          title='YouTube video player'
          frameborder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowfullscreen
        ></iframe>
      </div>
    </div>
  )
}

export default FullScreenWidget
