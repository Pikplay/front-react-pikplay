// BEGIN: ed8c6549bwf9
type Product = {
  accept_changes?: boolean
  apply_cashback?: boolean
  certificate?: boolean
  city?: number
  description: string
  descuento?: number
  destacada?: boolean
  following?: boolean
  handleFavorite?: (args: any) => void
  handleShare?: (args: any) => void
  icon_favorite?: boolean
  id: number
  image_10?: string
  image_1?: string
  image_2?: string
  image_3?: string
  image_4?: string
  image_5?: string
  image_6?: string
  image_7?: string
  image_8?: string
  image_9?: string
  is_new?: boolean
  likes?: string[]
  logDetalle?: boolean
  name: string
  picture: string
  price: number
  quantity?: number
  sale_price: number
  slug?: string
  special_title?: string
  tags?: string
  tipo_coleccion?: string
  title: string
  user?: {
    user_name?: string
    user_picture?: string
    user_transactions?: number
  }
}

export default Product
