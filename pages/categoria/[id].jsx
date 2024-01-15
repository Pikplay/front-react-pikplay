import React from 'react'
import Layout from '../../src/components/layout/Layout'
import { getCategories, getFeed, capitalize, slugify } from '../../src/lib/utils'
import Portada from '../index/components/portada/Portada'
import CategoryBanner from '../../src/components/categoryBanner/CategoryBanner'

const CategoryPage = props => {
  const { category, categoryId, feed } = props
  const url = 'https://pikplay.co/category/' + category
  const meta_title = 'Pikplay | ' + capitalize(category)
  const descripcion =
    'Pikplay es un sitio web de comercio electrónico, un marketplace donde se encuentran tiendas de venta de videojuegos, artículos y consolas de Playstation, Xbox y Nintendo Switch de alto prestigio en Colombia'
  return (
    <Layout
      meta_url={url}
      category={category}
      meta_descripcion={descripcion}
      meta_title={meta_title}
      title={meta_title}
    >
      <CategoryBanner categoryId={categoryId} />
      <Portada category={category} feed={feed} />
    </Layout>
  )
}

CategoryPage.getInitialProps = async ({ req, query }) => {
  const category = query.id
  const categoryId = getCategories().find(
    item =>
      item.name.toLowerCase() === category.toLowerCase().replace('-', ' '),
  ).id
  const feed = await getFeed({ category: categoryId })
  return { category, categoryId, feed }
}

export default CategoryPage
