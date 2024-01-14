import Link from 'next/link'
import { getSubcategories } from '../../lib/utils'
import styles from './styles.module.scss'

const Subcategories = () => {
  const list = getSubcategories()
  return (
    <div className={styles.subcategories}>
      <ul>
        {list.map(item => (
          <Link href={item.url}>
            <a className='' key={item.id}>
              <h2>{item.name}</h2>
            </a>
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default Subcategories
