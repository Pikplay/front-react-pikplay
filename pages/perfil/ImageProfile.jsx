import { useContext } from "react"
import { PikContext } from "../../states/PikState"
import styles from "./imageProfile.module.scss"

const ImageProfile = ({ isOpenPreviewProfile, setIsOpenPreviewProfile }) => {
  const context = useContext(PikContext)
  const { category, picture } = context?.user
  return <div id="content_image_profile_menu" onClick={() => setIsOpenPreviewProfile && setIsOpenPreviewProfile(!isOpenPreviewProfile)} className={`content_image ${styles.content_image} ${styles[category]}`}>
    <span className={styles.picture} style={{ "background-image": `url(${picture})` }} />
  </div>
}

export default ImageProfile