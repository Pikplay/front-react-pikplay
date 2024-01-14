import Button from '../../src/components/button/Button'
import Layout from '../../src/components/layout/Layout'
import Link from 'next/link'
import { Alert } from '@material-ui/lab'

const Page404 = () => {
  return (
    <Layout
      meta_image=''
      meta_title='404'
      title='404'
      descripcion='Pagina no encontrada'
      meta_url='404'
    >
      <Alert severity='info'>
        <p>
          No encontramos lo que buscabas o posiblemente el producto ya no tiene
          inventario
        </p>
      </Alert>
      <Link href='/'>
        <Button color='blue'>Ver productos</Button>
      </Link>
    </Layout>
  )
}

export default Page404
